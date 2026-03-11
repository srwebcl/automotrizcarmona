'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ShareButton from '@/components/ShareButton';
import { MODELS_REGISTRY } from '@/lib/models';
import { getBrandConfig } from '@/lib/brands';
import { ChevronRight, FileText, Calendar, Info, Car, Shield, Wifi, Zap, ArrowRight, Download, Fuel, Cog, Droplets, MapPin, Search, ChevronLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

export default function GenericModelPage({ params }: { params: Promise<{ brand: string; id: string }> }) {
    const resolvedParams = use(params);
    const { brand, id } = resolvedParams;
    const config = getBrandConfig(brand);

    // Dynamic model lookup from registry
    const ALL_MODELS = MODELS_REGISTRY[brand.toLowerCase()] || [];
    const model = ALL_MODELS.find(m => m.id === id);
    const [activeIdx, setActiveIdx] = useState(0);

    if (!model) {
        notFound();
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };

    const mockVersions = model.versions || [
        { name: `${model.name} Base`, transmission: 'Manual', traction: '4x2', fuel: 'Gasolina', listPrice: model.price + 1000000, bonusPrice: model.price },
        { name: `${model.name} Full`, transmission: 'Automática', traction: '4x2', fuel: 'Gasolina', listPrice: model.price + 2500000, bonusPrice: model.price + 1500000 }
    ];

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 }
        }
    });

    const parsedFeatures = model.features?.map((f: any) => ({ ...f, image: f.icon || '' })) || [];
    const highlightFeatures = parsedFeatures.length > 0 ? parsedFeatures : [
        { title: "Diseño Exterior", desc: "Lineas aerodinámicas que definen el carácter del vehículo.", image: model.image },
        { title: "Interior Premium", desc: "Comodidad y tecnología en cada detalle.", image: model.gallery?.[0] || model.image },
        { title: "Seguridad Avanzada", desc: "Sistemas integrales para tu tranquilidad.", image: model.gallery?.[1] || model.image }
    ];

    const showCarousel = highlightFeatures.length > 3;

    return (
        <main className="min-h-screen bg-[#f4f6f8] font-sans pt-[76px]">
            {/* Banner Section */}
            {model.desktopBanner ? (
                <section className="w-full bg-gray-50 border-b border-gray-100">
                    <picture className="w-full block">
                        <source media="(min-width: 768px)" srcSet={model.desktopBanner} />
                        <img src={model.mobileBanner || model.desktopBanner} alt={`Banner ${model.name}`} className="w-full h-auto block object-contain" />
                    </picture>
                </section>
            ) : (
                <div className="w-full h-20 bg-white border-b border-gray-100" />
            )}

            {/* Content Section */}
            <section className="bg-white border-b border-gray-100">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Showcase */}
                        <div className="lg:col-span-7 flex flex-col">
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    {model.isNew && <span className="px-3 py-1 bg-gray-900 text-white text-[11px] font-bold uppercase tracking-wider rounded">Nuevo</span>}
                                    {(model.isHybrid || model.isElectric) && (
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider rounded">
                                            {model.isElectric ? '100% Eléctrico' : 'Híbrido'}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-400 font-medium overflow-x-auto whitespace-nowrap hide-scrollbar flex-1 justify-end">
                                    <Link href="/" className="hover:text-red-600">Inicio</Link>
                                    <ChevronRight size={10} />
                                    <Link href="/nuevos" className="hover:text-red-600">Nuevos</Link>
                                    <ChevronRight size={10} />
                                    <Link href={`/nuevos/${brand}`} className="hover:text-red-600 capitalize">{brand}</Link>
                                    <ChevronRight size={10} />
                                    <span className="text-gray-600">{model.name}</span>
                                </div>
                            </div>

                            <div className="flex-1 bg-white rounded-3xl border border-gray-100 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden mb-4">
                                <Image
                                    src={(model.gallery && model.gallery[activeIdx]) || model.image}
                                    alt={model.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {model.gallery && model.gallery.length > 0 && (
                                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-4">
                                    {model.gallery.map((img: string, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveIdx(idx)}
                                            className={`flex-none w-[20%] aspect-[4/3] rounded-xl overflow-hidden relative border-2 transition-all ${activeIdx === idx ? 'border-red-600' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                        >
                                            <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="lg:col-span-5 flex flex-col pt-8">
                            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight uppercase mb-8">
                                <span className="text-gray-900">{config.name}</span> <span className="text-gray-400">{model.name}</span>
                            </h1>

                            <div className="bg-[#fcfcfc] border border-gray-100 rounded-2xl p-6 mb-8 relative">
                                <div className="absolute top-4 right-4 z-20">
                                    <ShareButton
                                        title={`Mira este modelo ${config.name} ${model.name} en Carmona`}
                                        url={`https://automotrizcarmona.cl/nuevos/${brand}/${id}`}
                                    />
                                </div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Precio desde</p>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-4xl lg:text-5xl font-extrabold text-red-600 tracking-tighter">
                                        {formatPrice(model.price)}
                                    </span>
                                    <Info size={16} className="text-gray-300" />
                                </div>
                                <p className="text-[11px] text-gray-500">* Precio sujeto a bonos de financiamiento.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-8">
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <Fuel size={24} className="text-red-600" />
                                    <div><p className="text-[10px] text-gray-400 uppercase font-bold">Rendimiento</p><p className="text-sm font-bold">Alta Eficiencia</p></div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <Cog size={24} className="text-red-600" />
                                    <div><p className="text-[10px] text-gray-400 uppercase font-bold">Transmisión</p><p className="text-sm font-bold">Auto / Manual</p></div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href={`/cotizar?marca=${brand}&modelo=${model.id}`} className="flex-1 flex justify-center py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all uppercase text-sm">
                                    Cotizar ahora
                                </Link>
                                <button className="flex-1 py-4 bg-white border-2 border-gray-200 hover:border-black text-black font-bold rounded-xl transition-all uppercase text-sm">
                                    Ficha Técnica
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Table */}
            <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Versiones Disponibles</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                                <tr>
                                    <th className="py-5 px-6">Versión</th>
                                    <th className="py-5 px-6">Transmisión</th>
                                    <th className="py-5 px-6">Tracción</th>
                                    <th className="py-5 px-6">Precio Lista</th>
                                    <th className="py-5 px-6">Precio Final</th>
                                    <th className="py-5 px-6 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mockVersions.map((v: any, i: number) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-gray-900">{v.name}</td>
                                        <td className="py-5 px-6 text-sm">{v.transmission}</td>
                                        <td className="py-5 px-6 text-sm">{v.traction}</td>
                                        <td className="py-5 px-6 text-sm line-through text-gray-400">{formatPrice(v.listPrice)}</td>
                                        <td className="py-5 px-6 text-lg font-extrabold text-red-600">{formatPrice(v.bonusPrice)}</td>
                                        <td className="py-5 px-6 text-right">
                                            <Link href={`/cotizar?marca=${brand}&modelo=${id}&ver=${i}`} className="px-4 py-2 bg-black text-white text-xs font-bold rounded">Cotizar</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    );
}
