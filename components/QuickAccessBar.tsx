'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Car, Wrench, ShoppingBag, Settings, ArrowRight } from 'lucide-react';

const ACTIONS = [
    {
        label: "Nuevos",
        description: "Representamos a 22 marcas de autos nuevos",
        href: "/nuevos",
        icon: Car,
        image: "/images/toyota/Gazoo-Racing/min_yaris_gr.png"
    },
    {
        label: "Seminuevos",
        description: "Más de 100 autos usados en stock",
        href: "https://seminuevos.automotrizcarmona.cl/",
        icon: ShoppingBag,
        image: "/images/toyota/Hibridos/min_corolla_cross.png",
        external: true
    },
    {
        label: "Servicio Técnico",
        description: "Expertos certificados para tu mantención",
        href: "/servicios",
        icon: Wrench,
        image: "/images/toyota/Pickup/min_hilux.png"
    },
    {
        label: "Repuestos",
        description: "Piezas genuinas para todas las marcas",
        href: "/repuestos",
        icon: Settings,
        image: "/images/toyota/SUV/min_4runner.png"
    }
];

export default function QuickAccessBar() {
    return (
        <section className="pt-4 pb-12 md:pt-4 md:pb-16 bg-white overflow-visible"> {/* overflow-visible for section too if needed, though cards need it foremost */}
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ACTIONS.map((action, index) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            target={(action as any).external ? "_blank" : undefined}
                            rel={(action as any).external ? "noopener noreferrer" : undefined}
                            // Mercedes Style Refined: Text-only, powerful button interaction
                            className={`group relative h-20 md:h-40 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 block z-10 overflow-hidden border-l-4 border-transparent hover:border-gray-900`}
                        >
                            <div className="h-full flex items-center justify-between px-6 md:px-8 relative z-20">
                                <div>
                                    <span className="hidden md:block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2 text-[11px]">
                                        Ir a
                                    </span>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-none tracking-tight">
                                        {action.label}
                                    </h3>
                                </div>

                                {/* Enhanced CTA Button */}
                                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-xl shrink-0">
                                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
                                </div>
                            </div>

                            {/* Subtle Watermark Icon */}
                            <div className="absolute -right-4 -bottom-8 text-gray-200 opacity-20 transform rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-500 pointer-events-none">
                                <action.icon size={140} strokeWidth={1} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
