"use client";

import { authClient } from "@/lib/auth/auth-client";

export function useCurrentUser() {
    const { data: session, isPending } = authClient.useSession();

    return {
        user: session?.user
            ? {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role ?? "user",
            }
            : null,
        isLoading: isPending,
    };
}