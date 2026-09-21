"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogGrid } from "@/components/blog/blog-grid";
import { useAllBlogs } from "@/lib/hooks/use-blogs";

export default function BlogListPage() {
    const { data: blogs, isLoading, isError } = useAllBlogs();

    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
                <h1 className="font-display text-3xl font-bold text-ink">Articles</h1>
                <p className="mt-2 text-slate">Written tutorials from the EduNovia team.</p>
                <div className="mt-10">
                    {isLoading && <p className="text-sm text-slate">Loading…</p>}
                    {isError && <p className="text-sm text-red-600">Couldn't load articles.</p>}
                    {blogs && <BlogGrid blogs={blogs} />}
                </div>
            </main>
            <Footer />
        </>
    );
}