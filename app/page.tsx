'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import VehicleCard from '@/components/VehicleCard';
import { MOCK_VEHICLES } from '@/lib/data';
import QuickAccessBar from '@/components/QuickAccessBar';
import DiscoverMoreCarousel from '@/components/DiscoverMoreCarousel';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />

      {/* Quick Access Bar */}
      <QuickAccessBar />

      {/* Featured Vehicles - Increased separation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-12 h-1 bg-carmona-gold rounded-full"></span>
                <span className="text-carmona-gold font-bold uppercase tracking-widest text-xs">Oportunidades Exclusivas</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                Destacados <span className="text-transparent bg-clip-text bg-gradient-to-r from-carmona-gold to-carmona-orange">Carmona</span>
              </h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Descubre nuestra selección curada de vehículos. Calidad certificada, entrega inmediata y el respaldo de siempre.
              </p>
            </div>
            <Link href="/nuevos" className="hidden sm:flex items-center gap-2 text-carmona-orange font-bold hover:text-carmona-gold transition-all group shrink-0">
              Ver todo el stock <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_VEHICLES.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link href="/nuevos" className="inline-flex items-center gap-2 text-carmona-orange font-bold hover:text-carmona-gold transition-colors">
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
