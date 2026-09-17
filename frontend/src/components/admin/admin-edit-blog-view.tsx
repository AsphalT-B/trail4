"use client";

import { useBlog } from "@/lib/hooks/use-blogs";
import { BlogForm } from "./blog-form";

export function AdminEditBlogView({ blogId }: { blogId: string }) {
    const { data: blog, isLoading, isError } = useBlog(blogId);

    if (isLoading) return <p className="text-sm text-slate">Loading…</p>;
    if (isError || !blog) return <p className="text-sm text-red-600">Post not found.</p>;

    return <BlogForm initialBlog={blog} />;
}