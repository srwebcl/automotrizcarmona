'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Hero from '@/components/Hero';
import VehicleCard from '@/components/VehicleCard';
import { MOCK_VEHICLES } from '@/lib/data';
import QuickAccessBar from '@/components/QuickAccessBar';
import DiscoverMoreCarousel from '@/components/DiscoverMoreCarousel';

// ─── Vehicles Carousel ────────────────────────────────────────────────────────
function VehiclesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
  });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {MOCK_VEHICLES.map((vehicle) => (
            <div
              key={vehicle.id}
              /* 3 cards visible on lg, 2 on sm, 1 on mobile */
              className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
            >
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — only shown when there are more than 3 vehicles */}
      {MOCK_VEHICLES.length > 3 && (
        <>
          <button
            onClick={scrollPrev}
            aria-label="Anterior"
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Siguiente"
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />

      {/* Acceso Rápido */}
      <QuickAccessBar />

      {/* Featured Vehicles */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-8 md:mb-14">
            <div className="inline-flex items-center gap-2 mb-4 text-sm font-bold tracking-widest text-gray-500 uppercase">
              <Sparkles size={16} />
              <span>Oportunidades Exclusivas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight mb-6">
              Descubre nuestra selección{' '}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">
                Destacada
              </span>
            </h2>
            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              Calidad certificada, entrega inmediata y el respaldo de siempre.
            </p>
          </div>

          {/* 
            Layout: [Banner Promo] | [Carousel de 3 tarjetas]
            En lg: 1 columna fija para el banner + 3 columnas para el carrusel
            En mobile: apilado verticalmente
          */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">

            {/* ── Banner Promocional (solo imagen, sin texto) ── */}
            <Link
              href="/nuevos/volkswagen"
              id="promo-banner-card"
              className="group flex-shrink-0 lg:w-[calc(25%-12px)] block rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-carmona-gold/30 transition-all duration-300 relative aspect-[3/4] lg:aspect-auto lg:self-stretch"
            >
              <Image
                src="/images/banner-global.webp"
                alt="Banner Promocional"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </Link>

            {/* ── Carrusel de vehículos destacados ── */}
            <div className="flex-1 min-w-0 relative px-5 lg:px-5">
              <VehiclesCarousel />
            </div>

          </div>

          {/* CTA button */}
          <div className="mt-14 text-center">
            <Link
              href="/nuevos"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Ver todo el stock <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Discover More Carousel Section */}
      <DiscoverMoreCarousel />
    </main>
  );
}
