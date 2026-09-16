import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchAllBlogs,
    fetchRecentBlogs,
    fetchBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
} from "@/lib/api/blogs";

export function useAllBlogs(enabled = true) {
    return useQuery({ queryKey: ["blogs", "all"], queryFn: fetchAllBlogs, enabled });
}

export function useRecentBlogs(enabled = true) {
    return useQuery({ queryKey: ["blogs", "recent"], queryFn: fetchRecentBlogs, enabled });
}

export function useBlog(id: string) {
    return useQuery({ queryKey: ["blogs", id], queryFn: () => fetchBlogById(id), enabled: !!id });
}

export function useCreateBlog() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBlog,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
    });
}

export function useUpdateBlog() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: Parameters<typeof updateBlog>[1] }) => updateBlog(id, input),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
    });
}

export function useDeleteBlog() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
    });
}