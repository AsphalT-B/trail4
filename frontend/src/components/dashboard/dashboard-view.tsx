"use client";

import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { useAllVideos } from "@/lib/hooks/use-video";
import { useAllComments, useDeleteComment } from "@/lib/hooks/use-comments";

import { mockWatchHistory } from "@/lib/mock-data/current-user";
import { RecentlyWatched } from "@/components/dashboard/recently-watched";
import { MyComments } from "@/components/dashboard/my-comments";

export function DashboardView() {
    const { user } = useCurrentUser();
    const { openAuthModal } = useAuthModal();
    const { data: videos, isLoading: videosLoading } = useAllVideos();
    const { data: allComments, isLoading: commentsLoading } = useAllComments();
    const deleteComment = useDeleteComment();

    if (!user) {
        return (
            <div className="mx-auto max-w-md px-4 py-20 text-center">
                <h1 className="font-display text-xl font-bold text-ink">You need to be logged in</h1>
                <p className="mt-2 text-slate">Log in to see your dashboard.</p>
                <button onClick={() => openAuthModal("login")} className="mt-6 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
                    Log in
                </button>
            </div>
        );
    }

    if (videosLoading || commentsLoading || !videos) {
        return <p className="mx-auto max-w-3xl px-4 py-10 text-sm text-slate">Loading your dashboard…</p>;
    }

    const myComments = (allComments ?? []).filter((c) => c.userId === user.id);

    return (
        <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <div className="flex items-center gap-4 border-b border-line pb-8">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white">
                    {user.name.charAt(0).toUpperCase()}
                </span>
                <div>
                    <p className="text-sm text-slate">Welcome back</p>
                    <h1 className="font-display text-2xl font-bold text-ink">{user.name}</h1>
                </div>
            </div>

            <section className="mt-10">
                <h2 className="font-display text-xl font-semibold text-ink">Recently watched</h2>
                <div className="mt-4">
                    <RecentlyWatched history={mockWatchHistory} videos={videos} />
                </div>
            </section>

            <section className="mt-12">
                <h2 className="font-display text-xl font-semibold text-ink">My comments</h2>
                <div className="mt-4">
                    <MyComments comments={myComments} videos={videos} onDelete={(id) => deleteComment.mutate(id)} />
                </div>
            </section>
        </main>
    );
}