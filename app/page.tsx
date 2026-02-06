'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Hero from '@/components/Hero';
import VehicleCard from '@/components/VehicleCard';
import { MOCK_VEHICLES } from '@/lib/data';
import QuickAccessBar from '@/components/QuickAccessBar';
import DiscoverMoreCarousel from '@/components/DiscoverMoreCarousel';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />

      {/* Quick Access Bar - Mercedes Style */}
      <QuickAccessBar />

      {/* Featured Vehicles */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Centered Volvo-style Header */}
          <div className="text-center max-w-4xl mx-auto mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4 text-sm font-bold tracking-widest text-gray-500 uppercase">
              <Sparkles size={16} />
              <span>Oportunidades Exclusivas</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight mb-6">
              Descubre nuestra selección <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">Destacada</span>
            </h2>

            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              Calidad certificada, entrega inmediata y el respaldo de siempre.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_VEHICLES.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/nuevos" className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-xl hover:shadow-2xl">
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
