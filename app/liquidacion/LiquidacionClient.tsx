'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Info, Flame } from 'lucide-react';

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export default function LiquidacionClient({ 
    allPromoUnits, 
    title, 
    subtitle,
    layoutBrands
}: { 
    allPromoUnits: any[], 
    title: string, 
    subtitle?: string,
    layoutBrands: { cars: any[], trucks: any[] }
}) {
    const [activeBrand, setActiveBrand] = useState('Todas');

    const brandsInPromo = useMemo(() => {
        const uniqueBrandSlugs = Array.from(new Set(allPromoUnits.map(u => u.brand.toLowerCase())));
        const allBrands = [...layoutBrands.cars, ...layoutBrands.trucks];
        return allBrands.filter(b => uniqueBrandSlugs.includes(b.slug.toLowerCase()));
    }, [allPromoUnits, layoutBrands]);

    const filteredUnits = useMemo(() => {
        if (activeBrand === 'Todas') return allPromoUnits;
        return allPromoUnits.filter(u => u.brand.toLowerCase() === activeBrand.toLowerCase());
    }, [activeBrand, allPromoUnits]);

    return (
        <>
            {/* FILTER BAR - Logos por Marca */}
            <section className="sticky top-[68px] z-40 bg-white shadow-md border-b border-gray-100">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide justify-center md:justify-start">
                        <button
                            onClick={() => setActiveBrand('Todas')}
                            className={`whitespace-nowrap text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full transition-all border ${activeBrand === 'Todas'
                                ? 'bg-black text-white border-black shadow-lg'
                                : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-gray-900 hover:text-gray-900'
                                }`}
                        >
                            Todas las Marcas
                        </button>
                        
                        <div className="h-8 w-px bg-gray-200 hidden md:block" />

                        {brandsInPromo.map((brand: any) => (
                            <button
                                key={brand.slug}
                                onClick={() => setActiveBrand(brand.slug)}
                                className={`relative flex-shrink-0 w-24 h-12 transition-all p-2 rounded-xl border-2 ${activeBrand.toLowerCase() === brand.slug.toLowerCase()
                                    ? 'border-black bg-gray-50 scale-110 shadow-sm'
                                    : 'border-transparent opacity-40 hover:opacity-100 grayscale hover:grayscale-0'
                                    }`}
                            >
                                <Image 
                                    src={brand.logo_url} 
                                    alt={brand.name} 
                                    fill 
                                    className="object-contain p-1"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* HEADER INFO SECTION */}
            <section className="pt-20 pb-4 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-medium text-gray-900 tracking-tight mb-6">
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 uppercase">
                            {title}
                        </span>
                    </h1>
                    {subtitle && (
                        <p className="text-lg md:text-xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed px-4">
                            {subtitle}
                        </p>
                    )}
                </div>
            </section>

            {/* UNITS GRID */}
            <section className="max-w-[1920px] mx-auto px-4 md:px-8 py-20 bg-white">
                {filteredUnits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-32">
                        {filteredUnits.map((unit, idx) => (
                            <div key={`${unit.vin}-${idx}`} className="group flex flex-col">
                                {/* Main Card Body - Brand Page Style */}
                                <div className="relative rounded-[2.5rem] bg-[#f8f8f8] pt-10 px-8 pb-32 transition-all duration-500 group-hover:shadow-2xl group-hover:bg-white border border-transparent group-hover:border-gray-100">
                                    {/* Liquid Tag */}
                                    <div className="absolute top-8 right-8 z-20">
                                        <div className="bg-[#d2001c] text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#d2001c]/30">
                                            <Flame size={14} fill="currentColor" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Liquidación</span>
                                        </div>
                                    </div>

                                    {/* Info Header */}
                                    <div className="relative z-10">
                                        <p className="text-gray-400 text-[10px] font-black mb-2 uppercase tracking-[0.2em]">{unit.brand}</p>
                                        <h3 className="text-3xl font-black text-[#1a1a1a] tracking-tight uppercase leading-none mb-2">{unit.modelName}</h3>
                                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider line-clamp-1 opacity-70 mb-4">{unit.versionName}</p>
                                        
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-gray-100 shadow-sm">
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">VIN:</span>
                                            <span className="text-[10px] font-bold text-gray-900">{unit.vin}</span>
                                        </div>
                                    </div>

                                    {/* Overlapping Image */}
                                    <div className="absolute bottom-[-5rem] left-1/2 transform -translate-x-1/2 w-[115%] max-w-[420px] aspect-[16/10] z-20">
                                        <Image
                                            src={unit.image}
                                            alt={unit.modelName}
                                            fill
                                            className="object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                    </div>
                                </div>

                                {/* Price Info - Below Card */}
                                <div className="mt-24 px-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[11px] font-black text-[#d2001c] uppercase tracking-[0.25em] mb-2 bg-[#d2001c]/5 px-4 py-1 rounded-full">
                                            Bono: {formatPrice(unit.promoBonus)}
                                        </span>
                                        
                                        <div className="mb-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">Precio Liquidación</p>
                                            <p className="text-4xl font-black text-gray-900 tracking-tighter leading-none">{formatPrice(unit.promoPrice)}</p>
                                        </div>

                                        <p className="text-xs font-bold text-gray-300 line-through decoration-gray-400/50 mt-3">
                                            Normal: {formatPrice(unit.listPrice || (unit.promoPrice + unit.promoBonus))}
                                        </p>

                                        <Link 
                                            href={`/cotizar?marca=${encodeURIComponent(unit.brand)}&modelo=${encodeURIComponent(unit.modelId || unit.modelName)}&version=${encodeURIComponent(unit.versionName || '')}&vin=${encodeURIComponent(unit.vin)}`}
                                            className="mt-8 w-full inline-flex items-center justify-center gap-3 py-4 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#d2001c] transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-100 group/btn"
                                        >
                                            Cotizar Unidad <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-gray-400">No hay unidades para esta marca</h3>
                        <p className="text-gray-500 mt-2 font-medium">Explora otras marcas para ver oportunidades disponibles.</p>
                        <button 
                            onClick={() => setActiveBrand('Todas')}
                            className="mt-6 text-sm font-black uppercase tracking-widest text-[#d2001c] hover:underline"
                        >
                            Ver todo el stock
                        </button>
                    </div>
                )}
            </section>
        </>
    );
}
