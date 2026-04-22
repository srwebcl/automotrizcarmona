'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Info, Flame } from 'lucide-react';

import ShareButton from '@/components/ShareButton';

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
    const gridRef = React.useRef<HTMLDivElement>(null);

    const brandsInPromo = useMemo(() => {
        const uniqueBrandSlugs = Array.from(new Set(allPromoUnits.map(u => u.brand.toLowerCase())));
        const allBrands = [...layoutBrands.cars, ...layoutBrands.trucks];
        return allBrands.filter(b => uniqueBrandSlugs.includes(b.slug.toLowerCase()));
    }, [allPromoUnits, layoutBrands]);

    const filteredUnits = useMemo(() => {
        if (activeBrand === 'Todas') return allPromoUnits;
        return allPromoUnits.filter(u => u.brand.toLowerCase() === activeBrand.toLowerCase());
    }, [activeBrand, allPromoUnits]);

    const handleBrandChange = (brandSlug: string) => {
        setActiveBrand(brandSlug);
        // Pequeño delay para dejar que el filtrado ocurra antes de scrollear
        setTimeout(() => {
            if (gridRef.current) {
                const yOffset = -180;
                const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <>
            {/* FILTER BAR - Logos por Marca */}
            <section className="sticky top-[68px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide justify-center md:justify-start">
                        <button
                            onClick={() => handleBrandChange('Todas')}
                            className={`whitespace-nowrap text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all ${activeBrand === 'Todas'
                                ? 'bg-black text-white shadow-lg'
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-900'
                                }`}
                        >
                            Ver Todo
                        </button>
                        
                        <div className="h-6 w-px bg-gray-200 hidden md:block" />

                        {brandsInPromo.map((brand: any) => (
                            <button
                                key={brand.slug}
                                onClick={() => handleBrandChange(brand.slug)}
                                className={`relative flex-shrink-0 w-20 h-10 transition-all duration-300 ${activeBrand.toLowerCase() === brand.slug.toLowerCase()
                                    ? 'grayscale opacity-30 scale-90'
                                    : 'opacity-100 grayscale-0 hover:scale-110'
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
            <section className="pt-12 pb-2 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 uppercase">
                            {title} 🔥
                        </span>
                    </h1>
                    {subtitle && (
                        <p className="text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed px-4">
                            {subtitle}
                        </p>
                    )}
                </div>
            </section>

            {/* UNITS GRID */}
            <section ref={gridRef} className="max-w-[1920px] mx-auto px-4 md:px-8 py-12 bg-white">
                {filteredUnits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                        {filteredUnits.map((unit, idx) => (
                            <div key={`${unit.vin}-${idx}`} className="group flex flex-col">
                                {/* Main Card Body - Compact Version */}
                                <div className="relative rounded-[2rem] bg-[#f8f8f8] pt-8 px-8 pb-24 transition-all duration-500 group-hover:shadow-xl group-hover:bg-white border border-transparent group-hover:border-gray-100 overflow-visible">
                                    {/* Liquid Tag & Share */}
                                    <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center">
                                        <div className="bg-[#d2001c] text-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md shadow-[#d2001c]/20">
                                            <Flame size={12} fill="currentColor" />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Oferta</span>
                                        </div>
                                        <ShareButton 
                                            title={`Liquidación ${unit.brand} ${unit.modelName}`}
                                            url={`https://automotrizcarmona.cl/liquidacion?vin=${unit.vin}`}
                                        />
                                    </div>

                                    {/* Info Header */}
                                    <div className="relative z-10 mt-4">
                                        <p className="text-gray-400 text-[9px] font-black mb-1 uppercase tracking-[0.2em]">{unit.brand}</p>
                                        <h3 className="text-2xl font-black text-[#1a1a1a] tracking-tight uppercase leading-tight mb-1">{unit.modelName}</h3>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider line-clamp-1 opacity-60 mb-3">{unit.versionName}</p>
                                        
                                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white rounded-md border border-gray-100">
                                            <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">VIN:</span>
                                            <span className="text-[9px] font-bold text-gray-700">{unit.vin}</span>
                                        </div>
                                    </div>

                                    {/* Overlapping Image - More compact */}
                                    <div className="absolute bottom-[-3.5rem] left-1/2 transform -translate-x-1/2 w-[105%] max-w-[340px] aspect-[16/10] z-20">
                                        <Image
                                            src={unit.image}
                                            alt={unit.modelName}
                                            fill
                                            className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                    </div>
                                </div>

                                {/* Price Info - Improved Hierarchy */}
                                <div className="mt-14 px-2 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="text-sm font-bold text-gray-300 line-through decoration-gray-400/50">
                                                {formatPrice(unit.listPrice || (unit.promoPrice + unit.promoBonus))}
                                            </span>
                                            <span className="text-xs font-black text-[#d2001c] bg-[#d2001c]/10 px-3 py-1 rounded-lg">
                                                Bono: -{formatPrice(unit.promoBonus)}
                                            </span>
                                        </div>
                                        
                                        <div className="mb-6">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Precio Liquidación</p>
                                            <p className="text-5xl font-black text-gray-900 tracking-tighter leading-none">{formatPrice(unit.promoPrice)}</p>
                                        </div>

                                        <Link 
                                            href={`/cotizar?marca=${encodeURIComponent(unit.brand)}&modelo=${encodeURIComponent(unit.modelId || unit.modelName)}&version=${encodeURIComponent(unit.versionName || '')}&vin=${encodeURIComponent(unit.vin)}`}
                                            className="w-full inline-flex items-center justify-center gap-3 py-4 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#d2001c] transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-100 group/btn"
                                        >
                                            Quiero esta Unidad <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
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
                            onClick={() => handleBrandChange('Todas')}
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
