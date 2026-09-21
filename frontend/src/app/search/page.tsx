import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchResults } from "@/components/search/search-results";


export default function SearchPage() {
    return (
        <>
            <Navbar />
            <Suspense fallback={<p className="mx-auto max-w-6xl px-4 py-16 text-sm text-slate">Loading…</p>}>
                <SearchResults
                 />
            </Suspense>
            <Footer />
        </>
    );
}