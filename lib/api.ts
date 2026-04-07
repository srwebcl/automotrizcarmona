import { Vehicle, VehicleVersion } from './models/types';
import R2_ASSETS from './assetMap.json';
import CSV_FALLBACK from './csvFallback.json';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.automotrizcarmona.cl/api/v1';

// Helpers para limpiar las URLs en caso de que vengan formateadas por el backend con su dominio
function formatImageUrl(url: string | null | undefined): string {
    if (!url) return '';
    
    const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || '';
    
    // Si la url ya viene desde R2 u otro CDN absoluto por otras vías
    if (url.includes('pub-') || url.startsWith('http')) {
        // Mapeo dinámico de Laravel a Estructura manual de Cloudflare R2
        if (url.includes('/storage/automotriz/autos-nuevos/')) {
            // url de laravel: https://api.../storage/automotriz/autos-nuevos/marca/modelo/thumb.webp
            // regex extrae: 1: marca, 2: modelo, 3: resto
            const regex = /\/storage\/automotriz\/autos-nuevos\/([^\/]+)\/([^\/]+)\/(.*)$/;
            const match = url.match(regex);
            
            if (match) {
                const brand = match[1];
                const model = match[2];
                const rest = match[3];
                // Retornamos el path exacto estructurado de Cloudflare
                return `${cdnUrl}/carmona-assets/autos-nuevos/${brand}/modelos/${model}/${rest}`;
            }
        }
        
        // Si no concuerda con autos-nuevos, pero viene de storage, intentamos limpiarlo tradicionalmente
        if (url.includes('/storage/')) {
             let cleanUrl = url.replace(/^https?:\/\/[^\/]+\/storage\//, '').replace(/^\/+/, '');
             // asumimos que el resto de cosas también van dentro de carmona-assets
             return `${cdnUrl}/carmona-assets/${cleanUrl}`;
        }
        
        // Si no viene de storage, es un avatar externo, lo dejamos intacto.
        return url;
    }
    
    // Fallback relativo puro
    return `${cdnUrl}/carmona-assets/${url.replace(/^\/+/, '')}`;
}

// Convertidor de backend payload a Frontend Interface
function mapVehicleModel(data: any, defaultBrandSlug?: string): Vehicle {
    const brandName = data.brand?.name || 'Desconocido';
    const brandSlug = data.brand?.slug || defaultBrandSlug || 'desconocido';
    const id = data.slug;

    const r2Data = (R2_ASSETS as any)[brandSlug]?.models?.[id] || null;

    return {
        id: id,
        brand: brandSlug,
        name: data.name,
        category: data.category,
        price: data.base_price,
        image: r2Data?.image || formatImageUrl(data.thumbnail_url),
        desktopBanner: r2Data?.desktopBanner || data.desktop_banner_url || null,
        mobileBanner: r2Data?.mobileBanner || data.mobile_banner_url || null,
        gallery: r2Data?.gallery?.length ? r2Data.gallery : data.gallery || [],
        vehicleType: data.vehicle_type,
        ivaIncluded: true,
        isHybrid: data.is_hybrid,
        isElectric: data.is_electric,
        isNew: true, // Esto en producci\u00f3n lo sacamos seg\u00fan reglas de stock, asumimos true para el cat\u00e1logo "nuevos"
        versions: (data.versions || []).map((v: any) => {
            const versionSlug = v.slug || (v.name ? v.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') : '');
            const fallbackData = (CSV_FALLBACK as any)[brandSlug]?.[id]?.[versionSlug] || {};

            return {
                name: v.name,
                motor: v.motor || fallbackData.motor || '-',
                fuel: v.fuel,
                transmission: v.transmission,
                consumptionMixed: v.consumption_mixed || fallbackData.consumptionMixed || '-',
                electricRange: v.electric_range || fallbackData.autonomy_km || '-',
                power: v.power || fallbackData.power || '-',
                torque: v.torque || fallbackData.torque || '-',
                traction: v.traction,
                listPrice: v.list_price || fallbackData.listPrice || 0,
                brandBonus: v.brand_bonus || fallbackData.brandBonus || 0,
                financingBonus: v.financing_bonus || fallbackData.financingBonus || 0,
                bonusPrice: v.final_price || fallbackData.bonusPrice || v.list_price || 0
            };
        }),
        slogan: data.slogan || '',
        videoUrl: data.video_url || '',
        features: (data.features || []).map((f: any, i: number) => ({
            title: f.title,
            desc: f.description,
            image: r2Data?.features?.[i] || ''
        }))
    };
}

export async function getBrands() {
    try {
        const res = await fetch(`${API_URL}/brands`, { next: { revalidate: 60 } });
        const json = await res.json();
        return json.data || [];
    } catch (e) {
        console.error('Error fetching brands:', e);
        return [];
    }
}

export async function getBrandBySlug(slug: string) {
    try {
        const res = await fetch(`${API_URL}/brands/${slug}`, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        const json = await res.json();
        return json.data || null;
    } catch (e) {
        console.error(`Error fetching brand ${slug}:`, e);
        return null;
    }
}

export async function getModelsByBrand(brandSlug: string): Promise<Vehicle[]> {
    try {
        const res = await fetch(`${API_URL}/models/${brandSlug}`, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data || []).map((data: any) => mapVehicleModel(data, brandSlug));
    } catch (e) {
        console.error(`Error fetching models for ${brandSlug}:`, e);
        return [];
    }
}

export async function getModelDetails(brandSlug: string, modelSlug: string): Promise<Vehicle | null> {
    try {
        const res = await fetch(`${API_URL}/models/${brandSlug}/${modelSlug}`, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        const json = await res.json();
        return mapVehicleModel(json.data, brandSlug);
    } catch (e) {
        console.error(`Error fetching model ${modelSlug}:`, e);
        return null;
    }
}

export async function getFeaturedModels(): Promise<Vehicle[]> {
    try {
        const res = await fetch(`${API_URL}/featured`, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data || []).map((data: any) => mapVehicleModel(data));
    } catch (e) {
        console.error('Error fetching featured models:', e);
        return [];
    }
}
