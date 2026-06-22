import { notFound } from 'next/navigation';
import { getModelDetails, getBrandBySlug, getLegalDocuments, formatImageUrl } from '@/lib/api';
import { MODELS_REGISTRY } from '@/lib/models';
import { getBrandConfig } from '@/lib/brands';
import ModelPageClient from './ModelPageClient';
import R2_ASSETS from '@/lib/assetMap.json';

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ brand: string; id: string }> }): Promise<Metadata> {
    const { brand, id } = await params;
    const brandId = brand.toLowerCase();
    
    try {
        const model = await getModelDetails(brandId, id);
        if (!model) return {};

        const displayBrand = brand.charAt(0).toUpperCase() + brand.slice(1);
        const title = `Comprar ${displayBrand} ${model.name} 0km en Automotriz Carmona La Serena`;
        const description = model.slogan || `Descubre el nuevo ${displayBrand} ${model.name}. Cotiza online y conoce todas sus versiones Automotriz Carmona La Serena.`;
        const ogImage = formatImageUrl(model.image);

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
            title: `Auto Nuevo | Automotriz Carmona`,
        };
    }
}

export const revalidate = 0; // Desactivar ISR temporalmente para diagnóstico

export default async function GenericModelPage({ params }: { params: Promise<{ brand: string; id: string }> }) {
    const { brand, id } = await params;
    const brandId = brand.toLowerCase();
    
    const staticConfig = getBrandConfig(brandId);
    if (!staticConfig) {
        notFound();
    }

    try {
        const [brandDetails, apiModel, legalDocs] = await Promise.all([
            getBrandBySlug(brandId),
            getModelDetails(brandId, id),
            getLegalDocuments()
        ]);
        
        const legalExcerpt = legalDocs.find((doc: any) => doc.brand_slug === brandId)?.excerpt || null;
        
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
            logo: formatImageUrl(brandDetails?.logo_url) || staticConfig.logo,
            brandColorCss: brandDetails?.brand_color_css ? `text-[${brandDetails.brand_color_css}]` : staticConfig.brandColorCss,
            // Im\u00e1genes din\u00e1micas de Descubre M\u00e1s desde el Backend (Marca)
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

        return <ModelPageClient brand={brandId} id={id} initialModel={model} config={config} legalExcerpt={legalExcerpt} />;
    } catch (e) {
        console.error('Error fetching model details on server:', e);
        
        const fallback = (MODELS_REGISTRY[brand.toLowerCase()] || []).find(m => m.id.toLowerCase() === id.toLowerCase());
        if (!fallback) notFound();

        return <ModelPageClient brand={brand} id={id} initialModel={fallback} config={staticConfig} />;
    }
}
