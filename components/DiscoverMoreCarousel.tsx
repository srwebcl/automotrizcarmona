'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight } from 'lucide-react';
import type { DiscoverItem } from '@/lib/api';

const CDN_HOME = 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/home';

const FALLBACK_ITEMS: DiscoverItem[] = [
    {
        id: 1,
        title: "Compliance",
        link: "https://compliance.automotrizcarmona.cl/",
        image: `${CDN_HOME}/compliance.webp`,
        external: true
    },
    {
        id: 2,
        title: "Sucursales",
        link: "/sucursales",
        image: `${CDN_HOME}/sucursales.webp`
    },
    {
        id: 3,
        title: "Noticias",
        link: "/noticias",
        image: `${CDN_HOME}/noticias.webp`
    },
    {
        id: 4,
        title: "Contacto",
        link: "/contacto",
        image: `${CDN_HOME}/contacto.webp`
    },
    {
        id: 5,
        title: "Car Advisor",
        link: "https://www.car-advisor.cl/empresa/carmona/CL-29019",
        image: `${CDN_HOME}/car-advisor.webp`,
        external: true
    }
];

interface DiscoverMoreCarouselProps {
    titlePrefix?: string;
    titleHighlight?: string;
    /** Items from API. If empty, falls back to FALLBACK_ITEMS. */
    items?: DiscoverItem[];
}

export default function DiscoverMoreCarousel({
    titlePrefix = "Más sobre",
    titleHighlight = "Carmona y Cia",
    items
}: DiscoverMoreCarouselProps) {
    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps'
    });

    // Use API items if provided and non-empty, otherwise fall back to hardcoded
    const displayItems = (items && items.length > 0) ? items : FALLBACK_ITEMS;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col mb-10 items-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight text-center">
                        {titlePrefix} <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">{titleHighlight}</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 rounded-full mt-4"></div>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4 touch-pan-y">
                        {displayItems.map((item) => (
                            <div key={item.id} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_25%] pl-4 min-w-0">
                                <Link
                                    href={item.link}
                                    target={item.external ? "_blank" : undefined}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                                >
                                    {/* Image Background */}
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Gradient Overlay (Porsche Style) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />

                                    {/* Content - Bottom Left */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-[#d2001c] transition-colors block">
                                            {item.title}
                                        </h3>
                                        {item.subtitle && (
                                            <p className="text-sm text-white/70 mb-2">{item.subtitle}</p>
                                        )}
                                        <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                            <span className="uppercase tracking-wider">Ver más</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>

                                    {/* Arrow icon always visible in bottom right */}
                                    <div className="absolute bottom-8 right-8 text-white opacity-80 group-hover:text-[#d2001c] group-hover:translate-x-1 transition-all duration-300">
                                        <ArrowRight size={24} />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
