import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default function DashboardPage() {
    return (
        <>
            <Navbar />
            <DashboardView />
            <Footer />
        </>
    );
}