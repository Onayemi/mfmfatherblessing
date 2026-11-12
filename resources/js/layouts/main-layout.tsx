import type { ReactNode } from "react";
import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";
import SEO from "@/components/nav/seo";

interface MainLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
}

export default function MainLayout({
    children,
    title,
    description,
}: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
            {/* Dynamic Reusable SEO Head */}
            <SEO title={title} description={description} />

            {/* Navbar */}
            <Navbar />

            {/* Main Page Body */}
            <main className="grow">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
