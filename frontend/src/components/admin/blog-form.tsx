"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Blog } from "@/lib/types";
import { useCreateBlog, useUpdateBlog } from "@/lib/hooks/use-blogs";
import { RichTextEditor } from "./rich-text-editor";

export function BlogForm({ initialBlog }: { initialBlog?: Blog }) {
    const router = useRouter();
    const createBlog = useCreateBlog();
    const updateBlog = useUpdateBlog();

    const [title, setTitle] = useState(initialBlog?.title ?? "");
    const [description, setDescription] = useState(initialBlog?.description ?? "");
    const [content, setContent] = useState(initialBlog?.content ?? "");

    const isEditing = !!initialBlog;
    const isSaving = createBlog.isPending || updateBlog.isPending;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const payload = { title, description, content };

        try {
            if (isEditing) {
                await toast.promise(updateBlog.mutateAsync({ id: initialBlog.id, input: payload }), {
                    loading: "Saving…",
                    success: "Post updated",
                    error: "Something went wrong. Try again.",
                });
            } else {
                await toast.promise(createBlog.mutateAsync(payload), {
                    loading: "Publishing…",
                    success: "Post published",
                    error: "Something went wrong. Try again.",
                });
            }
            router.push("/admin/blog");
        } catch {
            // toast.promise already showed the error
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
            <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Title</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:border-primary"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Short description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={2}
                    placeholder="Shown on the article card — one or two sentences."
                    className="w-full rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:border-primary"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Content</label>
                <RichTextEditor content={content} onChange={setContent} />
            </div>

            <button
                type="submit"
                disabled={isSaving}
                className="mt-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
            >
                {isSaving ? "Saving…" : isEditing ? "Save changes" : "Publish post"}
            </button>
        </form>
    );
}