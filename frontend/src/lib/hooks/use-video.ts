import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchAllVideos,
    fetchRecentVideos,
    fetchVideoById,
    createVideo,
    updateVideo,
    deleteVideo,
} from "@/lib/api/videos";
import { toast } from "sonner";

export function useAllVideos(enabled = true) {
    return useQuery({ queryKey: ["videos", "all"], queryFn: fetchAllVideos, enabled });
}

export function useRecentVideos(enabled = true) {
    return useQuery({ queryKey: ["videos", "recent"], queryFn: fetchRecentVideos, enabled });
}

export function useVideo(id: string) {
    return useQuery({ queryKey: ["videos", id], queryFn: () => fetchVideoById(id), enabled: !!id });
}

export function useCreateVideo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createVideo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["videos"] }),
    });
}

export function useUpdateVideo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: Parameters<typeof updateVideo>[1] }) =>
            updateVideo(id, input),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["videos"] }),
    });
}

export function useDeleteVideo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteVideo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["videos"] });
            toast.success("Video deleted");
        },
        onError: () => toast.error("Couldn't delete the video. Try again."),
    });
}