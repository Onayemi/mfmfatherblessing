import MainLayout from "@/layouts/main-layout";
import { Link } from "@inertiajs/react";

export default function NotFound() {
    return (
        <MainLayout
            title="Contact Us"
            description="Explore our range of travel solutions including flight bookings, hotel reservations, and visa consultations."
        >
            <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#5a0b4d] to-[#3a0632] text-white text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Connecting You to the Scenery of the World
                    </h1>
                    <p className="text-slate-200 text-lg font-light max-w-2xl mx-auto">
                        Àjàlá.ng was founded to redefine how travelers explore
                        domestic and international destinations with speed,
                        trust, and simplicity.
                    </p>
                </div>
            </div>
            
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4">
                <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6 text-center max-w-md">
                    Sorry, the page you are looking for doesn't exist or has
                    been moved.
                </p>
                <Link
                    href="/"
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Back to Home
                </Link>
            </div>
        </MainLayout>
    );
}
