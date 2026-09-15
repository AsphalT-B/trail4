"use client";

import { useRouter } from "next/navigation";
import { Play, Sparkles } from "lucide-react";
import { Video, DEFAULT_INSTRUCTOR } from "@/lib/types";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { useCurrentUser } from "@/lib/hooks/use-current-user";

const GRADIENTS = [
    "from-indigo-500 to-purple-500",
    "from-amber-400 to-pink-500",
    "from-emerald-400 to-cyan-500",
    "from-rose-400 to-orange-400",
    "from-sky-400 to-indigo-500",
    "from-fuchsia-500 to-indigo-500",
];

export function VideoCard({ video, index = 0 }: { video: Video; index?: number }) {
    const { openAuthModal } = useAuthModal();
    const { user } = useCurrentUser();
    const router = useRouter();
    const gradient = GRADIENTS[index % GRADIENTS.length];

    const handleWatchClick = () => {
        if (user) {
            router.push(`/videos/${video.id}`);
        } else {
            openAuthModal("signup", `/videos/${video.id}`);
        }
    };

    return (
        <div className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div
                className={`relative aspect-video overflow-hidden ${video.thumbnailUrl ? "bg-ink/5" : `bg-gradient-to-br ${gradient}`
                    }`}
            >
                {video.thumbnailUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={video.thumbnailUrl} alt={video.title} className="h-full w-full object-cover" />
                )}

                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-ink">
                    <Sparkles className="h-3 w-3 text-accent" /> New
                </span>

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg">
                        <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                    </span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="line-clamp-2 font-display font-semibold text-ink">{video.title}</h3>
                <p className="mt-1 text-sm text-slate">{DEFAULT_INSTRUCTOR}</p>
                <p className="mt-2 line-clamp-2 text-sm text-slate transition group-hover:line-clamp-none">
                    {video.description}
                </p>
                <button onClick={handleWatchClick} className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-white transition hover:bg-primary-dark">
                    Watch now
                </button>
            </div>
        </div>
    );
}