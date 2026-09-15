import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VideoWatchView } from "@/components/video/video-watch-view";

export default async function VideoWatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Navbar />
      <VideoWatchView videoId={id} />
      <Footer />
    </>
  );
}
