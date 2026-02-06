'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight } from 'lucide-react';

const ITEMS = [
    {
        id: 1,
        title: "Compliance",
        link: "/compliance",
        image: "/images/discover_compliance_1770351789163.png"
    },
    {
        id: 2,
        title: "Sucursales",
        link: "/sucursales",
        image: "/images/discover_sucursales_retry.png" // Will verify after generation
    },
    {
        id: 3,
        title: "Noticias",
        link: "/noticias",
        image: "/images/discover_noticias_retry.png" // Will verify after generation
    },
    {
        id: 4,
        title: "Reclamos y Sugerencias",
        link: "/reclamos",
        image: "/images/discover_reclamos_1770351819027.png"
    },
    {
        id: 5,
        title: "Car Advisor",
        link: "/advisor",
        image: "/images/discover_car_advisor_1770351833227.png"
    }
];

export default function DiscoverMoreCarousel() {
    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps'
    });

    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col mb-10 items-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-center">
                        Descubra más <span className="text-transparent bg-clip-text bg-gradient-to-r from-carmona-gold to-carmona-orange">Carmona</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-carmona-gold to-carmona-orange rounded-full mt-4"></div>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4 touch-pan-y">
                        {ITEMS.map((item) => (
                            <div key={item.id} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_25%] pl-4 min-w-0">
                                <Link href={item.link} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
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
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-carmona-gold transition-colors block">
                                            {item.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                            <span className="uppercase tracking-wider">Ver más</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>

                                    {/* Arrow icon always visible in Porsche style usually, but lets match the requested 'Descubra mas: y cada tarjeta...' style which implies interactivity. 
                                        Let's keep a subtle arrow indicator at bottom right or part of the interaction. 
                                        Porsche uses a simple arrow. Let's add a static arrow that turns gold.
                                    */}
                                    <div className="absolute bottom-8 right-8 text-white opacity-80 group-hover:text-carmona-gold group-hover:translate-x-1 transition-all duration-300">
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
