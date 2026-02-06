'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, ChevronDown, Menu, X, User, Calendar, Wrench, Settings, Truck, Car, ShoppingBag, ArrowRight, Search, ChevronLeft, Sparkles, LayoutGrid } from 'lucide-react';

const BRAND_LOGOS = [
    { name: "Toyota", src: "/images/logos/TOYOTA_Logo.png" },
    { name: "Maxus", src: "/images/logos/MAXUS_Logo.png" },
    { name: "BMW", src: "/images/logos/BMW_Logo.png" },
    { name: "Audi", src: "/images/logos/AUDI_Logo.png" },
    { name: "BMW Motorrad", src: "/images/logos/BMW-MOTORRAD_Logo.png" },
    { name: "Cupra", src: "/images/logos/Cupra-logo.png" },
    { name: "Dongfeng", src: "/images/logos/DONGFENG-CIDEF_Logo.png" },
    { name: "Foton", src: "/images/logos/FOTON-CIDEF_Logo.png" },
    { name: "Honda", src: "/images/logos/HONDA_Logo.png" },
    { name: "Jetour", src: "/images/logos/JETOUR-logo.png" },
    { name: "Karry", src: "/images/logos/KARRY_Logo.png" },
    { name: "Kaiyi", src: "/images/logos/Kaiyi-Auto-Horizontal-03.png" },
    { name: "MG", src: "/images/logos/MG_Logo.png" },
    { name: "Mini", src: "/images/logos/MINI_Logo.png" },
    { name: "Seat", src: "/images/logos/SEAT_Logo.png" },
    { name: "Soueast", src: "/images/logos/SOUEAST_BLACK_Logo.png" },
    { name: "Volkswagen", src: "/images/logos/VOLKSWAGEN_Logo.png" },
    { name: "Geely", src: "/images/logos/logo-geelyy.png" },
];

