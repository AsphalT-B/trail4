"use client";

import { useAllVideos, useRecentVideos } from "@/lib/hooks/use-video";
import { VideoGrid } from "./Video-grid";



export function VideoGridSection({ variant = "recent" }: { variant?: "recent" | "all" }) {
    const recentQuery = useRecentVideos(variant === "recent");
    const allQuery = useAllVideos(variant === "all");
    const { data: videos, isLoading, isError } = variant === "recent" ? recentQuery : allQuery;

    if (isLoading) return <p className="text-sm text-gray-500">Loading courses…</p>;
    if (isError || !videos) return <p className="text-sm text-red-500">Couldn't load courses.</p>;

    return <VideoGrid videos={videos} />;
}