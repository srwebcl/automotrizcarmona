import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Target, Heart } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Sobre Nosotros - Automotriz Carmona',
    description: 'Conoce la historia, misión, visión y valores de Automotriz Carmona, líder en el mercado automotriz en el norte de Chile.',
};

export default function SobreNosotrosPage() {
    return (
        <main className="min-h-screen bg-[#f4f6f8] pt-24 pb-16">
            <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-black text-[#1a1a1a] tracking-tight uppercase mb-4">
                        Nuestra Historia
                    </h1>
                    <div className="w-24 h-1 bg-[#d2001c] mx-auto rounded-full" />
                </div>

                {/* Content */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12 space-y-12">
                    
                    {/* Historia */}
                    <section className="space-y-6 text-gray-600 leading-relaxed text-lg">
                        <p>
                            Automotriz Carmona nació en agosto de 1993 en la ciudad de La Serena, impulsada por la visión emprendedora de los hermanos Luis y Rodrigo Carmona Amenábar. Desde sus inicios, la empresa se enfocó en entregar soluciones de movilidad de calidad, construyendo relaciones de confianza con sus clientes y desarrollando un servicio cercano, profesional y orientado a largo plazo.
                        </p>
                        <p>
                            A lo largo de más de tres décadas de trayectoria, Automotriz Carmona ha experimentado un crecimiento sostenido, ampliando su presencia, incorporando nuevas marcas y fortaleciendo sus áreas de venta, postventa y servicios especializados. Gracias a su compromiso con la excelencia, la innovación y la satisfacción de sus clientes, se ha consolidado como un referente de la industria automotriz en el norte de Chile.
                        </p>
                        <p>
                            Actualmente, Automotriz Carmona es el concesionario automotriz más grande de la Tercera y Cuarta Región, liderando el mercado regional con una amplia oferta de vehículos, soluciones de financiamiento, servicio técnico especializado y una sólida red de atención orientada a brindar la mejor experiencia a sus clientes.
                        </p>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Misión y Visión */}
                    <div className="grid md:grid-cols-2 gap-12">
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Target size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-[#1a1a1a] uppercase tracking-tight">Misión</h2>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Carmona y Cia es una empresa automotriz dedicada a la distribución y venta de vehículos y camiones, nuevos y usados, agregando valor a nuestra cadena a través del servicio de post venta en la III y IV región del país.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Nuestra razón de ser es brindar un servicio de calidad y excelente experiencia de venta a nuestros clientes, sustentado en el compromiso del desarrollo constante de nuestra gente, diferenciándonos de la competencia por crear relaciones a largo plazo con nuestros clientes internos y externos, lo que nos permite sustentabilidad en el tiempo y ser uno de los concesionarios más grandes de la región.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                    <ShieldCheck size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-[#1a1a1a] uppercase tracking-tight">Visión</h2>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Ser el mejor concesionario de la región reconocidos por la excelencia en el compromiso de satisfacción de nuestros clientes con Excelencia 7 en calidad.
                            </p>
                        </section>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Valores */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                                <Heart size={20} />
                            </div>
                            <h2 className="text-2xl font-bold text-[#1a1a1a] uppercase tracking-tight">Nuestros Valores</h2>
                        </div>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                                <li key={idx} className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#d2001c] flex-shrink-0" />
                                    {valor}
                                </li>
                            ))}
                        </ul>
                    </section>

                </div>
            </div>
        </main>
    );
}
