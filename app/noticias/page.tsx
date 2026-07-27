import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Newspaper, ArrowRight } from 'lucide-react';
import { getNews } from '@/lib/api';
import DiscoverSection from '@/components/DiscoverSection';

export const revalidate = 60; // ISR cache por 1 minuto

function stripHtml(html: string) {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
}

function formatDate(dateStr: string | null) {
    if (!dateStr) return 'Novedad';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-CL', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
}

export default async function NoticiasPage() {
    const newsFromApi = await getNews();
    
    // Si no hay noticias en la API, podríamos usar el fallback estático (aunque el usuario quiere vínculo directo)
    const newsItems = newsFromApi.length > 0 ? newsFromApi : [];

    return (
        <main className="min-h-screen bg-white font-sans pt-[104px] lg:pt-[88px]">

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
                    {newsItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {newsItems.map((news) => {
                                const excerpt = stripHtml(news.content).substring(0, 160) + '...';
                                return (
                                    <div key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                                        {/* Imagen */}
                                        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                                            {news.image ? (
                                                <Image
                                                    src={news.image}
                                                    alt={news.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                                    <Newspaper className="text-gray-200" size={48} />
                                                </div>
                                            )}
                                            {/* Etiqueta de Categoría (Fallback ya que en DB no hay categoría aún) */}
                                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                                                Noticia
                                            </div>
                                        </div>

                                        {/* Contenido */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mb-4">
                                                <Calendar size={14} className="text-[#d2001c]" />
                                                {formatDate(news.published_at)}
                                            </div>
                                            <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-3 group-hover:text-[#d2001c] transition-colors line-clamp-2">
                                                {news.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                                                {excerpt}
                                            </p>

                                            <Link href={`/noticias/${news.slug}`} className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-[#d2001c] uppercase tracking-widest mt-auto w-max transition-colors">
                                                Leer Nota <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Newspaper className="mx-auto text-gray-300 mb-4" size={48} />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No hay noticias publicadas</h3>
                            <p className="text-gray-500">Vuelve pronto para conocer nuestras novedades.</p>
                        </div>
                    )}

                    {/* Botón Cargar Más (Visual) */}
                    {newsItems.length > 6 && (
                        <div className="flex justify-center mt-12">
                            <button className="px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-bold rounded-xl transition-all shadow-sm flex items-center gap-2">
                                Cargar más noticias
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* DESCUBRE MÁS CARMONA */}
            <DiscoverSection />
        </main>
    );
}
