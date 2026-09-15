import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VideoGridSection } from "@/components/video/Video-grid-section";

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold">All courses</h1>
        <p className="mt-2 text-gray-600">Browse everything available on EduNovia.</p>
        <div className="mt-8">
          <VideoGridSection variant="all" />
        </div>
      </main>
      <Footer />
    </>
  );
}