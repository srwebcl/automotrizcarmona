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
    layoutBrands,
    targetVin
}: { 
    allPromoUnits: any[], 
    title: string, 
    subtitle?: string,
    layoutBrands: { cars: any[], trucks: any[] },
    targetVin?: string
}) {
    const [activeBrand, setActiveBrand] = useState('Todas');
    const gridRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!targetVin) return;

        const targetUnit = allPromoUnits.find(u => u.vin === targetVin);
        if (!targetUnit) return; // Si no existe el VIN, no hace nada

        const targetBrand = targetUnit.brand.toLowerCase();

        // 1. Cambiamos la marca si es necesario
        if (activeBrand.toLowerCase() !== targetBrand) {
            setActiveBrand(targetBrand);
            return; // Esperamos al siguiente render con la marca correcta filtrada
        }

        // 2. Lógica Agresiva de Scroll: Vencer a la restauración de scroll de Next.js
        const scrollToElement = () => {
            const el = document.getElementById(`unit-${targetVin}`);
            if (el) {
                // Usamos un offset para no quedar debajo del navbar
                const yOffset = -100;
                const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        };

        // Múltiples reintentos garantizan que si Next.js o la carga de imágenes 
        // reinician la vista hacia arriba, nosotros la volvemos a bajar.
        const t1 = setTimeout(scrollToElement, 100);   // Inmediato tras render
        const t2 = setTimeout(scrollToElement, 600);   // Post-hidratación
        const t3 = setTimeout(scrollToElement, 1200);  // Seguridad final

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [targetVin, activeBrand, allPromoUnits]);

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
                            {title}
                        </span>
                        <span className="ml-2 inline-block animate-bounce">🔥</span>
                    </h1>
                    {subtitle && (
                        <p className="text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed px-4 italic">
                            {subtitle}
                        </p>
                    )}
                </div>
            </section>

            {/* UNITS GRID */}
            <section ref={gridRef} className="max-w-[1920px] mx-auto px-4 md:px-8 py-12 bg-white">
                {filteredUnits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                        {filteredUnits.map((unit, idx) => {
                            const isSold = unit.status === 'vendido';
                            const isReserved = unit.status === 'reservado';
                            const isAvailable = !isSold && !isReserved;

                            return (
                            <div 
                                key={`${unit.vin}-${idx}`} 
                                id={`unit-${unit.vin}`}
                                className={`group flex flex-col relative overflow-hidden rounded-[2.5rem] bg-transparent transition-all duration-1000 ${targetVin === unit.vin ? 'ring-4 ring-[#d2001c] ring-offset-4 ring-offset-gray-50 scale-[1.02]' : ''}`}
                            >
                                
                                {/* Status Banner (Diagonal) */}
                                {isSold && (
                                    <div className="absolute top-10 -right-10 z-50 transform rotate-45 w-48 text-center py-2 shadow-2xl bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-[11px] uppercase tracking-[0.2em] border-y border-red-400/30">
                                        Vendido 🤝
                                    </div>
                                )}
                                {isReserved && (
                                    <div className="absolute top-10 -right-10 z-50 transform rotate-45 w-48 text-center py-2 shadow-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-white font-black text-[11px] uppercase tracking-[0.2em] border-y border-amber-300/30">
                                        Reservado ⏳
                                    </div>
                                )}

                                {/* Main Card Body - Striking Design */}
                                <div className={`relative rounded-[2.5rem] bg-white pt-8 px-8 pb-24 transition-all duration-500 border-2 border-gray-50 overflow-visible shadow-sm ${isAvailable ? 'group-hover:shadow-[0_20px_50px_rgba(210,0,28,0.1)] group-hover:border-[#d2001c]/20' : 'opacity-80 grayscale-[0.3]'}`}>
                                    {/* Top Controls: Liquidation Tag & Share */}
                                    <div className="absolute top-6 left-6 right-6 z-30 flex justify-between items-center">
                                        <div className="bg-[#d2001c] text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#d2001c]/20">
                                            <Flame size={12} fill="currentColor" />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Liquidación</span>
                                        </div>
                                        <ShareButton 
                                            title={`Liquidación ${unit.brand} ${unit.modelName}`}
                                            url={typeof window !== 'undefined' ? `${window.location.origin}/liquidacion?vin=${unit.vin}` : `https://automotrizcarmona.cl/liquidacion?vin=${unit.vin}`}
                                        />
                                    </div>

                                    {/* Info Header */}
                                    <div className="relative z-10 mt-2">
                                        <p className="text-[#d2001c] text-[10px] font-black mb-1 uppercase tracking-[0.2em]">{unit.brand}</p>
                                        <h3 className={`text-2xl font-black text-[#1a1a1a] tracking-tight uppercase leading-tight mb-1 transition-colors ${isAvailable ? 'group-hover:text-[#d2001c]' : ''}`}>{unit.modelName}</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider line-clamp-1 mb-4">{unit.versionName}</p>
                                        
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-100">
                                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Unidad VIN:</span>
                                            <span className="text-[10px] font-bold text-gray-900 tracking-tighter">{unit.vin}</span>
                                        </div>
                                    </div>

                                    {/* Overlapping Image - More compact */}
                                    <div className="absolute bottom-[-3.5rem] left-1/2 transform -translate-x-1/2 w-[105%] max-w-[340px] aspect-[16/10] z-20">
                                        <Image
                                            src={unit.image}
                                            alt={unit.modelName}
                                            fill
                                            className={`object-contain drop-shadow-2xl transition-transform duration-700 ease-out ${isAvailable ? 'group-hover:scale-105' : ''}`}
                                        />
                                    </div>
                                    
                                    {/* Subtle Background Badge */}
                                    <div className={`absolute bottom-10 right-10 text-[6rem] font-black text-gray-50 select-none -z-0 pointer-events-none transition-colors uppercase italic ${isAvailable ? 'group-hover:text-red-50' : ''}`}>
                                        {unit.brand.substring(0, 3)}
                                    </div>
                                </div>

                                {/* Price Info - Striking & Compact */}
                                <div className="mt-14 px-4 text-center pb-2">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-sm font-bold text-gray-300 line-through decoration-[#d2001c]/30">
                                                {formatPrice(unit.listPrice || (unit.promoPrice + unit.promoBonus))}
                                            </span>
                                            <div className="bg-[#d2001c] text-white px-3 py-1 rounded-md text-[10px] font-black animate-pulse">
                                                AHORRA {formatPrice(unit.promoBonus)}
                                            </div>
                                        </div>
                                        
                                        <div className={`mb-6 bg-gray-50 w-full py-4 rounded-2xl border border-gray-100 transition-colors ${isAvailable ? 'group-hover:bg-[#d2001c]/5 group-hover:border-[#d2001c]/10' : ''}`}>
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Precio Final de Liquidación</p>
                                            <p className="text-5xl font-black text-gray-900 tracking-tighter leading-none">{formatPrice(unit.promoPrice)}</p>
                                        </div>

                                        {isAvailable ? (
                                            <Link 
                                                href={`/cotizar?marca=${encodeURIComponent(unit.brand)}&modelo=${encodeURIComponent(unit.modelId || unit.modelName)}&version=${encodeURIComponent(unit.versionName || '')}&vin=${encodeURIComponent(unit.vin)}`}
                                                className="w-full inline-flex items-center justify-center gap-3 py-3.5 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#d2001c] transition-all shadow-xl hover:shadow-[#d2001c]/30 hover:scale-[1.02] active:scale-100 group/btn"
                                            >
                                                Lo quiero ahora <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                                            </Link>
                                        ) : (
                                            <div className={`w-full inline-flex items-center justify-center gap-3 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] cursor-not-allowed border ${isSold ? 'bg-red-50 text-red-400 border-red-100' : 'bg-amber-50 text-amber-500 border-amber-100'}`}>
                                                {isSold ? '🤝 Ya tiene dueño' : '⏳ Esperando Confirmación'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            );
                        })}
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
