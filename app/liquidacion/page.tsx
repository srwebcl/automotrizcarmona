import React from 'react';
import Image from 'next/image';
import { getPromotionModels, getLandingInfo } from '@/lib/api';
import { getLayoutBrands } from '@/lib/api/layoutBrands';
import { ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';
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
    
    // Legal Excerpt
    const legalExcerpt = landingInfo?.legal_documents?.[0]?.excerpt || null;

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
            
            {/* Legal Section */}
            {legalExcerpt && (
                <section className="py-12 bg-white">
                    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-5xl mx-auto">
                            <div className="relative overflow-hidden rounded-2xl bg-gray-50/80 border border-gray-100 p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/40 hover:border-gray-200 group">
                                <div className="absolute top-0 left-0 w-1.5 bg-gradient-to-b from-gray-300 to-transparent h-full opacity-50 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                                    <div className="flex-shrink-0 p-3.5 bg-white rounded-2xl shadow-sm border border-gray-100/80">
                                        <Info size={24} strokeWidth={1.5} className="text-gray-400 group-hover:text-gray-700 transition-colors duration-500" />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0 w-full">
                                        <h4 className="text-xs font-black text-gray-900 mb-2 tracking-[0.15em] uppercase">Información Legal y Condiciones</h4>
                                        <div 
                                            className="text-[11px] sm:text-xs leading-relaxed text-gray-500 prose prose-sm max-w-none prose-p:mb-2 last:prose-p:mb-0 line-clamp-3 sm:line-clamp-2 transition-all"
                                            dangerouslySetInnerHTML={{ __html: legalExcerpt }}
                                        />
                                    </div>
                                    
                                    <div className="flex-shrink-0 w-full md:w-auto mt-2 md:mt-0">
                                        <Link href={`/legal#liquidacion`} className="inline-flex w-full md:w-auto items-center justify-center gap-2 px-6 py-3.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap">
                                            Leer Completo <ArrowRight size={14} strokeWidth={2.5} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <DiscoverSection />
        </main>
    );
}
