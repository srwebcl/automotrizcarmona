import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Package } from 'lucide-react';
import RepuestosBanner from '@/components/RepuestosBanner';
import DiscoverSection from '@/components/DiscoverSection';
import { getBanners, formatImageUrl } from '@/lib/api';

import { getLayoutBrands } from '@/lib/api/layoutBrands';



// ─── Brand Card ────────────────────────────────────────────────────────────────
function BrandCard({ name, logo_url }: { name: string; logo_url: string }) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    return (
        <Link
            href={`/repuestos/cotizar?marca=${encodeURIComponent(name)}`}
            id={`brand-rep-${slug}`}
            className="group flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-[#d2001c] hover:shadow-xl hover:shadow-[#d2001c]/10 transition-all duration-300 aspect-square"
        >
            <div className="relative w-full h-16 flex items-center justify-center">
                <Image
                    src={logo_url}
                    alt={name}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300 opacity-50 group-hover:opacity-100"
                    sizes="150px"
                />
            </div>
            <span className="text-[10px] font-bold text-gray-300 group-hover:text-[#d2001c] uppercase tracking-wider transition-colors text-center leading-tight">
                {name}
            </span>
        </Link>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function RepuestosPage() {
    const [allBanners, layoutBrands] = await Promise.all([
        getBanners(),
        getLayoutBrands()
    ]);
    const repuestosBanners = allBanners
        .filter((b: any) => b.location === 'repuestos' && b.active)
        .sort((a: any, b: any) => a.order - b.order)
        .map((b: any) => ({
            ...b,
            image_desktop: formatImageUrl(b.image_desktop),
            image_mobile: formatImageUrl(b.image_mobile)
        }));

    return (
        <main className="min-h-screen bg-white font-sans pt-[104px] lg:pt-[88px]">

            {/* ── 1. BANNER PROMOCIONAL ──────────────────────────────────────── */}
            <RepuestosBanner banners={repuestosBanners.length > 0 ? repuestosBanners : undefined} />

            {/* ── 2. TÍTULO + LOGOS ─────────────────────────────────────────── */}
            <section className="bg-white py-14 md:py-20">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

                    {/* Título — estilo home Destacados */}
                    <div className="text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 mb-4 text-sm font-bold tracking-widest text-gray-500 uppercase">
                            <Package size={16} />
                            <span>Repuestos Originales</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight mb-5">
                            Cotiza tus{' '}
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">
                                Repuestos
                            </span>
                        </h1>
                        <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                            Selecciona la marca de tu vehículo y completa el formulario de cotización.
                        </p>
                    </div>

                    {/* Autos & Motos */}
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight whitespace-nowrap">
                            Autos &amp; Motos
                        </h2>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-12">
                        {layoutBrands.cars.filter(b => b.show_in_parts).map((b) => (
                            <BrandCard key={b.name} name={b.name} logo_url={b.logo_url} />
                        ))}
                    </div>

                    {/* Camiones & Buses */}
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight whitespace-nowrap">
                            Camiones &amp; Buses
                        </h2>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {layoutBrands.trucks.filter(b => b.show_in_parts).map((b) => (
                            <BrandCard key={b.name} name={b.name} logo_url={b.logo_url} />
                        ))}
                    </div>

                </div>
            </section>

            {/* ── 3. DESCUBRE MÁS CARMONA ───────────────────────────────────── */}
            <DiscoverSection />

        </main>
    );
}
