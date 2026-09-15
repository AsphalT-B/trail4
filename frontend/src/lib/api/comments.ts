import { Comment } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const message = await res.text().catch(() => res.statusText);
        throw new Error(message || `Request failed (${res.status})`);
    }
    return res.json();
}

export async function fetchAllComments(): Promise<Comment[]> {
    const res = await fetch(`${API_URL}/comments/all-comments`, { credentials: "include" });
    return handleResponse<Comment[]>(res);
}

export async function createComment(videoId: string, content: string): Promise<Comment> {
    const res = await fetch(`${API_URL}/comments/${videoId}/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
    });
    return handleResponse<Comment>(res);
}

export async function deleteComment(commentId: string): Promise<void> {
    // Written by backend as "/comment/id/delete" (singular) — i need to confirm this
    // isn't a typo for "/comments/:id/delete" before relying on it.
    const res = await fetch(`${API_URL}/comment/${commentId}/delete`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!res.ok) throw new Error(`Failed to delete comment (${res.status})`);
}