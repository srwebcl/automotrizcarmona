import { notFound } from 'next/navigation';
import { getModelDetails, getBrandBySlug } from '@/lib/api';
import { MODELS_REGISTRY } from '@/lib/models';
import CSV_FALLBACK from '@/lib/csvFallback.json';
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
        
        // El Backend actual en la nube de Cloudways tiene un bug donde no exporta datos tecnicos ni bonos en la API.
        // Mientras esto se arregla y se despliega el backend, tomamos la data estatica del CSV para RELLENAR los huecos.
        const slugPattern = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        
        if (model && model.versions) {
            const csvBrandData = (CSV_FALLBACK as any)[brandId] || {};
            const csvModelData = csvBrandData[id.toLowerCase()] || {};

            // Unimos las versiones devolviendo los campos faltantes
            model.versions = model.versions.map((apiLink: any) => {
                const safeVersionSlug = slugPattern(apiLink.name);
                const static_v = csvModelData[safeVersionSlug];
                
                if (!static_v) return apiLink;
                
                return {
                    ...apiLink,
                    motor: apiLink.motor || static_v.motor,
                    consumptionMixed: apiLink.consumptionMixed || static_v.consumptionMixed,
                    power: apiLink.power || static_v.power,
                    torque: apiLink.torque || static_v.torque,
                    brandBonus: apiLink.brandBonus || static_v.brandBonus,
                    financingBonus: apiLink.financingBonus || static_v.financingBonus,
                    // Dejamos los precios de API, al menos que esten en 0
                    listPrice: static_v.listPrice || apiLink.listPrice,
                    bonusPrice: static_v.bonusPrice || apiLink.bonusPrice,
                    ivaIncluded: static_v.ivaIncluded ?? apiLink.ivaIncluded,
                }
            });
        }

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
