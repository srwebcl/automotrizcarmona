import type { Metadata } from 'next';
import { getBrandConfig } from '@/lib/brands';

export async function generateMetadata({ params }: { params: Promise<{ brand: string; id: string }> }): Promise<Metadata> {
    const { brand, id } = await params;
    const staticConfig = getBrandConfig(brand.toLowerCase());
    const brandName = staticConfig?.name || brand;
    
    return {
        title: `Catálogo de Camiones ${brandName} | Automotriz Carmona`,
        description: `Conoce las próximas novedades de camiones ${brandName} en Automotriz Carmona.`
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
