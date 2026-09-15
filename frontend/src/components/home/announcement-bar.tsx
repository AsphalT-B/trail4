"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAuthModal } from "@/lib/context/auth-modal-context";

export function AnnouncementBar() {
    const [visible, setVisible] = useState(true);
    const { openAuthModal } = useAuthModal();

    if (!visible) return null;

    return (
        <div className="flex items-center justify-center gap-3 bg-primary px-4 py-2 text-center text-xs text-white sm:text-sm">
            <p>
                New here?{" "}
                <button onClick={() => openAuthModal("signup")} className="font-semibold underline underline-offset-2">
                    Create a free account
                </button>{" "}
                and start watching today.
            </p>
            <button onClick={() => setVisible(false)} aria-label="Dismiss" className="shrink-0">
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}