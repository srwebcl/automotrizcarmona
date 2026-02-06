'use client';

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

// Banners from 'public/images/banners'
const SLIDES = [
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
        image: '/images/banners/banner-web-1800x665.png', // Fallback or additional banner
        title: 'Seminuevos Certificados',
        subtitle: 'Calidad garantizada en todas las marcas.',
        cta: 'Ver Stock'
    }
];

// Logos from 'public/images/logos' - Mapping plausible filenames
// Logos from 'public/images/logos'
const BRANDS_LOGOS = [
    'TOYOTA_Logo.png', 'MAXUS_Logo.png', 'BMW_Logo.png', 'AUDI_Logo.png',
    'BMW-MOTORRAD_Logo.png', 'Cupra-logo.png', 'DONGFENG-CIDEF_Logo.png',
    'FOTON-CIDEF_Logo.png', 'HONDA_Logo.png', 'JETOUR-logo.png', 'KARRY_Logo.png',
    'Kaiyi-Auto-Horizontal-03.png', 'MG_Logo.png', 'MINI_Logo.png', 'SEAT_Logo.png',
    'SOUEAST_BLACK_Logo.png', 'VOLKSWAGEN_Logo.png', 'logo-geelyy.png',
    'logo-iveco.png', 'MAN_Logo.png', 'VW-CAMIONES-Y-BUSES_Logo.png', 'FOTON-MDLA_Logo.png'
];

export default function Hero() {
    // Main Hero Slider
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

    // Brand Carousel - AutoScroll simulation with fast autoplay and no stop
    // Note: For true smooth continuous scroll 'embla-carousel-auto-scroll' is better, 
    // but using standard autoplay with short delay and different options works as a fallback or if simple sliding is preferred.
    // However, user asked for "infinito". The best "no-dependency" way for infinite marquee is CSS.
    // Let's use a CSS Marquee for the brands to ensure "advance infinito".

    return (
        <section className="relative bg-white pt-24 md:pt-32 pb-0 px-4 md:px-8" style={{ backgroundColor: '#ffffff' }}>
            {/* Slider with Symmetrical Margins */}
            <div className="w-full mx-auto mb-2">
                <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
                    <div className="flex">
                        {SLIDES.map((slide) => (
                            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 aspect-[16/10] sm:aspect-[16/6] md:aspect-[18/7] lg:aspect-[21/8]">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={slide.id === 1}
                                />
                                {/* Gradient removed as Navbar is opaque/dark and user wants pure white */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Brand Bar - Infinite Marquee with CSS */}
            <div className="relative w-full overflow-hidden pb-4 pt-2">
                {/* Mask edges - Smoother gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>

                <div className="inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 md:[&_li]:mx-12 [&_img]:max-w-none animate-infinite-scroll">
                        {/* First set of logos */}
                        {BRANDS_LOGOS.map((logo, idx) => (
                            <li key={`1-${idx}`} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer opacity-50 hover:opacity-100 hover:scale-110">
                                <div className={`relative flex items-center justify-center ${logo.includes('SOUEAST') ? 'h-4 md:h-6' :
                                    logo.includes('geely') ? 'h-8 md:h-12' :
                                        'h-12 md:h-16'
                                    }`}>
                                    <img
                                        src={`/images/logos/${logo}`}
                                        alt="Brand"
                                        className="h-full w-auto object-contain"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 md:[&_li]:mx-12 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                        {/* Duplicate set for infinite loop */}
                        {BRANDS_LOGOS.map((logo, idx) => (
                            <li key={`2-${idx}`} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer opacity-50 hover:opacity-100 hover:scale-110">
                                <div className={`relative flex items-center justify-center ${logo.includes('SOUEAST') ? 'h-4 md:h-6' :
                                    logo.includes('geely') ? 'h-8 md:h-12' :
                                        'h-12 md:h-16'
                                    }`}>
                                    <img
                                        src={`/images/logos/${logo}`}
                                        alt="Brand"
                                        className="h-full w-auto object-contain"
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
