'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Truck, Sparkles } from 'lucide-react';

import { getLayoutBrands, LayoutBrandsData } from '@/lib/api/layoutBrands';

export default function CamionesPage() {
    const [layoutBrands, setLayoutBrands] = React.useState<LayoutBrandsData>({ cars: [], trucks: [] });
    
    React.useEffect(() => {
        getLayoutBrands().then(setLayoutBrands);
    }, []);

    const ALL_BRANDS = [
        ...layoutBrands.trucks.map(b => ({ ...b, type: 'truck' }))
    ];

    return (
        <main className="min-h-screen bg-[#f8f9fa]">

            {/* Header Section */}
            <section className="pt-40 pb-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="text-blue-600" size={18} />
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em]">Camiones y Buses</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[#1a1a1a] mb-6 tracking-tight">
                        Conoce nuestras <span className="text-blue-600">Marcas Relevantes</span>
                    </h1>
                    <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto">
                        Concesionario líder de vehículos de carga y pasajeros de la tercera y cuarta región.
                    </p>
                </div>
            </section>

            {/* Brands Content */}
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                    {ALL_BRANDS.map((brand, idx) => (
                        <Link
                            key={`${brand.slug}-${idx}`}
                            href={`/camiones/${brand.slug}`}
                            className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-600 transition-all duration-500 h-44 flex flex-col items-center justify-center relative overflow-hidden"
                        >
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <div className="relative w-full h-16 transition-all duration-500 group-hover:scale-110">
                                <Image
                                    src={brand.logo_url}
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
