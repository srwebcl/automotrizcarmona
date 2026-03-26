import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const DISCOVER_ITEMS = [
    {
        title: 'Autos Nuevos',
        subtitle: 'Stock disponible',
        link: '/nuevos',
        image: '/images/banners/NUEVO-TIGUAN-2025-07-1350x499.png',
    },
    {
        title: 'Seminuevos',
        subtitle: 'Calidad certificada',
        link: 'https://seminuevos.automotrizcarmona.cl',
        image: '/images/toyota/Pickup/hilux/galeria_2408.jpg',
    },
    {
        title: 'Repuestos',
        subtitle: 'Repuestos genuinos',
        link: '/repuestos',
        image: '/images/quick_access_repuestos_1770350949447.png',
    },
    {
        title: 'Sucursales',
        subtitle: 'Encuéntranos aquí',
        link: '/sucursales',
        image: '/images/quick_access_servicio_1770350934207.png',
    },
];

export default function DiscoverSection() {
    return (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight text-center">
                        Descubre más{' '}
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">Carmona</span>
                    </h2>
                    <div className="w-24 h-1 mt-4 rounded-full bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {DISCOVER_ITEMS.map((item) => (
                        <Link
                            key={item.title}
                            href={item.link}
                            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-lg"
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10">
                                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">
                                    {item.subtitle}
                                </p>
                                <h3 className="text-2xl font-black uppercase mb-4">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                                    <span>EXPLORAR</span>
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
