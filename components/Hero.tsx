'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const CDN_BASE = 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/home';

// Banners from R2 for Web (Desktop)
const DESKTOP_SLIDES = [
    {
        id: 1,
        image: `${CDN_BASE}/banner-web/banner-volkswagen.webp`,
        title: 'Volkswagen Innovación',
        subtitle: 'Descubre la tecnología alemana en cada detalle.',
        cta: 'Ver Modelos',
        link: undefined
    },
    {
        id: 2,
        image: `${CDN_BASE}/banner-web/banner-toyota.webp`,
        title: 'Toyota Hybrid System',
        subtitle: 'Liderando el camino hacia la movilidad sustentable.',
        cta: 'Explorar Híbridos',
        link: undefined
    },
    {
        id: 3,
        image: `${CDN_BASE}/banner-web/banner-mg.webp`,
        title: 'MG: Drive Evolution',
        subtitle: 'Diseño británico con tecnología de vanguardia.',
        cta: 'Conocer MG',
        link: undefined
    },
    {
        id: 4,
        image: `${CDN_BASE}/banner-web/banner-geely.webp`,
        title: 'Geely: Nueva Generación',
        subtitle: 'Redefiniendo el estándar de confort y seguridad.',
        cta: 'Descubrir Geely',
        link: undefined
    }
];

// Banners for Mobile from R2
const MOBILE_SLIDES = [
    {
        id: 1,
        image: `${CDN_BASE}/banner-movil/banner-vw-movil.webp`,
        title: 'Volkswagen',
        subtitle: undefined,
        cta: undefined,
        link: undefined
    },
    {
        id: 2,
        image: `${CDN_BASE}/banner-movil/banner-souesat-movil.webp`,
        title: 'Soueast',
        subtitle: undefined,
        cta: undefined,
        link: undefined
    },
    {
        id: 3,
        image: `${CDN_BASE}/banner-movil/banner-geely-movil.webp`,
        title: 'Geely',
        subtitle: undefined,
        cta: undefined,
        link: undefined
    },
    {
        id: 4,
        image: `${CDN_BASE}/banner-movil/banner-audi-movil.webp`,
        title: 'Audi',
        subtitle: undefined,
        cta: undefined,
        link: undefined
    }
];

import { LayoutBrandsData } from '@/lib/api/layoutBrands';

interface HeroProps {
    banners?: any[];
    layoutBrands?: LayoutBrandsData;
}

