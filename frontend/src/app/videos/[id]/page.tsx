import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VideoWatchView } from "@/components/video/video-watch-view";
import { fetchVideoById } from "@/lib/api/videos";

export default async function VideoWatchPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const video = await fetchVideoById(id);
    if (!video) notFound();

    return (
        <>
            <Navbar />
            <VideoWatchView video={video} />
            <Footer />
        </>
    );
}