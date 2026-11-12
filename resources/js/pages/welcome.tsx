import BannerSlider from "@/components/nav/BannerSlider";
import ImageCarousel from "@/components/nav/ImageCarousel";
import MainLayout from "@/layouts/main-layout";

const bannerSlides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
        title: "Build Modern Apps with Laravel & React",
        subtitle:
            "Deliver high-performance web experiences with Inertia.js and TypeScript.",
        ctaText: "Get Started",
        ctaLink: "/register",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
        title: "Scale Seamlessly to Millions",
        subtitle:
            "Optimized backend architecture and clean frontend state management.",
        ctaText: "Learn More",
        ctaLink: "/about",
    },
];

const carouselImages = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
        alt: "Code",
        title: "Clean Architecture",
        category: "Backend",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
        alt: "Editor",
        title: "Type Safe Codebase",
        category: "TypeScript",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
        alt: "Team",
        title: "Collaborative Workflow",
        category: "Team",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        alt: "Stats",
        title: "Analytics & SEO",
        category: "Growth",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
        alt: "Editor",
        title: "Type Safe Codebase",
        category: "TypeScript",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        alt: "Stats",
        title: "Analytics & SEO",
        category: "Growth",
    },
];

export default function Welcome() {
    // const { auth } = usePage().props;

    return (
        <MainLayout title="Home Page" description="Welcome to our home page">
            {/* Full-width Hero Banner Slider */}
            <BannerSlider slides={bannerSlides} />

            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#2d0126] to-[#46023c] text-white text-center">
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

            {/* Multi-item Image Carousel */}
            <ImageCarousel items={carouselImages} />
        </MainLayout>
    );
}
