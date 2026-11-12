import React from "react";
import { Head } from "@inertiajs/react";

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    url?: string;
}

export default function SEO({
    title,
    description = "Explore the vast scenery of the world with Àjàlá.ng. Seamless flight bookings, hotel reservations, and travel packages.",
    image = "/images/og-cover.jpg",
    url = typeof window !== "undefined" ? window.location.href : "",
}: SEOProps) {
    const fullTitle = `${title} | PastorBlessing`;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
}
