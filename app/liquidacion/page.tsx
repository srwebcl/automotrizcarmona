import React from 'react';
import Image from 'next/image';
import { getPromotionModels, getLandingInfo } from '@/lib/api';
import { getLayoutBrands } from '@/lib/api/layoutBrands';
import DiscoverSection from '@/components/DiscoverSection';
import LiquidacionClient from './LiquidacionClient';

import type { Metadata, ResolvingMetadata } from 'next';

export const revalidate = 5; // ISR 5 seg para reflejar ventas rápidamente

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
};

export async function generateMetadata(
    { searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const params = await searchParams;
    const vin = params?.vin as string;
    
    const landingInfo = await getLandingInfo('liquidacion').catch(() => null);
    const defaultTitle = landingInfo?.title || 'Gran Liquidación Automotriz Carmona';
    const defaultDesc = landingInfo?.subtitle || 'Oportunidades únicas con entrega inmediata y bonos exclusivos.';
    const defaultImage = landingInfo?.desktop_banner_url || '/images/default-share.jpg';
    
    if (!vin) {
        return {
            title: defaultTitle,
            description: defaultDesc,
            openGraph: {
                title: defaultTitle,
                description: defaultDesc,
                images: [{ url: defaultImage }],
            }
        };
    }

    try {
        const promotionModels = await getPromotionModels();
        const allPromoUnits = promotionModels.flatMap(model => 
            (model.promoUnits || []).map(unit => ({
                ...unit,
                modelId: model.id,
                brand: model.brand,
                image: model.image,
                modelName: model.name
            }))
        ).sort((a, b) => (a.order || 0) - (b.order || 0));

        const unit = allPromoUnits.find(u => u.vin === vin);

        if (unit) {
            const formatPrice = (price: number) => {
                return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
            };
            const priceFormatted = formatPrice(unit.promoPrice);
            
            let title = `OFERTA: ${unit.brand} ${unit.modelName} a ${priceFormatted}`;
            if (unit.status === 'vendido') {
                title = `¡VENDIDO! ${unit.brand} ${unit.modelName}`;
            } else if (unit.status === 'reservado') {
                title = `RESERVADO: ${unit.brand} ${unit.modelName}`;
            }

            const desc = `Unidad VIN: ${unit.vin}. Bono de descuento aplicado: ${formatPrice(unit.promoBonus)}.`;

            return {
                title: title,
                description: desc,
                openGraph: {
                    title: title,
                    description: desc,
                    images: [
                        {
                            url: unit.image || defaultImage,
                            width: 1200,
                            height: 630,
                            alt: `${unit.brand} ${unit.modelName}`,
                        },
                    ],
                },
            };
        }
    } catch (e) {
        console.error(e);
    }

    return {
        title: defaultTitle,
        description: defaultDesc,
        openGraph: {
            title: defaultTitle,
            description: defaultDesc,
            images: [{ url: defaultImage }],
        }
    };
}

export default async function LiquidacionPage({ searchParams }: Props) {
    const params = await searchParams;
    const targetVin = params?.vin as string;

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
    ).sort((a, b) => (a.order || 0) - (b.order || 0));

    // Hero Fallbacks
    const heroTitle = landingInfo?.title || 'Gran Liquidación';
    const heroSubtitle = landingInfo?.subtitle || 'Unidades físicas con bonos especiales directos por número de chasis (VIN).';
    const heroImage = landingInfo?.desktop_banner_url || '/images/cupra/Formentor/banner/banner.webp';

    return (
        <main className="min-h-screen bg-gray-50 pt-20 font-sans selection:bg-[#d2001c] selection:text-white">
            {/* HERO SECTION - HOME BANNER STYLE */}
            <section className="relative bg-gray-50 pt-10 md:pt-14 pb-0 px-0 md:px-8">
                {/* Mobile Size */}
                <div className="w-full mx-auto mb-2 md:hidden relative group">
                    <div className="overflow-hidden md:rounded-3xl w-full">
                        <Image 
                            src={landingInfo?.mobile_banner_url || heroImage} 
                            alt={heroTitle} 
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>

                {/* Desktop Size */}
                <div className="w-full mx-auto mb-2 hidden md:block relative group">
                    <div className="overflow-hidden rounded-3xl w-full">
                        <Image 
                            src={heroImage} 
                            alt={heroTitle} 
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* CATALOG CONTENT */}
            <LiquidacionClient 
                allPromoUnits={allPromoUnits} 
                title={heroTitle}
                subtitle={heroSubtitle}
                layoutBrands={layoutBrands}
                targetVin={targetVin}
            />
            
            <DiscoverSection />
        </main>
    );
}
