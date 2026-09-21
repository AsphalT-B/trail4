"use client";

import Link from "next/link";
import { Play, Sparkles, Award, Code2, BookOpen } from "lucide-react";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { Video, DEFAULT_INSTRUCTOR } from "@/lib/types";


export function Hero({ featuredVideo }: { featuredVideo?: Video }) {
    const { openAuthModal } = useAuthModal();
    const { user } = useCurrentUser();

    return (
        <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-indigo-50 to-white">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-12 sm:px-6 sm:pb-16 md:grid-cols-2 md:pt-24 md:pb-20">
                <div className="animate-fade-in">
                    {user ? (
                        <>
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <Sparkles className="h-3.5 w-3.5" /> Welcome back
                            </span>
                            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
                                Good to see you, {user.name.split(" ")[0]}.
                            </h1>
                            <p className="mt-4 max-w-md text-slate">
                                Pick up where you left off, or see what&apos;s new since your last visit.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link href="/dashboard" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark">
                                    Go to my dashboard
                                </Link>
                                <a href="#courses" className="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary">
                                    Browse courses
                                </a>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                <Sparkles className="h-3.5 w-3.5" /> New courses every week
                            </span>
                            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
                                Learn skills that actually move your career.
                            </h1>
                            <p className="mt-4 max-w-md text-slate">
                                A hand-picked set of project-based video courses — no fluff, no filler, just the skills that get you hired.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <button onClick={() => openAuthModal("signup")} className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark">
                                    Get started free
                                </button>
                                <a href="#courses" className="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary">
                                    Browse courses
                                </a>
                            </div>
                        </>
                    )}
                </div>

                <div className="mx-auto flex w-full max-w-xs flex-col items-center sm:max-w-sm">
                    <div className="relative h-40 w-full sm:h-52">
                        <div className="absolute inset-x-6 inset-y-2 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
                        <div className="animate-float absolute left-4 top-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/30 sm:h-20 sm:w-20">
                            <Code2 className="h-7 w-7 sm:h-9 sm:w-9" />
                        </div>
                        <div className="animate-float-reverse absolute right-2 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-xl shadow-accent/30 sm:h-16 sm:w-16">
                            <Award className="h-6 w-6 sm:h-7 sm:w-7" />
                        </div>
                        <div className="animate-float absolute bottom-0 left-16 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-primary shadow-xl [animation-delay:1.2s] sm:left-20 sm:h-20 sm:w-20">
                            <BookOpen className="h-7 w-7 sm:h-9 sm:w-9" />
                        </div>
                        <div className="animate-float-reverse absolute bottom-2 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-xl [animation-delay:0.6s] sm:h-14 sm:w-14">
                            <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                        </div>
                    </div>

                    {featuredVideo && (
                        <div className="-mt-2 w-full rounded-2xl border border-line bg-white p-4 text-center shadow-2xl">
                            <p className="text-xs text-slate">Featured course</p>
                            <p className="mt-1 line-clamp-1 font-display font-semibold text-ink">{featuredVideo.title}</p>
                            <p className="text-xs text-slate">{DEFAULT_INSTRUCTOR}</p>
                            
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}