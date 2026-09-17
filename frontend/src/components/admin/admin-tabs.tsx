"use client";

import Link from "next/link";

export function AdminTabs({ active }: { active: "videos" | "blog" }) {
    return (
        <div className="flex gap-6 border-b border-line text-sm font-medium">
            <Link href="/admin" className={`border-b-2 pb-3 ${active === "videos" ? "border-primary text-ink" : "border-transparent text-slate hover:text-ink"}`}>
                Videos
            </Link>
            <Link href="/admin/blog" className={`border-b-2 pb-3 ${active === "blog" ? "border-primary text-ink" : "border-transparent text-slate hover:text-ink"}`}>
                Blog posts
            </Link>
        </div>
    );
}