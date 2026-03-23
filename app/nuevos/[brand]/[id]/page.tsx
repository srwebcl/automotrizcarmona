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
import { ChevronRight, FileText, Calendar, Info, Car, Shield, Wifi, Zap, ArrowRight, Download, Fuel, Cog, Droplets, MapPin, Search, ChevronLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

export default function GenericModelPage({ params }: { params: Promise<{ brand: string; id: string }> }) {
    const resolvedParams = use(params);
    const { brand, id } = resolvedParams;
    const config = getBrandConfig(brand);

    const [model, setModel] = useState<Vehicle | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeIdx, setActiveIdx] = useState(0);
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const router = useRouter();

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 }
        }
    });

    const [versionsRef, versionsApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 1,
    });

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
                const fallback = (MODELS_REGISTRY[brand.toLowerCase()] || []).find(m => m.id === id);
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

    const minPrice = model.versions?.length > 0 
        ? Math.min(...model.versions.map((v: any) => v.bonusPrice)) 
        : model.price;

    return (
        <main className="min-h-screen bg-[#f4f6f8] font-sans pt-[76px]">
            {/* Banner Section */}
            {model.desktopBanner ? (
                <section className="relative w-full bg-black border-b border-gray-100 overflow-hidden">
                    <picture className="w-full h-full block">
                        <source media="(min-width: 768px)" srcSet={model.desktopBanner} />
                        <img src={model.mobileBanner || model.desktopBanner} alt={`Banner ${model.name}`} className="w-full min-h-[400px] md:h-auto object-cover opacity-80" />
                    </picture>
                    {brand !== 'toyota' && <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none" />}
                    {brand !== 'toyota' && (
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
                    )}
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

                        {/* Details Sidebar with Versions Carousel */}
                        <div id="seccion-versiones" className="lg:col-span-5 flex flex-col pt-8 scroll-mt-24">
                            <div className="flex items-center justify-between mb-8">
                                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight uppercase">
                                    <span className="text-gray-900">{config.name}</span> <span className="text-gray-400">{model.name}</span>
                                </h1>
                                <div className="flex gap-2 pb-2">
                                    <button onClick={() => versionsApi?.scrollPrev()} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all shadow-sm">
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button onClick={() => versionsApi?.scrollNext()} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all shadow-sm">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-hidden" ref={versionsRef}>
                                <div className="flex -ml-4">
                                    {mockVersions.map((v: any, i: number) => (
                                        <div key={i} className="flex-[0_0_100%] min-w-0 pl-4">
                                            <div className="bg-white rounded-3xl p-6 h-full border border-gray-200 hover:border-red-600 hover:shadow-xl shadow-sm transition-all flex flex-col justify-between group">
                                                
                                                <div>
                                                    <div className="flex justify-between items-start mb-6">
                                                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight pr-4 leading-tight">
                                                            {v.name}
                                                        </h3>
                                                        <ShareButton
                                                            title={`Mira la versión ${v.name} del ${config.name} ${model.name} en Carmona`}
                                                            url={`https://automotrizcarmona.cl/nuevos/${brand}/${id}`}
                                                        />
                                                    </div>

                                                    {/* Attributes Grid */}
                                                    <div className="flex flex-col gap-2.5 mb-8">
                                                        {v.motor && v.motor !== 'N/A' && (
                                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Motor</span>
                                                                <span className="text-sm font-bold text-gray-800 text-right w-2/3">{v.motor}</span>
                                                            </div>
                                                        )}
                                                        {v.transmission && v.transmission !== 'N/A' && (
                                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Transmisión</span>
                                                                <span className="text-sm font-bold text-gray-800 text-right w-2/3">{v.transmission}</span>
                                                            </div>
                                                        )}
                                                        {v.power && v.power !== 'N/A' && (
                                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Potencia</span>
                                                                <span className="text-sm font-bold text-gray-800 text-right w-2/3">{v.power}</span>
                                                            </div>
                                                        )}
                                                        {v.torque && v.torque !== 'N/A' && (
                                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Torque</span>
                                                                <span className="text-sm font-bold text-gray-800 text-right w-2/3">{v.torque}</span>
                                                            </div>
                                                        )}
                                                        {v.fuel && v.fuel !== 'N/A' && (
                                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Consumo</span>
                                                                <span className="text-sm font-bold text-gray-800 text-right w-2/3">{v.fuel}</span>
                                                            </div>
                                                        )}
                                                        {v.traction && v.traction !== 'N/A' && (
                                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Tracción</span>
                                                                <span className="text-sm font-bold text-gray-800 text-right w-2/3">{v.traction}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Pricing & CTA */}
                                                <div className="mt-auto pt-6 border-t border-gray-100 bg-gray-50 -mx-6 px-6 -mb-6 pb-6 rounded-b-[1.3rem]">
                                                    {v.listPrice > 0 && (
                                                        <div className="flex justify-between items-center mb-1.5 pt-4">
                                                            <span className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Precio de Lista</span>
                                                            <span className="text-sm font-bold text-gray-400 line-through">{formatPrice(v.listPrice)}</span>
                                                        </div>
                                                    )}
                                                    {v.bonus > 0 && (
                                                        <div className="flex justify-between items-center mb-1.5">
                                                            <span className="text-[11px] font-black tracking-widest text-gray-500 uppercase">Bono Financiamiento</span>
                                                            <span className="text-sm font-black text-gray-500">{formatPrice(v.bonus)}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between items-end mb-6 mt-4">
                                                        <span className="text-xs font-black text-gray-500 uppercase tracking-widest leading-tight">Precio con<br/>Financiamiento</span>
                                                        <span className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter leading-none">{formatPrice(v.bonusPrice)}</span>
                                                    </div>

                                                    <Link href={`/cotizar?marca=${brand}&modelo=${id}&version=${encodeURIComponent(v.name)}`} className="flex items-center justify-center w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all uppercase text-sm tracking-widest shadow-xl shadow-gray-900/10">
                                                        Cotizar Versión
                                                    </Link>
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
            
            {/* Features Section */}
            <section className="bg-gray-50 py-24 overflow-hidden border-t border-gray-100">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">Equipamiento</p>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
                                Características <span className="text-gray-400">Destacadas</span>
                            </h2>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => emblaApi?.scrollPrev()} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={() => emblaApi?.scrollNext()} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-6">
                            {highlightFeatures.map((feature: any, idx: number) => (
                                <div key={idx} className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] pl-6">
                                    <div className="bg-white rounded-3xl p-8 h-full border border-gray-200 hover:border-red-600 transition-all group shadow-sm flex flex-col">
                                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100 flex-shrink-0">
                                            <Image src={feature.image} alt={feature.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase">{feature.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            {model.videoUrl && (
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-gray-900">Experiencia <span className="text-red-600">{config.name} {model.name}</span></h2>
                        <p className="text-gray-500">Conoce cada detalle del {model.name} en movimiento.</p>
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
