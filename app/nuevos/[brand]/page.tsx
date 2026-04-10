import { notFound } from 'next/navigation';
import { getModelsByBrand, getBrandBySlug } from '@/lib/api';
import { getBrandConfig } from '@/lib/brands';
import { MODELS_REGISTRY } from '@/lib/models';
import BrandPageClient from './BrandPageClient';
import R2_ASSETS from '@/lib/assetMap.json';

export const revalidate = 0; // Desactivar ISR temporalmente para diagnóstico

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
    const { brand } = await params;
    const brandId = brand.toLowerCase();
    const staticConfig = getBrandConfig(brandId);
    
    if (!staticConfig) {
        notFound();
    }

    try {
        const [brandDetails, apiModels] = await Promise.all([
            getBrandBySlug(brandId),
            getModelsByBrand(brandId)
        ]);

        const models = apiModels && apiModels.length > 0 ? apiModels : (MODELS_REGISTRY[brandId] || []);
        
        // Unir config din\u00e1mica y est\u00e1tica - Solo sobreescribimos si el backend trae algo v\u00e1lido
        const config = {
            ...staticConfig,
            name: brandDetails?.name || staticConfig.name,
            logo: (brandDetails?.logo_url && brandDetails.logo_url.includes('storage')) ? staticConfig.logo : (brandDetails?.logo_url || staticConfig.logo),
            brandColorCss: brandDetails?.brand_color_css ? `text-[${brandDetails.brand_color_css}]` : staticConfig.brandColorCss,
            seoTitle: brandDetails?.seo_title || `${staticConfig.name} | Automotriz Carmona`,
            legalText: brandDetails?.legal_text,
            bannerSlides: (brandDetails?.hero_banners?.length > 0) 
                ? brandDetails.hero_banners.map((b: any) => ({
                    title: b.title,
                    web: b.desktop_image,
                    mobile: b.mobile_image
                }))
                : staticConfig.bannerSlides
        };

        const r2BrandData = (R2_ASSETS as any)[brandId] || {};
        const r2ServiceImages = r2BrandData.serviceImages || {};

        // Merge R2 service images into config
        if (Object.keys(r2ServiceImages).length > 0) {
            config.serviceImages = {
                ...config.serviceImages,
                ...(r2ServiceImages.servicio ? { servicio: r2ServiceImages.servicio } : {}),
                ...(r2ServiceImages.repuestos ? { repuestos: r2ServiceImages.repuestos } : {}),
                ...(r2ServiceImages.usados ? { usados: r2ServiceImages.usados } : {}),
                ...(r2ServiceImages.sucursales ? { sucursales: r2ServiceImages.sucursales } : {}),
            };
        }

        // Confianza total en los datos de la API (Neon / Laravel)
        // Ya no realizamos cálculos extra en el servidor para evitar fallos de renderización
        return <BrandPageClient brandId={brandId} models={models} config={config} />;
    } catch (e) {
        console.error('Error in Server Component:', e);
        // Fallback robusto a datos estáticos en caso de fallo absoluto de red con el backend
        return <BrandPageClient brandId={brandId} models={MODELS_REGISTRY[brandId] || []} config={staticConfig} />;
    }
}
