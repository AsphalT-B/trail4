"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useAuthModal } from "@/lib/context/auth-modal-context";
import { useCurrentUser } from "@/lib/hooks/use-current-user";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const { openAuthModal } = useAuthModal();
  const { user } = useCurrentUser();

  if (!visible) return null;

  return (
    <div className="flex items-center justify-center gap-3 bg-primary px-4 py-2 text-center text-xs text-white sm:text-sm">
      {user ? (
        <p>
          New: written tutorials are live —{" "}
          <Link href="/blog" className="font-semibold underline underline-offset-2">
            check out the Blog
          </Link>
        </p>
      ) : (
        <p>
          New here?{" "}
          <button onClick={() => openAuthModal("signup")} className="font-semibold underline underline-offset-2">
            Create a free account
          </button>{" "}
          and start watching today.
        </p>
      )}
      <button onClick={() => setVisible(false)} aria-label="Dismiss" className="shrink-0">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}