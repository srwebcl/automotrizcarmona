'use client';

import React, { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import VehicleCard from '@/components/VehicleCard';

export default function HomeVehiclesCarousel({ vehicles }: { vehicles: any[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
  });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="flex gap-6 overflow-hidden">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] animate-pulse bg-gray-100 h-[400px] rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden py-8 -my-8 px-4 -mx-4" ref={emblaRef}>
        <div className="flex gap-8">
            {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-16px)] lg:flex-[0_0_calc(33.333%-22px)] min-w-0"
            >
              <VehicleCard vehicle={{
                ...vehicle,
                financingBonus: vehicle.versions?.[0]?.financingBonus
              }} />
            </div>
          ))}
        </div>
      </div>

      {vehicles.length > 3 && (
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
