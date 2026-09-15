"use client";

import { useAllComments, useCreateComment, useDeleteComment } from "@/lib/hooks/use-comments";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { Video, DEFAULT_INSTRUCTOR } from "@/lib/types";
import { VideoPlayer } from "./Video-player";
import { CommentList } from "@/components/comments/comment-list";
import { CommentForm } from "@/components/comments/comment-form";

export function VideoWatchView({ video }: { video: Video }) {
    const { user } = useCurrentUser();
    const { data: allComments, isLoading } = useAllComments();
    const createComment = useCreateComment();
    const deleteComment = useDeleteComment();

    const comments = (allComments ?? []).filter((c) => c.videoId === video.id);

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
            <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl} />
            <h1 className="mt-4 font-display text-2xl font-bold text-ink">{video.title}</h1>
            <p className="mt-1 text-sm text-slate">{DEFAULT_INSTRUCTOR}</p>
            <p className="mt-3 text-slate">{video.description}</p>
            <hr className="my-6 border-line" />
            <h2 className="mb-4 font-display text-lg font-semibold text-ink">Comments ({comments.length})</h2>
            <CommentForm onSubmit={(content) => createComment.mutate({ videoId: video.id, content })} />
            <div className="mt-6">
                {isLoading ? (
                    <p className="text-sm text-slate">Loading comments…</p>
                ) : (
                    <CommentList
                        comments={comments}
                        currentUserId={user?.id}
                        onDelete={(id) => deleteComment.mutate(id)}
                    />
                )}
            </div>
        </div>
    );
}