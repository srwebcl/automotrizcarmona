'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { notFound } from 'next/navigation';

import { fetchModelsByBrand, fetchBrandBySlug } from '@/lib/api';
import { MODELS_REGISTRY } from '@/lib/models';
import { getBrandConfig } from '@/lib/brands';
import { Vehicle } from '@/lib/models/types';
export default function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
    const [models, setModels] = useState<Vehicle[]>([]);
    const [brandDetails, setBrandDetails] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const resolvedParams = use(params);
    const brandId = resolvedParams.brand;
    const isToyota = brandId.toLowerCase() === 'toyota';
    const staticConfig = getBrandConfig(brandId);

    React.useEffect(() => {
        const loadPageData = async () => {
            try {
                setIsLoading(true);
                
                // Fetch Brand Details and Models in parallel
                const [apiBrand, apiModels] = await Promise.all([
                    fetchBrandBySlug(brandId).catch(err => {
                        console.warn('Brand API error:', err);
                        return null;
                    }),
                    fetchModelsByBrand(brandId).catch(err => {
                        console.warn('Models API error:', err);
                        return [];
                    })
                ]);

                if (apiBrand) {
                    setBrandDetails(apiBrand);
                }
                
                // Map API models to Frontend Vehicle interface
                const mappedModels: Vehicle[] = apiModels.map((m: any) => ({
                    id: m.slug,
                    brand: brandId,
                    name: m.name,
                    category: Array.isArray(m.category) ? m.category[0] || 'Varios' : m.category || 'Varios',
                    price: m.base_price || 0,
                    image: m.thumbnail_url || '/images/autos-nuevos.webp',
                    slogan: m.slogan,
                    isHybrid: m.is_hybrid,
                    isElectric: m.is_electric,
                    isNew: m.is_active,
                }));

                const finalModels = mappedModels.length > 0 ? mappedModels : (MODELS_REGISTRY[brandId.toLowerCase()] || []);
                setModels(finalModels);
            } catch (error) {
                console.error('Error loading data:', error);
                setModels(MODELS_REGISTRY[brandId.toLowerCase()] || []);
            } finally {
                setIsLoading(false);
            }
        };

        loadPageData();
    }, [brandId]);

    // Merge static and dynamic config
    const config = {
        ...staticConfig,
        name: brandDetails?.name || staticConfig.name,
        logo: brandDetails?.logo_url || staticConfig.logo,
        brandColorCss: brandDetails?.brand_color_css || staticConfig.brandColorCss,
        seoTitle: brandDetails?.seo_title || `${staticConfig.name} | Automotriz Carmona`,
        legalText: brandDetails?.legal_text,
        bannerSlides: (brandDetails?.hero_banners?.length > 0) 
            ? brandDetails.hero_banners.map((b: any) => ({
                title: b.title,
                web: b.desktop_image,
                mobile: b.mobile_image
            }))
            : staticConfig.bannerSlides
    };

    const ALL_MODELS = models;

    const availableCategories = Array.from(new Set(ALL_MODELS.map(m => m.category)));
    const hasHybrids = ALL_MODELS.some(m => m.isHybrid);
    const hasElectrics = ALL_MODELS.some(m => m.isElectric);
    
    // Evitar duplicados si la marca ya trae su propia categoría de híbridos/eléctricos
    const existsHybrid = availableCategories.some(c => 
        c.toLowerCase().includes('híbrido') || c.toLowerCase().includes('hibrido')
    );
    const existsElectric = availableCategories.some(c => 
        c.toLowerCase().includes('eléctrico') || c.toLowerCase().includes('electrico')
    );

    const dynamicCategories = ['Todos', ...availableCategories];
    
    if (hasHybrids && !existsHybrid) {
        dynamicCategories.push('Híbrido');
    }
    if (hasElectrics && !existsElectric) {
        dynamicCategories.push('Eléctrico');
    }

    const CATEGORIES = dynamicCategories;

    const [activeCategory, setActiveCategory] = useState('Todos');
    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps'
    });
    const [heroEmblaRef, heroEmblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = React.useCallback(() => {
        if (heroEmblaApi) heroEmblaApi.scrollPrev();
    }, [heroEmblaApi]);

    const scrollNext = React.useCallback(() => {
        if (heroEmblaApi) heroEmblaApi.scrollNext();
    }, [heroEmblaApi]);

    const filteredModels = activeCategory === 'Todos'
        ? ALL_MODELS
        : activeCategory === 'Híbrido'
            ? ALL_MODELS.filter(m => m.isHybrid)
            : activeCategory === 'Eléctrico'
                ? ALL_MODELS.filter(m => m.isElectric)
                : ALL_MODELS.filter(m => m.category === activeCategory);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };

    return (
        <main className="min-h-screen bg-white font-sans">

            {/* Hero Section - Adaptive Slider */}
            <section className="relative w-full bg-gray-100 overflow-hidden pt-16 md:pt-20">
                <div className="aspect-square md:aspect-[1200/420] w-full" ref={heroEmblaRef}>
                    <div className="flex h-full">
                        {config.bannerSlides.map((slide: any, index: number) => {
                            const slideContent = (
                                <>
                                    {slide.web && slide.mobile ? (
                                        <>
                                            <div className="hidden md:block absolute inset-0">
                                                <Image
                                                    src={slide.web}
                                                    alt={slide.title || `${config.name} Banner ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    draggable={false}
                                                    priority={index === 0}
                                                />
                                            </div>
                                            <div className="md:hidden absolute inset-0">
                                                <Image
                                                    src={slide.mobile}
                                                    alt={slide.title || `${config.name} Banner ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    draggable={false}
                                                    priority={index === 0}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-500 bg-gray-100">
                                            {slide.title}
                                        </div>
                                    )}
                                </>
                            );

                            return (
                                <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
                                    {slide.link ? (
                                        <Link href={slide.link} className="block w-full h-full relative cursor-pointer">
                                            {slideContent}
                                        </Link>
                                    ) : (
                                        <div className="w-full h-full relative">
                                            {slideContent}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 pointer-events-none">
                    <button onClick={scrollPrev} className="group pointer-events-auto w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all shadow-2xl">
                        <ChevronLeft size={32} />
                    </button>
                    <button onClick={scrollNext} className="group pointer-events-auto w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all shadow-2xl">
                        <ChevronRight size={32} />
                    </button>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                    {config.bannerSlides.map((_: any, i: number) => (
                        <div key={i} className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-white/30 backdrop-blur-sm border border-white/10" />
                    ))}
                </div>
            </section>

            {/* Filter Bar */}
            <section className="sticky top-[68px] z-40 bg-white shadow-md border-b border-gray-100">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-12">
                        <div className="hidden md:block relative w-64 h-20 flex-shrink-0">
                            <Image
                                src={config.logo}
                                alt={`${config.name} Logo`}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide flex-1">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`whitespace-nowrap text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all ${activeCategory === cat
                                        ? 'bg-gray-900 text-white shadow-lg'
                                        : 'bg-transparent text-gray-400 hover:text-gray-900'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-500 tracking-tight leading-tight">
                        Cotiza tu próximo <span className={`${config.brandColorCss} font-black uppercase`}>{config.name}</span> en Automotriz Carmona
                    </h2>
                    <div className="w-16 h-1 bg-gray-200 mx-auto mt-6 rounded-full" />
                </div>
            </section>

            {/* Models Grid */}
            <section className="py-12 bg-white">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-gray-200 h-64 rounded-[2rem] mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                                </div>
                            ))}
                        </div>
                    ) : filteredModels.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                            {filteredModels.map((model) => (
                                <Link key={model.id} href={`/nuevos/${brandId}/${model.id}`} className="group block">
                                    <div className={`relative rounded-[2rem] pt-8 px-8 pb-32 transition-colors ${model.isHybrid || model.isElectric ? 'bg-[#dbeafe]' : 'bg-[#f8f8f8]'}`}>
                                        <div className="absolute top-6 right-6 z-20">
                                            <ShareButton
                                                title={`Conoce el ${model.name} en Automotriz Carmona`}
                                                url={`https://automotrizcarmona.cl/nuevos/${brandId}/${model.id}`}
                                            />
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-gray-400 text-xs font-black mb-1.5 uppercase tracking-widest">{config.name}</p>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-3xl font-extrabold text-[#1a1a1a] tracking-tight">{model.name}</h3>
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
                                                src={model.image}
                                                alt={model.name}
                                                fill
                                                className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-20 text-center">
                                        <p className="text-gray-800 text-lg font-medium">
                                            Precio Desde <span className="font-bold">{formatPrice(model.price)}</span>(*)
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                            <h3 className="text-2xl font-bold text-gray-400 mb-2">Próximamente Catálogo {config.name}</h3>
                            <p className="text-gray-500">Estamos preparando los mejores modelos para ti.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Legal Section */}
            {config.legalText && (
                <section className="py-8 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div 
                            className="text-[10px] leading-relaxed text-gray-400 prose prose-sm max-w-none prose-p:my-1"
                            dangerouslySetInnerHTML={{ __html: config.legalText }}
                        />
                    </div>
                </section>
            )}

            {/* Discover More */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col mb-12 items-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight text-center">
                            Descubre más <span className={`${config.brandColorCss} uppercase font-extrabold`}>{config.name}</span>
                        </h2>
                        <div className={`w-24 h-1 mt-4 rounded-full ${isToyota ? 'bg-red-600' : 'bg-gray-400'}`}></div>
                    </div>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4 touch-pan-y">
                            {[
                                { 
                                    id: 1, 
                                    title: "Servicio Técnico", 
                                    subtitle: "Agenda tu Hora", 
                                    link: "/servicios", 
                                    image: brandId === 'bmw' ? "/images/BMW/bmw-servicio.jpeg" : 
                                           brandId === 'volkswagen' ? "/images/volkswagen/servicio-vw.jpeg" :
                                           brandId === 'seat' ? "/images/seat/servicio-seat.jpeg" : 
                                           brandId === 'cupra' ? "/images/cupra/servicio-cupra.png" :
                                           brandId === 'honda' ? "/images/honda/servicio-honda.jpeg" :
                                           "/images/quick_access_servicio_1770350934207.png" 
                                },
                                { 
                                    id: 2, 
                                    title: "Repuestos", 
                                    subtitle: "Repuestos Originales", 
                                    link: "/repuestos", 
                                    image: brandId === 'bmw' ? "/images/BMW/bmw-repuestos.jpeg" : 
                                           brandId === 'volkswagen' ? "/images/volkswagen/repuestos-vw.jpeg" :
                                           brandId === 'seat' ? "/images/seat/repuestos-seat.jpeg" :
                                           brandId === 'cupra' ? "/images/cupra/repuestos-cupra.png" :
                                           brandId === 'honda' ? "/images/honda/repuestos-honda.jpeg" :
                                           "/images/quick_access_repuestos_1770350949447.png" 
                                },
                                { 
                                    id: 3, 
                                    title: `${config.name} Usados`, 
                                    subtitle: "Seminuevos", 
                                    link: `https://seminuevos.automotrizcarmona.cl/catalogo?brand=${brandId}`, 
                                    image: brandId === 'bmw' ? "/images/BMW/bmw-usados.jpg" : 
                                           brandId === 'volkswagen' ? "/images/volkswagen/usados-volkswagen.png" :
                                           brandId === 'toyota' ? "/images/toyota/usados-toyota.png" : 
                                           brandId === 'seat' ? "/images/seat/usados-seat.jpeg" : 
                                           brandId === 'cupra' ? "/images/cupra/cupra-usados.png" : 
                                           brandId === 'honda' ? "/images/honda/usados-honda.jpeg" : "/images/sucursales.jpg", 
                                    isExternal: true 
                                },
                                { 
                                    id: 4, 
                                    title: "Sucursales", 
                                    subtitle: "Encuentra tu Sucursal", 
                                    link: "/sucursales", 
                                    image: brandId === 'bmw' ? "/images/BMW/bmw-sucursales.webp" : 
                                           brandId === 'volkswagen' ? "/images/volkswagen/sucursal-vw.jpeg" :
                                           brandId === 'seat' ? "/images/seat/sucursales.jpg" :
                                           brandId === 'cupra' ? "/images/cupra/sucursales-cupra.jpg" :
                                           brandId === 'honda' ? "/images/honda/sucursal-honda.png" :
                                           "/images/sucursales.jpg" 
                                }
                            ].map((item) => (
                                <div key={item.id} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_25%] pl-4 min-w-0">
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
                                            <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors uppercase">
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
        </main>
    );
}
