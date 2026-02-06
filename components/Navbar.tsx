'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, ChevronDown, Menu, X, User, Calendar, Wrench, Settings, Truck, Car, ShoppingBag, ArrowRight, Search, ChevronLeft, Sparkles, LayoutGrid, Leaf, Bus, Grip, UserCheck, MessageSquare } from 'lucide-react';

const BRAND_LOGOS = [
    { name: "Toyota", src: "/images/logos/TOYOTA_Logo.png", isHybrid: true },
    { name: "Maxus", src: "/images/logos/MAXUS_Logo.png", isHybrid: false },
    { name: "BMW", src: "/images/logos/BMW_Logo.png", isHybrid: true },
    { name: "Audi", src: "/images/logos/AUDI_Logo.png", isHybrid: true },
    { name: "BMW Motorrad", src: "/images/logos/BMW-MOTORRAD_Logo.png", isHybrid: false },
    { name: "Cupra", src: "/images/logos/Cupra-logo.png", isHybrid: true },
    { name: "Dongfeng", src: "/images/logos/DONGFENG-CIDEF_Logo.png", isHybrid: false },
    { name: "Foton", src: "/images/logos/FOTON-CIDEF_Logo.png", isHybrid: false },
    { name: "Honda", src: "/images/logos/HONDA_Logo.png", isHybrid: true },
    { name: "Jetour", src: "/images/logos/JETOUR-logo.png", isHybrid: false },
    { name: "Karry", src: "/images/logos/KARRY_Logo.png", isHybrid: false },
    { name: "Kaiyi", src: "/images/logos/Kaiyi-Auto-Horizontal-03.png", isHybrid: false },
    { name: "MG", src: "/images/logos/MG_Logo.png", isHybrid: true },
    { name: "Mini", src: "/images/logos/MINI_Logo.png", isHybrid: true },
    { name: "Seat", src: "/images/logos/SEAT_Logo.png", isHybrid: false },
    { name: "Soueast", src: "/images/logos/SOUEAST_BLACK_Logo.png", isHybrid: false },
    { name: "Volkswagen", src: "/images/logos/VOLKSWAGEN_Logo.png", isHybrid: false },
    { name: "Geely", src: "/images/logos/logo-geelyy.png", isHybrid: true },
];

const TRUCK_LOGOS = [
    { name: "Iveco", src: "/images/logos/logo-iveco.png" },
    { name: "MAN", src: "/images/logos/MAN_Logo.png" },
    { name: "VW Camiones", src: "/images/logos/VW-CAMIONES-Y-BUSES_Logo.png" },
    { name: "Maxus", src: "/images/logos/MAXUS_Logo.png" },
    { name: "Foton", src: "/images/logos/FOTON-MDLA_Logo.png" },
];

