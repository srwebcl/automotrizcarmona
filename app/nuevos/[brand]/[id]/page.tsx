import { notFound } from 'next/navigation';
import { getModelDetails, getBrandBySlug } from '@/lib/api';
import { MODELS_REGISTRY } from '@/lib/models';

import { getBrandConfig } from '@/lib/brands';
import ModelPageClient from './ModelPageClient';
import R2_ASSETS from '@/lib/assetMap.json';

export const revalidate = 60; // ISR cache por 1 minuto

export default async function GenericModelPage({ params }: { params: Promise<{ brand: string; id: string }> }) {
    const { brand, id } = await params;
    const brandId = brand.toLowerCase();
    
    const staticConfig = getBrandConfig(brandId);
    if (!staticConfig) {
        notFound();
    }

    try {
        const [brandDetails, apiModel] = await Promise.all([
            getBrandBySlug(brandId),
            getModelDetails(brandId, id)
        ]);
        
        let model = apiModel;

        if (!model) {
            const fallback = (MODELS_REGISTRY[brandId] || []).find(m => m.id.toLowerCase() === id.toLowerCase());
            if (fallback) {
                model = fallback as any;
            } else {
                notFound();
            }
        }

        const config = {
            ...staticConfig,
            name: brandDetails?.name || staticConfig.name,
            logo: (brandDetails?.logo_url && brandDetails.logo_url.includes('storage')) ? staticConfig.logo : (brandDetails?.logo_url || staticConfig.logo),
            brandColorCss: brandDetails?.brand_color_css ? `text-[${brandDetails.brand_color_css}]` : staticConfig.brandColorCss,
        };

        const r2BrandData = (R2_ASSETS as any)[brandId] || {};
        const r2ServiceImages = r2BrandData.serviceImages || {};
        if (Object.keys(r2ServiceImages).length > 0) {
            config.serviceImages = {
                ...config.serviceImages,
                ...(r2ServiceImages.servicio ? { servicio: r2ServiceImages.servicio } : {}),
                ...(r2ServiceImages.repuestos ? { repuestos: r2ServiceImages.repuestos } : {}),
                ...(r2ServiceImages.usados ? { usados: r2ServiceImages.usados } : {}),
                ...(r2ServiceImages.sucursales ? { sucursales: r2ServiceImages.sucursales } : {}),
            };
        }

        return <ModelPageClient brand={brandId} id={id} initialModel={model} config={config} />;
    } catch (e) {
        console.error('Error fetching model details on server:', e);
        
        const fallback = (MODELS_REGISTRY[brand.toLowerCase()] || []).find(m => m.id.toLowerCase() === id.toLowerCase());
        if (!fallback) notFound();

        return <ModelPageClient brand={brand} id={id} initialModel={fallback} config={staticConfig} />;
    }
}
