"use client";

import { useVideo } from "@/lib/hooks/use-video";
import {
  useAllComments,
  useCreateComment,
  useDeleteComment,
} from "@/lib/hooks/use-comments";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { DEFAULT_INSTRUCTOR } from "@/lib/types";
import { VideoPlayer } from "./Video-player";
import { CommentList } from "@/components/comments/comment-list";
import { CommentForm } from "@/components/comments/comment-form";

export function VideoWatchView({ videoId }: { videoId: string }) {
  const { user, isLoading: userLoading } = useCurrentUser();
  const { openAuthModal } = useAuthModal();
  const {
    data: video,
    isLoading: videoLoading,
    isError: videoError,
  } = useVideo(videoId);
  const { data: allComments, isLoading: commentsLoading } = useAllComments();
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment();

  if (userLoading || videoLoading) {
    return (
      <p className="mx-auto max-w-4xl px-4 py-16 text-sm text-slate">
        Loading…
      </p>
    );
  }

  if (videoError || !video) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-xl font-bold text-ink">
          Video not found
        </h1>
        <p className="mt-2 text-slate">This video may have been removed.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-xl font-bold text-ink">
          Log in to watch this video
        </h1>
        <p className="mt-2 text-slate">
          Create a free account or log in to continue.
        </p>
        <button
          onClick={() => openAuthModal("signup", `/videos/${video.id}`)}
          className="mt-6 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          Log in
        </button>
      </div>
    );
  }

  const comments = (allComments ?? []).filter((c) => c.videoId === video.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl} />
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">
        {video.title}
      </h1>
      <p className="mt-1 text-sm text-slate">{DEFAULT_INSTRUCTOR}</p>
      <p className="mt-3 text-slate">{video.description}</p>
      <hr className="my-6 border-line" />
      <h2 className="mb-4 font-display text-lg font-semibold text-ink">
        Comments ({comments.length})
      </h2>
      <CommentForm
        onSubmit={(content) =>
          createComment.mutate({ videoId: video.id, content })
        }
      />
      <div className="mt-6">
        {commentsLoading ? (
          <p className="text-sm text-slate">Loading comments…</p>
        ) : (
          <CommentList
            comments={comments}
            currentUserId={user.id}
            onDelete={(id) => deleteComment.mutate(id)}
          />
        )}
      </div>
    </div>
  );
}
