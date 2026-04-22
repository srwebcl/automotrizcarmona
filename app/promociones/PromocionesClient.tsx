'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Info, Flame } from 'lucide-react';

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export default function PromocionesClient({ allPromoUnits }: { allPromoUnits: any[] }) {
    const [activeBrand, setActiveBrand] = useState('Todas');

    const brandNames = ['Todas', ...Array.from(new Set(allPromoUnits.map(u => u.brand))).sort()];

    const filteredUnits = useMemo(() => {
        if (activeBrand === 'Todas') return allPromoUnits;
        return allPromoUnits.filter(u => u.brand === activeBrand);
    }, [activeBrand, allPromoUnits]);

    return (
        <>
            {/* FILTER BAR - Floating Pills por Marca */}
            <section className="sticky top-[68px] z-40 bg-white shadow-md border-b border-gray-100">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide justify-center md:justify-start">
                        {brandNames.map((brandInfo: string) => (
                            <button
                                key={brandInfo}
                                onClick={() => setActiveBrand(brandInfo)}
                                className={`whitespace-nowrap text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all border ${activeBrand === brandInfo
                                    ? 'bg-[#d2001c] text-white border-[#d2001c] shadow-lg shadow-[#d2001c]/30'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#d2001c]/50 hover:text-[#d2001c]'
                                    }`}
                            >
                                {brandInfo}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* UNITS GRID */}
            <section className="max-w-[1920px] mx-auto px-4 md:px-6 py-16 bg-white">
                {filteredUnits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
                        {filteredUnits.map((unit, idx) => (
                            <div 
                                key={`${unit.vin}-${idx}`}
                                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="relative h-48 w-full bg-[#f8f9fa] flex items-center justify-center p-6">
                                    <div className="absolute top-4 left-4 z-10">
                                        <div className="bg-orange-100 text-orange-600 p-2 rounded-full animate-pulse shadow-sm">
                                            <Flame size={16} fill="currentColor" />
                                        </div>
                                    </div>
                                    <Image 
                                        src={unit.image} 
                                        alt={unit.modelName} 
                                        fill 
                                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 capitalize">{unit.brand}</span>
                                        <div className="h-1 w-1 rounded-full bg-gray-200" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#d2001c]">{unit.category}</span>
                                    </div>
                                    
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 leading-tight mb-1">{unit.modelName}</h3>
                                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 line-clamp-1" title={unit.versionName}>{unit.versionName}</p>
                                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-6">
                                        VIN: <span className="text-gray-900 font-bold">{unit.vin}</span>
                                    </p>

                                    <div className="mt-auto">
                                        <div className="flex flex-col pb-5 mb-5 border-b border-gray-100">
                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] leading-none mb-1">
                                                        Precio Especial
                                                    </p>
                                                    <span className="text-3xl font-black text-gray-900 tracking-tighter leading-none">{formatPrice(unit.promoPrice)}</span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[9px] font-black text-[#d2001c] uppercase tracking-[0.1em] mb-1 leading-none">
                                                        Bono
                                                    </p>
                                                    <span className="text-sm font-bold text-[#d2001c] bg-[#d2001c]/10 px-2 py-1 rounded-md">{formatPrice(unit.promoBonus)}</span>
                                                </div>
                                            </div>
                                            
                                            <span className="text-xs font-bold text-gray-300 line-through decoration-gray-400 mb-2">
                                                Normal: {formatPrice(unit.promoPrice + unit.promoBonus)}
                                            </span>
                                            
                                            <p className="text-[9px] text-gray-400 flex items-center gap-1.5 font-medium italic mt-1">
                                                <Info size={10} className="text-gray-300" /> Válido para esta unidad física.
                                            </p>
                                        </div>

                                        <Link 
                                            href={`/cotizar?marca=${encodeURIComponent(unit.brand)}&modelo=${encodeURIComponent(unit.modelId || unit.modelName)}&version=${encodeURIComponent(unit.versionName || '')}&vin=${encodeURIComponent(unit.vin)}`}
                                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#d2001c] transition-colors shadow-md group/btn"
                                        >
                                            Quiero Cotizar <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900">No hay liquidaciones publicadas</h3>
                        <p className="text-gray-500 mt-2">Pronto tendremos nuevas unidades disponibles.</p>
                    </div>
                )}
            </section>
        </>
    );
}