export default function Hero({ banners, layoutBrands }: HeroProps) {
    const defaultDesktopSlides = DESKTOP_SLIDES;
    const defaultMobileSlides = MOBILE_SLIDES;

    const carBrands = layoutBrands?.cars || [];
    const truckBrands = layoutBrands?.trucks || [];
    const allBrands = [...carBrands, ...truckBrands];
    const marqueeRow1 = allBrands.slice(0, Math.ceil(allBrands.length / 2));
    const marqueeRow2 = allBrands.slice(Math.ceil(allBrands.length / 2));

    const desktopSlides = banners && banners.length > 0
        ? banners.map((b) => ({
            id: b.id,
            image: b.image_desktop,
            title: b.title,
            subtitle: b.subtitle,
            link: b.link,
            cta: b.custom_data?.cta,
            show_text: b.custom_data?.show_text ?? false
        }))
        : defaultDesktopSlides.map(s => ({ ...s, show_text: true }));

    const mobileSlides = banners && banners.length > 0
        ? banners.map((b) => ({
            id: b.id,
            image: b.image_mobile || b.image_desktop,
            title: b.title,
            subtitle: b.subtitle,
            link: b.link,
            cta: b.custom_data?.cta,
            show_text: b.custom_data?.show_text ?? false
        }))
        : defaultMobileSlides.map(s => ({ ...s, show_text: true }));
    // Separate Hooks for Desktop and Mobile to handle different counts
    const [desktopRef, desktopApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
    const [mobileRef, mobileApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

    const [desktopIndex, setDesktopIndex] = useState(0);
    const [mobileIndex, setMobileIndex] = useState(0);

    const onDesktopSelect = useCallback(() => {
        if (!desktopApi) return;
        setDesktopIndex(desktopApi.selectedScrollSnap());
    }, [desktopApi]);

    const onMobileSelect = useCallback(() => {
        if (!mobileApi) return;
        setMobileIndex(mobileApi.selectedScrollSnap());
    }, [mobileApi]);

    useEffect(() => {
        if (!desktopApi) return;
        onDesktopSelect();
        desktopApi.on('select', onDesktopSelect);
        desktopApi.on('reInit', onDesktopSelect);
    }, [desktopApi, onDesktopSelect]);

    useEffect(() => {
        if (!mobileApi) return;
        onMobileSelect();
        mobileApi.on('select', onMobileSelect);
        mobileApi.on('reInit', onMobileSelect);
    }, [mobileApi, onMobileSelect]);

    return (
        <section className="relative bg-white pt-24 md:pt-32 pb-0 px-4 md:px-8" style={{ backgroundColor: '#ffffff' }}>
            {/* Mobile Slider (4 slides) */}
            <div className="w-full mx-auto mb-2 md:hidden relative group">
                <div className="overflow-hidden rounded-3xl" ref={mobileRef}>
                    <div className="flex">
                        {mobileSlides.map((slide) => (
                            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 aspect-square">
                                {slide.link ? (
                                    <Link href={slide.link} className="block w-full h-full cursor-pointer relative">
                                        <Image src={slide.image} alt={slide.title} fill sizes="100vw" className="object-cover" priority={slide.id === mobileSlides[0]?.id} />
                                        {slide.show_text && (
                                            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10 pointer-events-none z-10 w-full h-full">
                                                <h2 className="text-3xl font-bold text-white mb-2 max-w-lg leading-tight">{slide.title}</h2>
                                                {slide.subtitle && <p className="text-lg text-white/90 mb-4 max-w-lg leading-snug">{slide.subtitle}</p>}
                                                {slide.cta && (
                                                    <div className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#d2001c] text-white font-bold rounded-lg shadow-lg w-max pointer-events-auto">
                                                        {slide.cta}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Link>
                                ) : (
                                    <>
                                        <Image src={slide.image} alt={slide.title} fill sizes="100vw" className="object-cover" priority={slide.id === mobileSlides[0]?.id} />
                                        {slide.show_text && (
                                            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10 pointer-events-none z-10 w-full h-full">
                                                <h2 className="text-3xl font-bold text-white mb-2 max-w-lg leading-tight">{slide.title}</h2>
                                                {slide.subtitle && <p className="text-lg text-white/90 mb-4 max-w-lg leading-snug">{slide.subtitle}</p>}
                                                {slide.cta && (
                                                    <div className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#d2001c] text-white font-bold rounded-lg shadow-lg w-max pointer-events-auto">
                                                        {slide.cta}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrows */}
                <button
                    onClick={() => mobileApi?.scrollPrev()}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 hover:bg-white/90 text-gray-800 rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-md"
                    aria-label="Anterior"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={() => mobileApi?.scrollNext()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/50 hover:bg-white/90 text-gray-800 rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-md"
                    aria-label="Siguiente"
                >
                    <ChevronRight size={20} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {mobileSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => mobileApi?.scrollTo(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === mobileIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                            }`}
                            aria-label={`Ir a la diapositiva ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Desktop Slider (3 slides) */}
            <div className="w-full mx-auto mb-2 hidden md:block relative group">
                <div className="overflow-hidden rounded-3xl" ref={desktopRef}>
                    <div className="flex">
                        {desktopSlides.map((slide) => (
                            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 aspect-[16/6] md:aspect-[18/7] lg:aspect-[21/8]">
                                {slide.link ? (
                                    <Link href={slide.link} className="block w-full h-full cursor-pointer relative">
                                        <Image src={slide.image} alt={slide.title} fill sizes="100vw" className="object-cover" priority={slide.id === desktopSlides[0]?.id} />
                                        {slide.show_text && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-8 md:px-16 pointer-events-none z-10 w-full h-full">
                                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-2xl leading-tight">{slide.title}</h2>
                                                {slide.subtitle && <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl leading-snug">{slide.subtitle}</p>}
                                                {slide.cta && (
                                                    <div className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#d2001c] text-white font-bold rounded-lg shadow-lg w-max pointer-events-auto transition-transform hover:scale-105 active:scale-95">
                                                        {slide.cta} <ChevronRight size={18} />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Link>
                                ) : (
                                    <>
                                        <Image src={slide.image} alt={slide.title} fill sizes="100vw" className="object-cover" priority={slide.id === desktopSlides[0]?.id} />
                                        {slide.show_text && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-8 md:px-16 pointer-events-none z-10 w-full h-full">
                                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-2xl leading-tight">{slide.title}</h2>
                                                {slide.subtitle && <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl leading-snug">{slide.subtitle}</p>}
                                                {slide.cta && (
                                                    <div className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#d2001c] text-white font-bold rounded-lg shadow-lg w-max pointer-events-auto transition-transform hover:scale-105 active:scale-95 cursor-pointer">
                                                        {slide.cta} <ChevronRight size={18} />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrows */}
                <button
                    onClick={() => desktopApi?.scrollPrev()}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/50 hover:bg-white/90 text-gray-800 rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-md"
                    aria-label="Anterior"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => desktopApi?.scrollNext()}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/50 hover:bg-white/90 text-gray-800 rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-md"
                    aria-label="Siguiente"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                    {desktopSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => desktopApi?.scrollTo(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                                index === desktopIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                            }`}
                            aria-label={`Ir a la diapositiva ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Brand Bar - Infinite Marquee with CSS */}
            <div className="relative w-[100vw] -mx-4 md:mx-0 md:w-full overflow-hidden pb-4 pt-4 border-t border-gray-50 mt-4 flex flex-col gap-6 md:gap-8">
                {/* Mask edges - Smoother gradient, reduced on mobile */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 z-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 z-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>

                {/* ROW 1 */}
                <div className="flex flex-nowrap overflow-hidden group">
                    <ul className="flex items-center justify-start md:[&_li]:mx-14 animate-infinite-scroll group-hover:[animation-play-state:paused] w-max flex-shrink-0">
                        {marqueeRow1.map((brand, idx) => (
                            <li key={`1-${idx}`} className="w-[30vw] md:w-auto flex-shrink-0 flex items-center justify-center transition-all duration-300 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 px-3">
                                <Link href={`${truckBrands.some(t => t.name === brand.name) ? '/camiones' : '/nuevos'}/${brand.slug}`} className={`relative flex items-center justify-center ${brand.logo_url.toLowerCase().includes('iveco') || brand.logo_url.toLowerCase().includes('man') ? 'h-10 md:h-16' : 'h-14 md:h-20'}`}>
                                    <Image
                                        src={brand.logo_url}
                                        alt={brand.name}
                                        width={160}
                                        height={80}
                                        className="h-full w-auto object-contain transition-all duration-300"
                                        loading="lazy"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex items-center justify-start md:[&_li]:mx-14 animate-infinite-scroll group-hover:[animation-play-state:paused] w-max flex-shrink-0" aria-hidden="true">
                        {marqueeRow1.map((brand, idx) => (
                            <li key={`2-${idx}`} className="w-[30vw] md:w-auto flex-shrink-0 flex items-center justify-center transition-all duration-300 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 px-3">
                                <Link href={`${truckBrands.some(t => t.name === brand.name) ? '/camiones' : '/nuevos'}/${brand.slug}`} className={`relative flex items-center justify-center ${brand.logo_url.toLowerCase().includes('iveco') || brand.logo_url.toLowerCase().includes('man') ? 'h-10 md:h-16' : 'h-14 md:h-20'}`}>
                                    <Image
                                        src={brand.logo_url}
                                        alt={brand.name}
                                        width={160}
                                        height={80}
                                        className="h-full w-auto object-contain transition-all duration-300"
                                        loading="lazy"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ROW 2 - Reverse scrolling visually using the keyframes */}
                <div className="flex flex-nowrap overflow-hidden group">
                    <ul className="flex items-center justify-start md:[&_li]:mx-14 animate-infinite-scroll-reverse group-hover:[animation-play-state:paused] w-max flex-shrink-0">
                        {marqueeRow2.map((brand, idx) => (
                            <li key={`3-${idx}`} className="w-[30vw] md:w-auto flex-shrink-0 flex items-center justify-center transition-all duration-300 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 px-3">
                                <Link href={`${truckBrands.some(t => t.name === brand.name) ? '/camiones' : '/nuevos'}/${brand.slug}`} className={`relative flex items-center justify-center ${brand.logo_url.toLowerCase().includes('iveco') || brand.logo_url.toLowerCase().includes('man') ? 'h-10 md:h-16' : 'h-14 md:h-20'}`}>
                                    <Image
                                        src={brand.logo_url}
                                        alt={brand.name}
                                        width={160}
                                        height={80}
                                        className="h-full w-auto object-contain transition-all duration-300"
                                        loading="lazy"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex items-center justify-start md:[&_li]:mx-14 animate-infinite-scroll-reverse group-hover:[animation-play-state:paused] w-max flex-shrink-0" aria-hidden="true">
                        {marqueeRow2.map((brand, idx) => (
                            <li key={`4-${idx}`} className="w-[30vw] md:w-auto flex-shrink-0 flex items-center justify-center transition-all duration-300 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 px-3">
                                <Link href={`${truckBrands.some(t => t.name === brand.name) ? '/camiones' : '/nuevos'}/${brand.slug}`} className={`relative flex items-center justify-center ${brand.logo_url.toLowerCase().includes('iveco') || brand.logo_url.toLowerCase().includes('man') ? 'h-10 md:h-16' : 'h-14 md:h-20'}`}>
                                    <Image
                                        src={brand.logo_url}
                                        alt={brand.name}
                                        width={160}
                                        height={80}
                                        className="h-full w-auto object-contain transition-all duration-300"
                                        loading="lazy"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <style jsx global>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                }
                @keyframes infinite-scroll-reverse {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 85s linear infinite;
                }
                .animate-infinite-scroll-reverse {
                    animation: infinite-scroll-reverse 80s linear infinite;
                }
            `}</style>
        </section>
    );
}
