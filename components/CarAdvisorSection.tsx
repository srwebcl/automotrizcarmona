'use client';

import React, { useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ThumbsUp, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

// ——— Types ———————————————————————————————————————————
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
function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    size={size}
                    className={s <= rating ? 'text-[#00b3c6] fill-[#00b3c6]' : 'text-gray-200 fill-gray-200'}
                />
            ))}
        </div>
    );
}

function formatDate(timestamp: number | null): string {
    if (!timestamp) return '';
    const d = new Date(timestamp * 1000);
    return d.toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' });
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
    /** Optional brand name to filter reviews */
    brandFilter?: string;
    /** Title shown above the carousel */
    title?: string;
}

export default function CarAdvisorSection({
    data,
    brandFilter,
    title = 'Lo que dicen nuestros clientes',
}: CarAdvisorSectionProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps',
        slidesToScroll: 1,
    });

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    // Optional brand filter
    const ratings = brandFilter
        ? data.ratings.filter(r =>
            !r.brand || r.brand.toLowerCase().includes(brandFilter.toLowerCase())
          )
        : data.ratings;

    // Use all if filter yields nothing
    const displayRatings = ratings.length > 0 ? ratings : data.ratings;

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">
                            Verificado por Car Advisor
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            {title}
                        </h2>
                    </div>

                    {/* Summary Badges */}
                    <div className="flex flex-wrap items-center gap-4 shrink-0">
                        {/* Overall Rating */}
                        <div className="flex flex-col items-center bg-white border border-gray-100 shadow-sm rounded-2xl px-6 py-4 min-w-[120px]">
                            <span className="text-4xl font-black text-gray-900 leading-none">{data.overallRating}</span>
                            <StarRow rating={Math.round(data.overallRating)} size={14} />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                {data.totalRatings} reseñas
                            </span>
                        </div>

                        {/* Recommendation % */}
                        <div className="flex flex-col items-center bg-white border border-gray-100 shadow-sm rounded-2xl px-6 py-4 min-w-[120px]">
                            <span className="text-4xl font-black text-[#00b3c6] leading-none">{data.recommendPercentage}%</span>
                            <div className="flex items-center gap-1 mt-1">
                                <ThumbsUp size={12} className="text-[#00b3c6]" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recomienda</span>
                            </div>
                        </div>

                        {/* Link to Car Advisor */}
                        <a
                            href={data.dealerPage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-3 bg-[#00b3c6] text-white rounded-xl font-bold text-sm hover:bg-[#009aac] transition-colors shadow-sm shadow-[#00b3c6]/30"
                        >
                            Ver todas <ExternalLink size={14} />
                        </a>
                    </div>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4 touch-pan-y">
                            {displayRatings.map((review, idx) => (
                                <div
                                    key={idx}
                                    className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33%] xl:flex-[0_0_25%] pl-4 min-w-0"
                                >
                                    <ReviewCard review={review} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex items-center gap-3 mt-8 justify-end">
                        <button
                            onClick={scrollPrev}
                            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-[#00b3c6] hover:text-[#00b3c6] transition-colors"
                            aria-label="Anterior"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-[#00b3c6] hover:text-[#00b3c6] transition-colors"
                            aria-label="Siguiente"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Footer attribution */}
                <div className="flex items-center gap-2 mt-6 justify-center">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        Reseñas verificadas por
                    </span>
                    <a
                        href="https://www.caradvisor.at"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-black text-[#00b3c6] uppercase tracking-widest hover:underline"
                    >
                        Car Advisor · Grupo Porsche
                    </a>
                </div>
            </div>
        </section>
    );
}

// ——— Review Card ——————————————————————————————————————
function ReviewCard({ review }: { review: CarAdvisorRating }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = review.text.length > 200;
    const displayText = expanded || !isLong ? review.text : review.text.slice(0, 200) + '…';
    const label = reasonLabel(review.reason);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 h-full hover:shadow-md transition-shadow duration-300">

            {/* Top: stars + rating badge */}
            <div className="flex items-center justify-between">
                <StarRow rating={review.rating} size={16} />
                {label && (
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                        {label}
                    </span>
                )}
            </div>

            {/* Title */}
            {review.title && (
                <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">
                    {review.title}
                </h3>
            )}

            {/* Text */}
            <p className="text-gray-500 text-sm leading-relaxed flex-1">
                {displayText}
                {isLong && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="ml-1 text-[#00b3c6] font-bold text-xs hover:underline"
                    >
                        {expanded ? 'Ver menos' : 'Ver más'}
                    </button>
                )}
            </p>

            {/* Bottom: user + date + recommended */}
            <div className="flex items-end justify-between pt-3 border-t border-gray-50">
                <div>
                    <p className="text-xs font-black text-gray-800">{review.userName}</p>
                    {review.date && (
                        <p className="text-[10px] text-gray-400">{formatDate(review.date)}</p>
                    )}
                </div>
                {review.recommended && (
                    <div className="flex items-center gap-1 text-[#00b3c6]">
                        <ThumbsUp size={12} />
                        <span className="text-[10px] font-bold">Lo recomienda</span>
                    </div>
                )}
            </div>
        </div>
    );
}
