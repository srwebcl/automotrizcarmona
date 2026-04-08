'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, User, ChevronDown, Store, Navigation } from 'lucide-react';

const BRAND_LOGOS: Record<string, string> = {
    "Toyota": "/images/logos/logo-toyota.webp",
    "Volkswagen": "/images/logos/logo-vw.webp",
    "Audi": "/images/logos/logo-audi.webp",
    "Seat": "/images/logos/logo-seat.webp",
    "Cupra": "/images/logos/logo-cupra.webp",
    "BMW": "/images/logos/logo-bmw.webp",
    "BMW Motorrad": "/images/logos/logo-bmw-motorrad.webp",
    "Mini": "/images/logos/logo-mini.webp",
    "Honda": "/images/logos/logo-honda.webp",
    "MG": "/images/logos/logo-mg.webp",
    "Maxus": "/images/logos/logo-maxus.webp",
    "Jetour": "/images/logos/logo-jetour.webp",
    "Geely": "/images/logos/logo-geely.webp",
    "Dongfeng": "/images/logos/logo-dongfeng.webp",
    "Kaiyi": "/images/logos/logo-kaiyi.webp",
    "Karry": "/images/logos/logo-karry.webp",
    "Soueast": "/images/logos/logos antiguos/SOUEAST_BLACK_Logo.png",
    "Foton": "/images/logos/logo-foton.webp",
    "VW Camiones": "/images/logos/logo-vw-camiones.webp",
    "Foton Camiones": "/images/logos/logo-foton-camiones.webp",
    "Iveco": "/images/logos/logo-iveco.webp",
    "MAN": "/images/logos/logo-man.webp",
    "Autos Usados": "",
    "DyP Multimarca": ""
};

