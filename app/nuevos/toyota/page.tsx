'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Navbar from '@/components/Navbar';
import { ChevronRight, Info } from 'lucide-react';

// Interface for Toyota Models
interface ToyotaModel {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    isHybrid: boolean;
    isNew: boolean;
    isElectric?: boolean;
    slogan?: string; // New field for specific marketing copy
}

// Mock Data for Toyota Models
const TOYOTA_MODELS: ToyotaModel[] = [
    {
        id: 'bz4x',
        name: 'BZ4X',
        category: 'SUV',
        price: 41990000,
        image: '/images/toyota/Hibridos/min_bZ4X.png',
        isHybrid: false,
        isElectric: true,
        isNew: true,
        slogan: 'Más que un eléctrico, un eléctrico Toyota'
    },
    {
        id: 'yaris-cross',
        name: 'Yaris Cross',
        category: 'SUV',
        price: 20990000,
        image: '/images/toyota/Hibridos/min_yaris_cross.png',
        isHybrid: true,
        isNew: true,
        slogan: 'Todo eso y más'
    },
    {
        id: 'corolla-sedan',
        name: 'Corolla',
        category: 'Sedán',
        price: 21990000,
        image: '/images/toyota/Sedan/min_corolla.png',
        isHybrid: true,
        isNew: false,
        slogan: 'Sigue haciendo historia'
    },
    {
        id: 'corolla-cross',
        name: 'NEW Corolla Cross',
        category: 'SUV',
        price: 24490000,
        image: '/images/toyota/Hibridos/min_corolla_cross.png',
        isHybrid: true,
        isNew: true,
        slogan: 'La tradición de innovar'
    },
    {
        id: 'rav4',
        name: 'Rav4',
        category: 'SUV',
        price: 30790000,
        image: '/images/toyota/Hibridos/min_rav4.png',
        isHybrid: true,
        isNew: false,
        slogan: 'Recorriendo los caminos'
    },
    {
        id: 'yaris-sedan',
        name: 'Yaris',
        category: 'Sedán',
        price: 11490000,
        image: '/images/toyota/Sedan/min_yaris.png',
        isHybrid: false,
        isNew: false,
        slogan: 'Tu primer Toyota'
    },
    {
        id: 'raize',
        name: 'Raize',
        category: 'SUV',
        price: 13990000,
        image: '/images/toyota/SUV/min_raize.png',
        isHybrid: false,
        isNew: true,
        slogan: 'Conecta con tu lado divertido'
    },
    {
        id: 'land-cruiser-prado',
        name: 'Land Cruiser Prado',
        category: 'SUV',
        price: 48990000,
        image: '/images/toyota/SUV/min_land_cruiser.png',
        isHybrid: false,
        isNew: true,
        slogan: 'Leyenda todoterreno'
    },
    {
        id: 'hilux',
        name: 'Hilux',
        category: 'Camioneta',
        price: 26990000,
        image: '/images/toyota/Pickup/min_hilux.png',
        isHybrid: false,
        isNew: true,
        slogan: 'La pick-up indestructible'
    },
    {
        id: 'fortuner',
        name: 'Fortuner',
        category: 'SUV',
        price: 32990000,
        image: '/images/toyota/SUV/min_fortuner.png',
        isHybrid: false,
        isNew: false,
        slogan: 'Aventura con estilo'
    },
    {
        id: '4runner',
        name: '4Runner',
        category: 'SUV',
        price: 36990000,
        image: '/images/toyota/SUV/min_4runner.png',
        isHybrid: false,
        isNew: false,
        slogan: 'Espíritu libre'
    },
    // Gazoo Racing Line
    {
        id: 'yaris-gr',
        name: 'GR Yaris',
        category: 'Gazoo Racing',
        price: 41990000,
        image: '/images/toyota/Gazoo-Racing/min_yaris_gr.png',
        isHybrid: false,
        isNew: true,
        slogan: 'Adrenaline has a new Generation'
    },
    {
        id: 'hilux-gr',
        name: 'Hilux GR-S',
        category: 'Gazoo Racing',
        price: 43990000,
        image: '/images/toyota/Gazoo-Racing/min_hilux_gr.png',
        isHybrid: false,
        isNew: true,
        slogan: 'Gazoo Racing Sport'
    },
    {
        id: 'fortuner-gr',
        name: 'Fortuner GR-S',
        category: 'Gazoo Racing',
        price: 45990000,
        image: '/images/toyota/Gazoo-Racing/min_fortuner_gr.png',
        isHybrid: false,
        isNew: true,
        slogan: 'Gazoo Racing Sport'
    },
];

const CATEGORIES = ['Todos', 'Citycar', 'Sedán', 'SUV', 'Camioneta', 'Híbrido', 'Gazoo Racing', 'Comercial'];

