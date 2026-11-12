import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Autoplay } from "swiper/modules";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional: for clean professional icons

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

interface ImageItem {
    id: number;
    src: string;
    alt: string;
    title?: string;
    category?: string;
}

interface ImageCarouselProps {
    title?: string;
    items: ImageItem[];
}

export default function ImageCarousel({
    title = "Featured Items",
    items,
}: ImageCarouselProps) {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="w-full py-8 max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
            {/* Header with Professional Title and Navigation Controls */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {title}
                </h2>

                {/* Custom Navigation Arrows */}
                <div className="flex items-center gap-2">
                    <button
                        ref={prevRef}
                        aria-label="Previous slide"
                        className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95 disabled:opacity-40"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        ref={nextRef}
                        aria-label="Next slide"
                        className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95 disabled:opacity-40"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Carousel Container with Hidden Overflow */}
            <div className="relative overflow-hidden">
                <Swiper
                    modules={[Navigation, FreeMode, Autoplay]}
                    spaceBetween={12}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        // Bind custom navigation refs safely before initialization
                        if (
                            swiper.params.navigation &&
                            typeof swiper.params.navigation !== "boolean"
                        ) {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="w-full !overflow-visible pb-4"
                >
                    {items.map((item) => (
                        <SwiperSlide key={item.id} className="h-auto">
                            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
                                <div className="h-52 overflow-hidden bg-gray-100 relative">
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                                    />
                                </div>
                                {(item.title || item.category) && (
                                    <div className="p-5 flex flex-col flex-grow justify-between">
                                        {item.category && (
                                            <span className="text-xs text-blue-600 font-semibold mb-1.5 uppercase tracking-wider">
                                                {item.category}
                                            </span>
                                        )}
                                        {item.title && (
                                            <h3 className="font-semibold text-gray-800 text-lg line-clamp-2">
                                                {item.title}
                                            </h3>
                                        )}
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
