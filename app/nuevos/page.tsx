'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Car, Truck, ChevronRight, LayoutGrid, Grip, Bus, Sparkles } from 'lucide-react';

const BRAND_LOGOS = [
    { name: "Toyota", src: "/images/logos/logo-toyota.webp", slug: "toyota" },
    { name: "Volkswagen", src: "/images/logos/logo-vw.webp", slug: "volkswagen" },
    { name: "Audi", src: "/images/logos/logo-audi.webp", slug: "audi" },
    { name: "Seat", src: "/images/logos/logo-seat.webp", slug: "seat" },
    { name: "Cupra", src: "/images/logos/logo-cupra.webp", slug: "cupra" },
    { name: "Honda", src: "/images/logos/logo-honda.webp", slug: "honda" },
    { name: "BMW", src: "/images/logos/logo-bmw.webp", slug: "bmw" },
    { name: "BMW Motorrad", src: "/images/logos/logo-bmw-motorrad.webp", slug: "bmw-motorrad" },
    { name: "Mini", src: "/images/logos/logo-mini.webp", slug: "mini" },
    { name: "Maxus", src: "/images/logos/logo-maxus.webp", slug: "maxus" },
    { name: "Jetour", src: "/images/logos/logo-jetour.webp", slug: "jetour" },
    { name: "Soueast", src: "/images/logos/logos antiguos/SOUEAST_BLACK_Logo.png", slug: "soueast" },
    { name: "Kaiyi", src: "/images/logos/logo-kaiyi.webp", slug: "kaiyi" },
    { name: "Karry", src: "/images/logos/logo-karry.webp", slug: "karry" },
    { name: "Geely", src: "/images/logos/logo-geely.webp", slug: "geely" },
    { name: "MG", src: "/images/logos/logo-mg.webp", slug: "mg" },
    { name: "Dongfeng", src: "/images/logos/logo-dongfeng.webp", slug: "dongfeng" },
    { name: "Foton", src: "/images/logos/logo-foton.webp", slug: "foton" },
];

const TRUCK_LOGOS = [
    { name: "Iveco", src: "/images/logos/logo-iveco.webp", slug: "iveco" },
    { name: "MAN", src: "/images/logos/logo-man.webp", slug: "man" },
    { name: "VW Camiones", src: "/images/logos/logo-vw-camiones.webp", slug: "vw-camiones" },
    { name: "Foton Camiones", src: "/images/logos/logo-foton-camiones.webp", slug: "foton-camiones" },
];

export default function NuevosPage() {
    const ALL_BRANDS = [...BRAND_LOGOS, ...TRUCK_LOGOS];

    return (
        <main className="min-h-screen bg-[#f8f9fa]">

            {/* Header Section */}
            <section className="pt-40 pb-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="text-red-600" size={18} />
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em]">Autos Nuevos</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[#1a1a1a] mb-6 tracking-tight">
                        Conoce nuestras <span className="text-slate-600">Marcas</span>
                    </h1>
                    <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto">
                        El concesionario automotriz mas grande de la tercera y cuarta región.
                    </p>
                </div>
            </section>

            {/* Brands Content */}
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {ALL_BRANDS.map((brand, idx) => (
                        <Link
                            key={`${brand.slug}-${idx}`}
                            href={`/${TRUCK_LOGOS.some(t => t.slug === brand.slug) ? 'camiones' : 'nuevos'}/${brand.slug}`}
                            className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-red-600 transition-all duration-500 h-44 flex flex-col items-center justify-center relative overflow-hidden"
                        >
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <div className="relative w-full h-16 transition-all duration-500 group-hover:scale-110">
                                <Image
                                    src={brand.src}
                                    alt={brand.name}
                                    fill
                                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                            <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-300 group-hover:text-gray-900 transition-colors">
                                {brand.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
