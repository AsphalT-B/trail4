import Link from "next/link";
import { MessageSquare, Trash2 } from "lucide-react";
import { Comment, Video } from "@/lib/types";

export function MyComments({
    comments,
    videos,
    onDelete,
}: {
    comments: Comment[];
    videos: Video[];
    onDelete?: (id: string) => void;
}) {
    if (comments.length === 0) return <p className="text-sm text-slate">You haven't commented on anything yet.</p>;

    return (
        <ul className="divide-y divide-line border-t border-line">
            {comments.map((comment) => {
                const video = videos.find((v) => v.id === comment.videoId);
                return (
                    <li key={comment.id} className="py-4">
                        <div className="flex items-start gap-3">
                            <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-slate" />
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm text-ink">{comment.content}</p>
                                    {onDelete && (
                                        <button onClick={() => onDelete(comment.id)} className="text-slate hover:text-red-600" aria-label="Delete comment">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="mt-1 flex items-center gap-3 text-xs text-slate">
                                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                    {video && <Link href={`/videos/${video.id}`} className="text-primary hover:underline">On: {video.title}</Link>}
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}