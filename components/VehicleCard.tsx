import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Gauge, ChevronRight } from 'lucide-react';
import ShareButton from './ShareButton';

interface VehicleCardProps {
    vehicle: {
        id: string;
        brand: string;
        name: string;
        price: number;
        image: string;
        isNew?: boolean;
        isHybrid?: boolean;
        version?: string;
        year?: number;
        mileage?: number;
    }
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };

    const detailUrl = `/nuevos/${vehicle.brand.toLowerCase()}/${vehicle.id.toLowerCase()}`;

    return (
        <div className="group relative bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-2xl hover:border-carmona-orange/30 transition-all duration-500 h-full flex flex-col">
            <Link href={detailUrl} className="block h-full">
                {/* Image Container */}
                <div className="relative aspect-[4/3] rounded-t-2xl bg-gray-50/50">
                    <Image
                        src={vehicle.image.startsWith('http') ? vehicle.image : `${process.env.NEXT_PUBLIC_CDN_URL || ''}/${vehicle.image.replace(/^\//, '')}`}
                        alt={`${vehicle.brand} ${vehicle.name}`}
                        fill
                        className="object-contain object-bottom p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                        {vehicle.isNew && <span className="bg-carmona-gold text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">Nuevo</span>}
                        {vehicle.isHybrid && <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">Híbrido</span>}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="mb-3">
                            <span className="text-[10px] font-extrabold text-carmona-orange uppercase tracking-[0.2em] mb-1 block">{vehicle.brand}</span>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-carmona-orange transition-colors uppercase leading-tight">{vehicle.name}</h3>
                            {vehicle.version && <p className="text-sm text-gray-500 truncate mt-1">{vehicle.version}</p>}
                        </div>
                    </div>

                    {/* Footer - Price & Link */}
                    <div className="pt-4 mt-auto border-t border-gray-50 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Precio desde</span>
                            <span className="text-2xl font-black text-gray-900 leading-tight tracking-tight">
                                {formatPrice(vehicle.price)}
                            </span>
                            <p className="text-[10px] text-gray-400 font-bold mt-1 italic">
                                *Consultar condiciones
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-carmona-orange group/btn">
                             <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/btn:bg-carmona-orange group-hover/btn:text-white transition-all duration-300">
                                <ChevronRight size={16} />
                             </div>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Botón Compartir - Outside the main Link to avoid nested links */}
            <div className="absolute top-3 right-3 z-20">
                <ShareButton
                    title={`Mira este modelo ${vehicle.brand} ${vehicle.name} en Carmona`}
                    url={`https://automotrizcarmona.cl${detailUrl}`}
                />
            </div>
        </div>
    );
}
