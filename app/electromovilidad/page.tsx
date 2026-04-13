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

            <ElectromovilidadClient ecoModels={ecoModels} />
            
            <DiscoverSection />
        </main>
    );
}
