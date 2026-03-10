'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Fuel, Cog, Info, Zap, ChevronLeft, Shield } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import ShareButton from '@/components/ShareButton';

export default function YarisCrossPage() {
    // Hardcoded data for the "Gold Standard" demo model
    const model = {
        name: 'Yaris Cross',
        price: 20990000,
        image: '/images/toyota/Hibridos/min_yaris_cross.png',
        isHybrid: true,
        isNew: true,
        desktopBanner: '/images/toyota/SUV/yaris-cross/banner_80492.jpg',
        mobileBanner: '/images/toyota/SUV/yaris-cross/banner_80443.jpg',
        gallery: [
            '/images/toyota/SUV/yaris-cross/galeria_80998.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80549.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80657.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80714.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80765.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80833.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80901.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80947.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_81080.jpg'
        ],
        versions: [
            { name: 'YARIS CROSS HYBRID XI 1.5 CVT', transmission: 'Automática', traction: '4x2', fuel: 'Híbrido', listPrice: 24590000, bonusPrice: 20990000 },
            { name: 'YARIS CROSS HYBRID XG 1.5 CVT', transmission: 'Automática', traction: '4x2', fuel: 'Híbrido', listPrice: 26590000, bonusPrice: 22990000 }
        ],
        features: [
            { title: "Rendimiento y Motor 1.5L", desc: "Excelente desempeño con un motor 1.5L con opciones de transmisión MT and CVT. Alto rendimiento de combustible, ágil y cómodo.", image: '/images/toyota/SUV/yaris-cross/galeria_80998.jpg' },
            { title: "Seguridad y Control Real", desc: "Frenos ABS, Asistencia de salida en pendiente (HAC), Control de Estabilidad (VSC) y distribución electrónica de frenado (EBD).", image: '/images/toyota/SUV/yaris-cross/galeria_80947.jpg' },
            { title: "Conectividad y Pantalla TFT", desc: "Compatible con Apple CarPlay and Android Auto. Pantalla TFT avanzada de 7 pulgadas y velocímetro LED digital continuo (XG).", image: '/images/toyota/SUV/yaris-cross/galeria_80657.jpg' },
            { title: "Llantas aro 17” y 18”", desc: "Llantas robustas para Yaris Cross acompañadas con un diseño distintivo.", image: '/images/toyota/SUV/yaris-cross/galeria_80714.jpg' },
            { title: "Botón de Encendido", desc: "Máxima tecnología y fluidez. Smart Entry & Keyless Go para todas sus versiones.", image: '/images/toyota/SUV/yaris-cross/galeria_80833.jpg' }
        ],
        videoUrl: 'https://www.youtube.com/embed/4dBDMEULD1Y'
    };

    const [activeIdx, setActiveIdx] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };

    const nextSlide = () => setActiveIdx((prev) => (prev + 1) % model.gallery.length);
    const prevSlide = () => setActiveIdx((prev) => (prev - 1 + model.gallery.length) % model.gallery.length);

    return (
        <main className="min-h-screen bg-[#f4f6f8] font-sans">

            <div className="pt-[68px]">
                {/* Banner Section */}
                <section className="w-full bg-gray-50 border-b border-gray-100">
                    <picture className="w-full block">
                        <source media="(min-width: 768px)" srcSet={model.desktopBanner} />
                        <img src={model.mobileBanner} alt={`Banner ${model.name}`} className="w-full h-auto block object-contain" />
                    </picture>
                </section>

                {/* Content Section */}
                <section className="bg-white border-b border-gray-100">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 lg:py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                            {/* Showcase */}
                            <div className="lg:col-span-7 flex flex-col">
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        {model.isNew && <span className="px-3 py-1 bg-gray-900 text-white text-[11px] font-bold uppercase tracking-wider rounded">Nuevo</span>}
                                        {model.isHybrid && <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider rounded">Híbrido</span>}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium overflow-x-auto whitespace-nowrap hide-scrollbar">
                                        <Link href="/" className="hover:text-red-600">Inicio</Link>
                                        <ChevronRight size={10} />
                                        <Link href="/nuevos" className="hover:text-red-600">Nuevos</Link>
                                        <ChevronRight size={10} />
                                        <Link href="/nuevos/toyota" className="hover:text-red-600">Toyota</Link>
                                        <ChevronRight size={10} />
                                        <span className="text-gray-600">{model.name}</span>
                                    </div>
                                </div>

                                <div className="flex-1 bg-white rounded-3xl border border-gray-100 relative min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden mb-4 group">
                                    <Image
                                        src={model.gallery[activeIdx]}
                                        alt={model.name}
                                        fill
                                        className="object-contain p-4"
                                        priority
                                    />
                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-xl border border-gray-100 flex items-center justify-center text-gray-900 opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-xl border border-gray-100 flex items-center justify-center text-gray-900 opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-4">
                                    {model.gallery.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveIdx(idx)}
                                            className={`flex-none w-[20%] aspect-[4/3] rounded-xl overflow-hidden relative border-2 transition-all ${activeIdx === idx ? 'border-red-600' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                        >
                                            <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="lg:col-span-5 flex flex-col pt-8">
                                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight uppercase mb-8">
                                    <span className="text-gray-900">TOYOTA</span> <span className="text-gray-400">{model.name}</span>
                                </h1>

                                <div className="bg-[#fcfcfc] border border-gray-100 rounded-2xl p-6 mb-8 relative">
                                    <div className="absolute top-4 right-4 z-20">
                                        <ShareButton
                                            title={`Mira este modelo Toyota Yaris Cross en Carmona`}
                                            url={`https://automotrizcarmona.cl/nuevos/toyota/yaris-cross`}
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
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <Shield size={24} className="text-red-600" />
                                        <div><p className="text-[10px] text-gray-400 uppercase font-bold">Seguridad</p><p className="text-sm font-bold">Toyota Safety Sense</p></div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <Zap size={24} className="text-red-600" />
                                        <div><p className="text-[10px] text-gray-400 uppercase font-bold">Tipo Motor</p><p className="text-sm font-bold">Toyota Hybrid</p></div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/cotizar?marca=toyota&modelo=yaris-cross" className="flex-1 flex justify-center py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all uppercase text-sm">
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

                {/* Versions Table */}
                <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 lowercase first-letter:uppercase">Versiones y Precios</h2>
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
                                    {model.versions.map((v, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6 font-bold text-gray-900">{v.name}</td>
                                            <td className="py-5 px-6 text-sm">{v.transmission}</td>
                                            <td className="py-5 px-6 text-sm">{v.traction}</td>
                                            <td className="py-5 px-6 text-sm line-through text-gray-400">{formatPrice(v.listPrice)}</td>
                                            <td className="py-5 px-6 text-lg font-extrabold text-red-600">{formatPrice(v.bonusPrice)}</td>
                                            <td className="py-5 px-6 text-right">
                                                <Link href={`/cotizar?marca=toyota&modelo=yaris-cross&ver=${i}`} className="px-4 py-2 bg-black text-white text-xs font-bold rounded">Cotizar</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                                {model.features.map((feature, idx) => (
                                    <div key={idx} className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] pl-6">
                                        <div className="bg-white rounded-3xl p-8 h-full border border-gray-200 hover:border-red-600 transition-all group shadow-sm">
                                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100">
                                                <Image src={feature.image} alt={feature.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase">{feature.title}</h3>
                                            <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Video Section */}
                <section className="py-24 bg-white border-t border-gray-100">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-gray-900">Experiencia <span className="text-red-600">{model.name}</span></h2>
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
            </div>
        </main>
    );
}
