"use client";

import { useSearchParams } from "next/navigation";
import { VideoGrid } from "@/components/video/Video-grid";
import { BlogGrid } from "@/components/blog/blog-grid";
import { useAllVideos } from "@/lib/hooks/use-video";
import { useAllBlogs } from "@/lib/hooks/use-blogs";

export function SearchResults() {
    const searchParams = useSearchParams();
    const rawQuery = searchParams.get("q") ?? "";
    const query = rawQuery.toLowerCase().trim();

    const { data: videos, isLoading: videosLoading } = useAllVideos();
    const { data: blogs, isLoading: blogsLoading } = useAllBlogs();

    const matchedVideos = (videos ?? []).filter(
        (v) => v.title.toLowerCase().includes(query) || v.description.toLowerCase().includes(query)
    );
    const matchedBlogs = (blogs ?? []).filter(
        (b) => b.title.toLowerCase().includes(query) || b.description.toLowerCase().includes(query)
    );

    const isLoading = videosLoading || blogsLoading;
    const hasResults = matchedVideos.length > 0 || matchedBlogs.length > 0;

    return (
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h1 className="font-display text-2xl font-bold text-ink">
                Search results for &ldquo;{rawQuery}&rdquo;
            </h1>

            {isLoading && <p className="mt-6 text-sm text-slate">Searching…</p>}
            {!isLoading && !hasResults && (
                <p className="mt-6 text-sm text-slate">No courses or articles matched your search.</p>
            )}

            {matchedVideos.length > 0 && (
                <section className="mt-10">
                    <h2 className="mb-4 font-display text-lg font-semibold text-ink">Courses ({matchedVideos.length})</h2>
                    <VideoGrid videos={matchedVideos} />
                </section>
            )}

            {matchedBlogs.length > 0 && (
                <section className="mt-10">
                    <h2 className="mb-4 font-display text-lg font-semibold text-ink">Articles ({matchedBlogs.length})</h2>
                    <BlogGrid blogs={matchedBlogs} />
                </section>
            )}
        </main>
    );
}