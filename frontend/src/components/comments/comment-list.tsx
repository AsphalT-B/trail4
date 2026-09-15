import { Trash2 } from "lucide-react";
import { Comment } from "@/lib/types";

export function CommentList({
    comments,
    currentUserId,
    onDelete,
}: {
    comments: Comment[];
    currentUserId?: string;
    onDelete?: (id: string) => void;
}) {
    if (comments.length === 0) {
        return <p className="text-sm text-slate">No comments yet. Be the first to comment.</p>;
    }

    return (
        <ul className="flex flex-col gap-4">
            {comments.map((comment) => (
                <li key={comment.id} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                        {comment.userName}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-ink">{comment.userName}</span>
                                <span className="text-xs text-slate">{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                            {currentUserId === comment.userId && onDelete && (
                                <button onClick={() => onDelete(comment.id)} className="text-slate hover:text-red-600" aria-label="Delete comment">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <p className="mt-0.5 text-sm text-slate">{comment.content}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}