import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllComments, createComment, deleteComment } from "@/lib/api/comments";
import { toast } from "sonner";

export function useAllComments() {
    return useQuery({ queryKey: ["comments", "all"], queryFn: fetchAllComments });
}

export function useCreateComment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ videoId, content }: { videoId: string; content: string }) =>
            createComment(videoId, content),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
        onError: () => toast.error("Couldn't post your comment. Try again."),
    });
}

export function useDeleteComment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
            toast.success("Comment deleted");
        },
        onError: () => toast.error("Couldn't delete the comment. Try again."),
    });
}