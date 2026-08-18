'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Info, Flame } from 'lucide-react';

import ShareButton from '@/components/ShareButton';

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

const slugify = (text: string) => {
    return text.toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

export default function LiquidacionClient({
    allPromoUnits,
    title,
    subtitle,
    badgeText,
    badgeLogoUrl,
    layoutBrands,
    targetVin
}: {
    allPromoUnits: any[],
    title: string,
    subtitle?: string,
    badgeText?: string,
    badgeLogoUrl?: string,
    layoutBrands: { cars: any[], trucks: any[] },
    targetVin?: string
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Calculamos la marca inicial de forma síncrona antes del primer render
    const initialBrand = useMemo(() => {
        const marcaParam = searchParams.get('marca');
        if (marcaParam) {
            // Buscamos la marca real que coincida con el slug de la URL
            const allBrands = [...layoutBrands.cars, ...layoutBrands.trucks];
            const matchedBrand = allBrands.find(b => slugify(b.slug) === slugify(marcaParam));
            if (matchedBrand) return matchedBrand.slug;
            return marcaParam;
        }

        if (targetVin) {
            const targetUnit = allPromoUnits.find(u => u.vin === targetVin);
            if (targetUnit) return targetUnit.brand.toLowerCase();
        }
        return 'Todas';
    }, [targetVin, allPromoUnits, searchParams, layoutBrands]);

    const getBrandLogo = (brandName: string) => {
        const b = [...layoutBrands.cars, ...layoutBrands.trucks].find(x => slugify(x.name) === slugify(brandName));
        return b?.logo_url;
    };

    const [activeBrand, setActiveBrand] = useState(initialBrand);
    const gridRef = React.useRef<HTMLDivElement>(null);

    // Scroll horizontal para mantener visible el botón activo en móviles
    React.useEffect(() => {
        const btn = document.getElementById(`filter-btn-${slugify(activeBrand)}`);
        if (btn) {
            btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }, [activeBrand]);

    // Auto-Scroll infalible: Bajamos la pantalla hasta la cuadrícula
    React.useEffect(() => {
        const marcaParam = searchParams.get('marca');
        if (!targetVin && !marcaParam) return;

        const scrollToGrid = () => {
            if (gridRef.current) {
                const yOffset = -120; // Dejar espacio para el menú superior
                const y = gridRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        };

        // Forzamos el deslizamiento hacia abajo en dos tiempos precisos para evitar el bloqueo del navegador
        const t1 = setTimeout(scrollToGrid, 500);
        const t2 = setTimeout(scrollToGrid, 1200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [targetVin]);

    const brandsInPromo = useMemo(() => {
        const uniqueBrandSlugs = Array.from(new Set(allPromoUnits.map(u => u.brand.toLowerCase())));
        const allBrands = [...layoutBrands.cars, ...layoutBrands.trucks];
        return allBrands.filter(b => uniqueBrandSlugs.includes(b.slug.toLowerCase()));
    }, [allPromoUnits, layoutBrands]);

    const filteredUnits = useMemo(() => {
        if (activeBrand === 'Todas') return allPromoUnits;
        return allPromoUnits.filter(u => u.brand.toLowerCase() === activeBrand.toLowerCase());
    }, [activeBrand, allPromoUnits]);

    const handleBrandChange = (brandSlug: string) => {
        setActiveBrand(brandSlug);

        const params = new URLSearchParams(searchParams.toString());
        if (brandSlug === 'Todas') {
            params.delete('marca');
        } else {
            params.set('marca', slugify(brandSlug));
        }
        window.history.replaceState(null, '', `${pathname}?${params.toString()}`);

        // Pequeño delay para dejar que el filtrado ocurra antes de scrollear
        setTimeout(() => {
            if (gridRef.current) {
                const yOffset = -180;
                const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <>
            {/* FILTER BAR - Logos por Marca */}
            <section className="sticky top-[68px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide justify-center md:justify-start">
                        <button
                            id="filter-btn-todas"
                            onClick={() => handleBrandChange('Todas')}
                            className={`whitespace-nowrap text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all ${activeBrand === 'Todas'
                                ? 'bg-black text-white shadow-lg'
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-900'
                                }`}
                        >
                            Ver Todo
                        </button>
                        
                        <div className="h-6 w-px bg-gray-200 hidden md:block" />

                        {brandsInPromo.map((brand: any) => (
                            <button
                                key={brand.slug}
                                id={`filter-btn-${slugify(brand.slug)}`}
                                onClick={() => handleBrandChange(brand.slug)}
                                className={`relative flex-shrink-0 w-20 h-10 transition-all duration-300 ${activeBrand.toLowerCase() === brand.slug.toLowerCase()
                                    ? 'grayscale opacity-30 scale-90'
                                    : 'opacity-100 grayscale-0 hover:scale-110'
                                    }`}
                            >
                                <Image 
                                    src={brand.logo_url} 
                                    alt={brand.name} 
                                    fill 
                                    className="object-contain p-1"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* HEADER INFO SECTION REMOVED */}

            {/* UNITS GRID */}
            <section ref={gridRef} className="max-w-[1920px] mx-auto px-4 md:px-8 py-12 bg-white">
                {filteredUnits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                        {filteredUnits.map((unit, idx) => {
                            const isSold = unit.status === 'vendido';
                            const isReserved = unit.status === 'reservado';
                            const isAvailable = !isSold && !isReserved;
                            const logoUrl = getBrandLogo(unit.brand);

                            return (
                            <div 
                                key={`${unit.vin}-${idx}`} 
                                id={`unit-${unit.vin}`}
                                className={`group flex flex-col relative overflow-hidden rounded-[2.5rem] bg-transparent transition-all duration-1000 ${targetVin === unit.vin ? 'order-first ring-4 ring-[#d2001c] ring-offset-4 ring-offset-gray-50' : ''}`}
                            >
                                
                                {/* Status Banner (Diagonal) */}
                                {isSold && (
                                    <div className="absolute top-10 -right-10 z-30 transform rotate-45 w-48 text-center py-2 shadow-2xl bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-[11px] uppercase tracking-[0.2em] border-y border-red-400/30">
                                        Vendido 🤝
                                    </div>
                                )}
                                {isReserved && (
                                    <div className="absolute top-10 -right-10 z-30 transform rotate-45 w-48 text-center py-2 shadow-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-white font-black text-[11px] uppercase tracking-[0.2em] border-y border-amber-300/30">
                                        Reservado ⏳
                                    </div>
                                )}

                                {/* Single Compact Card Body */}
                                <div className={`relative flex flex-col rounded-[2rem] bg-white p-6 transition-all duration-500 border border-gray-100 shadow-sm overflow-hidden ${isAvailable ? 'group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]' : 'opacity-80 grayscale-[0.3]'}`}>
                                    
                                    {/* Top Controls: Logo & Share + Liquidation Tag */}
                                    <div className="relative z-30 flex justify-between items-start">
                                        <div className="flex-1">
                                            {logoUrl ? (
                                                <div className="relative w-16 h-8 opacity-80 mix-blend-multiply">
                                                    <Image src={logoUrl} alt={unit.brand} fill className="object-contain object-left" />
                                                </div>
                                            ) : (
                                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{unit.brand}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex items-center gap-2">
                                                {badgeLogoUrl ? (
                                                    // Alto fijo, ancho automático según la proporción real de la imagen
                                                    // subida en Filament — se adapta solo a cualquier forma/tamaño de
                                                    // logo que se use en futuras campañas, sin tocar código.
                                                    <Image
                                                        src={badgeLogoUrl}
                                                        alt={badgeText || 'Promoción'}
                                                        width={200}
                                                        height={200}
                                                        className="h-11 sm:h-12 w-auto max-w-[100px] sm:max-w-[120px] object-contain drop-shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="bg-[#d2001c] text-white px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                                                        <Flame size={12} fill="currentColor" />
                                                        <span className="text-[9px] font-black uppercase tracking-widest">{badgeText || 'Liquidación'}</span>
                                                    </div>
                                                )}
                                                <ShareButton
                                                    title={`${badgeText || 'Liquidación'} ${unit.brand} ${unit.modelName}`}
                                                    url={typeof window !== 'undefined' ? `${window.location.origin}/liquidacion?vin=${unit.vin}` : `https://automotrizcarmona.cl/liquidacion?vin=${unit.vin}`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Header */}
                                    <div className="relative z-10 mt-4">
                                        <h3 className={`text-xl font-black text-[#1a1a1a] tracking-tight uppercase leading-tight mb-0.5 transition-colors ${isAvailable ? 'group-hover:text-[#d2001c]' : ''}`}>{unit.modelName}</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider line-clamp-1 mb-2">{unit.versionName}</p>
                                        
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-100">
                                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Unidad VIN:</span>
                                            <span className="text-[10px] font-bold text-gray-900 tracking-tighter">{unit.vin}</span>
                                        </div>
                                    </div>

                                    {/* Compact Flowing Image */}
                                    <div className="relative mx-auto mt-2 w-full max-w-[280px] aspect-[16/10] z-20">
                                        <Image
                                            src={unit.image}
                                            alt={unit.modelName}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className={`object-contain drop-shadow-lg transition-transform duration-700 ease-out ${isAvailable ? 'group-hover:scale-105' : ''}`}
                                        />
                                    </div>
                                    
                                    {/* Subtle Background Badge */}
                                    <div className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-[4rem] font-black text-gray-50/40 select-none -z-0 pointer-events-none transition-colors uppercase italic ${isAvailable ? 'group-hover:text-red-50/40' : ''}`}>
                                        {unit.brand.substring(0, 3)}
                                    </div>

                                    {/* Price Info - Integrated */}
                                    <div className="mt-4 text-center relative z-30">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-sm font-bold text-gray-300 line-through decoration-[#d2001c]/30">
                                                {formatPrice(unit.listPrice || (unit.promoPrice + unit.promoBonus))}
                                            </span>
                                            <div className="bg-[#d2001c] text-white px-3 py-1 rounded-md text-[10px] font-black animate-pulse">
                                                AHORRA {formatPrice(unit.promoBonus)}
                                            </div>
                                        </div>
                                        
                                        <div className={`mb-4 bg-transparent w-full transition-colors`}>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-0.5">Precio Final de Liquidación</p>
                                            <p className="text-3xl font-black text-gray-900 tracking-tighter leading-none">{formatPrice(unit.promoPrice)}</p>
                                            <p className="text-[9px] text-gray-500 mt-1">*Precio con financiamiento</p>
                                        </div>

                                        {isAvailable ? (
                                            <Link 
                                                href={`/cotizar?marca=${encodeURIComponent(unit.brand)}&modelo=${encodeURIComponent(unit.modelId || unit.modelName)}&version=${encodeURIComponent(unit.versionName || '')}&vin=${encodeURIComponent(unit.vin)}`}
                                                className="w-full inline-flex items-center justify-center gap-3 py-3.5 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#d2001c] transition-all shadow-xl hover:shadow-[#d2001c]/30 hover:scale-[1.02] active:scale-100 group/btn"
                                            >
                                                Lo quiero ahora <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                                            </Link>
                                        ) : (
                                            <div className={`w-full inline-flex items-center justify-center gap-3 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] cursor-not-allowed border ${isSold ? 'bg-red-50 text-red-400 border-red-100' : 'bg-amber-50 text-amber-500 border-amber-100'}`}>
                                                {isSold ? '🤝 Ya tiene dueño' : '⏳ Esperando Confirmación'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                    </div>
                ) : (
                    <div className="py-32 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-gray-400">No hay unidades para esta marca</h3>
                        <p className="text-gray-500 mt-2 font-medium">Explora otras marcas para ver oportunidades disponibles.</p>
                        <button 
                            onClick={() => handleBrandChange('Todas')}
                            className="mt-6 text-sm font-black uppercase tracking-widest text-[#d2001c] hover:underline"
                        >
                            Ver todo el stock
                        </button>
                    </div>
                )}
            </section>
        </>
    );
}
