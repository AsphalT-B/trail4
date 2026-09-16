import { Blog } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface BlogInput {
    title: string;
    description: string;
    content: string;
}

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const message = await res.text().catch(() => res.statusText);
        throw new Error(message || `Request failed (${res.status})`);
    }
    return res.json();
}

export async function fetchAllBlogs(): Promise<Blog[]> {
    const res = await fetch(`${API_URL}/blog/all-blog`, { credentials: "include" });
    return handleResponse<Blog[]>(res);
}

export async function fetchRecentBlogs(): Promise<Blog[]> {
    const res = await fetch(`${API_URL}/blog/recent-blog`, { credentials: "include" });
    return handleResponse<Blog[]>(res);
}

export async function fetchBlogById(id: string): Promise<Blog | undefined> {
    const res = await fetch(`${API_URL}/blog/${id}`, { credentials: "include" });
    if (res.status === 404) return undefined;
    return handleResponse<Blog>(res);
}

export async function createBlog(input: BlogInput): Promise<Blog> {
    const res = await fetch(`${API_URL}/blog/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    return handleResponse<Blog>(res);
}

export async function updateBlog(id: string, input: Partial<BlogInput>): Promise<Blog> {
    const res = await fetch(`${API_URL}/blog/${id}/update`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    return handleResponse<Blog>(res);
}

export async function deleteBlog(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/blog/${id}/delete`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!res.ok) throw new Error(`Failed to delete post (${res.status})`);
}