const TRUCK_LOGOS = [
    { name: "Iveco", src: "/images/logos/logo-iveco.png" },
    { name: "MAN", src: "/images/logos/MAN_Logo.png" },
    { name: "VW Camiones", src: "/images/logos/VW-CAMIONES-Y-BUSES_Logo.png" },
    { name: "Maxus", src: "/images/logos/MAXUS_Logo.png" },
    { name: "Foton", src: "/images/logos/FOTON-MDLA_Logo.png" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [assistantView, setAssistantView] = useState<'HOME' | 'NEW_CARS'>('HOME');
    const [searchQuery, setSearchQuery] = useState('');

    const resetAssistant = () => {
        setIsOpen(false);
        setTimeout(() => {
            setAssistantView('HOME');
            setSearchQuery('');
        }, 300);
    }

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bruno-black shadow-lg py-1' : 'bg-bruno-black/95 backdrop-blur-md py-3'}`}>

                {/* Main Bar */}
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo */}
                        <Link href="/" className="relative flex items-center gap-3 group z-50">
                            <div className="relative w-48 h-14 md:w-56 md:h-16 transition-all duration-300">
                                <Image
                                    src="/images/logo-carmona.avif"
                                    alt="Carmona Automotriz"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">

                            {/* Nuevos */}
                            <div
                                className="relative group px-4 h-20 flex items-center"
                                onMouseEnter={() => setActiveMenu('nuevos')}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <button className="text-white text-[15px] font-bold tracking-wide hover:text-carmona-gold flex items-center gap-1.5 py-2 transition-colors uppercase">
                                    Nuevos <ChevronDown size={14} className={`text-carmona-orange transition-transform duration-300 ${activeMenu === 'nuevos' ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Mega Menu */}
                                {activeMenu === 'nuevos' && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white shadow-2xl rounded-b-2xl overflow-hidden border-t-4 border-carmona-gold animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="p-10">
                                            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Nuestras Marcas</h3>
                                            <div className="grid grid-cols-5 gap-x-8 gap-y-8">
                                                {BRAND_LOGOS.map((brand) => (
                                                    <Link
                                                        key={brand.name}
                                                        href={`/nuevos/${brand.name.toLowerCase()}`}
                                                        className="flex items-center justify-center p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group/item hover:shadow-sm"
                                                    >
                                                        <div className="relative w-full h-10">
                                                            <Image
                                                                src={brand.src}
                                                                alt={brand.name}
                                                                fill
                                                                className="object-contain grayscale group-hover/item:grayscale-0 transition-all duration-300"
                                                            />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 text-center border-t border-gray-100 flex justify-between items-center px-10">
                                            <span className="text-gray-400 text-sm">Encuentra tu próximo auto nuevo</span>
                                            <Link href="/nuevos" className="text-sm font-bold text-carmona-gold hover:text-carmona-orange flex items-center gap-1 transition-colors">
                                                Ver Catálogo Completo <ChevronDown size={14} className="-rotate-90" />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Camiones y Buses */}
                            <div
                                className="relative group px-4 h-20 flex items-center"
                                onMouseEnter={() => setActiveMenu('camiones')}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <button className="text-white text-[15px] font-bold tracking-wide hover:text-carmona-gold flex items-center gap-1.5 py-2 transition-colors uppercase">
                                    Camiones<span className="normal-case font-normal text-white/50 text-xs mx-0.5">y</span>Buses <ChevronDown size={14} className={`text-carmona-orange transition-transform duration-300 ${activeMenu === 'camiones' ? 'rotate-180' : ''}`} />
                                </button>

                                {activeMenu === 'camiones' && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-2xl rounded-b-2xl overflow-hidden border-t-4 border-carmona-gold animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="p-8">
                                            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Vehículos Comerciales</h3>
                                            <div className="grid grid-cols-3 gap-8">
                                                {TRUCK_LOGOS.map((brand) => (
                                                    <Link
                                                        key={brand.name}
                                                        href={`/camiones/${brand.name.toLowerCase()}`}
                                                        className="flex items-center justify-center p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group/item hover:shadow-sm"
                                                    >
                                                        <div className="relative w-full h-14">
                                                            <Image
                                                                src={brand.src}
                                                                alt={brand.name}
                                                                fill
                                                                className="object-contain grayscale group-hover/item:grayscale-0 transition-all duration-300"
                                                            />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link href="/seminuevos" className="px-4 text-white text-[15px] font-bold tracking-wide hover:text-carmona-gold transition-colors uppercase">Seminuevos</Link>

                            {/* Postventa */}
                            <div
                                className="relative group px-4 h-20 flex items-center"
                                onMouseEnter={() => setActiveMenu('postventa')}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <button className="text-white text-[15px] font-bold tracking-wide hover:text-carmona-gold flex items-center gap-1.5 py-2 transition-colors uppercase">
                                    Postventa <ChevronDown size={14} className={`text-carmona-orange transition-transform duration-300 ${activeMenu === 'postventa' ? 'rotate-180' : ''}`} />
                                </button>

                                {activeMenu === 'postventa' && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-2xl overflow-hidden border-t-4 border-carmona-gold animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="py-2">
                                            <Link href="/servicios" className="flex items-center gap-3 px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 hover:text-carmona-gold font-medium border-b border-gray-100 group/link">
                                                <Wrench size={18} className="text-gray-400 group-hover/link:text-carmona-gold transition-colors" />
                                                Servicio Técnico
                                            </Link>
                                            <Link href="/repuestos" className="flex items-center gap-3 px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 hover:text-carmona-gold font-medium border-b border-gray-100 group/link">
                                                <Settings size={18} className="text-gray-400 group-hover/link:text-carmona-gold transition-colors" />
                                                Repuestos
                                            </Link>
                                            <Link href="/dyp" className="flex items-center gap-3 px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 hover:text-carmona-gold font-medium group/link">
                                                <Truck size={18} className="text-gray-400 group-hover/link:text-carmona-gold transition-colors" />
                                                DyP
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="ml-6 pl-6 border-l border-white/10">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="flex items-center gap-2 bg-gradient-to-r from-carmona-gold to-carmona-orange text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-carmona-gold/30 transition-all transform hover:-translate-y-0.5 group"
                                >
                                    <Sparkles size={18} className="text-white fill-white/20" />
                                    <span className="uppercase tracking-wide text-xs">Asistente</span>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Smart Assistant Overlay / Drawer */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={resetAssistant}
            />

            <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        {assistantView !== 'HOME' && (
                            <button
                                onClick={() => setAssistantView('HOME')}
                                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors group"
                            >
                                <ChevronLeft size={24} className="text-gray-400 group-hover:text-carmona-gold" />
                            </button>
                        )}
                        <span className="text-carmona-gold font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                            <Sparkles size={14} /> Asistente Inteligente
                        </span>
                    </div>
                    <button
                        onClick={resetAssistant}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} className="text-gray-900" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto bg-gray-50/50">

                    {/* Persistent Search Bar */}
                    <div className="p-8 pb-4">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Busca por marca, modelo o servicio..."
                                className="w-full bg-white border-2 border-gray-100 text-gray-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-carmona-gold/50 focus:shadow-xl transition-all placeholder:text-gray-400 text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-carmona-gold transition-colors" />
                        </div>
                    </div>

                    {assistantView === 'HOME' ? (
                        <div className="px-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">¿En qué te podemos ayudar?</h2>
                            <p className="text-gray-500 mb-8">Navega rápidamente a lo que necesitas.</p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => setAssistantView('NEW_CARS')}
                                    className="w-full group block p-6 rounded-2xl bg-white hover:bg-bruno-black transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100 hover:border-black/5 text-left"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="p-3 bg-carmona-gold/10 rounded-xl group-hover:bg-white/10 transition-colors">
                                            <Car size={28} className="text-carmona-gold group-hover:text-white" />
                                        </div>
                                        <ArrowRight size={20} className="text-gray-300 group-hover:text-carmona-gold opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">Cotizar un Auto Nuevo</h3>
                                    <p className="text-sm text-gray-500 group-hover:text-gray-400 mt-1 transition-colors">Explorar marcas y modelos disponibles</p>
                                </button>

                                <Link href="/seminuevos" className="w-full group block p-6 rounded-2xl bg-white hover:bg-bruno-black transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100 hover:border-black/5 text-left">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="p-3 bg-carmona-orange/10 rounded-xl group-hover:bg-white/10 transition-colors">
                                            <ShoppingBag size={28} className="text-carmona-orange group-hover:text-white" />
                                        </div>
                                        <ArrowRight size={20} className="text-gray-300 group-hover:text-carmona-gold opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">Cotizar un Auto Usado</h3>
                                    <p className="text-sm text-gray-500 group-hover:text-gray-400 mt-1 transition-colors">Stock certificado con entrega inmediata</p>
                                </Link>

                                <Link href="/servicios" className="w-full group block p-6 rounded-2xl bg-white hover:bg-bruno-black transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100 hover:border-black/5 text-left">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-white/10 transition-colors">
                                            <Wrench size={28} className="text-blue-600 group-hover:text-white" />
                                        </div>
                                        <ArrowRight size={20} className="text-gray-300 group-hover:text-carmona-gold opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">Agendar Servicio Técnico</h3>
                                    <p className="text-sm text-gray-500 group-hover:text-gray-400 mt-1 transition-colors">Mantenciones, reparaciones y pintura</p>
                                </Link>

                                <Link href="/repuestos" className="w-full group block p-6 rounded-2xl bg-white hover:bg-bruno-black transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100 hover:border-black/5 text-left">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="p-3 bg-green-50 rounded-xl group-hover:bg-white/10 transition-colors">
                                            <Settings size={28} className="text-green-600 group-hover:text-white" />
                                        </div>
                                        <ArrowRight size={20} className="text-gray-300 group-hover:text-carmona-gold opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">Cotizar un Repuesto</h3>
                                    <p className="text-sm text-gray-500 group-hover:text-gray-400 mt-1 transition-colors">Piezas originales y accesorios</p>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="px-8 pb-8 animate-in slide-in-from-right-8 duration-300">
                            {/* BRAND SELECTION VIEW */}
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Elige tu Marca</h2>
                            <p className="text-gray-500 mb-8">Selecciona una marca para ver los modelos disponibles.</p>

                            <div className="grid grid-cols-2 gap-4">
                                {BRAND_LOGOS.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).map((brand) => (
                                    <Link
                                        key={brand.name}
                                        href={`/nuevos/${brand.name.toLowerCase()}`}
                                        className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-100 hover:border-carmona-gold hover:shadow-lg transition-all group"
                                        onClick={resetAssistant}
                                    >
                                        <div className="relative w-full h-12 mb-2">
                                            <Image
                                                src={brand.src}
                                                alt={brand.name}
                                                fill
                                                className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                            />
                                        </div>
                                        <span className="text-sm font-bold text-gray-400 group-hover:text-gray-900">{brand.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer of Drawer */}
                <div className="p-6 bg-white border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>¿Necesitas ayuda personalizada?</span>
                        <a href="tel:+56912345678" className="font-bold text-carmona-gold hover:underline">Llamar ahora</a>
                    </div>
                </div>
            </div>
        </>
    );
}
