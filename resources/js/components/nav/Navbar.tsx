import React, { useState, useEffect } from "react";

// Reusable menu items configuration
interface NavItem {
    label: string;
    href?: string;
    submenu?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
        label: "Services",
        submenu: [
            { label: "Services Booking", href: "/services" },
            { label: "Flight Booking", href: "#flight-booking" },
            { label: "Hotel Reservations", href: "#hotel-reservations" },
            { label: "Visa Assistance", href: "#visa-assistance" },
            { label: "Car Rentals", href: "#car-rentals" },
        ],
    },
    { label: "Contact", href: "/contact" },
];

// 4 Social icons configuration (Facebook, Twitter/X, Instagram, LinkedIn)
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

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Sticky Navigation Bar */}
            <header
                className={`fixed top-0 left-0 w-full z-40 shadow-lg transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/70 backdrop-blur-md shadow-sm text-slate-900 border-b border-slate-200/50"
                        : "bg-transparent text-white"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Left Side: Logo */}
                    <div className="flex items-center">
                        <a
                            href="/"
                            className="text-2xl font-bold italic tracking-tighter"
                        >
                            PastorBlessing
                        </a>
                    </div>

                    {/* Right Side: Desktop Nav & Social Icons */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Reusable Nav Items */}
                        <nav className="flex items-center gap-5 text-sm font-semibold">
                            {NAV_ITEMS.map((item) =>
                                item.submenu ? (
                                    <div
                                        key={item.label}
                                        className="relative"
                                        onMouseEnter={() =>
                                            setIsServicesOpen(true)
                                        }
                                        onMouseLeave={() =>
                                            setIsServicesOpen(false)
                                        }
                                    >
                                        <button
                                            className="flex items-center gap-1 hover:opacity-75 transition py-1"
                                            onClick={() =>
                                                setIsServicesOpen(
                                                    !isServicesOpen,
                                                )
                                            }
                                        >
                                            {item.label}
                                            <svg
                                                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                                    isServicesOpen
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        {isServicesOpen && (
                                            <div className="absolute right-0 top-full w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
                                                {item.submenu.map((sub) => (
                                                    <a
                                                        key={sub.label}
                                                        href={sub.href}
                                                        className="block px-4 py-2 text-xs font-medium hover:bg-slate-50 hover:text-[#5a0b4d]"
                                                    >
                                                        {sub.label}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="hover:opacity-75 transition"
                                    >
                                        {item.label}
                                    </a>
                                ),
                            )}
                        </nav>

                        {/* Divider */}
                        <div
                            className={`w-[1px] h-4 ${isScrolled ? "bg-slate-300" : "bg-white/40"}`}
                        ></div>

                        {/* Social Icons (Desktop) */}
                        <div className="flex items-center gap-3">
                            {SOCIAL_ICONS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={social.name}
                                    className="hover:opacity-75 transition p-1"
                                >
                                    {social.svg}
                                </a>
                            ))}
                        </div>

                        {/* Action CTA */}
                        <a
                            href="/login"
                            className="bg-[#5a0b4d] hover:bg-[#430538] text-white px-4 py-2 rounded-full text-xs font-semibold transition shadow-md"
                        >
                            Book Now
                        </a>
                    </div>

                    {/* Right Side: Mobile Hamburger Icon */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open Menu"
                            className="p-1 rounded-lg focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sheet Overlay (Dark Dimmed Backdrop) */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
                    isMobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Sheet Drawer (Black Background with White Text) */}
            <aside
                className={`fixed top-0 right-0 w-[260px] h-full bg-black text-white z-50 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between border-l border-neutral-800 ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-5">
                    {/* Header in Mobile Sheet */}
                    <div className="flex justify-between items-center pb-4 border-b border-neutral-800">
                        <span className="text-xl font-bold italic tracking-tighter text-white">
                            PastorBlessing
                        </span>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close Menu"
                            className="text-neutral-400 hover:text-white p-1 text-xl font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Reusable Mobile Navigation Links with Reduced Gap */}
                    <nav className="mt-4 flex flex-col gap-1.5 text-sm font-medium">
                        {NAV_ITEMS.map((item) =>
                            item.submenu ? (
                                <div key={item.label}>
                                    <button
                                        onClick={() =>
                                            setIsMobileServicesOpen(
                                                !isMobileServicesOpen,
                                            )
                                        }
                                        className="w-full flex justify-between items-center py-1.5 text-white hover:text-neutral-300 font-medium"
                                    >
                                        <span>{item.label}</span>
                                        <svg
                                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                                isMobileServicesOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {/* Submenu with Tight Spacing */}
                                    {isMobileServicesOpen && (
                                        <div className="pl-3 my-1 border-l border-neutral-800 flex flex-col gap-1 text-xs text-neutral-400">
                                            {item.submenu.map((sub) => (
                                                <a
                                                    key={sub.label}
                                                    href={sub.href}
                                                    className="py-1 hover:text-white transition"
                                                    onClick={() =>
                                                        setIsMobileMenuOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    {sub.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="py-1.5 hover:text-neutral-300 transition"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ),
                        )}
                    </nav>
                </div>

                {/* Footer of Mobile Sheet: CTA & Social Icons */}
                <div className="p-5 border-t border-neutral-800 space-y-4">
                    {/* Social Icons (Mobile) */}
                    <div className="flex items-center justify-center gap-4 text-neutral-400">
                        {SOCIAL_ICONS.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={social.name}
                                className="hover:text-white transition p-1"
                            >
                                {social.svg}
                            </a>
                        ))}
                    </div>

                    <a
                        href="#book"
                        className="block w-full text-center bg-[#5a0b4d] hover:bg-[#430538] text-white py-2.5 rounded-xl text-xs font-bold transition shadow-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Book Now
                    </a>
                </div>
            </aside>
        </>
    );
}
