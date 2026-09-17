"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { useBlog } from "@/lib/hooks/use-blogs";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { useAuthModal } from "@/lib/context/auth-modal-context";

function estimateReadTime(html: string) {
    const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
}

export function BlogDetailView({ blogId }: { blogId: string }) {
    const { data: blog, isLoading, isError } = useBlog(blogId);
    const { user, isLoading: userLoading } = useCurrentUser();
    const { openAuthModal } = useAuthModal();

    if (userLoading || isLoading) {
        return <p className="mx-auto max-w-3xl px-4 py-16 text-sm text-slate">Loading…</p>;
    }
    if (isError || !blog) {
        return <div className="mx-auto max-w-md px-4 py-20 text-center"><h1 className="font-display text-xl font-bold text-ink">Article not found</h1></div>;
    }
    if (!user) {
        return (
            <div className="mx-auto max-w-md px-4 py-20 text-center">
                <h1 className="font-display text-xl font-bold text-ink">Log in to read this article</h1>
                <p className="mt-2 text-slate">Create a free account or log in to continue.</p>
                <button onClick={() => openAuthModal("signup", `/blog/${blog.id}`)} className="mt-6 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
                    Log in
                </button>
            </div>
        );
    }

    return (
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-slate hover:text-primary">
                <ArrowLeft className="h-4 w-4" /> All articles
            </Link>

            <p className="mt-6 text-xs font-semibold text-primary">Article</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">{blog.title}</h1>
            <p className="mt-3 text-lg text-slate">{blog.description}</p>

            <div className="mt-4 flex items-center gap-4 text-xs text-slate">
                <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {new Date(blog.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {estimateReadTime(blog.content)} min read
                </span>
            </div>

            <hr className="my-8 border-line" />

            <div
                className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-primary prose-strong:text-ink"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <hr className="my-10 border-line" />
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                <ArrowLeft className="h-4 w-4" /> Back to all articles
            </Link>
        </article>
    );
}