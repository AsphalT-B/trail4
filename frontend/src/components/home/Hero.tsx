"use client";

import { Play, Sparkles, Award, Code2, BookOpen } from "lucide-react";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { Video, DEFAULT_INSTRUCTOR } from "@/lib/types";

export function Hero({ featuredVideo }: { featuredVideo?: Video }) {
    const { openAuthModal } = useAuthModal();

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
                <div className="animate-fade-in">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <Sparkles className="h-3.5 w-3.5" /> New courses every week
                    </span>
                    <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
                        Learn skills that actually move your career.
                    </h1>
                    <p className="mt-4 max-w-md text-slate">
                        A hand-picked set of project-based video courses — no fluff,
                        no filler, just the skills that get you hired.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <button onClick={() => openAuthModal("signup")} className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark">
                            Get started free
                        </button>
                        <a href="#courses" className="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary">
                            Browse courses
                        </a>
                    </div>
                </div>

                <div className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80">
                    <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />

                    <div className="animate-float absolute left-2 top-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/30">
                        <Code2 className="h-9 w-9" />
                    </div>
                    <div className="animate-float-reverse absolute right-0 top-16 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-xl shadow-accent/30">
                        <Award className="h-7 w-7" />
                    </div>
                    <div className="animate-float absolute bottom-8 left-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-primary shadow-xl [animation-delay:1.2s]">
                        <BookOpen className="h-10 w-10" />
                    </div>
                    <div className="animate-float-reverse absolute bottom-0 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-xl [animation-delay:0.6s]">
                        <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
                    </div>

                    {featuredVideo && (
                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-2xl border border-line bg-white/90 p-4 text-center shadow-2xl backdrop-blur">
                            <p className="text-xs text-slate">Featured</p>
                            <p className="mt-1 line-clamp-1 font-display font-semibold text-ink">{featuredVideo.title}</p>
                            <p className="text-xs text-slate">{DEFAULT_INSTRUCTOR}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}