type MenuCategory = 'nuevos' | 'camiones' | 'seminuevos' | 'postventa';
type IntentType = 'QUOTE' | 'SERVICE' | 'PARTS' | 'BRAND_ONLY' | 'GENERAL' | 'NONE';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Unified Menu State
    const [isUnifiedMenuOpen, setIsUnifiedMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<MenuCategory>('nuevos');

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

    const toggleUnifiedMenu = () => {
        setIsUnifiedMenuOpen(!isUnifiedMenuOpen);
        if (isOpen) setIsOpen(false); // Close assistant if opening menu
        if (!isUnifiedMenuOpen) setActiveCategory('nuevos'); // Reset to default when opening
    }

    const closeUnifiedMenu = () => {
        setIsUnifiedMenuOpen(false);
    }

    // Sidebar Items
    const menuItems = [
        { id: 'nuevos', label: 'Autos Nuevos', icon: Car },
        { id: 'camiones', label: 'Camiones y Buses', icon: Truck },
        { id: 'seminuevos', label: 'Seminuevos', icon: ShoppingBag },
        { id: 'postventa', label: 'Post-Venta', icon: Wrench },
    ];

    // --- SMART SEARCH LOGIC ---
    const searchIntent = useMemo(() => {
        if (!searchQuery) return { type: 'NONE' as IntentType, brand: null };

        const queryLower = searchQuery.toLowerCase();

        // Detect Brand
        const detectedBrand = BRAND_LOGOS.find(b => queryLower.includes(b.name.toLowerCase()));

        // Detect Intent Keywords
        if (queryLower.match(/serv|taller|agend|hora|mantenc|revis|cita/)) return { type: 'SERVICE' as IntentType, brand: detectedBrand };
        if (queryLower.match(/repuesto|acc|part|pieza/)) return { type: 'PARTS' as IntentType, brand: detectedBrand };
        if (queryLower.match(/cotiz|compr|nuevo|precio|valor|quiero un/)) return { type: 'QUOTE' as IntentType, brand: detectedBrand };

        // If only Brand detected
        if (detectedBrand) return { type: 'BRAND_ONLY' as IntentType, brand: detectedBrand };

        // Default fallback info search
        return { type: 'GENERAL' as IntentType, brand: null };
    }, [searchQuery]);

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bruno-black shadow-lg py-1' : 'bg-bruno-black/95 backdrop-blur-md py-3'}`}>

                {/* Main Bar */}
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <Link href="/" className="relative flex items-center gap-3 group z-50" onClick={closeUnifiedMenu}>
                            <div className="relative w-40 h-10 md:w-48 md:h-12 transition-all duration-300">
                                <Image
                                    src="/images/logo-carmona.avif"
                                    alt="Carmona Automotriz"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation - UNIFIED */}
                        <div className="hidden lg:flex items-center space-x-4">

                            {/* Main Menu Button */}
                            <button
                                onClick={toggleUnifiedMenu}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors group ${isUnifiedMenuOpen ? 'bg-white/10 text-carmona-gold' : 'hover:bg-white/5 text-white'}`}
                            >
                                <div className={`p-1.5 rounded-md border transition-all ${isUnifiedMenuOpen ? 'border-carmona-gold bg-carmona-gold/10' : 'border-white/20 group-hover:border-white/40'}`}>
                                    {isUnifiedMenuOpen ? <X size={18} /> : <Menu size={18} />}
                                </div>
                                <span className="text-sm font-bold tracking-widest uppercase">Menú</span>
                            </button>

                            {/* Assistant CTA */}
                            <div className="pl-4 border-l border-white/10">
                                <button
                                    onClick={() => {
                                        setIsOpen(true);
                                        closeUnifiedMenu();
                                    }}
                                    className="relative flex items-center gap-2 bg-gradient-to-r from-carmona-gold to-carmona-orange text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg hover:shadow-carmona-gold/30 transition-all transform hover:-translate-y-0.5 group overflow-hidden"
                                >
                                    {/* Premium Glow Effect */}
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-shine" />

                                    <Sparkles size={18} className="text-white fill-white/20 animate-pulse" />
                                    <span className="uppercase tracking-wide text-xs relative z-10">¿Te Ayudo?</span>
                                </button>
                                <style jsx>{`
                                    @keyframes shine {
                                        0% { transform: translateX(-100%) skewX(-15deg); }
                                        100% { transform: translateX(200%) skewX(-15deg); }
                                    }
                                    .animate-shine {
                                        animation: shine 1s ease-in-out infinite;
                                    }
                                `}</style>
                            </div>
                        </div>

                        {/* Mobile Menu Button - Keeping simplified for now */}
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

            {/* UNIFIED MENU DRAWER (Desktop) */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[40] transition-opacity duration-300 ${isUnifiedMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeUnifiedMenu}
            />

            {/* Menu Panel */}
            <div className={`fixed top-0 left-0 w-full bg-white z-[45] shadow-2xl transform transition-transform duration-500 ease-in-out ${isUnifiedMenuOpen ? 'translate-y-[64px]' : '-translate-y-full'}`}>
                <div className="max-w-[1920px] mx-auto min-h-[500px] flex">

                    {/* LEFT SIDEBAR - CATEGORIES */}
                    <div className="w-1/4 bg-gray-50 border-r border-gray-100 flex flex-col p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-4">Categorías</h3>
                        <div className="flex flex-col gap-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeCategory === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onMouseEnter={() => setActiveCategory(item.id as MenuCategory)} // Hover to switch? Or Click? User said "si estoy en...", usually implies selection. Hover is smoother for Mega Menu.
                                        onClick={() => setActiveCategory(item.id as MenuCategory)}
                                        className={`flex items-center gap-4 px-6 py-4 rounded-xl text-left transition-all duration-300 group ${isActive ? 'bg-white shadow-lg shadow-black/5 text-carmona-gold transform scale-105' : 'text-gray-500 hover:bg-white hover:text-gray-900'}`}
                                    >
                                        <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-carmona-gold/10' : 'bg-gray-200/50 group-hover:bg-gray-100'}`}>
                                            <Icon size={20} className={isActive ? 'text-carmona-gold' : 'text-gray-400 group-hover:text-gray-600'} />
                                        </div>
                                        <span className={`text-sm font-bold ${isActive ? 'translate-x-1' : ''} transition-transform`}>{item.label}</span>
                                        {isActive && <ChevronDown size={16} className="-rotate-90 ml-auto" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT CONTENT AREA - DYNAMIC */}
                    <div className="w-3/4 bg-white p-10 min-h-[600px] flex flex-col">

                        {/* HEADER OF SECTION */}
                        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 leading-none mb-2">
                                    {menuItems.find(i => i.id === activeCategory)?.label}
                                </h2>
                                <p className="text-gray-400 text-sm">Explora nuestra selección completa.</p>
                            </div>
                            <button onClick={closeUnifiedMenu} className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                                Cerrar <X size={16} />
                            </button>
                        </div>

                        <div className="flex-1 animate-in fade-in zoom-in-95 duration-300 key={activeCategory}">

                            {/* AUTOS NUEVOS */}
                            {activeCategory === 'nuevos' && (
                                <div className="grid grid-cols-6 gap-6">
                                    {BRAND_LOGOS.map((brand) => (
                                        <Link
                                            key={brand.name}
                                            href={`/nuevos/${brand.name.toLowerCase()}`}
                                            onClick={closeUnifiedMenu}
                                            className="group flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white hover:border-carmona-gold/30 hover:shadow-lg transition-all h-32"
                                        >
                                            <div className="relative w-full h-12 mb-3">
                                                <Image
                                                    src={brand.src}
                                                    alt={brand.name}
                                                    fill
                                                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-300 group-hover:text-gray-900 uppercase tracking-wider transition-colors">{brand.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* CAMIONES Y BUSES */}
                            {activeCategory === 'camiones' && (
                                <div className="grid grid-cols-4 gap-8">
                                    {TRUCK_LOGOS.map((brand) => (
                                        <Link
                                            key={brand.name}
                                            href={`/camiones/${brand.name.toLowerCase()}`}
                                            onClick={closeUnifiedMenu}
                                            className="group flex flex-col items-center justify-center p-8 rounded-2xl border border-gray-100 bg-white hover:border-carmona-gold hover:shadow-xl transition-all h-48"
                                        >
                                            <div className="relative w-full h-20 mb-4">
                                                <Image
                                                    src={brand.src}
                                                    alt={brand.name}
                                                    fill
                                                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-gray-400 group-hover:text-carmona-gold uppercase tracking-wider">{brand.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* SEMINUEVOS */}
                            {activeCategory === 'seminuevos' && (
                                <div className="h-full flex items-center justify-center gap-10 px-10">
                                    {/* Standard Seminuevos */}
                                    <a
                                        href="https://seminuevos.automotrizcarmona.cl/catalogo"
                                        onClick={closeUnifiedMenu}
                                        className="flex-1 group relative h-80 rounded-3xl border-2 border-dashed border-gray-200 hover:border-carmona-orange hover:bg-orange-50/10 flex flex-col items-center justify-center transition-all hover:scale-105"
                                    >
                                        <div className="relative w-64 h-24 mb-6">
                                            <Image
                                                src="/images/logos/SEMINUEVOS_Logo.png"
                                                alt="Carmona Seminuevos"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="text-gray-400 group-hover:text-carmona-orange font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                            Ver Catálogo <ArrowRight size={16} />
                                        </span>
                                    </a>

                                    {/* Premium Seminuevos */}
                                    <a
                                        href="https://seminuevos.automotrizcarmona.cl/catalogo?is_premium=1"
                                        onClick={closeUnifiedMenu}
                                        className="flex-1 group relative h-80 rounded-3xl bg-bruno-black border border-white/10 hover:border-carmona-gold hover:shadow-2xl hover:shadow-carmona-gold/20 flex flex-col items-center justify-center transition-all hover:scale-105 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                                        <div className="relative w-64 h-24 mb-6">
                                            <Image
                                                src="/images/logos/LOGO-UPREMIUM.png"
                                                alt="Carmona U-Premium"
                                                fill
                                                className="object-contain brightness-0 invert"
                                            />
                                        </div>
                                        <span className="text-white/50 group-hover:text-carmona-gold font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                            Alta Gama <Sparkles size={16} />
                                        </span>
                                    </a>
                                </div>
                            )}

                            {/* POSTVENTA */}
                            {activeCategory === 'postventa' && (
                                <div className="grid grid-cols-3 gap-8 pt-4">
                                    {/* Service */}
                                    <Link href="/servicios" onClick={closeUnifiedMenu} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 hover:shadow-xl transition-all">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                        <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/0 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                            <Wrench size={64} className="text-gray-300 group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-8 z-20">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-blue-600 rounded-lg text-white">
                                                    <Wrench size={18} />
                                                </div>
                                                <h3 className="text-white text-xl font-bold">Servicio Técnico</h3>
                                            </div>
                                            <p className="text-white/70 text-sm leading-relaxed">Agendan tu hora para mantenciones y reparaciones con expertos.</p>
                                        </div>
                                    </Link>

                                    {/* Repuestos */}
                                    <Link href="/repuestos" onClick={closeUnifiedMenu} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 hover:shadow-xl transition-all">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                        <Image
                                            src="/images/quick_access_repuestos_1770350949447.png"
                                            alt="Repuestos"
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute bottom-0 left-0 p-8 z-20">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-green-600 rounded-lg text-white">
                                                    <Settings size={18} />
                                                </div>
                                                <h3 className="text-white text-xl font-bold">Repuestos</h3>
                                            </div>
                                            <p className="text-white/70 text-sm leading-relaxed">Cotiza repuestos originales y accesorios para tu vehículo.</p>
                                        </div>
                                    </Link>

                                    {/* DyP */}
                                    <Link href="/dyp" onClick={closeUnifiedMenu} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 hover:shadow-xl transition-all">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                            <Car size={64} className="text-gray-300 group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-8 z-20">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-purple-600 rounded-lg text-white">
                                                    <Car size={18} />
                                                </div>
                                                <h3 className="text-white text-xl font-bold">Desabolladura y Pintura</h3>
                                            </div>
                                            <p className="text-white/70 text-sm leading-relaxed">Recupera la estética de tu auto con tecnología de punta.</p>
                                        </div>
                                    </Link>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>

            {/* Smart Assistant Overlay / Drawer */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={resetAssistant}
            />

            <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        {assistantView !== 'HOME' && searchIntent.type === 'NONE' && (
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
                                placeholder="Escribe aquí... (ej: 'Cotizar Toyota', 'Agendar Servicio')"
                                className={`w-full bg-white border-2 text-gray-900 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:shadow-xl transition-all text-lg ${searchIntent.type !== 'NONE' ? 'border-carmona-gold' : 'border-gray-100 focus:border-carmona-gold/50'}`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search size={22} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${searchIntent.type !== 'NONE' ? 'text-carmona-gold' : 'text-gray-400'}`} />
                        </div>
                        {searchIntent.type !== 'NONE' && (
                            <div className="px-2 pt-2 text-xs font-bold uppercase text-carmona-gold animate-in fade-in slide-in-from-top-1">
                                {searchIntent.type === 'QUOTE' && "🚀 Detectado: Interés de Compra"}
                                {searchIntent.type === 'SERVICE' && "🔧 Detectado: Solicitud de Servicio"}
                                {searchIntent.type === 'PARTS' && "⚙️ Detectado: Insumos y Repuestos"}
                                {searchIntent.type === 'BRAND_ONLY' && "🔍 Detectado: Búsqueda de Marca"}
                            </div>
                        )}
                    </div>

                    {/* DYNAMIC CONTENT BASED ON SEARCH INTENT */}
                    {searchIntent.type !== 'NONE' ? (
                        <div className="px-8 pb-8 animate-in slide-in-from-bottom-4 duration-300">

                            {/* --- QUOTE INTENT --- */}
                            {searchIntent.type === 'QUOTE' && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-extrabold text-gray-900">¿Quieres cotizar un auto?</h2>
                                    {searchIntent.brand ? (
                                        <Link
                                            href={`/nuevos/${searchIntent.brand.name.toLowerCase()}`}
                                            onClick={resetAssistant}
                                            className="block p-6 rounded-2xl bg-white border border-carmona-gold shadow-lg hover:shadow-xl transition-all group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-carmona-gold/10 rounded-xl">
                                                        <Car size={32} className="text-carmona-gold" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">Ir al Catálogo {searchIntent.brand.name}</h3>
                                                        <p className="text-sm text-gray-500">Ver modelos y precios disponibles</p>
                                                    </div>
                                                </div>
                                                <ArrowRight size={24} className="text-carmona-gold group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-3">
                                            {BRAND_LOGOS.slice(0, 8).map(brand => (
                                                <Link
                                                    key={brand.name}
                                                    href={`/nuevos/${brand.name.toLowerCase()}`}
                                                    onClick={resetAssistant}
                                                    className="p-4 bg-white rounded-xl border border-gray-100 hover:border-carmona-gold hover:shadow-md transition-all flex flex-col items-center gap-2"
                                                >
                                                    <div className="relative w-full h-8"><Image src={brand.src} alt={brand.name} fill className="object-contain" /></div>
                                                    <span className="text-xs font-bold text-gray-400">{brand.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* --- SERVICE INTENT --- */}
                            {searchIntent.type === 'SERVICE' && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-extrabold text-gray-900">Agenda tu Servicio Técnico</h2>
                                    {searchIntent.brand ? (
                                        <Link
                                            href={`/servicios?brand=${searchIntent.brand.name}`}
                                            onClick={resetAssistant}
                                            className="block p-6 rounded-2xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white/20 rounded-xl">
                                                        <Calendar size={32} className="text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold">Agendar hora para {searchIntent.brand.name}</h3>
                                                        <p className="text-sm text-white/80">Mantenciones y reparaciones certificadas</p>
                                                    </div>
                                                </div>
                                                <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    ) : (
                                        <>
                                            <p className="text-gray-500 mb-2">Por favor, selecciona la marca de tu vehículo:</p>
                                            <div className="grid grid-cols-2 gap-3">
                                                {BRAND_LOGOS.map((brand) => (
                                                    <Link
                                                        key={brand.name}
                                                        href={`/servicios?brand=${brand.name.toLowerCase()}`}
                                                        onClick={resetAssistant}
                                                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                                                    >
                                                        <div className="relative w-8 h-8 flex-shrink-0">
                                                            <Image src={brand.src} alt={brand.name} fill className="object-contain" />
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-600 group-hover:text-blue-700">{brand.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <a href="tel:+56912345678" className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-bold">
                                            <Phone size={16} /> ¿Prefieres llamar? +56 9 1234 5678
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* --- PARTS INTENT --- */}
                            {searchIntent.type === 'PARTS' && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-extrabold text-gray-900">Repuestos y Accesorios</h2>
                                    <Link
                                        href="/repuestos"
                                        onClick={resetAssistant}
                                        className="block p-6 rounded-2xl bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white/20 rounded-xl">
                                                    <Settings size={32} className="text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold">Cotizar Repuestos</h3>
                                                    <p className="text-sm text-white/80">Originales y alternativos garantizados</p>
                                                </div>
                                            </div>
                                            <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                </div>
                            )}

                            {/* --- BRAND ONLY or GENERAL --- */}
                            {(searchIntent.type === 'BRAND_ONLY' || searchIntent.type === 'GENERAL') && (
                                <div className="space-y-6">
                                    {searchIntent.brand && (
                                        <div className="bg-white p-4 rounded-xl border border-carmona-gold/30 shadow-sm mb-4">
                                            <div className="flex items-center gap-4 mb-3">
                                                <div className="relative w-16 h-10">
                                                    <Image src={searchIntent.brand.src} alt={searchIntent.brand.name} fill className="object-contain" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">{searchIntent.brand.name}</h3>
                                                    <p className="text-xs text-gray-500">Resultados encontrados</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Link href={`/nuevos/${searchIntent.brand.name.toLowerCase()}`} onClick={resetAssistant} className="px-3 py-2 bg-gray-50 text-gray-700 text-sm font-bold rounded-lg hover:bg-black hover:text-white transition-colors text-center">
                                                    Ver Modelos
                                                </Link>
                                                <Link href={`/servicios?brand=${searchIntent.brand.name.toLowerCase()}`} onClick={resetAssistant} className="px-3 py-2 bg-gray-50 text-gray-700 text-sm font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center">
                                                    Agendar Servicio
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Resultados Generales</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {/* Filter filtered brands if keyword match, or show popular if general */}
                                        {BRAND_LOGOS.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).map(brand => (
                                            <Link
                                                key={brand.name}
                                                href={`/nuevos/${brand.name.toLowerCase()}`}
                                                onClick={resetAssistant}
                                                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-carmona-gold hover:shadow-md transition-all"
                                            >
                                                <div className="relative w-8 h-8 flex-shrink-0">
                                                    <Image src={brand.src} alt={brand.name} fill className="object-contain" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-700">{brand.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    ) : (
                        // DEFAULT HOME VIEW (No Search)
                        assistantView === 'HOME' ? (
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
                                {/* BRAND SELECTION VIEW (Secondary Flow) */}
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
                        )
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
