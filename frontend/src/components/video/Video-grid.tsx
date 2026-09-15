import { Video } from "@/lib/types";
import { VideoCard } from "./Video-card";

export function VideoGrid({ videos }: { videos: Video[] }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
                <VideoCard key={video.id} video={video} index={index} />
            ))}
        </div>
    );
}