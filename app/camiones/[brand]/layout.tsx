import type { Metadata } from 'next';
import { getBrandConfig } from '@/lib/brands';
import { getBrandBySlug, formatImageUrl } from '@/lib/api';

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
    const { brand } = await params;
    const brandId = brand.toLowerCase();
    
    try {
        const brandDetails = await getBrandBySlug(brandId);
        const staticConfig = getBrandConfig(brandId);
        
        const name = brandDetails?.name || staticConfig?.name || brand;
        const title = brandDetails?.seo_title || `Camiones ${name} | Automotriz Carmona`;
        const description = `Cotiza tu próximo camión ${name} en Automotriz Carmona. Encuentra el modelo ideal para tu negocio.`;
        const ogImage = brandDetails?.logo_url ? formatImageUrl(brandDetails.logo_url) : undefined;

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
            title: `Camiones ${brand} | Automotriz Carmona`,
        };
    }
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
