import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { Video, WatchHistoryEntry } from "@/lib/types";

export function RecentlyWatched({ history, videos }: { history: WatchHistoryEntry[]; videos: Video[] }) {
    if (history.length === 0) return <p className="text-sm text-slate">You haven't watched anything yet.</p>;

    return (
        <ul className="divide-y divide-line border-t border-line">
            {history.map((entry) => {
                const video = videos.find((v) => v.id === entry.videoId);
                if (!video) return null;
                return (
                    <li key={entry.videoId}>
                        <Link href={`/videos/${video.id}`} className="flex items-center gap-4 py-4 hover:text-primary">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5 text-ink">
                                <PlayCircle className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="font-medium text-ink">{video.title}</p>
                                <p className="mt-0.5 text-xs text-slate">Watched {new Date(entry.watchedAt).toLocaleDateString()}</p>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}