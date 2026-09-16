import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminTabs } from "@/components/admin/admin-tabs";
import { AdminEditBlogView } from "@/components/admin/admin-edit-blog-view";


export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
                <AdminTabs active="blog" />
                <h1 className="mb-6 mt-6 font-display text-2xl font-bold text-ink">Edit post</h1>
                <AdminEditBlogView blogId={id} />
            </main>
            <Footer />
        </>
    );
}