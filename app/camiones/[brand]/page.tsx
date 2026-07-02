'use client';

import React, { useState, use, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Info, Truck as TruckIcon } from 'lucide-react';
import { notFound, useRouter, useSearchParams } from 'next/navigation';

import { getBrandConfig } from '@/lib/brands';
import { getTrucksByBrand, Truck } from '@/lib/api';

function TruckBrandContent({ brandId, config }: { brandId: string, config: any }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('categoria');

    // Truck specific categories — derived dynamically later from API data
    const [activeCategory, setActiveCategory] = useState(categoryParam || 'Todos');
    const [brand, setBrand] = useState<any>(null);
    const [trucks, setTrucks] = useState<Truck[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const catalogRef = React.useRef<HTMLDivElement>(null);

    // Auto-scroll inicial si venimos de un enlace con filtro
    useEffect(() => {
        if (categoryParam) {
            const t = setTimeout(() => {
                if (catalogRef.current) {
                    const yOffset = -50;
                    const y = catalogRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 600);
            return () => clearTimeout(t);
        }
    }, [categoryParam]);

    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps'
    });
    const [heroEmblaRef, heroEmblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = React.useCallback(() => {
        if (!heroEmblaApi) return;
        setSelectedIndex(heroEmblaApi.selectedScrollSnap());
    }, [heroEmblaApi]);

    useEffect(() => {
        if (!heroEmblaApi) return;
        onSelect();
        heroEmblaApi.on('select', onSelect);
        heroEmblaApi.on('reInit', onSelect);
    }, [heroEmblaApi, onSelect]);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const data = await getTrucksByBrand(brandId);
                if (data) {
                    setBrand(data.brand);
                    setTrucks(data.trucks || []);
                }
            } catch (error) {
                console.error('Error loading brand data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [brandId]);

    const scrollPrev = React.useCallback(() => {
        if (heroEmblaApi) heroEmblaApi.scrollPrev();
    }, [heroEmblaApi]);

    const scrollNext = React.useCallback(() => {
        if (heroEmblaApi) heroEmblaApi.scrollNext();
    }, [heroEmblaApi]);

    const availableCategories = React.useMemo(() => {
        const cats = trucks
            .map(t => (t as any).category)
            .filter((c): c is string => !!c && c.trim() !== '');
        return ['Todos', ...Array.from(new Set(cats))];
    }, [trucks]);

    const filteredModels = activeCategory === 'Todos' 
        ? trucks 
        : trucks.filter(t => (t as any).category === activeCategory);

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        const params = new URLSearchParams(searchParams.toString());
        if (cat === 'Todos') {
            params.delete('categoria');
        } else {
            params.set('categoria', cat);
        }
        window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
    };

    const quoteTruck = (truck: Truck) => {
        router.push(`/cotizar?marca=${brandId}&modelo=${truck.slug}`);
    };

    // Combinamos banners din\u00e1micos con est\u00e1ticos
    const dynamicBanners = brand?.hero_banner_desktop ? [{
        web: brand.hero_banner_desktop,
        mobile: brand.hero_banner_mobile || brand.hero_banner_desktop,
        hasMobileSpecific: !!brand.hero_banner_mobile,
        bg: 'bg-white',
        title: '',
        link: ''
    }] : [];

    const allBanners = dynamicBanners.length > 0 ? dynamicBanners : config.bannerSlides.map((b: any) => ({
        ...b,
        hasMobileSpecific: b.web !== b.mobile
    }));
    
    const mobileAspectRatio = allBanners.some((b: any) => b.hasMobileSpecific) 
        ? 'aspect-square' 
        : 'aspect-video';

    return (
        <main className="min-h-screen bg-white font-sans selection:bg-gray-900 selection:text-white">

            {/* Hero Section - Adaptive Slider */}
            <section className="relative w-full bg-gray-100 overflow-hidden pt-16 md:pt-20">
                <div className={`${mobileAspectRatio} md:aspect-[16/9] lg:aspect-[1200/420] w-full`} ref={heroEmblaRef}>
                    <div className="flex h-full">
                        {allBanners.map((slide: any, index: number) => (
                            <div key={index} className={`relative flex-[0_0_100%] min-w-0 h-full ${slide.bg || 'bg-white'}`}>
                                {slide.web && slide.mobile && (
                                    <>
                                        <div className="hidden md:block absolute inset-0 w-full h-full">
                                            <Image
                                                src={slide.web}
                                                alt={`${config.name} Banner ${index + 1}`}
                                                fill
                                                className="object-cover object-center"
                                                draggable={false}
                                                priority={index === 0}
                                            />
                                        </div>
                                        <div className="md:hidden absolute inset-0 w-full h-full">
                                            <Image
                                                src={slide.mobile}
                                                alt={`${config.name} Banner Mobile ${index + 1}`}
                                                fill
                                                className={slide.hasMobileSpecific ? "object-cover object-center" : "object-contain object-center bg-white"}
                                                draggable={false}
                                                priority={index === 0}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {allBanners.length > 1 && (
                    <>
                        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 pointer-events-none z-10">
                            <button onClick={scrollPrev} className="group pointer-events-auto w-10 h-10 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all">
                                <ChevronLeft size={32} />
                            </button>
                            <button onClick={scrollNext} className="group pointer-events-auto w-10 h-10 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all">
                                <ChevronRight size={32} />
                            </button>
                        </div>
                        <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex flex-wrap items-center justify-center gap-2 z-20 px-4">
                            {allBanners.map((_: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => heroEmblaApi?.scrollTo(index)}
                                    className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${
                                        index === selectedIndex
                                            ? 'bg-white w-6 md:w-8'
                                            : 'bg-white/50 hover:bg-white/80 w-2 md:w-2.5'
                                    }`}
                                    aria-label={`Ir a banner ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </section>

            {/* Logo & SEO Title + Category Filter Strip */}
            <section ref={catalogRef} className="pt-16 pb-0 bg-[#f8f9fa] overflow-hidden relative z-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
                    {/* Logo: prefer API logo, fallback to static config */}
                    <div className="relative w-48 h-16 sm:w-56 sm:h-20 mb-8">
                        <Image
                            src={brand?.logo_url ? (brand.logo_url.startsWith('http') ? brand.logo_url : `${process.env.NEXT_PUBLIC_CDN_URL || ''}/${brand.logo_url.replace(/^\/+/, '')}`) : config.logo}
                            alt={`${config.name} Logo`}
                            fill
                            className="object-contain object-center"
                        />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 tracking-tight">
                        Cotiza tu próximo{' '}
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 uppercase">
                            {config.name}
                        </span>
                        {' '}en Automotriz Carmona
                    </h2>
                </div>

                {/* Category Filter Strip — only renders when there are categorized trucks */}
                {availableCategories.length > 1 && (
                    <div className="max-w-7xl mx-auto px-4 pt-10 pb-4">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {availableCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-200 border-2 ${
                                        activeCategory === cat
                                            ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Models Grid */}
            <section className="pt-10 pb-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">


                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-3xl p-8 h-[400px] animate-pulse" />
                            ))}
                        </div>
                    ) : filteredModels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 pt-8">
                            {filteredModels.map((truck) => (
                                <Link key={truck.id} href={`/cotizar?marca=${brandId}&modelo=${truck.slug}`} className="group block">
                                    <div className="relative rounded-[2rem] pt-10 px-8 pb-32 transition-colors bg-[#f8f8f8] mb-8 group-hover:bg-[#f1f1f1]">
                                        <div className="relative z-10">
                                            <p className="text-gray-400 text-xs font-black mb-1.5 uppercase tracking-widest text-center">{config.name}</p>
                                            <h3 className="text-xl md:text-2xl font-extrabold text-[#1a1a1a] tracking-tight uppercase text-center line-clamp-2 min-h-[60px]">
                                                {truck.name}
                                            </h3>
                                        </div>
                                        <div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 w-[110%] max-w-[320px] h-[220px]">
                                            {truck.image_url ? (
                                                <Image
                                                    src={truck.image_url}
                                                    alt={truck.name}
                                                    fill
                                                    className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-200">
                                                    <TruckIcon size={64} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-16 text-center px-4 md:px-8">
                                        <button className="w-full py-4 md:py-4 bg-[#1a1a1a] text-white rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-black transition-all transform active:scale-95 shadow-md group-hover:shadow-lg">
                                            Cotizar ahora
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center bg-white border border-gray-100 rounded-[2rem] shadow-sm">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                <TruckIcon size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Próximamente UNIDADES {config.name}</h3>
                            <p className="text-gray-500 max-w-sm mx-auto px-4">Estamos actualizando nuestro catálogo para ofrecerte los mejores camiones de alta gama.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Discover More */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col mb-12 items-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight text-center">
                            Descubre más <span className="uppercase font-extrabold text-gray-900">{config.name}</span>
                        </h2>
                        <div className="w-24 h-1 bg-gray-900 rounded-full mt-4"></div>
                    </div>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4 touch-pan-y">
                            {[
                                { id: 1, title: "Servicio Técnico", subtitle: "Agenda tu Hora", link: `/servicios/agendar?marca=${encodeURIComponent(config.name)}`, image: config.serviceImages?.servicio ?? "/images/quick_access_servicio_1770350934207.png" },
                                { id: 2, title: "Repuestos", subtitle: "Repuestos Originales", link: `/repuestos/cotizar?marca=${encodeURIComponent(config.name)}`, image: config.serviceImages?.repuestos ?? "/images/quick_access_repuestos_1770350949447.png" },
                                { id: 3, title: `${config.name}`, subtitle: "Seminuevos", link: `https://seminuevos.automotrizcarmona.cl/catalogo?category=camion`, image: config.serviceImages?.usados ?? "/images/sucursales.jpg", isExternal: true },
                                { id: 4, title: "Sucursales", subtitle: "Encuentra tu Sucursal", link: "/sucursales", image: config.serviceImages?.sucursales ?? "/images/sucursales.jpg" }
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
                                                <Image
                                                    src={item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_CDN_URL || ''}/${item.image.replace(/^\//, '')}`}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
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

export default function TruckBrandPage({ params }: { params: Promise<{ brand: string }> }) {
    const resolvedParams = use(params);
    const brandId = resolvedParams.brand;
    const config = getBrandConfig(brandId);

    if (!config) return notFound();

    return (
        <Suspense fallback={<div className="min-h-[500px] bg-white w-full" />}>
            <TruckBrandContent brandId={brandId} config={config} />
        </Suspense>
    );
}
