import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Newspaper, ArrowRight, ChevronRight } from 'lucide-react';

const DISCOVER_ITEMS = [
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

const NEWS_ITEMS = [
    {
        id: 1,
        title: 'DIEGO SÁNCHEZ FIRMA POR CARMONA Y CIA',
        excerpt: 'Bienvenido @diego13_sanchez a la familia Carmona y Cia 😎. Si dicen que vienen de parte de Mono Sánchez, tendrás un descuento especial en todo usando sus exclusivos códigos de descuento.',
        image: '/images/noticia-mono.png',
        date: '10 Mar 2026',
        category: 'Alianzas'
    },
    {
        id: 2,
        title: 'El totalmente nuevo Volkswagen Tiguan 2025 ya está aquí',
        excerpt: 'Descubre la nueva generación del SUV más exitoso de Volkswagen. Diseño renovado, mayor tecnología y la seguridad de primer nivel que tu familia merece.',
        image: '/images/banners/NUEVO-TIGUAN-2025-07-1350x499.png',
        date: '05 Mar 2026',
        category: 'Lanzamientos'
    },
    {
        id: 3,
        title: 'Automotriz Carmona es premiado por Excelencia en Postventa',
        excerpt: 'Este mes hemos sido reconocidos a nivel nacional por nuestros altos estándares de calidad y resolución en nuestros principales talleres.',
        image: '/images/sucursales.jpg',
        date: '28 Feb 2026',
        category: 'Corporativo'
    },
    {
        id: 4,
        title: 'Toyota Hilux reafirma su liderazgo en ventas en el norte',
        excerpt: 'La icónica camioneta vuelve a romper récords de venta en el mercado regional gracias a su indiscutible fiabilidad y durabilidad en faenas.',
        image: '/images/toyota/Pickup/hilux/galeria_2408.jpg',
        date: '15 Feb 2026',
        category: 'Mercado'
    }
];

export default function NoticiasPage() {
    return (
        <main className="min-h-screen bg-white font-sans pt-[88px]">

            {/* HEADER SECCIÓN */}
            <section className="bg-white py-14 md:py-20 border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 mb-4 text-sm font-bold tracking-widest text-gray-500 uppercase">
                            <Newspaper size={16} />
                            <span>Centro de Noticias</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight mb-6">
                            Noticias y{' '}
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">
                                Novedades
                            </span>
                        </h1>
                        <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                            Mantente informado con los últimos lanzamientos, eventos y todo lo que sucede en Automotriz Carmona.
                        </p>
                    </div>
                </div>
            </section>

            {/* GRILLA DE NOTICIAS */}
            <section className="py-16 md:py-24 bg-[#f4f6f8]">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {NEWS_ITEMS.map((news) => (
                            <div key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                                {/* Imagen */}
                                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={news.image}
                                        alt={news.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Etiqueta de Categoría */}
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                                        {news.category}
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mb-4">
                                        <Calendar size={14} className="text-[#d2001c]" />
                                        {news.date}
                                    </div>
                                    <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-3 group-hover:text-[#d2001c] transition-colors">
                                        {news.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                                        {news.excerpt}
                                    </p>

                                    <button className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-[#d2001c] uppercase tracking-widest mt-auto w-max transition-colors">
                                        Leer Nota <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botón Cargar Más (Visual) */}
                    <div className="flex justify-center mt-12">
                        <button className="px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-bold rounded-xl transition-all shadow-sm flex items-center gap-2">
                            Cargar más noticias
                        </button>
                    </div>
                </div>
            </section>

            {/* DESCUBRE MÁS CARMONA */}
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
                                target={item.link.startsWith('http') ? '_blank' : undefined}
                                rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
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
        </main>
    );
}
