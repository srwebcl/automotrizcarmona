export interface BrandLight {
    name: string;
    slug: string;
    logo_url: string;
    show_in_services: boolean;
    show_in_parts: boolean;
    show_in_dyp: boolean;
}

export interface LayoutBrandsData {
    cars: BrandLight[];
    trucks: BrandLight[];
}

export async function getLayoutBrands(): Promise<LayoutBrandsData> {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.automotrizcarmona.cl';
        const res = await fetch(`${backendUrl}/api/v1/layout/brands`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!res.ok) {
            console.error('Failed to fetch layout brands', res.statusText);
            return { cars: [], trucks: [] };
        }

        const data = await res.json();
        return {
            cars: data.cars || [],
            trucks: data.trucks || []
        };
    } catch (error) {
        console.error('Error fetching layout brands:', error);
        return { cars: [], trucks: [] };
    }
}
