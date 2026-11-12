import React, { useState } from "react";

// Reusable Footer Links Configuration
const FOOTER_LINKS = [
    {
        title: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Careers", href: "#careers" },
            { label: "Press & Media", href: "#press" },
            { label: "Blog & Travel News", href: "#blog" },
        ],
    },
    {
        title: "Services",
        links: [
            { label: "Flight Booking", href: "#flight-booking" },
            { label: "Hotel Reservations", href: "#hotel-reservations" },
            { label: "Visa Assistance", href: "#visa-assistance" },
            { label: "Airport Transfers", href: "#car-rentals" },
        ],
    },
    {
        title: "Support & Legal",
        links: [
            { label: "Help Center & FAQs", href: "#faq" },
            { label: "Terms & Conditions", href: "#terms" },
            { label: "Privacy Policy", href: "#privacy" },
            { label: "Refund Policy", href: "#refunds" },
        ],
    },
];

// 4 Social Icons (Facebook, Twitter/X, Instagram, LinkedIn)
const SOCIAL_ICONS = [
    {
        name: "Facebook",
        href: "https://facebook.com",
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
    {
        name: "Twitter",
        href: "https://twitter.com",
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        name: "Instagram",
        href: "https://instagram.com",
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com",
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
        ),
    },
];

export default function Footer() {
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (newsletterEmail) {
            setIsSubscribed(true);
            setNewsletterEmail("");
        }
    };

    return (
        <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
            {/* Top Newsletter Banner */}
            <div className="bg-[#5a0b4d] text-white py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold tracking-tight">
                            Get Exclusive Flight Deals & Travel Tips
                        </h3>
                        <p className="text-slate-200 text-sm mt-1">
                            Subscribe to our newsletter and save up to 30% on
                            your next trip.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubscribe}
                        className="w-full md:w-auto flex flex-col sm:flex-row gap-2 max-w-md"
                    >
                        <input
                            type="email"
                            required
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="px-4 py-3 rounded-xl bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 w-full md:w-72"
                        />
                        <button
                            type="submit"
                            className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-xl text-sm transition shadow-md whitespace-nowrap"
                        >
                            {isSubscribed ? "Subscribed! ✓" : "Subscribe"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Footer Links Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand Info & Address (Spans 2 columns on lg) */}
                    <div className="lg:col-span-2 space-y-4">
                        <a
                            href="/"
                            className="text-3xl font-bold italic tracking-tighter text-white inline-block"
                        >
                            PastorBlessing
                        </a>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            Your trusted travel partner for seamless flight
                            bookings, hotels, and vacation packages worldwide.
                            Explore the vast scenery of the world with us.
                        </p>

                        <div className="text-xs text-slate-400 space-y-1.5 pt-2">
                            <p>
                                📍 12 Victoria Island Expressway, Lagos, Nigeria
                            </p>
                            <p>📞 Support line: +234 (0) 800 000 0000</p>
                            <p>✉️ Email: support@ajala.ng</p>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {FOOTER_LINKS.map((section) => (
                        <div key={section.title} className="space-y-3">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                                {section.title}
                            </h4>
                            <ul className="space-y-2 text-xs">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="hover:text-amber-400 transition"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 mt-12 pt-8"></div>

                {/* Bottom Footer Bar: Payment Badges & Social Links */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Copyright Notice */}
                    <div className="text-xs text-slate-400 text-center md:text-left">
                        © {new Date().getFullYear()} Àjàlá.ng Technologies Ltd.
                        All rights reserved.
                    </div>

                    {/* Payment Gateways & Cards */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <span className="text-xs text-slate-400 font-medium">
                            Secured Payment by:
                        </span>
                        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                            {/* Paystack Badge */}
                            <span className="text-xs font-bold text-emerald-400 tracking-wider">
                                Paystack
                            </span>
                            <span className="text-slate-600">|</span>
                            {/* Visa */}
                            <span className="text-xs font-black italic text-blue-400">
                                VISA
                            </span>
                            {/* Mastercard */}
                            <div className="flex -space-x-1 items-center">
                                <div className="w-3.5 h-3.5 bg-red-500 rounded-full opacity-90"></div>
                                <div className="w-3.5 h-3.5 bg-amber-400 rounded-full opacity-90"></div>
                            </div>
                            {/* Verve Badge */}
                            <span className="text-xs font-bold text-teal-400 italic">
                                Verve
                            </span>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex items-center gap-3 text-slate-400">
                        {SOCIAL_ICONS.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={social.name}
                                className="hover:text-amber-400 transition p-1.5 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700"
                            >
                                {social.svg}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
