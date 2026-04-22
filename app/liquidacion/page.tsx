import React from 'react';
import Image from 'next/image';
import { getPromotionModels, getLandingInfo } from '@/lib/api';
import { getLayoutBrands } from '@/lib/api/layoutBrands';
import DiscoverSection from '@/components/DiscoverSection';
import LiquidacionClient from './LiquidacionClient';

export const revalidate = 60; // ISR 1 min for fast refresh

export default async function LiquidacionPage() {
    const [promotionModels, landingInfo, layoutBrands] = await Promise.all([
        getPromotionModels(),
        getLandingInfo('liquidacion'),
        getLayoutBrands()
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

    // Hero Fallbacks
    const heroTitle = landingInfo?.title || 'Gran Liquidación';
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
            <LiquidacionClient 
                allPromoUnits={allPromoUnits} 
                title={heroTitle}
                subtitle={heroSubtitle}
                layoutBrands={layoutBrands}
            />
            
            <DiscoverSection />
        </main>
    );
}
