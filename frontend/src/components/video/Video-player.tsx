export function VideoPlayer({
    src,
    poster,
}: {
    src: string;
    poster?: string;
}) {
    if (!src) {
        return (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-900 text-sm text-gray-400">
                Video not available yet
            </div>
        );
    }

    return (
        <video
            src={src}
            poster={poster}
            controls
            preload="metadata"
            className="aspect-video w-full rounded-lg bg-black"
        >
            Your browser does not support the video tag.
        </video>
    );
}