import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { ShieldCheck, Target, Heart, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Sobre Nosotros - Automotriz Carmona',
    description: 'Conoce la historia, misión, visión y valores de Automotriz Carmona, líder en el mercado automotriz en el norte de Chile.',
};

export default function SobreNosotrosPage() {
    return (
        <main className="min-h-screen bg-[#f4f6f8] font-sans pt-[88px]">
            {/* HEADER SECCIÓN */}
            <section className="bg-white py-14 md:py-20 border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 mb-4 text-sm font-bold tracking-widest text-gray-500 uppercase">
                            <ShieldCheck size={16} />
                            <span>Líderes en el Norte de Chile</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight mb-6">
                            Nuestra{' '}
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#d2001c] via-[#e63946] to-[#d2001c]">
                                Historia
                            </span>
                        </h1>
                        <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                            Construyendo relaciones de confianza a través de soluciones de movilidad de calidad desde hace más de tres décadas.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-16">
                
                {/* Historia Grid */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
                    {/* Left Column: Big Year */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                            {/* Watermark */}
                            <div className="absolute -right-8 -top-8 text-[12rem] font-black text-gray-50 leading-none select-none pointer-events-none">
                                93
                            </div>
                            <div className="relative z-10">
                                <p className="text-[#d2001c] font-black tracking-[0.2em] uppercase text-sm mb-4">El Inicio</p>
                                <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] tracking-tight leading-none mb-6">
                                    Agosto <br />1993
                                </h2>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    Nacimos en La Serena, impulsados por la visión emprendedora de los hermanos Luis y Rodrigo Carmona Amenábar.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column: Text Content */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                            <h3 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-tight mb-6">Crecimiento Sostenido</h3>
                            <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                Desde nuestros inicios, nos enfocamos en entregar soluciones de movilidad de calidad, construyendo relaciones de confianza con nuestros clientes y desarrollando un servicio cercano, profesional y orientado a largo plazo.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                A lo largo de más de tres décadas de trayectoria, Automotriz Carmona ha experimentado un crecimiento sostenido, ampliando su presencia, incorporando nuevas marcas y fortaleciendo sus áreas de venta, postventa y servicios especializados. Gracias a nuestro compromiso con la excelencia, la innovación y la satisfacción de nuestros clientes, nos hemos consolidado como un referente de la industria automotriz.
                            </p>
                        </div>
                        
                        <div className="bg-[#1a1a1a] text-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.1)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d2001c] rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">La Actualidad</h3>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    Hoy, Automotriz Carmona es el <strong className="text-white">concesionario automotriz más grande de la Tercera y Cuarta Región</strong>, liderando el mercado regional con una amplia oferta de vehículos, soluciones de financiamiento, servicio técnico especializado y una sólida red de atención.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Misión y Visión (Bento Box style) */}
                <div className="grid md:grid-cols-2 gap-6 mb-20">
                    {/* Mision */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-500">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center mb-8 border border-blue-100/50 shadow-sm text-blue-600">
                            <Target size={28} strokeWidth={2.5} />
                        </div>
                        <h2 className="text-3xl font-black text-[#1a1a1a] uppercase tracking-tight mb-6">Misión</h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed flex-grow">
                            <p className="font-medium text-[#1a1a1a]">
                                Carmona y Cia es una empresa automotriz dedicada a la distribución y venta de vehículos y camiones, nuevos y usados, agregando valor a nuestra cadena a través del servicio de post venta en la III y IV región del país.
                            </p>
                            <p>
                                Nuestra razón de ser es brindar un servicio de calidad y excelente experiencia de venta a nuestros clientes, sustentado en el compromiso del desarrollo constante de nuestra gente, diferenciándonos de la competencia por crear relaciones a largo plazo con nuestros clientes internos y externos, lo que nos permite sustentabilidad en el tiempo y ser uno de los concesionarios más grandes de la región.
                            </p>
                        </div>
                    </div>

                    {/* Vision */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-500">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 flex items-center justify-center mb-8 border border-amber-100/50 shadow-sm text-amber-600">
                            <ShieldCheck size={28} strokeWidth={2.5} />
                        </div>
                        <h2 className="text-3xl font-black text-[#1a1a1a] uppercase tracking-tight mb-6">Visión</h2>
                        <div className="text-gray-600 leading-relaxed text-lg flex-grow">
                            <p>
                                Ser el mejor concesionario de la región, reconocidos por la excelencia en el compromiso de satisfacción de nuestros clientes con <strong className="text-[#1a1a1a]">Excelencia 7</strong> en calidad.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Valores */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100/50 flex items-center justify-center mb-6 border border-rose-100/50 shadow-sm text-rose-600">
                            <Heart size={32} strokeWidth={2.5} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] uppercase tracking-tight">
                            Nuestros Valores
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            'Transparencia',
                            'Respeto',
                            'Responsabilidad',
                            'Orden',
                            'Mejora continua',
                            'Trabajo en equipo',
                            'Integridad',
                            'Flexibilidad e innovación',
                            'Excelencia',
                            'Cooperación',
                            'Pasión en lo que hacemos',
                        ].map((valor, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 hover:border-gray-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 flex items-start gap-3"
                            >
                                <CheckCircle2 className="text-[#d2001c] w-5 h-5 flex-shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                                <span className="font-bold text-[#1a1a1a] group-hover:text-[#d2001c] transition-colors">
                                    {valor}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}
