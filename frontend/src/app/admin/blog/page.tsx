"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminTabs } from "@/components/admin/admin-tabs";
import { useAllBlogs } from "@/lib/hooks/use-blogs";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { AdminBlogTable } from "@/components/admin/admin-blog-table";

export default function AdminBlogPage() {
    const { data: blogs, isLoading, isError } = useAllBlogs();
    const { user } = useCurrentUser();
    const { openAuthModal } = useAuthModal();

    if (!user) {
        return (
            <>
                <Navbar />
                <div className="mx-auto max-w-md px-4 py-20 text-center">
                    <h1 className="font-display text-xl font-bold text-ink">You need to be logged in</h1>
                    <button onClick={() => openAuthModal("login")} className="mt-6 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-dark">Log in</button>
                </div>
                <Footer />
            </>
        );
    }

    if (user.role !== "ADMIN") {
        return (
            <>
                <Navbar />
                <div className="mx-auto max-w-md px-4 py-20 text-center">
                    <h1 className="font-display text-xl font-bold text-ink">Admins only</h1>
                    <p className="mt-2 text-slate">Your account doesn't have access to this page.</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
                <AdminTabs active="blog" />
                <div className="mb-8 mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-semibold text-white">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                            <p className="text-sm text-slate">Admin panel</p>
                            <h1 className="font-display text-xl font-bold text-ink">Blog posts</h1>
                        </div>
                    </div>
                    <Link href="/admin/blog/new" className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
                        <Plus className="h-4 w-4" /> New post
                    </Link>
                </div>
                {isLoading && <p className="text-sm text-slate">Loading posts…</p>}
                {isError && <p className="text-sm text-red-600">Couldn't load posts.</p>}
                {blogs && <AdminBlogTable blogs={blogs} />}
            </main>
            <Footer />
        </>
    );
}