import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ChevronLeft, Share2, Clock } from 'lucide-react';
import { getNewsBySlug } from '@/lib/api';
import DiscoverSection from '@/components/DiscoverSection';

export const revalidate = 60;

function formatDate(dateStr: string | null) {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-CL', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
}

export default async function NoticiaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const news = await getNewsBySlug(slug);

    if (!news) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white font-sans pt-[88px]">
            {/* VOLVER */}
            <div className="max-w-[800px] mx-auto px-4 pt-12">
                <Link href="/noticias" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">
                    <ChevronLeft size={16} />
                    Volver a Noticias
                </Link>
            </div>

            {/* ARTÍCULO */}
            <article className="max-w-[800px] mx-auto px-4 py-12">
                {/* Meta / Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded">
                            Noticia
                        </span>
                        <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                            <Calendar size={14} className="text-[#d2001c]" />
                            {formatDate(news.published_at)}
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter uppercase mb-8">
                        {news.title}
                    </h1>

                    {/* Autor / Info básica si existiera, o solo separador */}
                    <div className="flex items-center justify-between py-6 border-y border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <Image src="/favicon.ico" alt="Carmona" width={20} height={20} className="grayscale" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">Equipo Carmona</p>
                                <p className="text-xs text-gray-400">Redacción y Noticias</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Imagen Principal */}
                {news.image && (
                    <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-12">
                        <Image
                            src={news.image}
                            alt={news.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Contenido */}
                <div 
                    className="prose prose-lg prose-neutral max-w-none 
                               prose-p:text-gray-600 prose-p:leading-relaxed 
                               prose-headings:text-gray-900 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
                               prose-img:rounded-3xl prose-img:shadow-xl
                               prose-a:text-[#d2001c] prose-a:no-underline hover:prose-a:underline
                               mb-20"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                />

                {/* Footer del artículo */}
                <div className="border-t border-gray-100 pt-12 mb-20">
                    <div className="bg-gray-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-tight">¿Te gustó esta noticia?</h3>
                            <p className="text-gray-500">Compártela con tus amigos o síguenos en redes sociales para más novedades.</p>
                        </div>
                        <div className="flex gap-4">
                             <Link href="/" className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl text-sm tracking-widest uppercase hover:bg-black transition-all">
                                Volver al inicio
                             </Link>
                        </div>
                    </div>
                </div>
            </article>

            {/* DESCUBRE MÁS */}
            <DiscoverSection />
        </main>
    );
}
