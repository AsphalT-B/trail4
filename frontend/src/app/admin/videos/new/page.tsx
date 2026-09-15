import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VideoForm } from "@/components/admin/video-form";

export default function NewVideoPage() {
    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
                <h1 className="mb-6 text-2xl font-bold">Add video</h1>
                <VideoForm />
            </main>
            <Footer />
        </>
    );
}