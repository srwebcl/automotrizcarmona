'use client';

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

// Banners from 'public/images/banners' for Web (Desktop)
const DESKTOP_SLIDES = [
    {
        id: 1,
        image: '/images/banners/allnewmgzshybrid-1-1920x710.png',
        title: 'Nueva MG ZS Hybrid',
        subtitle: 'Eficiencia y tecnología para tu día a día.',
        cta: 'Cotizar Ahora'
    },
    {
        id: 2,
        image: '/images/banners/NUEVA-AMAROK-04-1350x499.png',
        title: 'Nueva VW Amarok',
        subtitle: 'La potencia que necesitas para el trabajo duro.',
        cta: 'Ver Detalles'
    },
    {
        id: 3,
        image: '/images/banners/banner-web-1800x665.png',
        title: 'Seminuevos Certificados',
        subtitle: 'Calidad garantizada en todas las marcas.',
        cta: 'Ver Stock'
    }
];

// Banners for Mobile
const MOBILE_SLIDES = [
    {
        id: 1,
        image: '/images/banners/banner-movil-1.jpg',
        title: 'Soueast S6 Hybrid'
    },
    {
        id: 2,
        image: '/images/banners/banner-movil-2.jpg',
        title: 'Volkswagen Nueva Amarok'
    },
    {
        id: 3,
        image: '/images/banners/banner-movil-3.jpg',
        title: 'Geely New Coolray'
    },
    {
        id: 4,
        image: '/images/banners/banner-movil-4.jpg',
        title: 'Audi A3 Sportback'
    }
];

// Logos from 'public/images/logos'
const BRANDS_LOGOS = [
    'logo-toyota.webp',
    'logo-vw.webp',
    'logo-audi.webp',
    'logo-seat.webp',
    'logo-cupra.webp',
    'logo-honda.webp',
    'logo-bmw.webp',
    'logo-bmw-motorrad.webp',
    'logo-mini.webp',
    'logo-maxus.webp',
    'logo-jetour.webp',
    'logos antiguos/SOUEAST_BLACK_Logo.png',
    'logo-kaiyi.webp',
    'logo-karry.webp',
    'logo-mg.webp',
    'logo-geely.webp',
    'logo-dongfeng.webp',
    'logo-foton.webp',
    'logo-iveco.webp',
    'logo-man.webp',
    'logo-vw-camiones.webp',
    'logo-foton-camiones.webp'
];

export default function Hero() {
    // Separate Hooks for Desktop and Mobile to handle different counts
    const [desktopRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
    const [mobileRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

    return (
        <section className="relative bg-white pt-24 md:pt-32 pb-0 px-4 md:px-8" style={{ backgroundColor: '#ffffff' }}>
            {/* Mobile Slider (4 slides) */}
            <div className="w-full mx-auto mb-2 md:hidden">
                <div className="overflow-hidden rounded-3xl" ref={mobileRef}>
                    <div className="flex">
                        {MOBILE_SLIDES.map((slide) => (
                            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 aspect-square">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={slide.id === 1}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop Slider (3 slides) */}
            <div className="w-full mx-auto mb-2 hidden md:block">
                <div className="overflow-hidden rounded-3xl" ref={desktopRef}>
                    <div className="flex">
                        {DESKTOP_SLIDES.map((slide) => (
                            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 aspect-[16/6] md:aspect-[18/7] lg:aspect-[21/8]">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={slide.id === 1}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Brand Bar - Infinite Marquee with CSS */}
            <div className="relative w-[100vw] -mx-4 md:mx-0 md:w-full overflow-hidden pb-4 pt-4 border-t border-gray-50 mt-4">
                {/* Mask edges - Smoother gradient, reduced on mobile */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 z-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 z-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>

                <div className="flex flex-nowrap overflow-hidden">
                    <ul className="flex items-center justify-start md:[&_li]:mx-14 animate-infinite-scroll w-max flex-shrink-0">
                        {/* First set of logos */}
                        {BRANDS_LOGOS.map((logo, idx) => (
                            <li key={`1-${idx}`} className="w-[25vw] md:w-auto flex-shrink-0 flex items-center justify-center transition-all duration-300 cursor-pointer opacity-90 hover:opacity-100 hover:scale-110 px-3">
                                <div className={`relative flex items-center justify-center ${logo.toLowerCase().includes('soueast') ? 'h-5 md:h-5' :
                                    logo.toLowerCase().includes('iveco') || logo.toLowerCase().includes('man') ? 'h-10 md:h-16' :
                                        'h-12 md:h-24'
                                    }`}>
                                    <img
                                        src={`/images/logos/${logo}`}
                                        alt="Brand logo"
                                        className="h-full w-auto object-contain transition-all duration-300"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex items-center justify-start md:[&_li]:mx-14 animate-infinite-scroll w-max flex-shrink-0" aria-hidden="true">
                        {/* Duplicate set for infinite loop */}
                        {BRANDS_LOGOS.map((logo, idx) => (
                            <li key={`2-${idx}`} className="w-[25vw] md:w-auto flex-shrink-0 flex items-center justify-center transition-all duration-300 cursor-pointer opacity-90 hover:opacity-100 hover:scale-110 px-3">
                                <div className={`relative flex items-center justify-center ${logo.toLowerCase().includes('soueast') ? 'h-5 md:h-5' :
                                    logo.toLowerCase().includes('iveco') || logo.toLowerCase().includes('man') ? 'h-10 md:h-16' :
                                        'h-12 md:h-24'
                                    }`}>
                                    <img
                                        src={`/images/logos/${logo}`}
                                        alt="Brand logo"
                                        className="h-full w-auto object-contain transition-all duration-300"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Tailwind Config might need 'animate-infinite-scroll' keyframe. 
                I'll add the inline style for the keyframe here to ensure it works without config change, 
                or I should update config. A cleaner way is adding a style tag or updating tailwind config.
                Since I can't easily edit tailwind config without separate tool call, I'll add a <style> block or use a known utility if available.
                Standard tailwind doesn't have marquee. I will add the keyframes in global css or just use style tag in component for now.
            */}
            <style jsx global>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                }
            `}</style>
        </section>
    );
}
