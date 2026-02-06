'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Car, Wrench, ShoppingBag, Settings, ArrowRight } from 'lucide-react';

const ACTIONS = [
    {
        label: "Nuevos",
        description: "Representamos a 30 marcas de autos nuevos",
        href: "/nuevos",
        icon: Car,
        image: "/images/quick_access_nuevos_retry.png" // Will verify filename after generation or fallback
    },
    {
        label: "Seminuevos",
        description: "Más de 100 autos usados en stock",
        href: "/seminuevos",
        icon: ShoppingBag,
        image: "/images/quick_access_seminuevos_1770350918685.png"
    },
    {
        label: "Servicio Técnico",
        description: "Expertos certificados para tu mantención",
        href: "/servicios",
        icon: Wrench,
        image: "/images/quick_access_servicio_1770350934207.png"
    },
    {
        label: "Repuestos",
        description: "Piezas genuinas para todas las marcas",
        href: "/repuestos",
        icon: Settings,
        image: "/images/quick_access_repuestos_1770350949447.png"
    }
];

export default function QuickAccessBar() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ACTIONS.map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 block"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={action.image}
                                    alt={action.label}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient Overlay - Stronger at bottom for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex flex-col justify-end p-6 z-10 text-white">
                                <div className="mb-auto opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
                                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-carmona-gold/90 backdrop-blur-sm mb-4">
                                        <action.icon size={24} className="text-white" />
                                    </span>
                                </div>

                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-carmona-gold transition-colors">{action.label}</h3>
                                    <p className="text-gray-200 text-sm font-medium leading-snug mb-4 max-w-[80%]">
                                        {action.description}
                                    </p>

                                    <span className="inline-flex items-center text-sm font-bold text-carmona-gold group-hover:text-white transition-colors">
                                        EXPLORAR <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
