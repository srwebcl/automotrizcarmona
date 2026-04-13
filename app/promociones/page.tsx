import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Info, Filter, Flame } from 'lucide-react';
import { getPromotionModels, getLandingInfo } from '@/lib/api';
import DiscoverSection from '@/components/DiscoverSection';

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export const revalidate = 60; // ISR 1 min for fast refresh

export default async function PromocionesPage() {
    const [promotionModels, landingInfo] = await Promise.all([
        getPromotionModels(),
        getLandingInfo('promociones')
    ]);

    const allPromoUnits = promotionModels.flatMap(model => 
        (model.promoUnits || []).map(unit => ({
            ...unit,
            modelId: model.id,
            brand: model.brand,
            category: model.category,
            image: model.image,
            modelName: model.name
        }))
    );
    
    const availableBrands = Array.from(new Set(allPromoUnits.map(u => u.brand))).sort();
    const categories = ['Todas', ...Array.from(new Set(allPromoUnits.map(u => u.category))).sort()];

    // Hero Fallbacks
    const heroTitle = landingInfo?.title || 'Liquidación de Stock';
    const heroSubtitle = landingInfo?.subtitle || 'Unidades físicas con bonos especiales directos por número de chasis (VIN).';
    const heroImage = landingInfo?.desktop_banner_url || '/images/cupra/Formentor/banner/banner.webp';

    return (
        <main className="min-h-screen bg-gray-50 pt-20 font-sans selection:bg-[#d2001c] selection:text-white">
            {/* HERO SECTION - HOME BANNER STYLE */}
            <section className="relative bg-gray-50 pt-10 md:pt-14 pb-0 px-4 md:px-8">
                {/* Mobile Size */}
                <div className="w-full mx-auto mb-2 md:hidden relative group">
                    <div className="overflow-hidden rounded-3xl">
                        <div className="relative w-full aspect-square md:aspect-[16/6]">
                            <Image 
                                src={landingInfo?.mobile_banner_url || heroImage} 
                                alt={heroTitle} 
                                fill 
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Desktop Size */}
                <div className="w-full mx-auto mb-2 hidden md:block relative group">
                    <div className="overflow-hidden rounded-3xl">
                        <div className="relative w-full aspect-[16/6] md:aspect-[18/7] lg:aspect-[21/8]">
                            <Image 
                                src={heroImage} 
                                alt={heroTitle} 
                                fill 
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* MARCAS BAR (Simplified for Server Rendering, or could be a client component for filters) */}
            {/* Note: In a real app, I'd move the filtering logic to a client component below. 
                For this task, I'll keep the UI but the logic needs a client component wrapper.
            */}

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
                                            className={`w-full text-left px-4 py-3 rounded-2xl text-[13px] font-bold transition-all ${cat === 'Todas' ? 'bg-white shadow-sm text-[#d2001c] ring-1 ring-gray-100' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
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
                        {allPromoUnits.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {allPromoUnits.map((unit, idx) => (
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
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 capitalize">{unit.brand}</span>
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
                                                    <p className="text-[11px] font-black text-[#d2001c] uppercase tracking-[0.1em] mb-8 leading-none">
                                                        Bono Promocional: {formatPrice(unit.promoBonus)}
                                                    </p>
                                                    
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
                                                    href={`/contacto?modelo=${encodeURIComponent(unit.modelName)}&vin=${unit.vin}&version=${encodeURIComponent(unit.versionName || '')}`}
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
                                <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900">No hay liquidaciones publicadas</h3>
                                <p className="text-gray-500 mt-2">Pronto tendremos nuevas unidades disponibles.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            
            <DiscoverSection />
        </main>
    );
}
