"use client";

import Link from "next/link";
import { Hero } from "./Hero";
import { CtaBanner } from "./cta-banner";
import { Testimonials } from "./testimonials";
import { VideoGrid } from "@/components/video/Video-grid";
import { useRecentVideos } from "@/lib/hooks/use-video";

export function HomeContent() {
    const { data: videos, isLoading, isError } = useRecentVideos();

    return (
        <>
            <Hero featuredVideo={videos?.[0]} />

            <main id="courses" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="font-display text-2xl font-bold text-ink">Recently added</h2>
                        <p className="mt-1 text-slate">Fresh off the upload.</p>
                    </div>
                    <Link href="/courses" className="text-sm font-semibold text-primary hover:underline">View all courses</Link>
                </div>
                {isLoading && <p className="text-sm text-slate">Loading…</p>}
                {isError && <p className="text-sm text-red-600">Couldn't load courses.</p>}
                {videos && <VideoGrid videos={videos} />}
            </main>

            <CtaBanner />
            <Testimonials />
        </>
    );
}