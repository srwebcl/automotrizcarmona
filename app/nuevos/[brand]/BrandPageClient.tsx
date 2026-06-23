'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { Vehicle } from '@/lib/models/types';

interface BrandPageClientProps {
    brandId: string;
    models: Vehicle[];
    config: any;
}

export default function BrandPageClient({ brandId, models, config }: BrandPageClientProps) {
    const isToyota = brandId.toLowerCase() === 'toyota';
    const catalogRef = React.useRef<HTMLDivElement>(null);

    const availableCategories = Array.from(new Set(
        models.flatMap(m => m.category.split(',').map(c => c.trim()))
    )).sort();

    const hasHybrids = models.some(m => m.isHybrid);
    const hasElectrics = models.some(m => m.isElectric);
    
    const existsHybrid = availableCategories.some(c => 
        c.toLowerCase().includes('híbrido') || c.toLowerCase().includes('hibrido')
    );
    const existsElectric = availableCategories.some(c => 
        c.toLowerCase().includes('eléctrico') || c.toLowerCase().includes('electrico')
    );

    const dynamicCategories = ['Todos', ...availableCategories];
    
    if (hasHybrids && !existsHybrid) dynamicCategories.push('Híbrido');
    if (hasElectrics && !existsElectric) dynamicCategories.push('Eléctrico');

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
        ? models
        : activeCategory === 'Híbrido'
            ? models.filter(m => m.isHybrid)
            : activeCategory === 'Eléctrico'
                ? models.filter(m => m.isElectric)
                : models.filter(m => m.category.split(',').map(c => c.trim()).includes(activeCategory));

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        if (catalogRef.current) {
            const yOffset = -150;
            const y = catalogRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };

    const DynamicDiscoverImage = ({ basePath, alt }: { basePath: string, alt: string }) => {
        const [extensionIdx, setExtensionIdx] = useState(0);
        const extensions = ['.webp', '.png', '.jpg', '.jpeg'];
        
        const hasExtension = basePath.match(/\.(webp|png|jpg|jpeg)$/i);
        if (hasExtension) {
            return <Image src={basePath.startsWith('http') ? basePath : `${process.env.NEXT_PUBLIC_CDN_URL || ''}/${basePath.replace(/^\//, '')}`} alt={alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />;
        }

        const currentSrc = `${basePath}${extensions[extensionIdx]}`;
        const finalSrc = currentSrc.startsWith('http') ? currentSrc : `${process.env.NEXT_PUBLIC_CDN_URL || ''}/${currentSrc.replace(/^\//, '')}`;

        return (
            <Image 
                src={finalSrc} 
                alt={alt} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                onError={() => {
                    if (extensionIdx < extensions.length - 1) {
                        setExtensionIdx(extensionIdx + 1);
                    }
                }}
            />
        );
    };

    const bannerSlides = config.bannerSlides || [];

    return (
        <main className="min-h-screen bg-white font-sans">
            {/* Hero Section Adaptive Slider */}
            <section className="relative w-full bg-gray-100 overflow-hidden pt-20">
                <div className="relative group" ref={heroEmblaRef}>
                    <div className="flex">
                        {bannerSlides.map((slide: any, index: number) => {
                            const slideContent = (
                                <>
                                    {slide.web && slide.mobile ? (
                                        <>
                                            <div className="hidden md:block relative w-full">
                                                <Image
                                                    src={slide.web.startsWith('http') ? slide.web : `${process.env.NEXT_PUBLIC_CDN_URL || 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev'}/${slide.web.replace(/^\//, '')}`}
                                                    alt={slide.title || `${config.name} Banner ${index + 1}`}
                                                    width={1920}
                                                    height={600}
                                                    className="w-full h-auto object-contain block"
                                                    draggable={false}
                                                    priority={index === 0}
                                                />
                                            </div>
                                            <div className="md:hidden relative w-full">
                                                <Image
                                                    src={slide.mobile.startsWith('http') ? slide.mobile : `${process.env.NEXT_PUBLIC_CDN_URL || 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev'}/${slide.mobile.replace(/^\//, '')}`}
                                                    alt={slide.title || `${config.name} Banner ${index + 1}`}
                                                    width={800}
                                                    height={800}
                                                    className="w-full h-auto object-contain block"
                                                    draggable={false}
                                                    priority={index === 0}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center justify-center min-h-[300px] text-gray-500 bg-gray-100">
                                            {slide.title}
                                        </div>
                                    )}
                                </>
                            );

                            return (
                                <div key={index} className="relative flex-[0_0_100%] min-w-0">
                                    {slide.link ? (
                                        <Link href={slide.link} className="block w-full relative cursor-pointer">
                                            {slideContent}
                                        </Link>
                                    ) : (
                                        <div className="w-full relative">
                                            {slideContent}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {config.bannerSlides.length > 1 && (
                        <>
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between px-3 md:px-8 pointer-events-none z-20">
                                <button onClick={scrollPrev} className="group pointer-events-auto w-9 h-9 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 md:bg-white/10 md:hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all shadow-xl">
                                    <ChevronLeft size={20} className="md:hidden" />
                                    <ChevronLeft size={32} className="hidden md:block" />
                                </button>
                                <button onClick={scrollNext} className="group pointer-events-auto w-9 h-9 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 md:bg-white/10 md:hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all shadow-xl">
                                    <ChevronRight size={20} className="md:hidden" />
                                    <ChevronRight size={32} className="hidden md:block" />
                                </button>
                            </div>

                            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
                                {config.bannerSlides.map((_: any, i: number) => (
                                    <div key={i} className="w-1.5 md:w-3 h-1.5 md:h-3 rounded-full bg-white/30 backdrop-blur-sm border border-white/10" />
                                ))}
                            </div>
                        </>
                    )}
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
                                    onClick={() => handleCategoryChange(cat)}
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
            <section className="pt-6 pb-4 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 tracking-tight mb-4">
                        Cotiza tu próximo{' '}
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 uppercase">
                            {config.name}
                        </span>
                        {' '}en Automotriz Carmona
                    </h2>
                </div>
            </section>

            {/* Models Grid */}
            <section ref={catalogRef} className="pb-24 pt-0 bg-white">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredModels.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                            {filteredModels.map((model) => {
                                const finalImgSrc = model.image.startsWith('http') ? model.image : `${process.env.NEXT_PUBLIC_CDN_URL || ''}/${model.image.replace(/^\//, '')}`;
                                return (
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
                        <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                            <h3 className="text-2xl font-bold text-gray-400 mb-2">Catálogo {config.name} en Actualización</h3>
                            <p className="text-gray-500">Estamos preparando los mejores modelos disponibles en nuestra Base de Datos.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Legal Section */}
            {(config.legalExcerpt || config.legalText) && (
                <section className="py-8 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-2 items-start">
                            <div 
                                className="text-[10px] leading-relaxed text-gray-400 prose prose-sm max-w-none prose-p:my-1"
                                dangerouslySetInnerHTML={{ __html: config.legalExcerpt || config.legalText }}
                            />
                            <Link href={`/legal#${brandId}`} className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-red-600 hover:text-red-700 transition-colors mt-2">
                                VER MÁS <ArrowRight size={14} strokeWidth={3} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Discover More */}
            <section className="py-20 bg-white border-t border-gray-100">
                {/* Contenido omitido visualmente para mantener código ordenado pero el carrusel descubrir más está limpio */}
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
                                    link: `/servicios/agendar?marca=${config.name}`, 
                                    image: config.serviceImages?.servicio ?? (brandId === 'toyota' ? "autos-nuevos/toyota/mas-info/servicio-toyota" : `autos-nuevos/${brandId}/mas-info/servicio-${brandId}`)
                                },
                                { 
                                    id: 2, 
                                    title: "Repuestos", 
                                    subtitle: "Repuestos Originales", 
                                    link: `/repuestos/cotizar?marca=${config.name}`, 
                                    image: config.serviceImages?.repuestos ?? (brandId === 'toyota' ? "autos-nuevos/toyota/mas-info/repuestos-toyota" : `autos-nuevos/${brandId}/mas-info/repuestos-${brandId}`)
                                },
                                { 
                                    id: 3, 
                                    title: `${config.name} Usados`, 
                                    subtitle: "Seminuevos", 
                                    link: `https://seminuevos.automotrizcarmona.cl/catalogo?brand=${brandId}`, 
                                    image: config.serviceImages?.usados ?? (brandId === 'toyota' ? "autos-nuevos/toyota/mas-info/usados-toyota" : `autos-nuevos/${brandId}/mas-info/usados-${brandId}`),
                                    isExternal: true 
                                },
                                { 
                                    id: 4, 
                                    title: "Sucursales", 
                                    subtitle: "Encuentra tu Sucursal", 
                                    link: `/sucursales?marca=${config.name}`, 
                                    image: config.serviceImages?.sucursales ?? (brandId === 'toyota' ? "autos-nuevos/toyota/mas-info/sucursal-toyota" : `autos-nuevos/${brandId}/mas-info/sucursal-${brandId}`)
                                }
                            ].map((item) => (
                                <div key={item.id} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_25%] pl-4 min-w-0">
                                    <Link href={item.link} target={(item as any).isExternal ? '_blank' : undefined} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-lg transition-all duration-500">
                                        <div className="absolute inset-0">
                                            {item.image ? (
                                                <DynamicDiscoverImage basePath={item.image} alt={item.title} />
                                            ) : (
                                                <div className="absolute inset-0 bg-gray-100" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 transition-opacity" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10">
                                            <p className="text-sm font-bold text-white mb-1 uppercase tracking-widest drop-shadow-sm opacity-80">{item.subtitle}</p>
                                            <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors uppercase">{item.title}</h3>
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
