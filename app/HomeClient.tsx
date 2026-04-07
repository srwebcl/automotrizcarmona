'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import HomeVehiclesCarousel from '@/components/HomeVehiclesCarousel';
import PromoModal from '@/components/PromoModal';

interface HomeClientProps {
    featuredVehicles: any[];
}

export default function HomeClient({ featuredVehicles }: HomeClientProps) {
    const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

    return (
        <div className="px-6 lg:px-0">
            <div className="flex flex-col-reverse lg:flex-row gap-6 items-stretch">

                {/* ── Banner Promocional (Abre Pop-up) ── */}
                <div className="w-full lg:w-[calc(25%-12px)] flex-shrink-0">
                    <button
                        onClick={() => setIsPromoModalOpen(true)}
                        className="w-full group block rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative aspect-[2/3] lg:aspect-auto lg:h-full bg-white"
                    >
                        <Image
                            src="https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/home/banner-destacados-web.webp"
                            alt="Banner Promocional"
                            fill
                            className="object-cover transition-all duration-300 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                             <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Solicitar Info</div>
                        </div>
                    </button>
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

            <PromoModal 
                isOpen={isPromoModalOpen} 
                onClose={() => setIsPromoModalOpen(false)} 
            />
        </div>
    );
}
