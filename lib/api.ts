import { Vehicle, VehicleVersion } from './models/types';
import R2_ASSETS from './assetMap.json';
import CSV_FALLBACK from './csvFallback.json';

export interface TruckBrand {
    id: number;
    name: string;
    slug: string;
    logo_url: string | null;
    is_active: boolean;
}

export interface Truck {
    id: number;
    truck_brand_id: number;
    name: string;
    slug: string;
    image_url: string | null;
    is_active: boolean;
    brand?: TruckBrand;
}

// Forzar la URL correcta y limpiar cualquier error de concatenaci\u00f3n
const DEFAULT_API = 'https://api.automotrizcarmona.cl/api/v1';
let rawUrl = (process.env.NEXT_PUBLIC_API_URL || DEFAULT_API).trim().replace(/\/+$/, '');

// Si la URL no tiene /api/v1, se lo a\u00f1adimos al final (no al principio)
if (!rawUrl.endsWith('/api/v1') && rawUrl.includes('api.automotrizcarmona.cl')) {
    rawUrl += '/api/v1';
}

export const API_URL = rawUrl;

// Helpers para limpiar las URLs en caso de que vengan formateadas por el backend con su dominio
function formatImageUrl(url: string | null | undefined): string {
    if (!url) return '';
    
    // Verificamos si ya es una URL absoluta de Cloudflare R2 u otro origen
    if (url.startsWith('http')) {
        return url;
    }

    const cdnUrl = (process.env.NEXT_PUBLIC_CDN_URL || '').trim().replace(/\/+$/, '');
    
    // Si Filament/Laravel solo nos dio la ruta relativa (ej: 'trucks/imagen.png')
    // Simplemente la unimos al CDN de R2
    return `${cdnUrl}/${url.replace(/^\/+/, '')}`;
}

// Convertidor para Camiones
function mapTruck(truck: any): Truck {
    return {
        ...truck,
        image_url: formatImageUrl(truck.image_url)
    };
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
                airbags: Number(v.airbags) || 0,
                ivaIncluded: Boolean(v.includes_iva || v.iva_included),
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
        const res = await fetch(`${API_URL}/models/${brandSlug}`, { 
            cache: 'no-store',
            headers: FETCH_OPTIONS.headers 
        });
        
        if (!res.ok) {
            console.error(`API Error: ${res.status} for brand ${brandSlug}`);
            return [];
        }

        const json = await res.json();
        const rawData = json.data || json; // Robustez para .data o array directo
        const modelsArray = Array.isArray(rawData) ? rawData : [];

        return modelsArray.map((data: any) => mapVehicleModel(data, brandSlug));
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

// APIs para Camiones
export async function getTruckBrands(): Promise<TruckBrand[]> {
    try {
        const res = await fetch(`${API_URL}/truck-brands`, FETCH_OPTIONS);
        if (!res.ok) return [];
        const json = await res.json();
        const data = Array.isArray(json) ? json : (json.data || []);
        // Formatear logos de marcas si existen
        return data.map((b: any) => ({
            ...b,
            logo_url: formatImageUrl(b.logo_url)
        }));
    } catch (e) {
        console.error('Error fetching truck brands:', e);
        return [];
    }
}

export async function getTrucksByBrand(slug: string): Promise<{ brand: TruckBrand, trucks: Truck[] } | null> {
    try {
        const res = await fetch(`${API_URL}/truck-brands/${slug}/trucks`, FETCH_OPTIONS);
        if (!res.ok) return null;
        const json = await res.json();
        
        return {
            brand: {
                ...json.brand,
                logo_url: formatImageUrl(json.brand.logo_url)
            },
            trucks: (json.trucks || []).map(mapTruck)
        };
    } catch (e) {
        console.error(`Error fetching trucks for brand ${slug}:`, e);
        return null;
    }
}
