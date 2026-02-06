import React from 'react';
import Image from 'next/image';
import { Calendar, Gauge, ChevronRight } from 'lucide-react';

interface VehicleCardProps {
    vehicle: {
        id: number;
        brand: string;
        model: string;
        version: string;
        year: number;
        price: number;
        mileage: number;
        image: string;
        isNew: boolean;
        isHybrid: boolean;
    }
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };

    return (
        <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-carmona-gold/30 transition-all duration-300">
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    className="object-contain object-bottom p-4 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {vehicle.isNew && <span className="bg-carmona-gold text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">Nuevo</span>}
                    {vehicle.isHybrid && <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">Híbrido</span>}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{vehicle.brand}</span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-carmona-orange transition-colors">{vehicle.model}</h3>
                    <p className="text-sm text-gray-500 truncate">{vehicle.version}</p>
                </div>

                {/* Specs */}
                <div className="flex gap-4 text-xs text-gray-500 mb-4 border-b border-gray-100 pb-4">
                    {!vehicle.isNew && (
                        <>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {vehicle.year}</span>
                            <span className="flex items-center gap-1"><Gauge size={12} /> {vehicle.mileage.toLocaleString()} km</span>
                        </>
                    )}
                    {vehicle.isNew && <span className="text-carmona-gold font-medium">0 km • Entrega Inmediata</span>}
                </div>

                {/* Price */}
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs text-gray-400 mb-0.5">Precio desde</p>
                        <p className="text-xl font-bold text-gray-900">{formatPrice(vehicle.price)}</p>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-carmona-gold group-hover:text-white transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
