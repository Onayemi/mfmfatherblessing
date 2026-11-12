import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperCore } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Slide {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
}

interface BannerSliderProps {
    slides: Slide[];
}

export default function BannerSlider({ slides }: BannerSliderProps) {
    const swiperRef = useRef<SwiperCore | null>(null);

    return (
        <div className="relative group w-full h-[500px] md:h-[600px] overflow-hidden shadow-xl">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    bulletClass:
                        "swiper-pagination-bullet !bg-white/50 !opacity-100 !w-2.5 !h-2.5 !transition-all !duration-300",
                    bulletActiveClass:
                        "swiper-pagination-bullet-active !w-8 !rounded-full !bg-blue-600",
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                loop={true}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide
                        key={slide.id}
                        className="relative w-full h-full"
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Dark Gradient Overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent flex flex-col justify-center items-start p-8 md:p-16 text-white">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-2xl leading-tight">
                                {slide.title}
                            </h2>
                            <p className="text-lg md:text-xl mb-8 max-w-xl text-gray-200">
                                {slide.subtitle}
                            </p>
                            <a
                                href={slide.ctaLink}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg transition-transform active:scale-95"
                            >
                                {slide.ctaText}
                            </a>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Professional Left Navigation Arrow */}
            <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Custom Professional Right Navigation Arrow */}
            <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
}
