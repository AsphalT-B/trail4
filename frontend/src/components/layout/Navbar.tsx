"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { authClient } from "@/lib/auth/auth-client";

export function Navbar() {
    const { openAuthModal } = useAuthModal();
    const { user } = useCurrentUser();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="border-b border-line">
            <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
                <Link href="/" className="font-display text-xl text-ink">Edu<span className="font-display text-xl text-blue-600">Novia</span></Link>

                <div className="hidden flex-1 max-w-sm items-center gap-2 border-b border-line py-1 md:flex">
                    <Search className="h-4 w-4 text-slate" />
                    <input type="text" placeholder="Search for anything" className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-slate" />
                </div>

                <nav className="ml-auto hidden items-center gap-6 text-sm md:flex">
                    <Link href="/courses" className="text-ink hover:text-brass">Courses</Link>
                    {user ? (
                        <>
                            <Link href="/dashboard" className="text-ink hover:text-brass">My learning</Link>
                            {user.role === "admin" && (
                                <Link href="/admin" className="text-ink hover:text-brass">Admin</Link>
                            )}
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-medium text-paper">
                                {user.name.charAt(0)}
                            </span>
                            <button onClick={() => authClient.signOut()} className="text-slate hover:text-ink">Log out</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => openAuthModal("login")} className="text-ink hover:text-brass">Log in</button>
                            <button onClick={() => openAuthModal("signup")} className="border-b-2 border-brass pb-0.5 font-medium text-ink">Sign up</button>
                        </>
                    )}
                </nav>

                <button onClick={() => setMobileOpen((p) => !p)} className="ml-auto text-ink md:hidden" aria-label="Toggle menu">
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {mobileOpen && (
                <div className="flex flex-col gap-4 border-t border-line px-4 py-4 text-sm md:hidden">
                    <Link href="/courses" className="text-ink">Courses</Link>
                    {user ? (
                        <>
                            <Link href="/dashboard" className="text-ink">My learning</Link>
                            <button onClick={() => authClient.signOut()} className="text-left text-slate">Log out</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => openAuthModal("login")} className="text-left text-ink">Log in</button>
                            <button onClick={() => openAuthModal("signup")} className="text-left font-medium text-ink">Sign up</button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}