// src/app/blog/[id]/page.tsx — server component, just extracts the id
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogDetailView } from "@/components/blog/blog-detail-view";


export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            <Navbar />
            <BlogDetailView blogId={id} />
            <Footer />
        </>
    );
}