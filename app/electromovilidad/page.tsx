import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Zap, ArrowRight, Info, Filter } from 'lucide-react';
import { getElectromovilidadModels, getLandingInfo } from '@/lib/api';
import DiscoverSection from '@/components/DiscoverSection';

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export const revalidate = 60;

export default async function ElectromovilidadPage() {
    const [ecoModels, landingInfo] = await Promise.all([
        getElectromovilidadModels(),
        getLandingInfo('electromovilidad')
    ]);

    const categories = ['Todas', ...Array.from(new Set(ecoModels.map(m => m.category))).sort()];

    // Hero Fallbacks
    const heroTitle = landingInfo?.title || 'Movilidad Sostenible';
    const heroSubtitle = landingInfo?.subtitle || 'Descubre nuestra gama de vehículos híbridos y eléctricos. El futuro de la conducción hoy en Automotriz Carmona.';
    const heroImage = landingInfo?.desktop_banner_url || '/images/volkswagen/SUV/id4/galeria_2348.jpg';

    return (
        <main className="min-h-screen bg-white pt-20 font-sans selection:bg-green-600 selection:text-white">
            {/* HERO SECTION */}
            <section className="relative w-full h-[450px] md:h-[600px] bg-black overflow-hidden flex items-center pt-10">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                    <Image 
                        src={heroImage} 
                        alt={heroTitle} 
                        fill 
                        className="object-cover opacity-70"
                        priority
                    />
                </div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                        <Leaf size={12} fill="white" /> Eco-Conducción
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none max-w-2xl whitespace-pre-line">
                        {heroTitle}
                    </h1>
                    <p className="text-lg text-gray-200 max-w-xl font-light">
                        {heroSubtitle}
                    </p>
                </div>
            </section>

            {/* CATALOG CONTENT */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-24">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* SIDEBAR */}
                    <div className="hidden lg:block lg:w-64 flex-shrink-0">
                        <div className="sticky top-[120px] space-y-12">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-3">
                                    <Filter size={16} className="text-green-600" /> Filtros
                                </h3>
                                <div className="space-y-3">
                                    {categories.map(cat => (
                                        <button 
                                            key={cat}
                                            className={`w-full text-left px-4 py-3 rounded-2xl text-[13px] font-bold transition-all ${cat === 'Todas' ? 'bg-gray-50 text-green-700' : 'text-gray-500 hover:text-black'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MODELS GRID */}
                    <div className="flex-1">
                        {ecoModels.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {ecoModels.map((model) => (
                                    <div 
                                        key={model.id}
                                        className="group flex flex-col h-full bg-white rounded-[40px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
                                    >
                                        <div className="relative h-72 w-full bg-gray-50 flex items-center justify-center p-12">
                                            <div className="absolute top-8 right-8 z-10 flex gap-2">
                                                {model.isElectric && (
                                                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full shadow-lg" title="100% Eléctrico">
                                                        <Zap size={18} fill="currentColor" />
                                                    </div>
                                                )}
                                                {model.isHybrid && (
                                                    <div className="bg-green-100 text-green-600 p-2 rounded-full shadow-lg" title="Híbrido">
                                                        <Leaf size={18} fill="currentColor" />
                                                    </div>
                                                )}
                                            </div>
                                            <Image 
                                                src={model.image} 
                                                alt={model.name} 
                                                fill 
                                                className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>

                                        <div className="p-12 flex flex-col flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 capitalize">{model.brand}</span>
                                                <div className="h-1 w-1 rounded-full bg-gray-200" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600">{model.category}</span>
                                            </div>
                                            
                                            <h3 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-6">{model.name}</h3>
                                            
                                            <div className="flex flex-col mb-10">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Desde</span>
                                                <span className="text-4xl font-black text-gray-900 tracking-tighter">{formatPrice(model.price)}</span>
                                            </div>

                                            <div className="mt-auto flex flex-col gap-4">
                                                <Link 
                                                    href={`/nuevos/${model.brand}/${model.id}`}
                                                    className="w-full flex items-center justify-center gap-3 py-6 bg-gray-900 text-white rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-green-600 transition-all group/btn"
                                                >
                                                    Ver Detalles <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center">
                                <h3 className="text-xl font-bold text-gray-400">No hay modelos disponibles en esta categoría</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            
            <DiscoverSection />
        </main>
    );
}
