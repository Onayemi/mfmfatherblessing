import React from "react";
import MainLayout from "@/layouts/main-layout";

const SERVICES = [
    {
        title: "Flight Booking & Ticketing",
        icon: "✈️",
        description:
            "Instant search, seat selection, and automated ticket issuance across 450+ airlines.",
    },
    {
        title: "Hotel Reservations",
        icon: "🏨",
        description:
            "Curated accommodations worldwide ranging from 5-star resorts to boutique budget stays.",
    },
    {
        title: "Visa Assistance",
        icon: "🛂",
        description:
            "Expert guidance on entry requirements, documentation, and interview preparations.",
    },
    {
        title: "Airport Transfers",
        icon: "🚗",
        description:
            "Reliable airport pickups and private chauffeur services in major cities.",
    },
];

export default function Services() {
    return (
        <MainLayout
            title="Our Services"
            description="Explore our range of travel solutions including flight bookings, hotel reservations, and visa consultations."
        >
            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#5a0b4d] to-[#3a0632] text-white text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Comprehensive Travel Solutions
                    </h1>
                    <p className="text-slate-200 text-lg font-light max-w-2xl mx-auto">
                        From flight ticketing to full-scale logistics, we handle
                        every detail.
                    </p>
                </div>
            </div>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SERVICES.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 hover:shadow-lg transition"
                        >
                            <div className="text-4xl">{service.icon}</div>
                            <h3 className="text-lg font-bold text-slate-900">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}
