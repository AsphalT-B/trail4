import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminTabs } from "@/components/admin/admin-tabs";
import { AdminEditVideoView } from "@/components/admin/admin-edit-video-view";


export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <AdminTabs active="videos" />
        <h1 className="mb-6 mt-6 font-display text-2xl font-bold text-ink">Edit video</h1>
        <AdminEditVideoView videoId={id} />
      </main>
      <Footer />
    </>
  );
}