const SUCURSALES: any[] = [
    // --- TOYOTA ---
    {
        id: 1, type: 'Sala de Ventas', brandName: 'Toyota', address: 'Avenida Balmaceda 3681, La Serena',
        city: 'La Serena', manager: 'Asesor de Ventas', schedule: 'L-V: 8:30 a 19:00 | Sáb: 9:00 a 14:00',
        phone: '+56 9 8474 9397', email: 'lhurtado@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3681+La+Serena'
    },
    {
        id: 2, type: 'Servicio Técnico', brandName: 'Toyota', address: 'Avenida Balmaceda 3681, La Serena',
        city: 'La Serena', manager: 'Jefe de Taller', schedule: 'L-V: 8:00 a 18:00 | Sáb: 9:00 a 13:00',
        phone: '+56 9 5647 7727', email: 'callcenter@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3681+La+Serena'
    },
    {
        id: 3, type: 'Repuestos', brandName: 'Toyota', address: 'Avenida Balmaceda 3681, La Serena',
        city: 'La Serena', manager: 'Encargado de Repuestos', schedule: 'L-V: 8:30 a 18:30 | Sáb: 9:00 a 13:00',
        phone: '+56 51 220 0250', email: 'cmatac@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3681+La+Serena'
    },

    // --- VOLKSWAGEN ---
    {
        id: 4, type: 'Sala de Ventas', brandName: 'Volkswagen', address: 'Avenida Balmaceda 3812, La Serena',
        city: 'La Serena', manager: 'Asesor de Ventas', schedule: 'L-V: 8:30 a 19:00 | Sáb: 9:00 a 14:00',
        phone: '+56 9 8474 9397', email: 'nmercado@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3812+La+Serena'
    },
    {
        id: 5, type: 'Servicio Técnico', brandName: 'Volkswagen', address: 'Avenida Balmaceda 3812, La Serena',
        city: 'La Serena', manager: 'Jefe de Taller', schedule: 'L-V: 8:00 a 18:00 | Sáb: 9:00 a 13:00',
        phone: '+56 9 5659 9895', email: 'callcentervw@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3812+La+Serena'
    },
    {
        id: 6, type: 'Repuestos', brandName: 'Volkswagen', address: 'Avenida Balmaceda 3812, La Serena',
        city: 'La Serena', manager: 'Encargado de Repuestos', schedule: 'L-V: 8:30 a 18:30 | Sáb: 9:00 a 13:00',
        phone: '+56 9 3750 8754', email: 'sorrego@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3812+La+Serena'
    },

    // --- AUDI, CUPRA, SEAT ---
    {
        id: 7, type: 'Sala de Ventas', brandName: 'Audi', address: 'Avenida Balmaceda 3570, La Serena',
        city: 'La Serena', manager: 'Asesor Premium', schedule: 'L-V: 8:30 a 19:00 | Sáb: 9:00 a 14:00',
        phone: '+56 9 8474 9397', email: 'nmercado@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3570+La+Serena'
    },
    {
        id: 8, type: 'Sala de Ventas', brandName: 'Cupra', address: 'Avenida Balmaceda 3570, La Serena',
        city: 'La Serena', manager: 'Asesor Premium', schedule: 'L-V: 8:30 a 19:00 | Sáb: 9:00 a 14:00',
        phone: '+56 9 8474 9397', email: 'nmercado@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3570+La+Serena'
    },
    {
        id: 9, type: 'Sala de Ventas', brandName: 'Seat', address: 'Avenida Balmaceda 3570, La Serena',
        city: 'La Serena', manager: 'Asesor Premium', schedule: 'L-V: 8:30 a 19:00 | Sáb: 9:00 a 14:00',
        phone: '+56 9 8474 9397', email: 'nmercado@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3570+La+Serena'
    },

    // --- HONDA ---
    {
        id: 10, type: 'Sala de Ventas', brandName: 'Honda', address: 'Avenida Balmaceda 3812, La Serena',
        city: 'La Serena', manager: 'Asesor de Ventas', schedule: 'L-V: 8:30 a 19:00 | Sáb: 9:00 a 14:00',
        phone: '+56 9 8474 9397', email: 'nmercado@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3812+La+Serena'
    },
    {
        id: 11, type: 'Servicio Técnico', brandName: 'Honda', address: 'Avenida Balmaceda 3720, La Serena',
        city: 'La Serena', manager: 'Jefe de Taller', schedule: 'L-V: 8:00 a 18:00 | Sáb: 9:00 a 13:00',
        phone: '+56 9 7879 4740', email: 'cmiles@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3720+La+Serena'
    },

    // --- BMW & MINI ---
    {
        id: 12, type: 'Sala de Ventas', brandName: 'BMW', address: 'Avenida Balmaceda 5508, La Serena',
        city: 'La Serena', manager: 'Asesor Premium', schedule: 'L-V: 8:30 a 19:00 | Sáb: 9:00 a 14:00',
        phone: '+56 9 8474 9397', email: 'cgonzalezr@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+5508+La+Serena'
    },
    {
        id: 13, type: 'Servicio Técnico', brandName: 'BMW', address: 'Avenida Balmaceda 5508, La Serena',
        city: 'La Serena', manager: 'Jefe de Taller', schedule: 'L-V: 8:00 a 18:00 | Sáb: 9:00 a 13:00',
        phone: '+56 9 7879 4735', email: 'mcataldo@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+5508+La+Serena'
    },
    {
        id: 14, type: 'Repuestos', brandName: 'BMW', address: 'Avenida Balmaceda 5508, La Serena',
        city: 'La Serena', manager: 'Encargado de Repuestos', schedule: 'L-V: 8:30 a 18:30 | Sáb: 9:00 a 13:00',
        phone: '+56 9 4508 9776', email: 'dtrigo@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+5508+La+Serena'
    },

    // --- MAXUS, KARRY, JETOUR, SOUEAST ---
    {
        id: 15, type: 'Sala de Ventas', brandName: 'Maxus', address: 'Avenida Balmaceda 5508, La Serena',
        city: 'La Serena', manager: 'Asesor de Ventas', schedule: 'L-V: 8:30 a 19:00 | Sáb: 9:00 a 14:00',
        phone: '+56 9 8474 9397', email: 'sromao@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+5508+La+Serena'
    },
    {
        id: 16, type: 'Servicio Técnico', brandName: 'Maxus', address: 'Avenida Estadio 3610, La Serena',
        city: 'La Serena', manager: 'Jefe de Taller', schedule: 'L-V: 8:00 a 18:00 | Sáb: 9:00 a 13:00',
        phone: '+56 9 7592 1328', email: 'callcentermm@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Estadio+3610+La+Serena'
    },

    // --- MG ---
    {
        id: 17, type: 'Sala de Ventas', brandName: 'MG', address: 'Avenida Balmaceda 3519, La Serena',
        city: 'La Serena', manager: 'Asesor de Ventas', schedule: 'L-V: 8:30 a 19:00 | Sáb: 9:00 a 14:00',
        phone: '+56 9 8474 9397', email: 'frojasd@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3519+La+Serena'
    },

    // --- CAMIONES (IVECO, MAN, VW, FOTON) ---
    {
        id: 18, type: 'Sala de Ventas', brandName: 'VW Camiones', address: 'Ruta 5 Norte KM 470, La Serena',
        city: 'La Serena', manager: 'Asesor Camiones', schedule: 'L-V: 8:30 a 18:30',
        phone: '+56 9 8474 9397', email: 'arodriguez@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Ruta+5+Norte+KM+470+La+Serena'
    },
    {
        id: 19, type: 'Servicio Técnico', brandName: 'Iveco', address: 'Ruta 5 Norte KM 470, La Serena',
        city: 'La Serena', manager: 'Jefe de Taller Camiones', schedule: 'L-V: 8:00 a 18:00',
        phone: '+56 9 7879 4741', email: 'garantiascamiones@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Ruta+5+Norte+KM+470+La+Serena'
    },

    // --- USADOS ---
    {
        id: 20, type: 'Sala de Ventas', brandName: 'Autos Usados', branchName: 'Seminuevos', address: 'Avenida Balmaceda 3572, La Serena',
        city: 'La Serena', manager: 'Asesor Seminuevos', schedule: 'L-V: 8:30 a 19:00 | Sáb: 9:00 a 14:00',
        phone: '+56 9 8474 9397', email: 'mfarias@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3572+La+Serena'
    },
    {
        id: 21, type: 'Sala de Ventas', brandName: 'Autos Usados', branchName: 'Seminuevos Premium', address: 'Avenida Balmaceda 3720, La Serena',
        city: 'La Serena', manager: 'Asesor Premium', schedule: 'L-V: 8:30 a 19:00 | Sáb: 9:00 a 14:00',
        phone: '+56 9 8474 9397', email: 'crivera@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Avenida+Balmaceda+3720+La+Serena'
    },

    // --- COPIAPÓ ---
    {
        id: 22, type: 'Sala de Ventas', brandName: 'Toyota', branchName: 'Copiapó Livianos', address: 'Copayapu 149, Copiapó',
        city: 'Copiapó', manager: 'Asesor de Ventas', schedule: 'L-V: 8:30 a 19:00',
        phone: '+56 9 8474 9397', email: 'dgordillo@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Copayapu+149+Copiapo'
    },
    {
        id: 23, type: 'Servicio Técnico', brandName: 'Toyota', branchName: 'Copiapó Servicio', address: 'Av. Longitudinal Norte 4559, Copiapó',
        city: 'Copiapó', manager: 'Jefe de Taller', schedule: 'L-V: 8:00 a 18:00',
        phone: '+56 9 7879 4734', email: 'jpdiaz@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Av.+Longitudinal+Norte+4559+Copiapo'
    },

    // --- DYP ---
    {
        id: 24, type: 'Desabolladura y Pintura', brandName: 'DyP Multimarca', address: 'Ruta 5 Norte KM 470, La Serena',
        city: 'La Serena', manager: 'Jefe DyP', schedule: 'L-V: 8:00 a 18:00',
        phone: '+56 9 7879 4738', email: 'calldyp@carmonaycia.cl', mapLink: 'https://maps.google.com/?q=Ruta+5+Norte+KM+470+La+Serena'
    }
];

