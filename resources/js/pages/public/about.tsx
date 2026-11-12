import React from "react";
import MainLayout from "@/layouts/main-layout";

const STATS = [
    { label: "Happy Travelers", value: "150,000+" },
    { label: "Partner Airlines", value: "450+" },
    { label: "Destinations Covered", value: "1,200+" },
    { label: "Customer Satisfaction", value: "99.2%" },
];

export default function About() {
    return (
        <MainLayout
            title="About Us"
            description="Discover the story and mission behind Àjàlá.ng, your premier travel partner."
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 grid grid-cols-2 lg:grid-cols-4 p-6 sm:p-8">
                    {STATS.map((stat, idx) => (
                        <div key={idx} className="text-center py-4 px-2">
                            <div className="text-3xl font-extrabold text-[#5a0b4d]">
                                {stat.value}
                            </div>
                            <div className="text-xs font-medium text-slate-500 mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#5a0b4d] bg-[#5a0b4d]/10 px-3 py-1 rounded-full">
                            Our Story
                        </span>
                        <h2 className="text-3xl font-bold text-slate-900 leading-snug">
                            Inspired by Legendary Explorers, Built for Modern
                            Journeys
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Named in honor of the iconic Nigerian globetrotter,
                            Àjàlá.ng embodies the spirit of boundless curiosity
                            and adventure. We believe booking a flight or
                            planning a vacation should be as effortless as
                            dreaming about it.
                        </p>
                    </div>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"
                            alt="Travel"
                            className="rounded-2xl shadow-2xl object-cover w-full h-[350px]"
                        />
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
