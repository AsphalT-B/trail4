"use client";

import { useState, FormEvent } from "react";

export function CommentForm({
    onSubmit,
}: {
    onSubmit: (content: string) => void;
}) {
    const [content, setContent] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        onSubmit(content.trim());
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-3">
            <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
            >
                Post
            </button>
        </form>
    );
}