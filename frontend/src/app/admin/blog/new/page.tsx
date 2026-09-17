import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminTabs } from "@/components/admin/admin-tabs";
import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <AdminTabs active="blog" />
        <h1 className="mb-6 mt-6 font-display text-2xl font-bold text-ink">New post</h1>
        <BlogForm />
      </main>
      <Footer />
    </>
  );
}