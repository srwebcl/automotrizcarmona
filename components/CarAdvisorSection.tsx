'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

// ——— Types ————————————————————————————————————————————
export interface CarAdvisorRating {
    userName: string;
    title: string;
    text: string;
    rating: number;
    recommended: boolean;
    date: number | null;
    reason: string[];
    brand: string | null;
}

export interface CarAdvisorData {
    overallRating: number;
    recommendPercentage: number;
    totalRatings: number;
    dealerPage: string;
    ratings: CarAdvisorRating[];
}

// ——— Helpers ——————————————————————————————————————————
function StarRow({ rating, size = 20 }: { rating: number; size?: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <svg
                    key={s}
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill={s <= rating ? '#e8401c' : '#e5e7eb'}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
}

function formatDate(timestamp: number | null): string {
    if (!timestamp) return '';
    const d = new Date(timestamp * 1000);
    return d.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function reasonLabel(reason: string[]): string {
    if (!reason || reason.length === 0) return '';
    const map: Record<string, string> = {
        servicio: 'Servicio Técnico',
        ventas: 'Ventas',
        repuestos: 'Repuestos',
        colision: 'Colisión',
    };
    return reason.map(r => map[r.toLowerCase()] || r).join(', ');
}

// ——— Main Component ————————————————————————————————————
interface CarAdvisorSectionProps {
    data: CarAdvisorData;
    /** Filter by brand name (partial match) */
    brandFilter?: string;
    /** Filter by reason type: 'servicio' | 'ventas' | 'repuestos' */
    reasonFilter?: string;
}

export default function CarAdvisorSection({ data, brandFilter, reasonFilter }: CarAdvisorSectionProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps',
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        onSelect();
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi, onSelect]);

    // Filter by brand
    let ratings = brandFilter
        ? data.ratings.filter(r => !r.brand || r.brand.toLowerCase().includes(brandFilter.toLowerCase()))
        : data.ratings;

    // Filter by reason type (servicio, ventas, etc.)
    if (reasonFilter) {
        const filtered = ratings.filter(r =>
            r.reason && r.reason.some(reason => reason.toLowerCase() === reasonFilter.toLowerCase())
        );
        // Only apply if we have results; otherwise show all (fallback)
        if (filtered.length > 0) ratings = filtered;
    }

    const displayRatings = ratings.length > 0 ? ratings : data.ratings;

    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* ── Logo Car Advisor ── */}
                <div className="flex flex-col items-center mb-8">
                    <a href="https://www.caradvisor.at/betrieb/carmona/CL-29019" target="_blank" rel="noopener noreferrer" className="block text-center mb-4 transition-transform hover:scale-105">
                        <Image src="/logo-car-advisor.png" alt="Car Advisor" width={200} height={50} className="mx-auto" />
                    </a>
                    <p className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">
                        El portal de evaluaciones para concesionarios
                    </p>

                    {/* ── Stats row ── */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                        {/* Stars + rating */}
                        <div className="flex items-center gap-3">
                            <StarRow rating={Math.round(data.overallRating)} size={28} />
                            <span className="text-3xl font-black text-gray-900">{data.overallRating}</span>
                        </div>

                        <div className="hidden sm:block w-px h-10 bg-gray-200" />

                        {/* Recommendation */}
                        <div className="flex items-center gap-2">
                            <ThumbsUp size={22} className="text-[#e8401c]" />
                            <span className="text-xl font-black text-gray-900">
                                {data.recommendPercentage}%
                            </span>
                            <span className="text-sm text-gray-500 font-medium">de recomendación</span>
                        </div>

                        <div className="hidden sm:block w-px h-10 bg-gray-200" />

                        {/* Total reviews link */}
                        <a
                            href={data.dealerPage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#e8401c] font-bold text-sm hover:underline"
                        >
                            {data.totalRatings} Evaluaciones →
                        </a>
                    </div>
                </div>

                {/* ── Section title ── */}
                <p className="text-center text-[11px] font-black tracking-[0.25em] text-gray-400 uppercase mb-8">
                    Evaluaciones de clientes
                </p>

                {/* ── Carousel ── */}
                <div className="relative">
                    {/* Prev arrow */}
                    <button
                        onClick={() => emblaApi?.scrollPrev()}
                        disabled={!canScrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center disabled:opacity-20 hover:border-[#e8401c] hover:text-[#e8401c] transition-colors"
                        aria-label="Anterior"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-3 touch-pan-y">
                            {displayRatings.map((review, idx) => (
                                <div
                                    key={idx}
                                    className="flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] pl-3 min-w-0"
                                >
                                    <ReviewCard review={review} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next arrow */}
                    <button
                        onClick={() => emblaApi?.scrollNext()}
                        disabled={!canScrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center disabled:opacity-20 hover:border-[#e8401c] hover:text-[#e8401c] transition-colors"
                        aria-label="Siguiente"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* ── Dot indicators ── */}
                <div className="flex justify-center gap-2 mt-6">
                    {scrollSnaps.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => emblaApi?.scrollTo(idx)}
                            className={`h-2 rounded-full transition-all ${
                                idx === selectedIndex
                                    ? 'w-6 bg-[#e8401c]'
                                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Ir a reseña ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* ── Footer attribution ── */}
                <p className="text-center text-[10px] text-gray-300 font-medium mt-6 tracking-widest uppercase">
                    Verificado por Car Advisor · Grupo Porsche
                </p>
            </div>
        </section>
    );
}

// ——— Review Card ——————————————————————————————————————
function ReviewCard({ review }: { review: CarAdvisorRating }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = review.text.length > 160;
    const displayText = expanded || !isLong ? review.text : review.text.slice(0, 160) + '…';
    const label = reasonLabel(review.reason);

    return (
        <div className="bg-white border border-gray-200 rounded-sm p-5 flex flex-col gap-3 h-full hover:border-gray-300 transition-colors min-h-[200px]">

            {/* Date + service type */}
            <div className="flex items-start justify-between gap-2">
                {review.date && (
                    <span className="text-xs text-gray-400">{formatDate(review.date)}</span>
                )}
                {label && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">
                        {label}
                    </span>
                )}
            </div>

            {/* Name */}
            <p className="text-sm font-extrabold text-gray-900">{review.userName}</p>

            {/* Title */}
            {review.title && (
                <p className="text-sm font-bold text-gray-800 leading-snug">{review.title}</p>
            )}

            {/* Review text */}
            {review.text && (
                <p className="text-xs text-gray-500 leading-relaxed flex-1">
                    {displayText}
                    {isLong && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="ml-1 text-[#e8401c] font-bold hover:underline"
                        >
                            {expanded ? 'menos' : 'más'}
                        </button>
                    )}
                </p>
            )}

            {/* Stars + rating number */}
            <div className="flex items-center gap-2 pt-2 mt-auto">
                <StarRow rating={review.rating} size={16} />
                <span className="text-sm font-black text-gray-700">{review.rating}</span>
            </div>
        </div>
    );
}
