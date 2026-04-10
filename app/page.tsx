import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import Hero from '@/components/Hero';
import { getFeaturedModels, getBanners, formatImageUrl } from '@/lib/api';
import QuickAccessBar from '@/components/QuickAccessBar';
import DiscoverMoreCarousel from '@/components/DiscoverMoreCarousel';
import HomeVehiclesCarousel from '@/components/HomeVehiclesCarousel';

import HomeClient from './HomeClient';

export const revalidate = 60;

export default async function Home() {
  const [featuredVehicles, allBanners] = await Promise.all([
    getFeaturedModels(),
    getBanners()
  ]);

  const homeHeroBanners = allBanners
    .filter((b: any) => b.location === 'home_hero' && b.active)
    .sort((a: any, b: any) => a.order - b.order)
    .map((b: any) => ({
        ...b,
        image_desktop: formatImageUrl(b.image_desktop),
        image_mobile: formatImageUrl(b.image_mobile)
    }));

  const homePromoBanner = allBanners
    .filter((b: any) => b.location === 'home_promotional' && b.active)
    .sort((a: any, b: any) => a.order - b.order)[0] || null;

  if (homePromoBanner) {
      homePromoBanner.image_desktop = formatImageUrl(homePromoBanner.image_desktop);
      homePromoBanner.image_mobile = formatImageUrl(homePromoBanner.image_mobile);
  }

  return (
    <main className="min-h-screen bg-white">
      <Hero banners={homeHeroBanners.length > 0 ? homeHeroBanners : undefined} />

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

          <HomeClient featuredVehicles={featuredVehicles} promoBanner={homePromoBanner} />
        </div>
      </section>

      {/* Discover More Carousel Section */}
      <DiscoverMoreCarousel />
    </main>
  );
}
