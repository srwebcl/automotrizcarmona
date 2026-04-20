import { notFound } from 'next/navigation';
import { getModelsByBrand, getBrandBySlug, formatImageUrl } from '@/lib/api';
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
            logo: formatImageUrl(brandDetails?.logo_url) || staticConfig.logo,
            brandColorCss: brandDetails?.brand_color_css ? `text-[${brandDetails.brand_color_css}]` : staticConfig.brandColorCss,
            seoTitle: brandDetails?.seo_title || `${staticConfig.name} | Automotriz Carmona`,
            legalText: brandDetails?.legal_text,
            bannerSlides: (brandDetails?.hero_banners?.length > 0) 
                ? brandDetails.hero_banners.map((b: any) => ({
                    title: b.title,
                    web: formatImageUrl(b.desktop_image),
                    mobile: formatImageUrl(b.mobile_image || b.desktop_image)
                }))
                : staticConfig.bannerSlides,
            // Im\u00e1genes din\u00e1micas de Descubre M\u00e1s desde el Backend
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

        // Confianza total en los datos de la API (Neon / Laravel)
        // Ya no realizamos cálculos extra en el servidor para evitar fallos de renderización
        return <BrandPageClient brandId={brandId} models={models} config={config} />;
    } catch (e) {
        console.error('Error in Server Component:', e);
        // Fallback robusto a datos estáticos en caso de fallo absoluto de red con el backend
        return <BrandPageClient brandId={brandId} models={MODELS_REGISTRY[brandId] || []} config={staticConfig} />;
    }
}