export default function ToyotaPage() {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps'
    });

    const filteredModels = activeCategory === 'Todos'
        ? TOYOTA_MODELS
        : activeCategory === 'Híbrido'
            ? TOYOTA_MODELS.filter(m => m.isHybrid || m.isElectric)
            : activeCategory === 'Eléctrico'
                ? TOYOTA_MODELS.filter(m => m.isElectric)
                : TOYOTA_MODELS.filter(m => m.category === activeCategory);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };

    return (
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] w-full bg-gray-100 overflow-hidden pt-20">
                {/* Video Background or High Quality Image */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="https://placehold.co/1920x800/e5e7eb/666?text=Toyota+Experience+Banner" // Placeholder
                        alt="Toyota Banner"
                        fill
                        className="object-cover object-center"
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </div>

                <div className="relative z-10 h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-white">
                    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                        <Image
                            src="/images/logos/TOYOTA_Logo.png"
                            alt="Toyota Logo"
                            width={120}
                            height={80}
                            className="mb-6 brightness-0 invert opacity-90"
                        />
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">Let&apos;s Go Places</h1>
                        <p className="text-xl md:text-2xl font-light text-white/90 mb-8 max-w-2xl">
                            Descubre la gama completa de vehículos Toyota. Calidad, durabilidad y confianza en cada kilómetro.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6 overflow-x-auto py-5 scrollbar-hide">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/10'
                                    : 'bg-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Models Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 border-b border-gray-200 pb-4">
                        <h2 className="text-4xl font-bold text-gray-800 tracking-tight">
                            Electromovilidad que se adapta a <br /> tu estilo de vida
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                        {filteredModels.map((model) => (
                            <Link key={model.id} href={`/nuevos/toyota/${model.id}`} className="group block cursor-pointer">
                                {/* Upper Colored Card */}
                                <div className={`relative rounded-[2rem] pt-8 px-8 pb-32 transition-colors duration-300 ${model.isHybrid || model.isElectric ? 'bg-[#dbeafe]' : 'bg-[#f8f8f8]' // Light blue for hybrids (match screenshot), very light gray for others
                                    }`}>

                                    {/* Slogan & Title */}
                                    <div className="relative z-10">
                                        <p className="text-gray-500 text-sm font-medium mb-1 tracking-tight">{model.slogan || 'Calidad Toyota'}</p>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-3xl font-extrabold text-[#1a1a1a] tracking-tight">{model.name}</h3>
                                            {(model.isHybrid || model.isElectric) && (
                                                <div className="flex items-center gap-1 border border-blue-200 rounded-full px-2 py-0.5 bg-white/50 backdrop-blur-sm">
                                                    {/* Simple CSS representation of the HEV logo/orb */}
                                                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-sm" />
                                                    <span className="text-[10px] font-bold text-blue-800 tracking-wider">HEV</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Car Image - Overlapping Bottom */}
                                    <div className="absolute bottom-[-4.5rem] left-1/2 transform -translate-x-1/2 w-[115%] max-w-[380px] h-[220px]">
                                        <Image
                                            src={model.image}
                                            alt={model.name}
                                            fill
                                            className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500 ease-out z-20"
                                        />
                                    </div>
                                </div>

                                {/* Price Information (Below Card) */}
                                <div className="mt-20 text-center">
                                    <p className="text-gray-800 text-lg font-medium">
                                        Desde <span className="font-bold">{formatPrice(model.price)}</span>(*)
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        +I.V. {formatPrice(model.price * 0.19).replace('$', '')}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Discover More Section */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col mb-12 items-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-center">
                            Descubre más <span className="text-red-600">Toyota</span>
                        </h2>
                        <div className="w-24 h-1 bg-red-600 rounded-full mt-4"></div>
                    </div>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4 touch-pan-y">
                            {[
                                {
                                    id: 1,
                                    title: "Agenda tu Hora",
                                    subtitle: "Servicio Técnico",
                                    link: "/servicio-tecnico",
                                    image: "/images/quick_access_servicio_1770350934207.png"
                                },
                                {
                                    id: 2,
                                    title: "Cotizar Repuestos",
                                    subtitle: "Repuestos Genuinos",
                                    link: "/repuestos",
                                    image: "/images/quick_access_repuestos_1770350949447.png"
                                },
                                {
                                    id: 3,
                                    title: "Autos Usados Toyota",
                                    subtitle: "Calidad Garantizada",
                                    link: "https://seminuevos.automotrizcarmona.cl/catalogo?brand=toyota",
                                    image: "/images/quick_access_seminuevos_1770350918685.png"
                                },
                                {
                                    id: 4,
                                    title: "Nuestras Sucursales",
                                    subtitle: "Encuentra la más cercana",
                                    link: "/sucursales",
                                    image: "/images/discover_sucursales_retry.png"
                                }
                            ].map((item) => (
                                <div key={item.id} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_25%] pl-4 min-w-0">
                                    <Link href={item.link} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">

                                        {/* Image */}
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10">
                                            <p className="text-sm font-medium text-red-500 mb-1 uppercase tracking-wider">{item.subtitle}</p>
                                            <h3 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">
                                                {item.title}
                                            </h3>

                                            <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                <span>EXPLORAR</span>
                                                <ChevronRight size={16} />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
