import { Blog } from "@/lib/types";
import { BlogCard } from "./blog-card";

export function BlogGrid({ blogs }: { blogs: Blog[] }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
    );
}