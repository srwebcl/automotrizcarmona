import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import Hero from '@/components/Hero';
import { getFeaturedModels } from '@/lib/api';
import QuickAccessBar from '@/components/QuickAccessBar';
import DiscoverMoreCarousel from '@/components/DiscoverMoreCarousel';
import HomeVehiclesCarousel from '@/components/HomeVehiclesCarousel';

export const revalidate = 60;

export default async function Home() {
  const featuredVehicles = await getFeaturedModels();

  return (
    <main className="min-h-screen bg-white">
      <Hero />

      {/* Acceso Rápido */}
      <QuickAccessBar />

      {/* Featured Vehicles */}
      <section className="pt-0 pb-8 md:py-16 bg-white">
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

          <div className="px-6 lg:px-0">
            <div className="flex flex-col-reverse lg:flex-row gap-6 items-stretch">

              {/* ── Banner Promocional (solo imagen, sin texto) ── */}
              <div className="w-full lg:w-[calc(25%-12px)] flex-shrink-0">
                <Link
                  href="/nuevos/volkswagen"
                  id="promo-banner-card"
                  className="group block rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-carmona-gold/30 transition-all duration-300 relative aspect-[2/3] lg:aspect-auto lg:h-full bg-white"
                >
                  <Image
                    src="https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/home/banner-destacados-web.webp"
                    alt="Banner Promocional"
                    fill
                    className="object-cover transition-all duration-300"
                    priority
                  />
                </Link>
              </div>

              {/* ── Carrusel de vehículos destacados ── */}
                <div className="flex-1 min-w-0 relative w-full lg:w-auto py-8 -my-8">
                <HomeVehiclesCarousel vehicles={featuredVehicles} />
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
        </div>
      </section>

      {/* Discover More Carousel Section */}
      <DiscoverMoreCarousel />
    </main>
  );
}
