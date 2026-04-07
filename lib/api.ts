import { Vehicle, VehicleVersion } from './models/types';
import R2_ASSETS from './assetMap.json';
import CSV_FALLBACK from './csvFallback.json';

// Limpiar la URL de barras finales y asegurar el prefijo /api/v1
let BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.automotrizcarmona.cl/api/v1').replace(/\/+$/, '');
if (!BASE_URL.endsWith('/api/v1') && BASE_URL.includes('api.automotrizcarmona.cl')) {
    BASE_URL += '/api/v1';
}
export const API_URL = BASE_URL;

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
            return {
                name: v.name,
                motor: v.motor || v.engine || '-',
                fuel: v.fuel || '-',
                transmission: v.transmission || '-',
                consumptionMixed: v.consumption_mixed || v.mixed_performance || '-',
                electricRange: v.electric_range || '-',
                power: v.power || v.power_hp || '-',
                torque: v.torque || v.torque_nm || '-',
                traction: v.traction || '-',
                listPrice: Number(v.list_price) || 0,
                brandBonus: Number(v.brand_bonus) || 0,
                financingBonus: Number(v.finance_bonus || v.financing_bonus) || 0,
                bonusPrice: Number(v.final_price || v.finance_price) || 0
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

const FETCH_OPTIONS = {
    next: { revalidate: 0 }, // Forzamos 0 para diagnóstico actual
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'es-CL,es;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    }
};

export async function getBrands() {
    try {
        const res = await fetch(`${API_URL}/brands`, FETCH_OPTIONS);
        const json = await res.json();
        return Array.isArray(json) ? json : (json.data || []);
    } catch (e) {
        console.error('Error fetching brands:', e);
        return [];
    }
}

export async function getBrandBySlug(slug: string) {
    try {
        const res = await fetch(`${API_URL}/brands/${slug}`, FETCH_OPTIONS);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data || json || null;
    } catch (e) {
        console.error(`Error fetching brand ${slug}:`, e);
        return null;
    }
}

export async function getModelsByBrand(brandSlug: string): Promise<Vehicle[]> {
    try {
        const res = await fetch(`${API_URL}/models/${brandSlug}`, FETCH_OPTIONS);
        if (!res.ok) {
            console.error(`Fetch for ${brandSlug} failed status ${res.status}`);
            return [];
        }
        const json = await res.json();
        const rawData = Array.isArray(json) ? json : (json.data || []);
        return rawData.map((data: any) => mapVehicleModel(data, brandSlug));
    } catch (e) {
        console.error(`Error fetching models for ${brandSlug}:`, e);
        return [];
    }
}

export async function getModelDetails(brandSlug: string, modelSlug: string): Promise<Vehicle | null> {
    try {
        const res = await fetch(`${API_URL}/models/${brandSlug}/${modelSlug}`, FETCH_OPTIONS);
        if (!res.ok) return null;
        const json = await res.json();
        return mapVehicleModel(json.data || json, brandSlug);
    } catch (e) {
        console.error(`Error fetching model ${modelSlug}:`, e);
        return null;
    }
}

export async function getFeaturedModels(): Promise<Vehicle[]> {
    try {
        const res = await fetch(`${API_URL}/featured`, FETCH_OPTIONS);
        if (!res.ok) return [];
        const json = await res.json();
        const rawData = Array.isArray(json) ? json : (json.data || []);
        return rawData.map((data: any) => mapVehicleModel(data));
    } catch (e) {
        console.error('Error fetching featured models:', e);
        return [];
    }
}
