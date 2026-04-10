'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

// ─── Agrega aquí tantos banners como necesites ─────────────────────────────────
const BANNERS = [
    {
        web: '/images/banner-web-st.png',
        mobile: '/images/banner-movil-st.png',
        alt: 'Servicio Técnico Carmona',
        link: undefined,
    },
    // Ejemplo segunda imagen:
    // {
    //   web:    '/images/banner-web-st-2.png',
    //   mobile: '/images/banner-movil-st-2.png',
    //   alt:    'Otro banner promocional',
    //   link:   undefined,
    // },
];

interface ServicioBannerProps {
    banners?: any[];
}

export default function ServicioBanner({ banners }: ServicioBannerProps) {
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
        /* margen igual arriba y a los lados — la compensación del navbar la maneja el main */
        <div className="px-4 pt-4 sm:px-6 sm:pt-6 relative">
            {/* Viewport del carrusel */}
            <div className="overflow-hidden rounded-xl shadow-sm" ref={emblaRef}>
                <div className="flex">
                    {activeBanners.map((banner, i) => (
                        <div key={i} className="flex-[0_0_100%] min-w-0">
                            {banner.link ? (
                                <a href={banner.link} className="block w-full h-full relative cursor-pointer">
                                    {/* Desktop — oculto en móvil */}
                                    <div
                                        className="hidden sm:block relative w-full"
                                        style={{ aspectRatio: '1735/170' }}
                                    >
                                        <Image
                                            src={banner.web}
                                            alt={banner.alt}
                                            fill
                                            className="object-cover rounded-xl"
                                            priority={i === 0}
                                            sizes="100vw"
                                        />
                                    </div>
                                    {/* Móvil — oculto en ≥sm */}
                                    <div
                                        className="block sm:hidden relative w-full"
                                        style={{ aspectRatio: '767/301' }}
                                    >
                                        <Image
                                            src={banner.mobile}
                                            alt={banner.alt}
                                            fill
                                            className="object-cover rounded-xl"
                                            priority={i === 0}
                                            sizes="100vw"
                                        />
                                    </div>
                                </a>
                            ) : (
                                <>
                                    <div
                                        className="hidden sm:block relative w-full"
                                        style={{ aspectRatio: '1735/170' }}
                                    >
                                        <Image
                                            src={banner.web}
                                            alt={banner.alt}
                                            fill
                                            className="object-cover rounded-xl"
                                            priority={i === 0}
                                            sizes="100vw"
                                        />
                                    </div>
                                    {/* Móvil — oculto en ≥sm */}
                                    <div
                                        className="block sm:hidden relative w-full"
                                        style={{ aspectRatio: '767/301' }}
                                    >
                                        <Image
                                            src={banner.mobile}
                                            alt={banner.alt}
                                            fill
                                            className="object-cover rounded-xl"
                                            priority={i === 0}
                                            sizes="100vw"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Flechas — solo si hay 2+ banners */}
            {showArrows && (
                <>
                    <button
                        onClick={scrollPrev}
                        aria-label="Banner anterior"
                        className="absolute left-8 sm:left-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={scrollNext}
                        aria-label="Banner siguiente"
                        className="absolute right-8 sm:right-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}
        </div>
    );
}
