import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ brand: string; id: string }> }): Promise<Metadata> {
    const { brand, id } = await params;
    const displayBrand = brand.charAt(0).toUpperCase() + brand.slice(1);
    const displayModel = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const title = `Comprar Camión ${displayBrand} ${displayModel} 0km en Automotriz Carmona La Serena`;
    const description = `Descubre el nuevo camión ${displayBrand} ${displayModel}. Cotiza online y conoce todas sus versiones Automotriz Carmona La Serena.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        }
    };
}

import React from 'react';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';
import { getBrandConfig } from '@/lib/brands';
import { ChevronRight, Truck } from 'lucide-react';

export default async function TruckModelPage({ params }: { params: Promise<{ brand: string; id: string }> }) {
    const { brand, id } = await params;
    const config = getBrandConfig(brand);

    // For now, trucks don't have real models data yet. 
    // We'll show a "Próximamente" or 404 if not found in a future registry.
    // For this demonstration, we'll assume anything except toyota is not found yet for internal pages.

    // We can't really "show" a truck model if we don't have the data.
    // However, I'll create a generic fallback UI for when we start adding truck data.

    return (
        <main className="min-h-screen bg-[#f4f6f8] font-sans pt-[76px] flex flex-col items-center justify-center p-8">
            <div className="max-w-2xl w-full bg-white rounded-[2rem] shadow-xl p-12 text-center border border-gray-100 relative">
                <div className="absolute top-6 right-6">
                    <ShareButton
                        title={`Mira el catálogo de camiones ${config.name} en Automotriz Carmona`}
                        url={`https://automotrizcarmona.cl/camiones/${brand}`}
                    />
                </div>
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Truck size={48} className="text-gray-400" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 uppercase mb-4">
                    Catálogo {config.name} en Preparación
                </h1>
                <p className="text-gray-500 text-lg mb-8">
                    Estamos trabajando para traerte todos los detalles técnicos, versiones y precios de las unidades {brand} pronto.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={`/camiones/${brand}`} className="px-8 py-4 bg-black text-white font-bold rounded-xl uppercase text-sm hover:bg-gray-800 transition-all">
                        Volver a {config.name}
                    </Link>
                    <Link href="/cotizar" className="px-8 py-4 bg-red-600 text-white font-bold rounded-xl uppercase text-sm hover:bg-red-700 transition-all">
                        Consultar Disponibilidad
                    </Link>
                </div>
            </div>

            <div className="mt-12 flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <Link href="/" className="hover:text-gray-900">Inicio</Link>
                <ChevronRight size={12} />
                <Link href={`/camiones/${brand}`} className="hover:text-gray-900">{config.name}</Link>
                <ChevronRight size={12} />
                <span>Próximamente</span>
            </div>
        </main>
    );
}
