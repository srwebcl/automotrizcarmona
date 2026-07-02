import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Sobre Nosotros - Automotriz Carmona',
    description: 'Conoce la historia, misión, visión y valores de Automotriz Carmona, líder en el mercado automotriz en el norte de Chile.',
};

export default function SobreNosotrosPage() {
    return (
        <main className="min-h-screen bg-white font-sans pt-[88px]">
            {/* HEADER SECCIÓN */}
            <section className="bg-white py-14 md:py-20 border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 mb-4 text-sm font-bold tracking-widest text-gray-500 uppercase">
                            <span>Desde 1993</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight mb-6">
                            Nuestra{' '}
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">
                                Historia
                            </span>
                        </h1>
                        <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                            Somos el concesionario automotriz más grande de la Tercera y Cuarta Región
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 md:py-24">
                
                {/* Historia Grid */}
                <div className="bg-[#0a0a0a] rounded-[2rem] p-8 md:p-16 mb-24 shadow-xl">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                        {/* Left Column: Big Year */}
                        <div className="lg:col-span-4 relative border-l border-gray-800 pl-6 h-max">
                            <p className="text-gray-500 font-bold tracking-[0.2em] uppercase text-xs mb-2">Fundación</p>
                            <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-none mb-6">
                                1993
                            </h2>
                        </div>
                        
                        {/* Right Column: Text Content */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="prose prose-lg text-gray-400 font-light max-w-none">
                                <p>
                                    Automotriz Carmona nació en agosto de 1993 en la ciudad de La Serena, impulsada por la visión emprendedora de los hermanos Luis y Rodrigo Carmona Amenábar. Desde sus inicios, la empresa se enfocó en entregar soluciones de movilidad de calidad, construyendo relaciones de confianza con sus clientes y desarrollando un servicio cercano, profesional y orientado a largo plazo.
                                </p>
                                <p>
                                    A lo largo de más de tres décadas de trayectoria, Automotriz Carmona ha experimentado un crecimiento sostenido, ampliando su presencia, incorporando nuevas marcas y fortaleciendo sus áreas de venta, postventa y servicios especializados. Gracias a su compromiso con la excelencia, la innovación y la satisfacción de sus clientes, se ha consolidado como un referente de la industria automotriz en el norte de Chile.
                                </p>
                                <p className="text-gray-300 font-medium">
                                    Actualmente, Automotriz Carmona es el concesionario automotriz más grande de la Tercera y Cuarta Región, liderando el mercado regional con una amplia oferta de vehículos, soluciones de financiamiento, servicio técnico especializado y una sólida red de atención orientada a brindar la mejor experiencia a sus clientes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Misión y Visión (Corporate List) */}
                <div className="grid md:grid-cols-2 gap-16 mb-24">
                    {/* Mision */}
                    <div className="border-t border-gray-900 pt-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight mb-6">Misión</h2>
                        <div className="space-y-4 text-gray-500 font-light leading-relaxed">
                            <p className="text-gray-800 font-normal">
                                Carmona y Cia es una empresa automotriz dedicada a la distribución y venta de vehículos y camiones, nuevos y usados, agregando valor a nuestra cadena a través del servicio de post venta en la III y IV región del país.
                            </p>
                            <p>
                                Nuestra razón de ser es brindar un servicio de calidad y excelente experiencia de venta a nuestros clientes, sustentado en el compromiso del desarrollo constante de nuestra gente, diferenciándonos de la competencia por crear relaciones a largo plazo con nuestros clientes internos y externos, lo que nos permite sustentabilidad en el tiempo y ser uno de los concesionarios más grandes de la región.
                            </p>
                        </div>
                    </div>

                    {/* Vision */}
                    <div className="border-t border-gray-900 pt-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight mb-6">Visión</h2>
                        <div className="text-gray-500 font-light leading-relaxed">
                            <p>
                                Ser el mejor concesionario de la región reconocidos por la excelencia en el compromiso de satisfacción de nuestros clientes con Excelencia 7 en calidad al año 2020.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Valores */}
                <div className="bg-gray-50 rounded-[2rem] p-8 md:p-16 border border-gray-100">
                    <div className="mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">
                            Valores
                        </h2>
                    </div>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-8">
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
                            <li 
                                key={idx} 
                                className="flex items-center gap-3 border-b border-gray-200 pb-3"
                            >
                                <Check size={16} strokeWidth={3} className="text-[#d4af37]" />
                                <span className="font-semibold text-gray-700 uppercase text-xs tracking-wider">
                                    {valor}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </main>
    );
}
