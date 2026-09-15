"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Video } from "@/lib/types";
import { useDeleteVideo } from "@/lib/hooks/use-video";

export function AdminVideoTable({ videos }: { videos: Video[] }) {
  const deleteVideo = useDeleteVideo();

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete "${title}"? This can't be undone.`)) {
      deleteVideo.mutate(id);
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line bg-ink/5">
          <tr>
            <th className="px-4 py-3 font-medium text-ink">Title</th>
            <th className="px-4 py-3 font-medium text-ink">Description</th>
            <th className="px-4 py-3 font-medium text-ink text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3 font-medium text-ink">{video.title}</td>
              <td className="max-w-xs truncate px-4 py-3 text-slate">{video.description}</td>
              <td className="px-4 py-3 text-right">
                <Link href={`/admin/videos/${video.id}/edit`} className="mr-4 inline-flex items-center gap-1 text-primary hover:text-primary-dark">
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Link>
                <button onClick={() => handleDelete(video.id, video.title)} disabled={deleteVideo.isPending} className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 disabled:opacity-50">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}