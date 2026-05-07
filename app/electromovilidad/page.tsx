import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, ArrowRight } from 'lucide-react';
import { getElectromovilidadModels, getLandingInfo } from '@/lib/api';
import DiscoverSection from '@/components/DiscoverSection';
import ElectromovilidadClient from './ElectromovilidadClient';

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export const revalidate = 60;

export default async function ElectromovilidadPage() {
    const [ecoModels, landingInfo] = await Promise.all([
        getElectromovilidadModels(),
        getLandingInfo('electromovilidad')
    ]);

    // Hero Fallbacks
    const heroTitle = landingInfo?.title || 'Movilidad Sostenible';
    const heroSubtitle = landingInfo?.subtitle || 'Descubre nuestra gama de vehículos híbridos y eléctricos. El futuro de la conducción hoy en Automotriz Carmona.';
    const heroImage = landingInfo?.desktop_banner_url || '/images/volkswagen/SUV/id4/galeria_2348.jpg';

    return (
        <main className="min-h-screen bg-white pt-20 font-sans selection:bg-green-600 selection:text-white">
            {/* HERO SECTION */}
            <section className="relative w-full bg-black overflow-hidden flex items-center pt-20 md:pt-14">
                <div className="relative w-full">
                    {/* Desktop / Fallback Image */}
                    <Image 
                        src={heroImage} 
                        alt={heroTitle} 
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={`w-full h-auto opacity-70 ${landingInfo?.mobile_banner_url ? 'hidden md:block' : 'block'}`}
                        priority
                    />
                    {/* Mobile Image (if available) */}
                    {landingInfo?.mobile_banner_url && (
                        <Image 
                            src={landingInfo.mobile_banner_url} 
                            alt={heroTitle} 
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto opacity-70 block md:hidden"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                    
                    <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-6 z-20 w-full text-white">
                        <div className="w-full">
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 bg-green-600 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-4 md:mb-6">
                                <Leaf size={12} fill="white" className="w-3 h-3 sm:w-4 sm:h-4" /> Eco-Conducción
                            </div>
                            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-1 sm:mb-2 md:mb-4 leading-tight max-w-2xl whitespace-pre-line">
                                {heroTitle}
                            </h1>
                            <p className="text-xs sm:text-sm md:text-lg text-gray-200 max-w-xl font-light line-clamp-2 sm:line-clamp-none">
                                {heroSubtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ElectromovilidadClient ecoModels={ecoModels} />
            
            <DiscoverSection />
        </main>
    );
}
