import { Comment } from "@/lib/types";

export const mockComments: Comment[] = [
    {
        id: "c1",
        videoId: "1",
        userId: "u2",
        userName: "Daniel O.",
        content: "This course finally made React click for me. Great pacing!",
        createdAt: "2026-02-01T10:00:00.000Z",
    },
    {
        id: "c2",
        videoId: "1",
        userId: "u3",
        userName: "Amaka N.",
        content: "The Node section could use more real-world examples, but solid overall.",
        createdAt: "2026-02-03T15:30:00.000Z",
    },
    {
        id: "c3",
        videoId: "2",
        userId: "u1",
        userName: "Goodluck",
        content: "The NumPy section was exactly what I needed. Thanks!",
        createdAt: "2026-02-28T08:15:00.000Z",
    },
];