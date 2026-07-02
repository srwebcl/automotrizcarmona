import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getModelsByBrand, getBrandBySlug, formatImageUrl, getCarAdvisorData, isPorscheBrand } from '@/lib/api';
import { getBrandConfig } from '@/lib/brands';
import { MODELS_REGISTRY } from '@/lib/models';
import BrandPageClient from './BrandPageClient';
import CarAdvisorSection from '@/components/CarAdvisorSection';
import R2_ASSETS from '@/lib/assetMap.json';

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
    const { brand } = await params;
    const brandId = brand.toLowerCase();
    
    try {
        const brandDetails = await getBrandBySlug(brandId);
        const staticConfig = getBrandConfig(brandId);
        
        const name = brandDetails?.name || staticConfig?.name || brand;
        const title = brandDetails?.seo_title || `Autos Nuevos ${name} | Automotriz Carmona`;
        const description = `Descubre todos los modelos nuevos de ${name} en Automotriz Carmona. Cotiza online y encuentra el auto perfecto para ti.`;
        const ogImage = brandDetails?.logo_url ? formatImageUrl(brandDetails.logo_url) : undefined;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                images: ogImage ? [{ url: ogImage }] : [],
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: ogImage ? [ogImage] : [],
            }
        };
    } catch (e) {
        return {
            title: `Autos Nuevos ${brand} | Automotriz Carmona`,
        };
    }
}

export const revalidate = 0; // Desactivar ISR temporalmente para diagnóstico

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
    const { brand } = await params;
    const brandId = brand.toLowerCase();
    const staticConfig = getBrandConfig(brandId);
    
    if (!staticConfig) {
        notFound();
    }

    const showReviews = isPorscheBrand(brandId);

    try {
        const [brandDetails, apiModels, carAdvisorData] = await Promise.all([
            getBrandBySlug(brandId),
            getModelsByBrand(brandId),
            showReviews ? getCarAdvisorData() : Promise.resolve(null),
        ]);

        const models = apiModels && apiModels.length > 0 ? apiModels : (MODELS_REGISTRY[brandId] || []);
        
        // Unir config dinámica y estática - Solo sobreescribimos si el backend trae algo válido
        const config = {
            ...staticConfig,
            name: brandDetails?.name || staticConfig.name,
            logo: formatImageUrl(brandDetails?.logo_url) || staticConfig.logo,
            brandColorCss: brandDetails?.brand_color_css ? `text-[${brandDetails.brand_color_css}]` : staticConfig.brandColorCss,
            seoTitle: brandDetails?.seo_title || `${staticConfig.name} | Automotriz Carmona`,
            legalText: brandDetails?.legal_text,
            legalExcerpt: brandDetails?.legal_documents?.[0]?.excerpt || null,
            bannerSlides: (brandDetails?.hero_banners?.length > 0) 
                ? brandDetails.hero_banners.map((b: any) => ({
                    title: b.title,
                    web: formatImageUrl(b.desktop_image),
                    mobile: formatImageUrl(b.mobile_image || b.desktop_image)
                }))
                : staticConfig.bannerSlides,
            // Imágenes dinámicas de Descubre Más desde el Backend
            serviceImages: {
                ...staticConfig.serviceImages,
                ...(brandDetails?.discover_servicio_image ? { servicio: formatImageUrl(brandDetails.discover_servicio_image) } : {}),
                ...(brandDetails?.discover_repuestos_image ? { repuestos: formatImageUrl(brandDetails.discover_repuestos_image) } : {}),
                ...(brandDetails?.discover_usados_image ? { usados: formatImageUrl(brandDetails.discover_usados_image) } : {}),
                ...(brandDetails?.discover_sucursales_image ? { sucursales: formatImageUrl(brandDetails.discover_sucursales_image) } : {}),
            }
        };

        const r2BrandData = (R2_ASSETS as any)[brandId] || {};
        const r2ServiceImages = r2BrandData.serviceImages || {};

        // Merge R2 service images into config (solo si el backend NO trajo imagen propia)
        if (Object.keys(r2ServiceImages).length > 0) {
            config.serviceImages = {
                ...config.serviceImages,
                ...(r2ServiceImages.servicio && !brandDetails?.discover_servicio_image ? { servicio: r2ServiceImages.servicio } : {}),
                ...(r2ServiceImages.repuestos && !brandDetails?.discover_repuestos_image ? { repuestos: r2ServiceImages.repuestos } : {}),
                ...(r2ServiceImages.usados && !brandDetails?.discover_usados_image ? { usados: r2ServiceImages.usados } : {}),
                ...(r2ServiceImages.sucursales && !brandDetails?.discover_sucursales_image ? { sucursales: r2ServiceImages.sucursales } : {}),
            };
        }

        return (
            <>
                <Suspense fallback={<div className="min-h-[500px] bg-white w-full" />}>
                    <BrandPageClient brandId={brandId} models={models} config={config} />
                </Suspense>
                {showReviews && carAdvisorData && (
                    <CarAdvisorSection
                        data={carAdvisorData}
                        brandFilter={brandId}
                        reasonFilter="ventas"
                    />
                )}
            </>
        );
    } catch (e) {
        console.error('Error in Server Component:', e);
        // Fallback robusto a datos estáticos en caso de fallo absoluto de red con el backend
        return (
            <Suspense fallback={<div className="min-h-[500px] bg-white w-full" />}>
                <BrandPageClient brandId={brandId} models={MODELS_REGISTRY[brandId] || []} config={staticConfig} />
            </Suspense>
        );
    }
}
