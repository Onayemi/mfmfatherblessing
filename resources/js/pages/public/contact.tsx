import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageCircle,
    Navigation,
    Building2,
} from "lucide-react";
import React from "react";
import MainLayout from "@/layouts/main-layout";
import SEO from "@/components/nav/seo";

export default function ContactPage() {
    // Configuration details
    const contactInfo = {
        companyName: "MGE Solutions Ltd",
        address:
            "Cherub Mall, Suite B22 KM 18 Lekki-Epe Express Way By New Road Bus Stop LEKKI",
        cityState: "Lagos, Nigeria",
        phone: "2348142316400",
        whatsapp: "2348142316400",
        email: "support@mgesolutionsltd.com",
        hours: [
            { days: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
            { days: "Saturday", time: "9:00 AM – 2:00 PM" },
            { days: "Sunday & Public Holidays", time: "Closed" },
        ],
        // Embed URL for Google Maps
        mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.641314133919!2d3.523643773116777!3d6.440087324130945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf6f665329c8b%3A0x557f7c5053d54371!2sCherub%20Shopping%20Mall!5e0!3m2!1sen!2sng!4v1789054526562!5m2!1sen!2sng",
        googleMapsDirectionsUrl:
            "https://maps.google.com/?q=Lekki+Ajah+Victoria+Island+Lagos+Nigeria",
    };

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

            {/* <Topbar
                title="Contact Us"
            /> */}

            <div className="flex min-h-screen flex-col justify-between bg-slate-50">
                {/* Top Container: Info Cards */}
                <div className="px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl space-y-10">
                        {/* Header */}
                        <div className="mx-auto max-w-2xl space-y-3 text-center">
                            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-700/10 ring-inset">
                                Get In Touch
                            </span>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Contact Our Team
                            </h1>
                            <p className="text-sm text-slate-600 sm:text-base">
                                Have questions or need assistance? Reach out to
                                us through any of our channels or visit our
                                office.
                            </p>
                        </div>

                        {/* 3-Column Info Cards */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {/* Office Location */}
                            <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                            <Building2 className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-slate-900">
                                                Headquarters
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                {contactInfo.companyName}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 text-sm text-slate-600">
                                        <div className="flex items-start gap-2">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                                            <div>
                                                <p>{contactInfo.address}</p>
                                                <p>{contactInfo.cityState}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href={contactInfo.googleMapsDirectionsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                                >
                                    <Navigation className="h-4 w-4 text-indigo-600" />
                                    Get Directions
                                </a>
                            </div>

                            {/* Communication Channels */}
                            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="border-b border-slate-100 pb-3 text-base font-semibold text-slate-900">
                                    Direct Communication
                                </h3>

                                <div className="space-y-2.5">
                                    <a
                                        href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                                        className="flex items-center justify-between rounded-xl border border-slate-100 p-2.5 text-sm transition hover:border-indigo-200 hover:bg-indigo-50/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                <Phone className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-medium text-slate-500">
                                                    Phone
                                                </p>
                                                <p className="text-xs font-semibold text-slate-800">
                                                    {contactInfo.phone}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-indigo-600">
                                            Call
                                        </span>
                                    </a>

                                    <a
                                        href={`https://wa.me/${contactInfo.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between rounded-xl border border-slate-100 p-2.5 text-sm transition hover:border-emerald-200 hover:bg-emerald-50/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                                <MessageCircle className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-medium text-slate-500">
                                                    WhatsApp
                                                </p>
                                                <p className="text-xs font-semibold text-slate-800">
                                                    Instant Chat
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-emerald-600">
                                            Message
                                        </span>
                                    </a>

                                    <a
                                        href={`mailto:${contactInfo.email}`}
                                        className="flex items-center justify-between rounded-xl border border-slate-100 p-2.5 text-sm transition hover:border-indigo-200 hover:bg-indigo-50/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-medium text-slate-500">
                                                    Email Support
                                                </p>
                                                <p className="text-xs font-semibold break-all text-slate-800">
                                                    {contactInfo.email}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-indigo-600">
                                            Send
                                        </span>
                                    </a>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-base font-semibold text-slate-900">
                                        Business Hours
                                    </h3>
                                </div>

                                <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                                    {contactInfo.hours.map((schedule, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between py-2"
                                        >
                                            <span className="font-medium text-slate-600">
                                                {schedule.days}
                                            </span>
                                            <span className="font-semibold text-slate-900">
                                                {schedule.time}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Full-Width Google Map Section */}
                <div className="relative h-[450px] w-full border-t border-slate-200 bg-slate-200 lg:h-[550px]">
                    <iframe
                        title="Office Location Map"
                        src={contactInfo.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-full w-full grayscale-[20%] transition-all duration-300 hover:grayscale-0"
                    />
                </div>
            </div>
        </MainLayout>
    );
}
