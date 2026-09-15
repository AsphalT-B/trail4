import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VideoForm } from "@/components/admin/video-form";
import { fetchVideoById } from "@/lib/api/videos";

export default async function EditVideoPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const video = await fetchVideoById(id);

    if (!video) notFound();

    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
                <h1 className="mb-6 text-2xl font-bold">Edit video</h1>
                <VideoForm initialVideo={video} />
            </main>
            <Footer />
        </>
    );
}