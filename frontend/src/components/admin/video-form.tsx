"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Video } from "@/lib/types";
import { useCreateVideo, useUpdateVideo } from "@/lib/hooks/use-video";
import { uploadFile } from "@/lib/api/uploads";
import { Film, ImagePlus } from "lucide-react";

interface VideoFormProps {
  initialVideo?: Video;
}

export function VideoForm({ initialVideo }: VideoFormProps) {
  const router = useRouter();
  const createVideo = useCreateVideo();
  const updateVideo = useUpdateVideo();

  const [title, setTitle] = useState(initialVideo?.title ?? "");
  const [description, setDescription] = useState(
    initialVideo?.description ?? "",
  );
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(
    initialVideo?.thumbnailUrl ?? "",
  );
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const isEditing = !!initialVideo;
  const isSaving =
    createVideo.isPending || updateVideo.isPending || isUploading;

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    const submit = async () => {
      const thumbnailUrl = thumbnailFile
        ? await uploadFile(thumbnailFile)
        : (initialVideo?.thumbnailUrl ?? "");
      const videoUrl = videoFile
        ? await uploadFile(videoFile)
        : (initialVideo?.videoUrl ?? "");
      const payload = { title, description, thumbnailUrl, videoUrl };

      if (isEditing) {
        await updateVideo.mutateAsync({ id: initialVideo.id, input: payload });
      } else {
        await createVideo.mutateAsync(payload);
      }
    };

    try {
      await toast.promise(submit(), {
        loading: videoFile ? "Uploading video…" : "Saving…",
        success: isEditing ? "Video updated" : "Video added",
        error: "Something went wrong. Try again.",
      });
      router.push("/");
    } catch {
      // toast.promise already showed the error toast
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-xl flex-col gap-5 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="w-full rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Thumbnail
        </label>
        {thumbnailPreview && (
          <div className="mb-2 aspect-video w-48 overflow-hidden rounded-xl border border-line bg-ink/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition hover:border-primary hover:text-primary">
          <ImagePlus className="h-4 w-4" />
          Choose image
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="hidden"
          />
        </label>
        {thumbnailFile && (
          <p className="mt-1.5 text-xs text-slate">{thumbnailFile.name}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Video file
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition hover:border-primary hover:text-primary">
          <Film className="h-4 w-4" />
          Choose video
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
            className="hidden"
          />
        </label>
        {videoFile && (
          <p className="mt-1.5 text-xs text-slate">{videoFile.name}</p>
        )}
        {!videoFile && isEditing && (
          <p className="mt-1.5 text-xs text-slate">
            Leave empty to keep the existing video file.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="mt-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
      >
        {isSaving ? "Saving…" : isEditing ? "Save changes" : "Add video"}
      </button>
    </form>
  );
}
