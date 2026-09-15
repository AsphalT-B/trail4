"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

export function AuthModal() {
    const { isOpen, mode, redirectTo, closeAuthModal, switchMode } = useAuthModal();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            if (mode === "signup") {
                const { error: signUpError } = await authClient.signUp.email({ name, email, password });
                if (signUpError) throw new Error(signUpError.message);
                toast.success(`Welcome, ${name}!`);
            } else {
                const { error: signInError } = await authClient.signIn.email({ email, password });
                if (signInError) throw new Error(signInError.message);
                toast.success("Welcome back!");
            }
            closeAuthModal();
            if (redirectTo) router.push(redirectTo);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleClick = () => {
        const callbackURL = redirectTo ? `${window.location.origin}${redirectTo}` : window.location.href;
        authClient.signIn.social({ provider: "google", callbackURL });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={closeAuthModal}>
            <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold">{mode === "signup" ? "Sign up" : "Log in"}</h2>
                    <button onClick={closeAuthModal} className="text-gray-500 hover:text-black">✕</button>
                </div>

                <button onClick={handleGoogleClick} className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50">
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
                        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" />
                        <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" />
                        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z" />
                    </svg>
                    Continue with Google
                </button>

                <div className="my-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-400">or continue with email</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {mode === "signup" && (
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full name" required className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
                    )}
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
                    <button type="submit" disabled={isSubmitting} className="mt-2 rounded-md bg-primary py-2 text-sm font-medium text-white disabled:opacity-50">
                        {isSubmitting ? "Please wait…" : mode === "signup" ? "Sign up" : "Log in"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    {mode === "signup" ? (
                        <>Already have an account?{" "}
                            <button onClick={() => switchMode("login")} className="font-medium text-primary hover:underline">Log in</button>
                        </>
                    ) : (
                        <>New here?{" "}
                            <button onClick={() => switchMode("signup")} className="font-medium text-primary hover:underline">Sign up</button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}