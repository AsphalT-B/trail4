import { WatchHistoryEntry } from "@/lib/types";

// Still mocked — no watch-history endpoint exists on the backend yet.
export const mockWatchHistory: WatchHistoryEntry[] = [
    { videoId: "1", watchedAt: "2026-03-01T09:00:00.000Z" },
    { videoId: "2", watchedAt: "2026-02-27T14:20:00.000Z" },
];