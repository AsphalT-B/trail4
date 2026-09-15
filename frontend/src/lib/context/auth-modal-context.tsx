"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AuthMode = "login" | "signup";

interface AuthModalContextValue {
    isOpen: boolean;
    mode: AuthMode;
    redirectTo: string | null;
    openAuthModal: (mode?: AuthMode, redirectTo?: string) => void;
    closeAuthModal: () => void;
    switchMode: (mode: AuthMode) => void;
}

const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<AuthMode>("signup");
    const [redirectTo, setRedirectTo] = useState<string | null>(null);

    const openAuthModal = (initialMode: AuthMode = "signup", redirect?: string) => {
        setMode(initialMode);
        setRedirectTo(redirect ?? null);
        setIsOpen(true);
    };

    const closeAuthModal = () => {
        setIsOpen(false);
        setRedirectTo(null);
    };

    return (
        <AuthModalContext.Provider
            value={{ isOpen, mode, redirectTo, openAuthModal, closeAuthModal, switchMode: setMode }}
        >
            {children}
        </AuthModalContext.Provider>
    );
}

export function useAuthModal() {
    const context = useContext(AuthModalContext);
    if (!context) throw new Error("useAuthModal must be used within an AuthModalProvider");
    return context;
}