const BRANDS = [...new Set(SUCURSALES.map(s => s.brandName))].sort();
const SERVICES = [...new Set(SUCURSALES.map(s => s.type))].sort();

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
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedService, setSelectedService] = useState('');

    const filteredSucursales = SUCURSALES.filter(s => {
        if (selectedBrand && s.brandName !== selectedBrand) return false;
        if (selectedService && s.type !== selectedService) return false;
        return true;
    });

    return (
        <main className="min-h-screen bg-gray-50 pt-[90px] font-sans pb-20">
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
                                <label className="absolute -top-[9px] left-3 bg-white px-1 text-[10px] font-bold text-gray-500 transition-colors group-hover:text-[#d2001c] peer-focus:text-[#d2001c]">
                                    Seleccionar Marca
                                </label>
                                <select
                                    value={selectedBrand}
                                    onChange={e => setSelectedBrand(e.target.value)}
                                    className="w-full text-gray-900 bg-transparent px-4 py-3 outline-none cursor-pointer appearance-none text-sm peer"
                                >
                                    <option value="">Todas</option>
                                    {BRANDS.map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#d2001c]" />
                            </div>

                            {/* Filtro Servicio */}
                            <div className="relative border border-gray-300 rounded-xl bg-white group hover:border-[#d2001c] transition-colors focus-within:border-[#d2001c] focus-within:ring-1 focus-within:ring-[#d2001c] shadow-sm">
                                <label className="absolute -top-[9px] left-3 bg-white px-1 text-[10px] font-bold text-gray-500 transition-colors group-hover:text-[#d2001c] peer-focus:text-[#d2001c]">
                                    Tipo de Sucursal
                                </label>
                                <select
                                    value={selectedService}
                                    onChange={e => setSelectedService(e.target.value)}
                                    className="w-full text-gray-900 bg-transparent px-4 py-3 outline-none cursor-pointer appearance-none text-sm peer"
                                >
                                    <option value="">Todas</option>
                                    {SERVICES.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#d2001c]" />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Grid de Sucursales */}
                    <div className="lg:w-3/4">
                        <div className="flex items-center justify-between mb-5 border-b border-gray-200 pb-3">
                            <span className="text-gray-600 font-medium">{filteredSucursales.length} Sucursales encontradas</span>
                            {selectedBrand && <span className="font-bold uppercase tracking-widest text-[#d2001c] text-xs bg-red-50 px-3 py-1.5 rounded-full border border-red-100">{selectedBrand}</span>}
                        </div>

                        {filteredSucursales.length === 0 ? (
                            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500 text-sm">
                                No encontramos sucursales que coincidan con tus filtros.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredSucursales.map(sucursal => {
                                    const logoSrc = BRAND_LOGOS[sucursal.brandName];

                                    return (
                                        <div key={sucursal.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col h-full group">

                                            {/* 1. IMAGEN SUCURSAL */}
                                            <div className="h-40 relative overflow-hidden bg-gray-100 border-b border-gray-100">
                                                {sucursal.image ? (
                                                    <Image src={sucursal.image} alt={sucursal.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                ) : (
                                                    <BranchIllustration type={sucursal.type} />
                                                )}
                                            </div>

                                            <div className="p-5 flex-1 flex flex-col relative w-full">

                                                {/* 2. SALA DE VENTAS | LOGO MARCA */}
                                                <div className="flex items-center justify-between mb-4 mt-1 w-full">
                                                    <h3 className="text-[#d2001c] font-black uppercase tracking-widest text-[11px] bg-red-50 px-2 py-1 rounded inline-block">
                                                        {sucursal.type}
                                                    </h3>
                                                    <div className="flex items-center gap-2 justify-end">
                                                        <div className={`${!logoSrc ? 'h-6 w-14' : 'h-6 w-14'} relative flex-shrink-0`}>
                                                            <Image src={logoSrc || '/images/favicon.png'} alt={sucursal.branchName || sucursal.brandName} fill className={`${!logoSrc ? 'object-contain object-right opacity-60' : 'object-contain object-right'}`} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 3. DIRECCIÓN & CIUDAD */}
                                                <div className="mb-4">
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
                                                    {/* 4. JEFE */}
                                                    <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                        <User size={14} className="text-gray-400 flex-shrink-0" />
                                                        <span><span className="font-medium mr-1">Jefe a cargo:</span>{sucursal.manager}</span>
                                                    </div>

                                                    {/* 5. HORARIO */}
                                                    <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                        <Clock size={14} className="text-gray-400 flex-shrink-0" />
                                                        <span>{sucursal.schedule}</span>
                                                    </div>

                                                    {/* 6. TELÉFONO */}
                                                    <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                        <Phone size={14} className="text-gray-400 flex-shrink-0" />
                                                        <a href={`tel:${sucursal.phone.replace(/\s+/g, '')}`} className="hover:text-carmona-orange transition-colors">
                                                            {sucursal.phone}
                                                        </a>
                                                    </div>

                                                    {/* 7. CORREO */}
                                                    <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                                        <Mail size={14} className="text-gray-400 flex-shrink-0" />
                                                        <a href={`mailto:${sucursal.email}`} className="hover:text-carmona-orange transition-colors truncate">
                                                            {sucursal.email}
                                                        </a>
                                                    </div>
                                                </div>

                                                {/* 8. BOTÓN CÓMO LLEGAR */}
                                                <div className="mt-auto">
                                                    <a href={sucursal.mapLink} target="_blank" rel="noopener noreferrer"
                                                        className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm">
                                                        <Navigation size={16} />
                                                        Cómo llegar
                                                    </a>
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
