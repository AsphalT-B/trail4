import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeContent } from "@/components/home/home-content";
import { AnnouncementBar } from "@/components/home/announcement-bar";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <HomeContent />
      <Footer />
    </>
  );
}