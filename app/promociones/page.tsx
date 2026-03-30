'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ALL_MODELS } from '@/lib/models';
import { Tag, ArrowRight, Info, Filter, Hash, Flame } from 'lucide-react';

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export default function PromocionesPage() {
    const allPromoUnits = useMemo(() => {
        return ALL_MODELS.filter(m => m.isPromotion && m.promoUnits).flatMap(model => 
            (model.promoUnits || []).map(unit => ({
                ...unit,
                modelId: model.id,
                brand: model.brand,
                category: model.category,
                image: model.image,
                modelName: model.name
            }))
        );
    }, []);
    
    const availableBrands = useMemo(() => 
        Array.from(new Set(allPromoUnits.map(u => u.brand))).sort()
    , [allPromoUnits]);

    const categories = useMemo(() => 
        ['Todas', ...Array.from(new Set(allPromoUnits.map(u => u.category))).sort()]
    , [allPromoUnits]);

    const [activeBrand, setActiveBrand] = useState('Todas');
    const [activeCategory, setActiveCategory] = useState('Todas');

    const filteredUnits = allPromoUnits.filter(u => {
        const brandMatch = activeBrand === 'Todas' || u.brand === activeBrand;
        const categoryMatch = activeCategory === 'Todas' || u.category === activeCategory;
        return brandMatch && categoryMatch;
    });

    return (
        <main className="min-h-screen bg-gray-50 pt-20 font-sans selection:bg-[#d2001c] selection:text-white">
            {/* HERO SECTION */}
            <section className="relative w-full h-[400px] md:h-[500px] bg-black overflow-hidden flex items-center pt-10">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
                    <Image 
                        src="/images/cupra/Formentor/banner/banner.webp" 
                        alt="Promociones Automotriz Carmona" 
                        fill 
                        className="object-cover opacity-60 grayscale"
                        priority
                    />
                </div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#d2001c] rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                        <Tag size={12} fill="white" /> Oportunidades por VIN
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
                        Liquidación <br/>
                        <span className="text-[#d2001c]">de Stock</span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-xl font-light">
                        Unidades físicas con bonos especiales directos por número de chasis (VIN). 
                        Válido hasta agotar existencias.
                    </p>
                </div>
            </section>

            {/* MARCAS BAR */}
            <div className="sticky top-[88px] z-30 bg-white border-b border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-6 flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth">
                    <button 
                        onClick={() => setActiveBrand('Todas')}
                        className={`flex-shrink-0 px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeBrand === 'Todas' ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                        Todas
                    </button>
                    {availableBrands.map(brand => (
                        <button 
                            key={brand}
                            onClick={() => setActiveBrand(brand)}
                            className={`flex-shrink-0 px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeBrand === brand ? 'bg-[#d2001c] text-white shadow-xl shadow-[#d2001c]/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            <span className="uppercase">{brand}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* CATALOG CONTENT */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* SIDEBAR */}
                    <div className="hidden lg:block lg:w-64 flex-shrink-0">
                        <div className="sticky top-[200px] space-y-10">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-3">
                                    <Filter size={16} className="text-[#d2001c]" /> Categoría
                                </h3>
                                <div className="space-y-3">
                                    {categories.map(cat => (
                                        <button 
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`w-full text-left px-4 py-3 rounded-2xl text-[13px] font-bold transition-all ${activeCategory === cat ? 'bg-white shadow-sm text-[#d2001c] ring-1 ring-gray-100' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* UNITS GRID */}
                    <div className="flex-1">
                        {filteredUnits.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {filteredUnits.map((unit, idx) => (
                                    <div 
                                        key={`${unit.vin}-${idx}`}
                                        className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_45px_100px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full"
                                    >
                                        <div className="relative h-64 w-full bg-[#f8f9fa] flex items-center justify-center p-12">
                                            <div className="absolute top-8 left-8 z-10">
                                                <div className="bg-orange-100 text-orange-600 p-2.5 rounded-full animate-pulse shadow-lg ring-4 ring-white">
                                                    <Flame size={22} fill="currentColor" />
                                                </div>
                                            </div>
                                            <Image 
                                                src={unit.image} 
                                                alt={unit.modelName} 
                                                fill 
                                                className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>

                                        <div className="p-12 flex-1 flex flex-col">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{unit.brand}</span>
                                                <div className="h-1 w-1 rounded-full bg-gray-200" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d2001c]">{unit.category}</span>
                                            </div>
                                            
                                            <h3 className="text-4xl font-black uppercase tracking-tight text-gray-900 leading-none mb-2">{unit.modelName}</h3>
                                            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1">{unit.versionName}</p>
                                            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-12">
                                                VIN: <span className="text-gray-900 font-bold">{unit.vin}</span>
                                            </p>

                                            <div className="mt-auto">
                                                <div className="flex flex-col pb-10 mb-10 border-b border-gray-100">
                                                    {/* BONO ARRIBA */}
                                                    <p className="text-[11px] font-black text-[#d2001c] uppercase tracking-[0.1em] mb-8 leading-none">
                                                        Bono Promocional: {formatPrice(unit.promoBonus)}
                                                    </p>
                                                    
                                                    {/* PRECIO BLOQUE */}
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">
                                                        Precio Especial
                                                    </p>
                                                    <div className="flex flex-col gap-1 items-start">
                                                        <span className="text-5xl font-black text-gray-900 tracking-tighter leading-none mb-2">{formatPrice(unit.promoPrice)}</span>
                                                        <span className="text-base font-bold text-gray-300 line-through decoration-gray-400 leading-none mb-6">
                                                            {formatPrice(unit.promoPrice + unit.promoBonus)}
                                                        </span>
                                                    </div>
                                                    
                                                    <p className="text-[10px] text-gray-400 flex items-center gap-1.5 font-medium italic">
                                                        <Info size={12} className="text-gray-300" /> Válido para esta unidad física.
                                                    </p>
                                                </div>

                                                <Link 
                                                    href={`/contacto?modelo=${encodeURIComponent(unit.modelName)}&vin=${unit.vin}&version=${encodeURIComponent(unit.versionName)}`}
                                                    className="w-full flex items-center justify-center gap-3 py-6 bg-black text-white rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#d2001c] transition-all shadow-xl shadow-black/10 group/btn"
                                                >
                                                    Quiero Cotizar <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center">
                                <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900">No hay liquidaciones</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
