import { Video } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface VideoInput {
    title: string;
    description: string;
    thumbnailUrl?: string;
    videoUrl: string;
}

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const message = await res.text().catch(() => res.statusText);
        throw new Error(message || `Request failed (${res.status})`);
    }
    return res.json();
}

export async function fetchAllVideos(): Promise<Video[]> {
    const res = await fetch(`${API_URL}/vidpost/all-post`, { credentials: "include" });
    return handleResponse<Video[]>(res);
}

export async function fetchRecentVideos(): Promise<Video[]> {
    const res = await fetch(`${API_URL}/vidpost/recent-post`, { credentials: "include" });
    return handleResponse<Video[]>(res);
}

export async function fetchVideoById(id: string): Promise<Video | undefined> {
    // No single-post GET was provided — filtering all-post client-side.
    // Fine for 6 videos; ask for a real GET /vidpost/:id if this catalog grows.
    const all = await fetchAllVideos();
    return all.find((v) => v.id === id);
}

export async function createVideo(input: VideoInput): Promise<Video> {
    const res = await fetch(`${API_URL}/vidpost/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    return handleResponse<Video>(res);
}

export async function updateVideo(id: string, input: Partial<VideoInput>): Promise<Video> {
    const res = await fetch(`${API_URL}/vidpost/${id}/update`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    return handleResponse<Video>(res);
}

export async function deleteVideo(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/vidpost/${id}/delete`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!res.ok) throw new Error(`Failed to delete video (${res.status})`);
}