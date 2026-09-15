export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  createdAt: string;
}

// Client-side-only display extras — the backend model doesn't have these,
// so they're static placeholders, not real per-video data.
export const DEFAULT_INSTRUCTOR = "EduNovia Instructor";
export const DEFAULT_DURATION_LABEL = "Self-paced";
export const DEFAULT_RATING = 4.8;
export const DEFAULT_RATING_COUNT = 0;

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface WatchHistoryEntry {
  videoId: string;
  watchedAt: string;
}