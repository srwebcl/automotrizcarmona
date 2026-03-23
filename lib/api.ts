const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

export async function fetchBrands() {
    const res = await fetch(`${API_BASE_URL}/brands`);
    if (!res.ok) throw new Error('Failed to fetch brands');
    const json = await res.json();
    return json.data;
}

export async function fetchModelsByBrand(brandSlug: string) {
    const res = await fetch(`${API_BASE_URL}/models/${brandSlug}`);
    if (!res.ok) throw new Error('Failed to fetch models');
    const json = await res.json();
    return json.data;
}

export async function fetchModelDetails(brandSlug: string, modelSlug: string) {
    const res = await fetch(`${API_BASE_URL}/models/${brandSlug}/${modelSlug}`);
    if (!res.ok) throw new Error('Failed to fetch model details');
    const json = await res.json();
    return json.data;
}

export async function fetchBanners() {
    const res = await fetch(`${API_BASE_URL}/banners`);
    if (!res.ok) throw new Error('Failed to fetch banners');
    const json = await res.json();
    return json.data;
}

export async function fetchFeaturedModels() {
    const res = await fetch(`${API_BASE_URL}/featured`);
    if (!res.ok) throw new Error('Failed to fetch featured models');
    const json = await res.json();
    return json.data;
}

export async function fetchBrandBySlug(slug: string) {
    const res = await fetch(`${API_BASE_URL}/brands/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch brand details');
    const json = await res.json();
    return json.data;
}
