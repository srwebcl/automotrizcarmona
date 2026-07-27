'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, User, ChevronDown, Store, Navigation } from 'lucide-react';
import { API_URL } from '@/lib/api';

interface Branch {
    id: number;
    name: string;
    type: string;
    address: string;
    city: string;
    manager_name: string | null;
    schedule: string | null;
    schedules?: {days: string, hours: string}[];
    phone: string | null;
    email: string | null;
    map_link: string | null;
    image_url: string | null;
    brands_list: string[];
}

function BranchIllustration({ type }: { type: string }) {
    return (
        <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center relative overflow-hidden text-gray-400">
            <Store size={40} className="opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]" />
            <div className="relative z-10 flex flex-col items-center scale-90">
                <div className="border border-current bg-white px-3 py-1 rounded mb-[-2px] font-bold uppercase tracking-widest text-[10px]">
                    {type === 'Sala de Ventas' ? 'Carmona' : 'Carmona Taller'}
                </div>
            </div>
        </div>
    );
}

export default function SucursalesPage() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/branches`)
            .then(r => r.json())
            .then(json => {
                setBranches(json.data || json);
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    const allBrandNames = useMemo(() => {
        const set = new Set<string>();
        branches.forEach(b => (b.brands_list || []).forEach(name => set.add(name)));
        return [...set].sort();
    }, [branches]);

    const allTypes = useMemo(() => {
        return [...new Set(branches.map(b => b.type))].sort();
    }, [branches]);

    const allCities = useMemo(() => {
        return [...new Set(branches.map(b => b.city).filter(Boolean))].sort();
    }, [branches]);

    const filteredBranches = useMemo(() => branches.filter(b => {
        if (selectedBrand && !(b.brands_list || []).includes(selectedBrand)) return false;
        if (selectedService && b.type !== selectedService) return false;
        if (selectedCity && b.city !== selectedCity) return false;
        return true;
    }), [branches, selectedBrand, selectedService, selectedCity]);

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden h-80 animate-pulse" />
            ))}
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-50 pt-[104px] lg:pt-[90px] font-sans pb-20">
            <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-10 md:py-16">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* LEFT COLUMN: Titulo & Filtros */}
                    <div className="lg:w-1/4 flex-shrink-0">
                        <h1 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight mb-4">
                            Conoce nuestras <br />
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">Sucursales</span>
                        </h1>
                        <p className="text-gray-600 mb-8 text-sm leading-relaxed max-w-sm">
                            Selecciona la sucursal que andas buscando, ya sea sala de ventas o servicio técnico.
                        </p>

                        <div className="space-y-4 sticky top-32">
                            {/* Filtro Marca */}
                            <div className="relative border border-gray-300 rounded-xl bg-white group hover:border-[#d2001c] transition-colors focus-within:border-[#d2001c] focus-within:ring-1 focus-within:ring-[#d2001c] shadow-sm">
                                <label className="absolute -top-[9px] left-3 bg-white px-1 text-[10px] font-bold text-gray-500 transition-colors group-hover:text-[#d2001c]">
                                    Seleccionar Marca
                                </label>
                                <select
                                    value={selectedBrand}
                                    onChange={e => setSelectedBrand(e.target.value)}
                                    className="w-full text-gray-900 bg-transparent px-4 py-3 outline-none cursor-pointer appearance-none text-sm"
                                >
                                    <option value="">Todas</option>
                                    {allBrandNames.map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#d2001c]" />
                            </div>

                            {/* Filtro Servicio */}
                            <div className="relative border border-gray-300 rounded-xl bg-white group hover:border-[#d2001c] transition-colors focus-within:border-[#d2001c] focus-within:ring-1 focus-within:ring-[#d2001c] shadow-sm">
                                <label className="absolute -top-[9px] left-3 bg-white px-1 text-[10px] font-bold text-gray-500 transition-colors group-hover:text-[#d2001c]">
                                    Tipo de Sucursal
                                </label>
                                <select
                                    value={selectedService}
                                    onChange={e => setSelectedService(e.target.value)}
                                    className="w-full text-gray-900 bg-transparent px-4 py-3 outline-none cursor-pointer appearance-none text-sm"
                                >
                                    <option value="">Todas</option>
                                    {allTypes.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#d2001c]" />
                            </div>

                            {/* Filtro Ciudad */}
                            <div className="relative border border-gray-300 rounded-xl bg-white group hover:border-[#d2001c] transition-colors focus-within:border-[#d2001c] focus-within:ring-1 focus-within:ring-[#d2001c] shadow-sm">
                                <label className="absolute -top-[9px] left-3 bg-white px-1 text-[10px] font-bold text-gray-500 transition-colors group-hover:text-[#d2001c]">
                                    Ciudad
                                </label>
                                <select
                                    value={selectedCity}
                                    onChange={e => setSelectedCity(e.target.value)}
                                    className="w-full text-gray-900 bg-transparent px-4 py-3 outline-none cursor-pointer appearance-none text-sm"
                                >
                                    <option value="">Todas</option>
                                    {allCities.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#d2001c]" />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Grid de Sucursales */}
                    <div className="lg:w-3/4">
                        <div className="flex items-center justify-between mb-5 border-b border-gray-200 pb-3">
                            <span className="text-gray-600 font-medium">
                                {isLoading ? '...' : `${filteredBranches.length} Sucursales encontradas`}
                            </span>
                            {selectedBrand && (
                                <span className="font-bold uppercase tracking-widest text-[#d2001c] text-xs bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                                    {selectedBrand}
                                </span>
                            )}
                        </div>

                        {isLoading ? (
                            <LoadingSkeleton />
                        ) : filteredBranches.length === 0 ? (
                            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500 text-sm">
                                No encontramos sucursales que coincidan con tus filtros.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredBranches.map(sucursal => {
                                    const brandNames = sucursal.brands_list || [];

                                    return (
                                        <div key={sucursal.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col h-full group">

                                            {/* IMAGEN SUCURSAL */}
                                            <div className="h-40 relative overflow-hidden bg-gray-100 border-b border-gray-100">
                                                {sucursal.image_url ? (
                                                    <Image src={sucursal.image_url} alt={sucursal.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                ) : (
                                                    <BranchIllustration type={sucursal.type} />
                                                )}
                                            </div>

                                            <div className="p-5 flex-1 flex flex-col relative w-full">

                                                {/* TIPO */}
                                                <div className="flex items-center justify-between mb-4 mt-1 w-full">
                                                    <h3 className="text-[#d2001c] font-black uppercase tracking-widest text-[11px] bg-red-50 px-2 py-1 rounded inline-block">
                                                        {sucursal.type}
                                                    </h3>
                                                </div>

                                                {/* NOMBRE Y DIRECCIÓN */}
                                                <div className="mb-4">
                                                    <h2 className="font-bold text-gray-900 text-[15px] mb-1">{sucursal.name}</h2>
                                                    <div className="flex items-start gap-2 text-gray-800">
                                                        <MapPin size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                                                        <div>
                                                            <p className="font-bold text-[14px] leading-snug">{sucursal.address}</p>
                                                            <p className="text-gray-500 text-[12px]">{sucursal.city}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* INFO DE CONTACTO */}
                                                <div className="space-y-2 mb-6">
                                                    {sucursal.manager_name && (
                                                        <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                            <User size={14} className="text-gray-400 flex-shrink-0" />
                                                            <span><span className="font-medium mr-1">Jefe a cargo:</span>{sucursal.manager_name}</span>
                                                        </div>
                                                    )}
                                                    {sucursal.schedules && sucursal.schedules.length > 0 ? (
                                                        <div className="flex items-start gap-2 text-[13px] text-gray-600">
                                                            <Clock size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                                                            <div className="flex flex-col gap-1">
                                                                {sucursal.schedules.map((sch, idx) => (
                                                                    <span key={idx}>
                                                                        <span className="font-medium mr-1">{sch.days}:</span>
                                                                        {sch.hours}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : sucursal.schedule ? (
                                                        <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                            <Clock size={14} className="text-gray-400 flex-shrink-0" />
                                                            <span>{sucursal.schedule}</span>
                                                        </div>
                                                    ) : null}
                                                    {sucursal.phone && (
                                                        <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                            <Phone size={14} className="text-gray-400 flex-shrink-0" />
                                                            <a href={`tel:${sucursal.phone.replace(/\s+/g, '')}`} className="hover:text-[#d2001c] transition-colors">
                                                                {sucursal.phone}
                                                            </a>
                                                        </div>
                                                    )}
                                                    {sucursal.email && (
                                                        <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                            <Mail size={14} className="text-gray-400 flex-shrink-0" />
                                                            <a href={`mailto:${sucursal.email}`} className="hover:text-[#d2001c] transition-colors truncate">
                                                                {sucursal.email}
                                                            </a>
                                                        </div>
                                                    )}
                                                    {/* Marcas asociadas */}
                                                    {brandNames.length > 1 && (
                                                        <div className="flex flex-wrap gap-1 pt-1">
                                                            {brandNames.map(name => (
                                                                <span key={name} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-widest">
                                                                    {name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* BOTÓN CÓMO LLEGAR */}
                                                <div className="mt-auto">
                                                    {sucursal.map_link ? (
                                                        <a href={sucursal.map_link} target="_blank" rel="noopener noreferrer"
                                                            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm">
                                                            <Navigation size={16} />
                                                            Cómo llegar
                                                        </a>
                                                    ) : (
                                                        <div className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-500 py-2.5 rounded-lg font-bold text-[13px] cursor-not-allowed">
                                                            <MapPin size={16} />
                                                            Mapa no disponible
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
