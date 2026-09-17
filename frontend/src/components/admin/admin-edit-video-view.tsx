"use client";

import { useVideo } from "@/lib/hooks/use-video";
import { VideoForm } from "./video-form";

export function AdminEditVideoView({ videoId }: { videoId: string }) {
    const { data: video, isLoading, isError } = useVideo(videoId);

    if (isLoading) return <p className="text-sm text-slate">Loading…</p>;
    if (isError || !video) return <p className="text-sm text-red-600">Video not found.</p>;

    return <VideoForm initialVideo={video} />;
}