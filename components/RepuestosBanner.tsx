'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

// ─── Banners de repuestos ──────────────────────────────────────────────────────
// Por ahora usa los mismos banners. Reemplaza con imágenes propias de repuestos
// cuando las tengas disponibles.
const BANNERS = [
    {
        web: '/images/banner-web-st.png',
        mobile: '/images/banner-movil-st.png',
        alt: 'Repuestos Originales Carmona',
    },
    // { web: '/images/banner-rep-web-2.png', mobile: '/images/banner-rep-movil-2.png', alt: '...' },
];

interface RepuestosBannerProps {
    banners?: any[];
}

export default function RepuestosBanner({ banners }: RepuestosBannerProps) {
    const activeBanners = banners && banners.length > 0
        ? banners.map((b) => ({
            web: b.image_desktop,
            mobile: b.image_mobile || b.image_desktop,
            alt: b.title,
            link: b.link
        }))
        : BANNERS;

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: activeBanners.length > 1 });
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    const showArrows = activeBanners.length > 1;

    return (
        <div className="px-4 pt-4 sm:px-6 sm:pt-6 relative">
            <div className="overflow-hidden rounded-xl shadow-sm" ref={emblaRef}>
                <div className="flex">
                    {activeBanners.map((banner, i) => (
                        <div key={i} className="flex-[0_0_100%] min-w-0">
                            {banner.link ? (
                                <a href={banner.link} className="block w-full h-full relative cursor-pointer">
                                    <div className="hidden sm:block relative w-full" style={{ aspectRatio: '1735/170' }}>
                                        <Image src={banner.web} alt={banner.alt} fill className="object-cover rounded-xl" priority={i === 0} sizes="100vw" />
                                    </div>
                                    <div className="block sm:hidden relative w-full" style={{ aspectRatio: '767/301' }}>
                                        <Image src={banner.mobile} alt={banner.alt} fill className="object-cover rounded-xl" priority={i === 0} sizes="100vw" />
                                    </div>
                                </a>
                            ) : (
                                <>
                                    <div className="hidden sm:block relative w-full" style={{ aspectRatio: '1735/170' }}>
                                        <Image src={banner.web} alt={banner.alt} fill className="object-cover rounded-xl" priority={i === 0} sizes="100vw" />
                                    </div>
                                    <div className="block sm:hidden relative w-full" style={{ aspectRatio: '767/301' }}>
                                        <Image src={banner.mobile} alt={banner.alt} fill className="object-cover rounded-xl" priority={i === 0} sizes="100vw" />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {showArrows && (
                <>
                    <button onClick={scrollPrev} aria-label="Anterior"
                        className="absolute left-8 sm:left-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={scrollNext} aria-label="Siguiente"
                        className="absolute right-8 sm:right-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </>
            )}
        </div>
    );
}
