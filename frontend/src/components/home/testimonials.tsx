const TESTIMONIALS = [
    { name: "Ada O.", role: "Frontend Developer", quote: "The pacing was perfect — I finally understood how the pieces fit together instead of just copying code." },
    { name: "Miles T.", role: "Career Switcher", quote: "I went from zero to shipping a real project in a few weeks. Worth every minute." },
    { name: "Priya S.", role: "Product Designer", quote: "Short, focused, and actually practical. No filler content padding out the runtime." },
];

export function Testimonials() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-center font-display text-3xl font-bold text-ink">Learners are getting results</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {TESTIMONIALS.map((t) => (
                    <div key={t.name} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate">&ldquo;{t.quote}&rdquo;</p>
                        <div className="mt-4 flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                {t.name.charAt(0)}
                            </span>
                            <div>
                                <p className="text-sm font-medium text-ink">{t.name}</p>
                                <p className="text-xs text-slate">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}