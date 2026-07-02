'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import ShareButton from '@/components/ShareButton';

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export default function ElectromovilidadClient({ ecoModels }: { ecoModels: any[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const marcaParam = searchParams.get('marca');
    const [activeBrand, setActiveBrand] = useState(marcaParam || 'Todas');

    const handleBrandChange = (brand: string) => {
        setActiveBrand(brand);
        const params = new URLSearchParams(searchParams.toString());
        if (brand === 'Todas') {
            params.delete('marca');
        } else {
            params.set('marca', brand);
        }
        window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
    };

    const brandNames = ['Todas', ...Array.from(new Set(ecoModels.map(m => m.brand))).sort()];

    const filteredModels = useMemo(() => {
        if (activeBrand === 'Todas') return ecoModels;
        return ecoModels.filter(m => m.brand === activeBrand);
    }, [activeBrand, ecoModels]);

    return (
        <>
            {/* FILTER BAR - Floating Pills */}
            <section className="sticky top-[68px] z-40 bg-white shadow-md border-b border-gray-100">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide justify-center md:justify-start">
                        {brandNames.map((brandInfo: string) => (
                            <button
                                key={brandInfo}
                                onClick={() => handleBrandChange(brandInfo)}
                                className={`whitespace-nowrap text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all border ${activeBrand === brandInfo
                                    ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/30'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-green-600/50 hover:text-green-600'
                                    }`}
                            >
                                {brandInfo}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CATALOG CONTENT */}
            <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
                {filteredModels.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                        {filteredModels.map((model) => {
                            const finalImgSrc = model.image.startsWith('http') ? model.image : `${process.env.NEXT_PUBLIC_CDN_URL || ''}/${model.image.replace(/^\//, '')}`;
                            return (
                                <Link key={model.id} href={`/nuevos/${model.brand}/${model.id}`} className="group block">
                                    <div className={`relative rounded-[2rem] pt-8 px-8 pb-32 transition-colors ${model.isHybrid || model.isElectric ? 'bg-[#dbeafe]' : 'bg-[#f8f8f8]'}`}>
                                        <div className="absolute top-6 right-6 z-20">
                                            <ShareButton
                                                title={`Conoce el ${model.name} en Automotriz Carmona`}
                                                url={`https://automotrizcarmona.cl/nuevos/${model.brand}/${model.id}`}
                                            />
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-gray-400 text-xs font-black mb-1.5 uppercase tracking-widest">{model.brand}</p>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="text-3xl font-extrabold text-[#1a1a1a] tracking-tight uppercase">{model.name}</h3>
                                                {model.isElectric && (
                                                    <div className="flex items-center gap-1.5 border border-emerald-200 rounded-full px-2.5 py-0.5 bg-white/80 backdrop-blur-sm">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 shadow-sm" />
                                                        <span className="text-[10px] font-black text-emerald-800 tracking-wider uppercase">Eléctrico</span>
                                                    </div>
                                                )}
                                                {model.isHybrid && !model.isElectric && (
                                                    <div className="flex items-center gap-1.5 border border-blue-200 rounded-full px-2.5 py-0.5 bg-white/80 backdrop-blur-sm">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-sm" />
                                                        <span className="text-[10px] font-black text-blue-800 tracking-wider uppercase">Híbrido</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="absolute bottom-[-4.5rem] left-1/2 transform -translate-x-1/2 w-[115%] max-w-[380px] h-[220px]">
                                            <Image
                                                src={finalImgSrc}
                                                alt={model.name}
                                                fill
                                                className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-20 text-center">
                                        <p className="text-gray-800 text-lg font-medium">
                                            Precio Desde <span className="font-bold">{formatPrice(model.price)}</span>
                                            {model.ivaIncluded === false && <span className="text-sm ml-1 opacity-60 font-bold">+ IVA</span>}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">Catálogo en Actualización</h3>
                        <p className="text-gray-500">Estamos preparando los mejores modelos disponibles en nuestra Base de Datos.</p>
                    </div>
                )}
            </section>
        </>
    );
}
