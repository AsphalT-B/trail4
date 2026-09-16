"use client";

import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { Blog } from "@/lib/types";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { useCurrentUser } from "@/lib/hooks/use-current-user";

export function BlogCard({ blog }: { blog: Blog }) {
    const { user } = useCurrentUser();
    const { openAuthModal } = useAuthModal();
    const router = useRouter();

    const handleClick = () => {
        if (user) {
            router.push(`/blog/${blog.id}`);
        } else {
            openAuthModal("signup", `/blog/${blog.id}`);
        }
    };

    return (
        <button onClick={handleClick} className="group flex flex-col rounded-2xl border border-line bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <FileText className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{blog.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-slate">{blog.description}</p>
            <span className="mt-4 text-sm font-semibold text-primary">Read article</span>
        </button>
    );
}