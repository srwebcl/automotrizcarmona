'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import ShareButton from '@/components/ShareButton';
import { fetchModelDetails } from '@/lib/api';
import { Vehicle } from '@/lib/models/types';
import { MODELS_REGISTRY } from '@/lib/models';
import { getBrandConfig } from '@/lib/brands';
import { ChevronRight, FileText, Calendar, Info, Car, Shield, Wifi, Zap, ArrowRight, Download, Fuel, Cog, Droplets, MapPin, Search, ChevronLeft, Activity, Gauge, Settings2, Route, Sparkles } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

export default function GenericModelPage({ params }: { params: Promise<{ brand: string; id: string }> }) {
    const resolvedParams = use(params);
    const { brand, id } = resolvedParams;
    const config = getBrandConfig(brand);

    const [model, setModel] = useState<Vehicle | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeIdx, setActiveIdx] = useState(0);
    const [activeVersionIdx, setActiveVersionIdx] = useState(0);
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const router = useRouter();

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        loop: true,
        slidesToScroll: 1,
    });

    const onSelect = React.useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    React.useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    const [versionsRef, versionsApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
    });

    React.useEffect(() => {
        if (!versionsApi) return;
        versionsApi.on('select', () => setActiveVersionIdx(versionsApi.selectedScrollSnap()));
    }, [versionsApi]);

    React.useEffect(() => {
        const loadModel = async () => {
            try {
                setIsLoading(true);
                const apiModel = await fetchModelDetails(brand, id);
                
                // Map API model to Frontend Vehicle interface
                const mappedModel: Vehicle = {
                    id: apiModel.id,
                    brand: brand,
                    name: apiModel.name,
                    category: Array.isArray(apiModel.category) ? apiModel.category[0] || 'Varios' : apiModel.category || 'Varios',
                    price: apiModel.base_price || 0,
                    image: apiModel.thumbnail_url || '/images/autos-nuevos.webp',
                    slogan: apiModel.slogan,
                    isHybrid: apiModel.is_hybrid,
                    isElectric: apiModel.is_electric,
                    isNew: apiModel.is_active,
                    desktopBanner: apiModel.desktop_banner_url,
                    mobileBanner: apiModel.mobile_banner_url,
                    gallery: apiModel.gallery,
                    videoUrl: apiModel.video_url,
                    versions: apiModel.versions?.map((v: any) => ({
                        name: v.name,
                        transmission: v.transmission,
                        traction: v.traction,
                        fuel: v.fuel,
                        motor: v.motor,
                        power: v.power,
                        torque: v.torque,
                        bonus: v.bonus,
                        listPrice: v.list_price,
                        bonusPrice: v.bonus_price,
                    })) || [],
                };

                setModel(mappedModel);
            } catch (error) {
                console.error('Error loading model details:', error);
                // Fallback to static registry
                const fallback = (MODELS_REGISTRY[brand.toLowerCase()] || []).find(m => m.id.toLowerCase() === id.toLowerCase());
                setModel(fallback || null);
            } finally {
                setIsLoading(false);
            }
        };

        loadModel();
    }, [brand, id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-48 h-12 bg-gray-100 rounded-lg mb-4"></div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Cargando detalles...</p>
                </div>
            </div>
        );
    }

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



    const parsedFeatures = model.features?.map((f: any) => ({ ...f, image: f.image || f.icon || '' })) || [];
    const highlightFeatures = parsedFeatures.length > 0 ? parsedFeatures : [
        { title: "Diseño Exterior", desc: "Lineas aerodinámicas que definen el carácter del vehículo.", image: model.image },
        { title: "Interior Premium", desc: "Comodidad y tecnología en cada detalle.", image: model.gallery?.[0] || model.image },
        { title: "Seguridad Avanzada", desc: "Sistemas integrales para tu tranquilidad.", image: model.gallery?.[1] || model.image }
    ];

    const minPrice = (model.versions && model.versions.length > 0) 
        ? Math.min(...model.versions.map((v: any) => v.bonusPrice)) 
        : model.price;

    // Sub-component for features for consistency
    const FeatureCard = ({ feature, isActive }: { feature: any, isActive: boolean }) => (
        <div className={`transition-all duration-1000 ease-in-out flex flex-col h-full transform origin-center ${isActive ? 'scale-100 opacity-100 z-20' : 'scale-[0.8] opacity-20 z-0 grayscale-[0.8]'}`}>
            <div className={`bg-[#1a1a1a] rounded-[2rem] border border-white/5 shadow-2xl flex flex-col overflow-hidden h-full relative transition-colors duration-700 ${isActive ? 'bg-[#222]' : ''}`}>
                
                {/* Brand Badge - like 'Terramar' in the ref */}
                {isActive && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 animate-in fade-in zoom-in duration-700">
                        <div className="bg-[#333]/80 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-lg shadow-2xl">
                            <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">{model.name}</span>
                        </div>
                    </div>
                )}

                <div className="relative aspect-[16/7] w-full overflow-hidden shrink-0 bg-neutral-900 border-b border-white/5">
                    <Image 
                        src={feature.image} 
                        alt={feature.title} 
                        fill 
                        className={`object-cover transition-transform duration-1000 ${isActive ? 'scale-105' : 'scale-100'}`} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="p-6 md:p-8 flex flex-col items-start text-left flex-1">
                    <h3 className="text-lg md:text-2xl font-bold text-white uppercase tracking-tight mb-3">
                        {feature.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-base leading-relaxed font-medium max-w-[90%]">
                        {feature.desc}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#f4f6f8] font-sans pt-[80px]">
            {/* Banner Section */}
            {model.desktopBanner ? (
                brand === 'bmw-motorrad' ? (
                    <section className="relative w-full h-[calc(100vh-76px)] bg-black overflow-hidden flex flex-col md:flex-row">
                        {/* Background Image */}
                        <div className="absolute inset-0 w-full h-full">
                            <Image 
                                src={model.desktopBanner || model.image} 
                                alt={model.name} 
                                fill 
                                className="object-cover"
                                priority
                            />
                        </div>
                        
                        {/* Dark Overlay/Content Container - inspired by screenshot */}
                        <div className="relative z-10 w-full md:w-1/2 ml-auto h-full md:bg-gradient-to-l from-black/90 via-black/40 to-transparent flex items-center justify-end px-8 md:px-20">
                            <div className="flex flex-col text-white text-right items-end max-w-lg">
                                <p className="text-sm font-bold uppercase tracking-[0.3em] mb-2 opacity-80">2026</p>
                                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                                    {model.name}
                                </h1>
                                <div className="flex flex-col items-end mb-12">
                                    <p className="text-lg md:text-xl font-medium opacity-90 border-t border-white/20 pt-4">Precio lista desde:</p>
                                    <p className="text-3xl md:text-5xl font-black tracking-tight mt-1">{formatPrice(minPrice)}</p>
                                </div>
                                
                                <div className="flex flex-col gap-4 w-full sm:w-80 pointer-events-auto">
                                    <button 
                                        onClick={() => {
                                            if (mockVersions.length === 1) {
                                                router.push(`/cotizar?marca=${brand}&modelo=${model.id}&version=${encodeURIComponent(mockVersions[0].name)}`);
                                            } else {
                                                setShowQuoteModal(true);
                                            }
                                        }}
                                        className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-all shadow-2xl">
                                        Cotizar
                                    </button>
                                    <button 
                                        onClick={() => document.getElementById('seccion-versiones')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                                        className="w-full py-4 border-2 border-white text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                                        Ver Más
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Legal text at bottom left */}
                        <div className="absolute bottom-8 left-8 z-10 text-[10px] text-white/50 max-w-xl pointer-events-none hidden md:block">
                            <p className="leading-relaxed">
                                *Los precios y especificaciones pueden variar según modelo año 2026. IVA Incluido. No incluyen Permiso de Circulación, Patentes, accesorios, seguro y gastos administrativos. BMW MOTORRAD CHILE se reserva el derecho de modificar precios en cualquier momento.
                            </p>
                        </div>
                    </section>
                ) : (
                    <section className={`relative w-full bg-black border-b border-gray-100 overflow-hidden ${['cupra', 'kaiyi', 'volkswagen', 'bmw', 'audi', 'seat'].includes(brand) ? 'h-[calc(100vh-76px)]' : ''}`}>
                        <picture className="w-full h-full block">
                            <source media="(min-width: 768px)" srcSet={model.desktopBanner} />
                            <img 
                                src={model.mobileBanner || model.desktopBanner} 
                                alt={`Banner ${model.name}`} 
                                className={`w-full ${['cupra', 'kaiyi', 'volkswagen', 'bmw', 'audi', 'seat'].includes(brand) ? 'h-full' : 'h-auto md:h-auto'} object-cover opacity-80`} 
                            />
                        </picture>
                        {['cupra', 'kaiyi', 'volkswagen', 'bmw', 'audi', 'seat'].includes(brand) && (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none" />
                                <div className="absolute inset-0 flex items-center px-8 md:px-20 z-10 pointer-events-none">
                                    <div className="flex flex-col text-white max-w-2xl">
                                        {model.slogan && <p className="text-sm md:text-xl md:mb-2 font-bold uppercase tracking-widest">{model.slogan}</p>}
                                        <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight">{config.name} {model.name}</h1>
                                        <p className="text-md md:text-lg font-medium mt-2 md:mt-4 text-gray-200">Precio Desde: {formatPrice(minPrice)}</p>
                                        
                                        <div className="flex flex-wrap gap-4 mt-8 pointer-events-auto">
                                            <button 
                                                onClick={() => document.getElementById('seccion-versiones')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                                                className="px-8 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded transition-all">
                                                Elige el tuyo
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    if (mockVersions.length === 1) {
                                                        router.push(`/cotizar?marca=${brand}&modelo=${model.id}&version=${encodeURIComponent(mockVersions[0].name)}`);
                                                    } else {
                                                        setShowQuoteModal(true);
                                                    }
                                                }}
                                                className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold rounded transition-all">
                                                Cotizar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </section>
                )
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

                        {/* Details Sidebar with Versions Carousel */}
                        <div id="seccion-versiones" className="lg:col-span-5 flex flex-col scroll-mt-24">
                            {/* No external header - all inside cards per new design */}

                            {/* Carousel Box */}
                            <div className="overflow-hidden" ref={versionsRef}>
                                <div className="flex -ml-4">
                                    {mockVersions.map((v: any, i: number) => (
                                        <div key={i} className="flex-[0_0_100%] min-w-0 pl-4">
                                            <div className="bg-white rounded-3xl p-6 h-full border border-gray-200 hover:shadow-xl shadow-sm transition-all flex flex-col justify-between group">
                                                <div>
                                                    {/* ── TOP SECTION: MARCA, MODELO, PRECIO DESDE ── */}
                                                    <div>
                                                        <div className="flex justify-between items-start mb-1">
                                                            <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">{config.name}</span>
                                                            <ShareButton
                                                                title={`Mira el ${config.name} ${model.name} en Automotriz Carmona`}
                                                                url={`https://automotrizcarmona.cl/nuevos/${brand}/${id}`}
                                                            />
                                                        </div>
                                                        <h2 className="text-2xl lg:text-3xl font-medium text-gray-800 tracking-tight uppercase leading-none mb-3">
                                                            {model.name}
                                                        </h2>
                                                        
                                                        <div className="mt-4">
                                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Precio desde</span>
                                                            <span className="text-4xl lg:text-[44px] font-black text-gray-900 tracking-tighter leading-none block">{formatPrice(v.bonusPrice)}</span>
                                                            
                                                            {(v.brandBonus > 0 || v.financingBonus > 0 || v.bonus > 0) && (
                                                                <p className="text-[12px] font-bold text-gray-500 mt-2 max-w-[80%] leading-tight">
                                                                    Incluye Bono de <span className="text-gray-700">{formatPrice((v.brandBonus || 0) + (v.financingBonus || 0) + (v.bonus || 0))}</span> con financiamiento
                                                                </p>
                                                            )}
                                                            {model.ivaIncluded === false && (
                                                                <span className="inline-block mt-3 text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-2.5 py-1 rounded">Precio + IVA No Incluido</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="border-t border-gray-100 my-6"></div>

                                                    {/* ── 4 ICONS (Motor, Combustible, Transmisión, Rendimiento) ── */}
                                                    <div className="grid grid-cols-4 gap-2 mb-6 px-1">
                                                        {[  
                                                            { label: 'Motor', value: v.motor, icon: <Cog size={24} className="text-gray-600 stroke-[1.5] mb-1"/> },
                                                            { label: 'Combustible', value: v.fuel, icon: <Fuel size={24} className="text-gray-600 stroke-[1.5] mb-1"/> },
                                                            { label: 'Transmisión', value: v.transmission, icon: <Settings2 size={24} className="text-gray-600 stroke-[1.5] mb-1"/> },
                                                            { label: 'Rendimiento', value: v.electricRange || v.consumptionMixed || v.consumo, icon: v.electricRange ? <Zap size={24} className="text-gray-600 stroke-[1.5] mb-1" /> : <Route size={24} className="text-gray-600 stroke-[1.5] mb-1" /> },
                                                        ].map(({ label, value, icon }, idx) => (
                                                            <div key={idx} className="flex flex-col items-center justify-start text-center">
                                                                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{label}</span>
                                                                {icon}
                                                                <span className="text-[11px] font-bold text-gray-700 leading-tight break-words max-w-full">{value || '—'}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* ── INFO POR VERSIÓN (BOTTOM SECTION) ── */}
                                                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200/60 mt-auto flex flex-col">
                                                        {/* Versión + Flechas */}
                                                        <div className="flex items-center justify-between gap-3 mb-5 border-b border-gray-200/60 pb-4">
                                                            <div>
                                                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Versión</span>
                                                                <h3 className="text-lg lg:text-xl font-black text-gray-800 uppercase tracking-tight leading-tight">
                                                                    {v.name}
                                                                </h3>
                                                            </div>
                                                            {mockVersions.length > 1 && (
                                                                <div className="flex gap-1 shrink-0">
                                                                    <button onClick={() => versionsApi?.scrollPrev()} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 bg-white hover:bg-gray-900 hover:text-white transition-all shadow-sm">
                                                                        <ChevronLeft size={16} />
                                                                    </button>
                                                                    <button onClick={() => versionsApi?.scrollNext()} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 bg-white hover:bg-gray-900 hover:text-white transition-all shadow-sm">
                                                                        <ChevronRight size={16} />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Specs Extra y Precios Unificados */}
                                                        <div className="flex flex-col mb-6 border-t border-gray-100">
                                                            {[  
                                                                { label: 'Potencia', value: v.power },
                                                                { label: 'Tracción', value: v.traction },
                                                            ]
                                                            .map(({ label, value }) => (
                                                                <div key={label} className="flex justify-between items-center py-3 border-b border-gray-100">
                                                                    <span className="text-[13px] text-gray-600 font-medium">{label}</span>
                                                                    <span className="text-[13px] font-bold text-gray-800">{value && value.toString().trim() !== '' && value !== '-' ? value : '-'}</span>
                                                                </div>
                                                            ))}
                                                            
                                                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                                                <span className="text-[13px] text-gray-600 font-medium">Precio de lista</span>
                                                                <span className="text-[13px] font-bold text-gray-800">{v.listPrice > 0 ? formatPrice(v.listPrice) : '-'}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                                                <span className="text-[13px] text-gray-600 font-medium">Bono Financiamiento</span>
                                                                <span className="text-[13px] font-bold text-gray-800">{(v.financingBonus > 0 || v.bonus > 0) ? `- ${formatPrice(v.financingBonus || v.bonus)}` : '-'}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                                                <span className="text-[13px] text-gray-600 font-medium">Bono Marca</span>
                                                                <span className="text-[13px] font-bold text-gray-800">{v.brandBonus > 0 ? `- ${formatPrice(v.brandBonus)}` : '-'}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center py-3">
                                                                <span className="text-[13px] text-gray-900 font-bold">Precio con financiamiento</span>
                                                                <span className="text-[14px] font-black text-gray-900">{formatPrice(v.bonusPrice || v.listPrice)}</span>
                                                            </div>
                                                        </div>

                                                        {/* Botón Cotizar */}
                                                        <Link href={`/cotizar?marca=${brand}&modelo=${id}&version=${encodeURIComponent(v.name)}`} className="mt-auto flex items-center justify-center w-full py-4 bg-gray-900 hover:bg-black text-white font-medium rounded-xl transition-colors tracking-widest text-sm shadow-sm">
                                                            COTIZAR
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Features Section - Dark Mode focal version */}
            {highlightFeatures && highlightFeatures.length > 0 && (
            <section className="bg-[#0f0f0f] py-32 overflow-hidden border-t border-white/5">
                <div className="max-w-[1600px] mx-auto">
                    {/* Header - Unified Design Style */}
                    <div className="flex flex-col items-center text-center mb-20 gap-4 px-4">
                        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-gray-500 uppercase">
                            <div className="w-10 h-[1.5px] bg-gray-600 rounded-full" />
                            <span>Explora su ADN</span>
                            <div className="w-10 h-[1.5px] bg-gray-600 rounded-full" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium text-white tracking-tighter leading-none">
                            Conoce {
                                model.category?.toLowerCase().includes('pick-up') || 
                                model.category?.toLowerCase().includes('camioneta') || 
                                model.category?.toLowerCase().includes('moto') ||
                                brand === 'bmw-motorrad'
                                ? 'la' : 'el'
                            }{' '}
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 uppercase">
                                {config.name} {model.name}
                            </span>
                        </h2>
                    </div>

                    {highlightFeatures.length >= 3 ? (
                        <div className="relative px-0">
                            {/* Navigation Arrows - Desktop Only */}
                            <div className="hidden md:block">
                                <button 
                                    onClick={() => emblaApi?.scrollPrev()} 
                                    className="absolute left-10 lg:left-24 top-1/2 -translate-y-1/2 z-40 w-20 h-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl group"
                                >
                                    <ChevronLeft size={32} className="group-hover:-translate-x-2 transition-transform" />
                                </button>
                                <button 
                                    onClick={() => emblaApi?.scrollNext()} 
                                    className="absolute right-10 lg:right-24 top-1/2 -translate-y-1/2 z-40 w-20 h-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl group"
                                >
                                    <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>

                            <div className="overflow-hidden py-24 -my-24" ref={emblaRef}>
                                <div className="flex -ml-4 md:-ml-20">
                                    {highlightFeatures.map((feature: any, idx: number) => (
                                        <div 
                                            key={idx} 
                                            className="flex-[0_0_85%] md:flex-[0_0_70%] lg:flex-[0_0_60%] pl-4 md:pl-20"
                                        >
                                            <FeatureCard feature={feature} isActive={idx === selectedIndex} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Swipe Hint - Clean & Separate */}
                            <div className={`md:hidden mt-8 flex flex-col items-center gap-2 transition-all duration-700 ${selectedIndex > 0 ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 animate-float'}`}>
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Desliza para explorar</span>
                                <div className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-12 px-4">
                            {highlightFeatures.map((feature: any, idx: number) => (
                                <div key={idx} className="w-full md:w-[70%] lg:w-[45%]">
                                    <FeatureCard feature={feature} isActive={true} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            )}

            {/* Video Section */}
            {model.videoUrl && model.videoUrl.startsWith('http') && (
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-gray-900">Experiencia <span className="text-gray-900 opacity-50">{config.name} {model.name}</span></h2>
                        <p className="text-gray-500">Conoce cada detalle {
                            model.category?.toLowerCase().includes('pick-up') || 
                            model.category?.toLowerCase().includes('camioneta') || 
                            model.category?.toLowerCase().includes('moto') ||
                            brand === 'bmw-motorrad'
                            ? 'de la' : 'del'
                        } {model.name} en movimiento.</p>
                    </div>
                    <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl">
                        <iframe
                            src={model.videoUrl}
                            title={`${model.name} Video`}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>
            )}
            {/* Descubre más Section */}
            <section className="bg-white py-24 overflow-hidden border-t border-gray-100">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">Continuar Explorando</p>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
                                Descubre <span className="text-gray-400">más</span>
                            </h2>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { 
                                    id: 1, 
                                    title: "Servicio Técnico", 
                                    subtitle: "Agenda tu Hora", 
                                    link: `/servicios/agendar?marca=${config.name}`, 
                                    image: config.serviceImages?.servicio ??
                                           (brand === 'bmw' ? "/images/bmw/bmw-servicio.jpeg" : 
                                           brand === 'bmw-motorrad' ? "/images/bmw-motorrad/servicio-bmw-motorrad.jpeg" : 
                                           brand === 'volkswagen' ? "/images/volkswagen/servicio-vw.jpeg" :
                                           brand === 'toyota' ? "/images/toyota/servicio-toyota.png" : 
                                           brand === 'honda' ? "/images/honda/servicio-honda.jpeg" :
                                           "/images/quick_access_servicio_1770350934207.png")
                                },
                                { 
                                    id: 2, 
                                    title: "Repuestos", 
                                    subtitle: "Repuestos Originales", 
                                    link: `/repuestos/cotizar?marca=${config.name}`, 
                                    image: config.serviceImages?.repuestos ??
                                           (brand === 'bmw' ? "/images/bmw/bmw-repuestos.jpeg" : 
                                           brand === 'bmw-motorrad' ? "/images/bmw-motorrad/repuestos-bmw-motorrad.png" : 
                                           brand === 'volkswagen' ? "/images/volkswagen/repuestos-vw.jpeg" :
                                           brand === 'toyota' ? "/images/toyota/repuestos-toyota.png" : 
                                           brand === 'honda' ? "/images/honda/repuestos-honda.jpeg" :
                                           "/images/quick_access_repuestos_1770350949447.png")
                                },
                                { 
                                    id: 3, 
                                    title: `${config.name} Usados`, 
                                    subtitle: "Seminuevos", 
                                    link: `https://seminuevos.automotrizcarmona.cl/catalogo?brand=${brand}`, 
                                    image: config.serviceImages?.usados ??
                                           (brand === 'bmw' ? "/images/bmw/bmw-usados.jpg" : 
                                           brand === 'bmw-motorrad' ? "/images/bmw-motorrad/usados-bmw-motorrad.png" : 
                                           brand === 'volkswagen' ? "/images/volkswagen/usados-volkswagen.png" :
                                           brand === 'toyota' ? "/images/toyota/usados-toyota.png" : 
                                           brand === 'honda' ? "/images/honda/usados-honda.jpeg" : "/images/sucursales.jpg"),
                                    isExternal: true 
                                },
                                { 
                                    id: 4, 
                                    title: "Sucursales", 
                                    subtitle: "Encuentra tu Sucursal", 
                                    link: `/sucursales?marca=${config.name}`, 
                                    image: config.serviceImages?.sucursales ??
                                           (brand === 'bmw' ? "/images/bmw/bmw-sucursales.webp" : 
                                           brand === 'bmw-motorrad' ? "/images/bmw-motorrad/sucursal-bmw.png" : 
                                           brand === 'volkswagen' ? "/images/volkswagen/sucursal-vw.jpeg" :
                                           brand === 'toyota' ? "/images/toyota/sucursal-toyota.png" : 
                                           brand === 'honda' ? "/images/honda/sucursal-honda.png" :
                                           "/images/sucursales.jpg")
                                }
                            ].map((item) => (
                                <div key={item.id} className="min-w-0">
                                    <Link
                                        href={item.link}
                                        target={(item as any).isExternal ? '_blank' : undefined}
                                        rel={(item as any).isExternal ? 'noopener noreferrer' : undefined}
                                        className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-lg transition-all duration-500"
                                    >
                                        <div className="absolute inset-0">
                                            {item.image ? (
                                                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                            ) : (
                                                <div className="absolute inset-0 bg-gray-100" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 transition-opacity" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10">
                                            <p className="text-sm font-bold text-white mb-1 uppercase tracking-widest drop-shadow-sm opacity-80">{item.subtitle}</p>
                                            <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors uppercase leading-tight">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                                                <span className="text-white">EXPLORAR</span>
                                                <ChevronRight size={16} className="text-white" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Legal Section */}
            <section className="bg-gray-100 py-16 border-t border-gray-200">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex flex-col gap-6">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Ver Condiciones</span>
                        <p className="text-[12px] text-gray-500 leading-relaxed text-left font-medium">
                            (*) Precios sugeridos. (**) Valores de consumo de combustible han sido obtenidos en mediciones de laboratorio según ciclo de ensayo de la Comunidad Europea, homologadas en el MTT. Más información: <a href="https://www.consumovehicular.cl" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-600 transition-colors">www.consumovehicular.cl</a> (1) Para ver los términos y condiciones de los autos y sus versiones, diríjase a los términos y condiciones generales por modelos y versiones. (***) Precios sugeridos. Para ver las condiciones que aplican en los servicios de Pauta de Mantención Prepagada, diríjase a la sección de Pautas de Mantención dentro de los términos y condiciones.
                        </p>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-red-600 cursor-pointer hover:text-red-700 transition-colors">Ver más</span>
                    </div>
                </div>
            </section>
            
            {/* Modal para Elegir Versión (Cotizar Global) */}
            {showQuoteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold uppercase tracking-tight text-gray-900">Elige la versión</h3>
                            <button onClick={() => setShowQuoteModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-red-500 transition-colors">
                                <span className="sr-only">Cerrar</span>
                                ✕
                            </button>
                        </div>
                        <div className="p-4 max-h-[60vh] overflow-y-auto hide-scrollbar">
                            <div className="flex flex-col gap-3">
                                {mockVersions.map((v: any, i: number) => (
                                    <Link 
                                        key={i}
                                        href={`/cotizar?marca=${brand}&modelo=${model.id}&version=${encodeURIComponent(v.name)}`}
                                        className="w-full text-left p-5 rounded-2xl border border-gray-100 hover:border-gray-900 hover:shadow-md flex flex-col gap-1 transition-all group bg-white"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-gray-900 transition-colors uppercase pr-4">{v.name}</span>
                                            <ChevronRight className="text-gray-300 group-hover:text-gray-900 transition-colors" size={16} />
                                        </div>
                                        <div className="flex flex-col mt-1">
                                            {v.listPrice && v.bonusPrice && v.listPrice > v.bonusPrice && (
                                                <span className="text-[11px] font-bold text-gray-400 line-through">
                                                    Lista: {formatPrice(v.listPrice)}
                                                </span>
                                            )}
                                            <span className="text-sm font-black text-gray-900">
                                                {formatPrice(v.bonusPrice || v.listPrice)}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
