"use client";

import { useAuthModal } from "@/lib/context/auth-modal-context";

export function CtaBanner() {
    const { openAuthModal } = useAuthModal();
    return (
        <section className="relative overflow-hidden bg-dark py-20 text-center text-white">
            <div className="animate-float absolute -left-10 top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
            <div className="animate-float-reverse absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative mx-auto max-w-2xl px-4">
                <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to learn something new?</h2>
                <p className="mt-3 text-white/70">Join today and start watching in minutes — no credit card required.</p>
                <button onClick={() => openAuthModal("signup")} className="mt-8 rounded-lg bg-white px-8 py-3 text-sm font-semibold text-ink transition hover:bg-white/90">
                    Create free account
                </button>
            </div>
        </section>
    );
}