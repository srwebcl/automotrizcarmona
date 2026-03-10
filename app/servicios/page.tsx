import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Wrench } from 'lucide-react';
import ServicioBanner from '@/components/ServicioBanner';

// ─── Autos & Motos ─────────────────────────────────────────────────────────────
const AUTOS_BRANDS = [
    { name: 'Toyota', src: '/images/logos/logo-toyota.webp' },
    { name: 'Volkswagen', src: '/images/logos/logo-vw.webp' },
    { name: 'Audi', src: '/images/logos/logo-audi.webp' },
    { name: 'Seat', src: '/images/logos/logo-seat.webp' },
    { name: 'Cupra', src: '/images/logos/logo-cupra.webp' },
    { name: 'Honda', src: '/images/logos/logo-honda.webp' },
    { name: 'BMW', src: '/images/logos/logo-bmw.webp' },
    { name: 'BMW Motorrad', src: '/images/logos/logo-bmw-motorrad.webp' },
    { name: 'Mini', src: '/images/logos/logo-mini.webp' },
    { name: 'Maxus', src: '/images/logos/logo-maxus.webp' },
    { name: 'Jetour', src: '/images/logos/logo-jetour.webp' },
    { name: 'Kaiyi', src: '/images/logos/logo-kaiyi.webp' },
    { name: 'Karry', src: '/images/logos/logo-karry.webp' },
    { name: 'Geely', src: '/images/logos/logo-geely.webp' },
    { name: 'MG', src: '/images/logos/logo-mg.webp' },
    { name: 'Dongfeng', src: '/images/logos/logo-dongfeng.webp' },
    { name: 'Foton', src: '/images/logos/logo-foton.webp' },
];

// ─── Camiones & Buses ──────────────────────────────────────────────────────────
const TRUCKS_BRANDS = [
    { name: 'VW Camiones', src: '/images/logos/logo-vw-camiones.webp' },
    { name: 'Foton Camiones', src: '/images/logos/logo-foton-camiones.webp' },
    { name: 'Iveco', src: '/images/logos/logo-iveco.webp' },
    { name: 'MAN', src: '/images/logos/logo-man.webp' },
];

// ─── Descubre más items ────────────────────────────────────────────────────────
const DISCOVER_ITEMS = [
    {
        title: 'Autos Nuevos',
        subtitle: 'Stock disponible',
        link: '/nuevos',
        image: '/images/banners/NUEVO-TIGUAN-2025-07-1350x499.png',
    },
    {
        title: 'Seminuevos',
        subtitle: 'Calidad certificada',
        link: 'https://seminuevos.automotrizcarmona.cl',
        image: '/images/toyota/Pickup/hilux/galeria_2408.jpg',
    },
    {
        title: 'Repuestos',
        subtitle: 'Repuestos genuinos',
        link: '/repuestos',
        image: '/images/quick_access_repuestos_1770350949447.png',
    },
    {
        title: 'Sucursales',
        subtitle: 'Encuéntranos aquí',
        link: '/sucursales',
        image: '/images/quick_access_servicio_1770350934207.png',
    },
];

// ─── Brand Card ────────────────────────────────────────────────────────────────
function BrandCard({ name, src }: { name: string; src: string }) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    return (
        <Link
            href={`/servicios/agendar?marca=${encodeURIComponent(name)}`}
            id={`brand-svc-${slug}`}
            className="group flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-[#d2001c] hover:shadow-xl hover:shadow-[#d2001c]/10 transition-all duration-300 aspect-square"
        >
            <div className="relative w-full h-16 flex items-center justify-center">
                <Image
                    src={src}
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
export default function ServiciosPage() {
    return (
        <main className="min-h-screen bg-white font-sans pt-[88px]">

            {/* ── 1. BANNER PROMOCIONAL ──────────────────────────────────────── */}
            <ServicioBanner />

            {/* ── 2. TÍTULO + LOGOS ─────────────────────────────────────────── */}
            <section className="bg-white py-14 md:py-20">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

                    {/* Título — estilo home Destacados */}
                    <div className="text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 mb-4 text-sm font-bold tracking-widest text-gray-500 uppercase">
                            <Wrench size={16} />
                            <span>Servicio Técnico</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight mb-5">
                            Agenda{' '}
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">
                                tu Hora
                            </span>
                        </h1>
                        <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                            Selecciona tu marca y completa el formulario de agendamiento.
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
                        {AUTOS_BRANDS.map((b) => (
                            <BrandCard key={b.name} {...b} />
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
                        {TRUCKS_BRANDS.map((b) => (
                            <BrandCard key={b.name} {...b} />
                        ))}
                    </div>

                </div>
            </section>

            {/* ── 3. DESCUBRE MÁS CARMONA ───────────────────────────────────── */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col items-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight text-center">
                            Descubre más{' '}
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">Carmona</span>
                        </h2>
                        <div className="w-24 h-1 mt-4 rounded-full bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {DISCOVER_ITEMS.map((item) => (
                            <Link
                                key={item.title}
                                href={item.link}
                                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-lg"
                            >
                                <div className="absolute inset-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10">
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">
                                        {item.subtitle}
                                    </p>
                                    <h3 className="text-2xl font-black uppercase mb-4">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                                        <span>EXPLORAR</span>
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </section>

        </main>
    );
}
