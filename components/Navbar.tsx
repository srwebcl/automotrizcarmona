'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, ChevronDown, Menu, X, User, Calendar, Wrench, Settings, Truck, Car, ShoppingBag, ArrowRight, Search, ChevronLeft, Sparkles, LayoutGrid, Leaf, Bus, Grip, UserCheck, MessageSquare, Tag } from 'lucide-react';

const BRAND_LOGOS = [
    { name: "Toyota", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-toyota.webp", isHybrid: true },
    { name: "Volkswagen", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-vw.webp", isHybrid: false },
    { name: "Audi", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-audi.webp", isHybrid: true },
    { name: "Cupra", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-cupra.webp", isHybrid: true },
    { name: "Honda", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-honda.webp", isHybrid: true },
    { name: "BMW", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-bmw.webp", isHybrid: true },
    { name: "BMW Motorrad", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-bmw-motorrad.webp", isHybrid: false },
    { name: "Mini", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-mini.webp", isHybrid: true },
    { name: "Maxus", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-maxus.webp", isHybrid: false },
    { name: "Jetour", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-jetour.webp", isHybrid: false },
    { name: "Soueast", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-soueast.webp", isHybrid: false },
    { name: "Kaiyi", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-kaiyi.webp", isHybrid: false },
    { name: "Karry", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-karry.webp", isHybrid: false },
    { name: "Geely", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-geely.webp", isHybrid: true },
    { name: "MG", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-mg.webp", isHybrid: true },
    { name: "Dongfeng", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-dongfeng.webp", isHybrid: false },
    { name: "Foton", src: "https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-foton.webp", isHybrid: false },
];

const TRUCK_LOGOS = [
    { name: "Iveco", src: "/images/logos/logo-iveco.webp" },
    { name: "MAN", src: "/images/logos/logo-man.webp" },
    { name: "VW Camiones", src: "/images/logos/logo-vw-camiones.webp" },
    { name: "Maxus", src: "/images/logos/logo-maxus.webp" },
    { name: "Foton", src: "/images/logos/logo-foton-camiones.webp" },
];

type MenuCategory = 'nuevos' | 'camiones' | 'seminuevos' | 'postventa' | 'contacto';
type IntentType = 'QUOTE' | 'SERVICE' | 'PARTS' | 'TRUCKS' | 'USED' | 'LOCATION' | 'BRAND_ONLY' | 'GENERAL' | 'NONE';

interface SearchIntent {
    type: IntentType;
    brand: any | null;
    isTruck?: boolean;
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Unified Menu State
    const [isUnifiedMenuOpen, setIsUnifiedMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<MenuCategory>('nuevos');
    const [mobileActiveCategory, setMobileActiveCategory] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [assistantView, setAssistantView] = useState<'HOME' | 'NEW_CARS' | 'NEW_TRUCKS'>('HOME');
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
        if (isOpen) setIsOpen(false);
        if (!isUnifiedMenuOpen) {
            setActiveCategory('nuevos');
            setMobileActiveCategory('');
        }
    }

    const closeUnifiedMenu = () => {
        setIsUnifiedMenuOpen(false);
    }

    // Sidebar Items
    const menuItems = [
        { id: 'nuevos', label: 'Autos Nuevos', icon: Car },
        { id: 'camiones', label: 'Camiones y Buses', icon: Truck },
        { id: 'seminuevos', label: 'Autos Usados', icon: ShoppingBag },
        { id: 'postventa', label: 'Postventa', icon: Wrench },
        { id: 'contacto', label: 'Contacto', icon: MessageSquare },
    ];

    // --- SMART SEARCH LOGIC ---
    const searchIntent = useMemo((): SearchIntent => {
        if (!searchQuery) return { type: 'NONE', brand: null };

        const queryLower = searchQuery.toLowerCase();

        // 1. Check for specific truck brands first to avoid "Foton" double-match
        const detectedTruckBrand = TRUCK_LOGOS.find(b => queryLower.includes(b.name.toLowerCase()));
        const detectedCarBrand = BRAND_LOGOS.find(b => queryLower.includes(b.name.toLowerCase()));
        
        // Priority to truck if "camion" or "pesado" is in query
        const hasTruckKeyword = queryLower.match(/camion|bus|pesado|carga/);
        const detectedBrand = (hasTruckKeyword && detectedTruckBrand) ? detectedTruckBrand : (detectedCarBrand || detectedTruckBrand);
        const isTruck = detectedBrand === detectedTruckBrand;

        // Detect Intent Keywords
        if (queryLower.match(/serv|taller|agend|hora|mantenc|revis|cita/)) return { type: 'SERVICE', brand: detectedBrand, isTruck };
        if (queryLower.match(/repuesto|acc|part|pieza/)) return { type: 'PARTS', brand: detectedBrand, isTruck };
        if (queryLower.match(/cotiz|compr|nuevo|precio|valor|quiero un/)) return { type: 'QUOTE', brand: detectedBrand, isTruck };
        if (hasTruckKeyword) return { type: 'TRUCKS', brand: detectedBrand, isTruck: true };
        if (queryLower.match(/usado|semi|segunda/)) return { type: 'USED', brand: detectedBrand, isTruck };
        if (queryLower.match(/sucursal|donde|direcc|ubicac|mapa/)) return { type: 'LOCATION', brand: detectedBrand, isTruck };

        if (detectedBrand) return { type: 'BRAND_ONLY', brand: detectedBrand, isTruck };

        return { type: 'GENERAL', brand: null };
    }, [searchQuery]);

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bruno-black shadow-lg py-1' : 'bg-bruno-black/95 backdrop-blur-md py-3'}`}>

                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        <Link href="/" className="relative flex items-center gap-3 group z-50" onClick={closeUnifiedMenu}>
                            <div className="relative w-40 h-10 md:w-48 md:h-12 transition-all duration-300">
                                <Image
                                    src="/images/logo-carmona.avif"
                                    alt="Carmona Automotriz"
                                    width={192}
                                    height={48}
                                    className="object-contain object-left w-full h-full"
                                    priority
                                />
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center space-x-4">
                            <button
                                onClick={toggleUnifiedMenu}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors group ${isUnifiedMenuOpen ? 'bg-white/10 text-carmona-gold' : 'hover:bg-white/5 text-white'}`}
                            >
                                <div className={`p-1.5 rounded-md border transition-all ${isUnifiedMenuOpen ? 'border-carmona-gold bg-carmona-gold/10' : 'border-white/20 group-hover:border-white/40'}`}>
                                    {isUnifiedMenuOpen ? <X size={18} /> : <Menu size={18} />}
                                </div>
                                <span className="text-sm font-bold tracking-widest uppercase">Menú</span>
                            </button>

                            <div className="pl-4 border-l border-white/10">
                                <button
                                    onClick={() => {
                                        setIsOpen(true);
                                        closeUnifiedMenu();
                                    }}
                                    className="relative flex items-center gap-2 bg-gradient-to-r from-carmona-gold to-carmona-orange text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg hover:shadow-carmona-gold/30 transition-all transform hover:-translate-y-0.5 group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-shine" />
                                    <Sparkles size={18} className="text-white fill-white/20 animate-pulse" />
                                    <span className="uppercase tracking-wide text-xs relative z-10">¿Te Ayudo?</span>
                                </button>
                            </div>
                        </div>

                        <div className="lg:hidden flex items-center gap-3">
                            {/* Unified Menu Toggle (Mobile) - Icon Only */}
                            <button
                                onClick={toggleUnifiedMenu}
                                className={`w-11 h-11 flex items-center justify-center rounded-2xl border transition-all ${isUnifiedMenuOpen ? 'bg-white text-black border-white' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                            >
                                {isUnifiedMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>

                            {/* Assistant Toggle (Mobile) - Icon Only Square */}
                            <button
                                onClick={() => {
                                    setIsOpen(true);
                                    closeUnifiedMenu();
                                }}
                                className="w-11 h-11 flex items-center justify-center bg-gradient-to-r from-carmona-gold to-carmona-orange text-white rounded-2xl border border-white/10 shadow-lg shadow-carmona-gold/20 active:scale-95 transition-all"
                            >
                                <Sparkles size={20} className="fill-white/20 animate-pulse" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[40] transition-opacity duration-300 ${isUnifiedMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeUnifiedMenu}
            />

            <div className={`fixed top-0 left-0 w-full bg-white z-[45] shadow-2xl transform transition-transform duration-500 ease-in-out ${isUnifiedMenuOpen ? 'translate-y-[70px]' : '-translate-y-full'}`}>
                {/* DESKTOP VERSION */}
                <div className="hidden lg:flex max-w-[1920px] mx-auto min-h-[500px]">
                    <div className="w-1/4 bg-gray-50 border-r border-gray-100 flex flex-col pt-10 p-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-4">Categorías</h3>
                        <div className="flex flex-col gap-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeCategory === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onMouseEnter={() => setActiveCategory(item.id as MenuCategory)}
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

                    <div className="w-3/4 bg-white pt-10 p-10 min-h-[600px] flex flex-col">
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

                        <div className="flex-1 animate-in fade-in zoom-in-95 duration-300">
                            {activeCategory === 'nuevos' && (
                                <div className="grid grid-cols-6 gap-6">
                                    {BRAND_LOGOS.map((brand) => (
                                        <Link
                                            key={brand.name}
                                            href={`/nuevos/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={closeUnifiedMenu}
                                            className="group flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white hover:border-carmona-gold/30 hover:shadow-lg transition-all h-32"
                                        >
                                            <div className="relative w-full h-12 mb-3">
                                                <Image src={brand.src} alt={brand.name} fill className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100" />
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-300 group-hover:text-gray-900 uppercase tracking-wider transition-colors">{brand.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {activeCategory === 'camiones' && (
                                <div className="grid grid-cols-4 gap-8">
                                    {TRUCK_LOGOS.map((brand) => (
                                        <Link
                                            key={brand.name}
                                            href={`/camiones/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={closeUnifiedMenu}
                                            className="group flex flex-col items-center justify-center p-8 rounded-2xl border border-gray-100 bg-white hover:border-carmona-gold hover:shadow-xl transition-all h-48"
                                        >
                                            <div className="relative w-full h-20 mb-4">
                                                <Image src={brand.src} alt={brand.name} fill className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                                            </div>
                                            <span className="text-xs font-bold text-gray-400 group-hover:text-carmona-gold uppercase tracking-wider">{brand.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {activeCategory === 'seminuevos' && (
                                <div className="h-full flex items-center justify-center gap-10 px-10">
                                    <a
                                        href="https://seminuevos.automotrizcarmona.cl/"
                                        onClick={closeUnifiedMenu}
                                        target="_blank" rel="noopener noreferrer"
                                        className="flex-1 group relative h-80 rounded-3xl border-2 border-dashed border-gray-200 hover:border-carmona-orange hover:bg-orange-50/10 flex flex-col items-center justify-center transition-all hover:scale-105"
                                    >
                                        <div className="relative w-64 h-24 mb-6">
                                            <Image src="/images/logos/logos antiguos/SEMINUEVOS_Logo.png" alt="Carmona Seminuevos" fill className="object-contain" />
                                        </div>
                                        <span className="text-gray-400 group-hover:text-carmona-orange font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                            Ver Catálogo <ArrowRight size={16} />
                                        </span>
                                    </a>

                                    <a
                                        href="https://seminuevos.automotrizcarmona.cl/catalogo?is_premium=1"
                                        onClick={closeUnifiedMenu}
                                        target="_blank" rel="noopener noreferrer"
                                        className="flex-1 group relative h-80 rounded-3xl bg-bruno-black border border-white/10 hover:border-carmona-gold hover:shadow-2xl hover:shadow-carmona-gold/20 flex flex-col items-center justify-center transition-all hover:scale-105 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                                        <div className="relative w-64 h-24 mb-6">
                                            <Image src="/images/logos/logos antiguos/LOGO-UPREMIUM.png" alt="Carmona U-Premium" fill className="object-contain brightness-0 invert" />
                                        </div>
                                        <span className="text-white/50 group-hover:text-carmona-gold font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                            Alta Gama <Sparkles size={16} />
                                        </span>
                                    </a>
                                </div>
                            )}

                            {activeCategory === 'postventa' && (
                                <div className="grid grid-cols-3 gap-8 pt-4">
                                    <Link href="/servicios" onClick={closeUnifiedMenu} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 hover:shadow-xl transition-all border border-gray-100">
                                        <div className="absolute inset-0 bg-white/50 group-hover:bg-transparent transition-colors z-10" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 group-hover:bg-blue-600/5 transition-colors">
                                            <Wrench size={64} className="text-gray-200 group-hover:text-blue-600/20 group-hover:scale-110 transition-all duration-500" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-white via-white/90 to-transparent">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md shadow-blue-600/30">
                                                    <Wrench size={18} />
                                                </div>
                                                <h3 className="text-gray-900 text-xl font-extrabold tracking-tight">Servicio Técnico</h3>
                                            </div>
                                            <p className="text-gray-500 text-sm leading-relaxed font-medium">Agenda tu hora para mantenciones y reparaciones con expertos.</p>
                                        </div>
                                    </Link>
                                    <Link href="/repuestos" onClick={closeUnifiedMenu} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 hover:shadow-xl transition-all border border-gray-100">
                                        <div className="absolute inset-0 bg-white/50 group-hover:bg-transparent transition-colors z-10" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 group-hover:bg-green-600/5 transition-colors">
                                            <Settings size={64} className="text-gray-200 group-hover:text-green-600/20 group-hover:scale-110 transition-all duration-500" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-white via-white/90 to-transparent">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-green-600 rounded-lg text-white shadow-md shadow-green-600/30">
                                                    <Settings size={18} />
                                                </div>
                                                <h3 className="text-gray-900 text-xl font-extrabold tracking-tight">Repuestos</h3>
                                            </div>
                                            <p className="text-gray-500 text-sm leading-relaxed font-medium">Cotiza repuestos originales y accesorios para tu vehículo.</p>
                                        </div>
                                    </Link>
                                    <Link href="/dyp" onClick={closeUnifiedMenu} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 hover:shadow-xl transition-all border border-gray-100">
                                        <div className="absolute inset-0 bg-white/50 group-hover:bg-transparent transition-colors z-10" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 group-hover:bg-purple-600/5 transition-colors">
                                            <Car size={64} className="text-gray-200 group-hover:text-purple-600/20 group-hover:scale-110 transition-all duration-500" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-white via-white/90 to-transparent">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-purple-600 rounded-lg text-white shadow-md shadow-purple-600/30">
                                                    <Car size={18} />
                                                </div>
                                                <h3 className="text-gray-900 text-xl font-extrabold tracking-tight">Desabolladura y Pintura</h3>
                                            </div>
                                            <p className="text-gray-500 text-sm leading-relaxed font-medium">Recupera la estética de tu auto con tecnología de punta.</p>
                                        </div>
                                    </Link>
                                </div>
                            )}

                            {activeCategory === 'contacto' && (
                                <div className="grid grid-cols-3 gap-8 pt-4">
                                    <Link href="/sucursales" onClick={closeUnifiedMenu} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 hover:shadow-xl transition-all border border-gray-100">
                                        <div className="absolute inset-0 bg-white/50 group-hover:bg-transparent transition-colors z-10" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 group-hover:bg-carmona-orange/5 transition-colors">
                                            <MapPin size={64} className="text-gray-200 group-hover:text-carmona-orange/20 group-hover:scale-110 transition-all duration-500" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-white via-white/90 to-transparent">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-carmona-gold rounded-lg text-white shadow-md shadow-carmona-gold/30">
                                                    <MapPin size={18} />
                                                </div>
                                                <h3 className="text-gray-900 text-xl font-extrabold tracking-tight">Sucursales</h3>
                                            </div>
                                            <p className="text-gray-500 text-sm leading-relaxed font-medium">Encuentra tu sucursal o taller Carmona más cercano en la región.</p>
                                        </div>
                                    </Link>
                                    <Link href="/contacto" onClick={closeUnifiedMenu} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 hover:shadow-xl transition-all border border-gray-100">
                                        <div className="absolute inset-0 bg-white/50 group-hover:bg-transparent transition-colors z-10" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 group-hover:bg-carmona-orange/5 transition-colors">
                                            <Phone size={64} className="text-gray-200 group-hover:text-carmona-orange/20 group-hover:scale-110 transition-all duration-500" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-white via-white/90 to-transparent">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-bruno-black rounded-lg text-white shadow-md">
                                                    <Phone size={18} />
                                                </div>
                                                <h3 className="text-gray-900 text-xl font-extrabold tracking-tight">Contáctanos</h3>
                                            </div>
                                            <p className="text-gray-500 text-sm leading-relaxed font-medium">Llámanos, escríbenos o chatea con un asesor por WhatsApp.</p>
                                        </div>
                                    </Link>
                                    <Link href="/reclamos" onClick={closeUnifiedMenu} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 hover:shadow-xl transition-all border border-gray-100">
                                        <div className="absolute inset-0 bg-white/50 group-hover:bg-transparent transition-colors z-10" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 group-hover:bg-blue-600/5 transition-colors">
                                            <User size={64} className="text-gray-200 group-hover:text-blue-600/20 group-hover:scale-110 transition-all duration-500" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-white via-white/90 to-transparent">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md shadow-blue-600/30">
                                                    <MessageSquare size={18} />
                                                </div>
                                                <h3 className="text-gray-900 text-xl font-extrabold tracking-tight">Sugerencias y Reclamos</h3>
                                            </div>
                                            <p className="text-gray-500 text-sm leading-relaxed font-medium">Ayúdanos a mejorar contándonos tu experiencia con nosotros.</p>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* MOBILE MEGA MENU (Accordion Pro Layout) */}
                <div className="lg:hidden w-full h-[calc(100vh-70px)] bg-white overflow-y-auto pb-24">
                    <div className="flex flex-col">
                        
                        {/* 1. AUTOS NUEVOS */}
                        <div className="border-b border-gray-100">
                            <button 
                                onClick={() => setMobileActiveCategory(mobileActiveCategory === 'nuevos' ? '' : 'nuevos')}
                                className="w-full flex items-center justify-between p-7 active:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`p-3 rounded-2xl transition-colors ${mobileActiveCategory === 'nuevos' ? 'bg-carmona-gold text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <Car size={24} />
                                    </div>
                                    <span className={`text-lg font-black uppercase tracking-tight ${mobileActiveCategory === 'nuevos' ? 'text-gray-900' : 'text-gray-500'}`}>Autos Nuevos</span>
                                </div>
                                <ChevronDown size={20} className={`text-gray-300 transition-transform duration-300 ${mobileActiveCategory === 'nuevos' ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-500 ${mobileActiveCategory === 'nuevos' ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 pt-0 grid grid-cols-2 gap-3 pb-8">
                                    {BRAND_LOGOS.map((brand) => (
                                        <Link 
                                            key={brand.name} 
                                            href={`/nuevos/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={closeUnifiedMenu}
                                            className="flex flex-col items-center justify-center p-5 rounded-[1.5rem] bg-gray-50 active:scale-95 transition-all gap-2"
                                        >
                                            <div className="relative w-full h-8">
                                                <Image src={brand.src} alt={brand.name} fill className="object-contain grayscale active:grayscale-0" />
                                            </div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none text-center">{brand.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 2. CAMIONES Y BUSES */}
                        <div className="border-b border-gray-100">
                            <button 
                                onClick={() => setMobileActiveCategory(mobileActiveCategory === 'camiones' ? '' : 'camiones')}
                                className="w-full flex items-center justify-between p-7 active:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`p-3 rounded-2xl transition-colors ${mobileActiveCategory === 'camiones' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <Truck size={24} />
                                    </div>
                                    <span className={`text-lg font-black uppercase tracking-tight ${mobileActiveCategory === 'camiones' ? 'text-gray-900' : 'text-gray-500'}`}>Camiones y Buses</span>
                                </div>
                                <ChevronDown size={20} className={`text-gray-300 transition-transform duration-300 ${mobileActiveCategory === 'camiones' ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-500 ${mobileActiveCategory === 'camiones' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 pt-0 grid grid-cols-2 gap-3 pb-8">
                                    {TRUCK_LOGOS.map((brand) => (
                                        <Link 
                                            key={brand.name} 
                                            href={`/camiones/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={closeUnifiedMenu}
                                            className="flex flex-col items-center justify-center p-5 rounded-[1.5rem] bg-gray-50 active:scale-95 transition-all gap-2"
                                        >
                                            <div className="relative w-full h-8">
                                                <Image src={brand.src} alt={brand.name} fill className="object-contain grayscale active:grayscale-0" />
                                            </div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none text-center">{brand.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3. AUTOS USADOS */}
                        <div className="border-b border-gray-100">
                            <button 
                                onClick={() => setMobileActiveCategory(mobileActiveCategory === 'seminuevos' ? '' : 'seminuevos')}
                                className="w-full flex items-center justify-between p-7 active:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`p-3 rounded-2xl transition-colors ${mobileActiveCategory === 'seminuevos' ? 'bg-bruno-black text-carmona-gold shadow-lg shadow-black/10' : 'bg-gray-100 text-gray-500'}`}>
                                        <ShoppingBag size={24} />
                                    </div>
                                    <span className={`text-lg font-black uppercase tracking-tight ${mobileActiveCategory === 'seminuevos' ? 'text-gray-900' : 'text-gray-500'}`}>Autos Usados</span>
                                </div>
                                <ChevronDown size={20} className={`text-gray-300 transition-transform duration-300 ${mobileActiveCategory === 'seminuevos' ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-500 ${mobileActiveCategory === 'seminuevos' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 pt-0 space-y-4 pb-8">
                                    <a 
                                        href="https://seminuevos.automotrizcarmona.cl/" 
                                        target="_blank" rel="noopener noreferrer"
                                        onClick={closeUnifiedMenu}
                                        className="flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-dashed border-gray-100 bg-gray-50/30 active:scale-95 transition-all gap-4"
                                    >
                                        <div className="relative w-48 h-12">
                                            <Image src="/images/logos/logos antiguos/SEMINUEVOS_Logo.png" alt="Seminuevos Standard" fill className="object-contain" />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Ver Catálogo Multimarca</span>
                                    </a>

                                    <a 
                                        href="https://seminuevos.automotrizcarmona.cl/catalogo?is_premium=1" 
                                        target="_blank" rel="noopener noreferrer"
                                        onClick={closeUnifiedMenu}
                                        className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-bruno-black active:scale-95 transition-all gap-4 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                        <div className="relative w-48 h-12">
                                            <Image src="/images/logos/logos antiguos/LOGO-UPREMIUM.png" alt="U-Premium" fill className="object-contain brightness-0 invert" />
                                        </div>
                                        <span className="text-[10px] font-black text-carmona-gold uppercase tracking-[0.2em] relative z-10 text-center">Selección Alta Gama</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* 4. POSTVENTA */}
                        <div className="border-b border-gray-100">
                            <button 
                                onClick={() => setMobileActiveCategory(mobileActiveCategory === 'postventa' ? '' : 'postventa')}
                                className="w-full flex items-center justify-between p-7 active:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`p-3 rounded-2xl transition-colors ${mobileActiveCategory === 'postventa' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <Wrench size={24} />
                                    </div>
                                    <span className={`text-lg font-black uppercase tracking-tight ${mobileActiveCategory === 'postventa' ? 'text-gray-900' : 'text-gray-500'}`}>Postventa</span>
                                </div>
                                <ChevronDown size={20} className={`text-gray-300 transition-transform duration-300 ${mobileActiveCategory === 'postventa' ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-500 ${mobileActiveCategory === 'postventa' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 pt-0 space-y-3 pb-8">
                                    <Link href="/servicios" onClick={closeUnifiedMenu} className="flex items-center gap-4 p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50 active:bg-blue-100 transition-colors">
                                        <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md shadow-blue-600/20"><Wrench size={18} /></div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-black uppercase text-gray-900">Servicio Técnico</h4>
                                            <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest">Agendar Mantención</p>
                                        </div>
                                        <ArrowRight size={16} className="text-blue-200" />
                                    </Link>
                                    
                                    <Link href="/repuestos" onClick={closeUnifiedMenu} className="flex items-center gap-4 p-5 rounded-2xl bg-green-50/50 border border-green-100/50 active:bg-green-100 transition-colors">
                                        <div className="p-2 bg-green-600 rounded-lg text-white shadow-md shadow-green-600/20"><Settings size={18} /></div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-black uppercase text-gray-900">Repuestos</h4>
                                            <p className="text-[9px] text-green-600 font-bold uppercase tracking-widest">Cotizar Repuestos</p>
                                        </div>
                                        <ArrowRight size={16} className="text-green-200" />
                                    </Link>

                                    <Link href="/dyp" onClick={closeUnifiedMenu} className="flex items-center gap-4 p-5 rounded-2xl bg-purple-50/50 border border-purple-100/50 active:bg-purple-100 transition-colors">
                                        <div className="p-2 bg-purple-600 rounded-lg text-white shadow-md shadow-purple-600/20"><Car size={18} /></div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-black uppercase text-gray-900">Desabolladura y Pintura</h4>
                                            <p className="text-[9px] text-purple-600 font-bold uppercase tracking-widest">Recuperación Estética</p>
                                        </div>
                                        <ArrowRight size={16} className="text-purple-200" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* 5. CONTACTO */}
                        <div className="border-b border-gray-100">
                             <button 
                                onClick={() => setMobileActiveCategory(mobileActiveCategory === 'contacto' ? '' : 'contacto')}
                                className="w-full flex items-center justify-between p-7 active:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`p-3 rounded-2xl transition-colors ${mobileActiveCategory === 'contacto' ? 'bg-bruno-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <MessageSquare size={24} />
                                    </div>
                                    <span className={`text-lg font-black uppercase tracking-tight ${mobileActiveCategory === 'contacto' ? 'text-gray-900' : 'text-gray-500'}`}>Contacto</span>
                                </div>
                                <ChevronDown size={20} className={`text-gray-300 transition-transform duration-300 ${mobileActiveCategory === 'contacto' ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-500 ${mobileActiveCategory === 'contacto' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 pt-0 space-y-3 pb-8">
                                    <Link href="/sucursales" onClick={closeUnifiedMenu} className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-gray-50 border border-gray-100 active:bg-gray-100">
                                        <div className="p-2 bg-carmona-gold rounded-lg text-white"><MapPin size={18} /></div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-black uppercase text-gray-900">Sucursales</h4>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Ubicaciones y Horarios</p>
                                        </div>
                                    </Link>
                                    <Link href="/contacto" onClick={closeUnifiedMenu} className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-gray-50 border border-gray-100 active:bg-gray-100">
                                        <div className="p-2 bg-bruno-black rounded-lg text-white"><Phone size={18} /></div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-black uppercase text-gray-900">Canales Directos</h4>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">WhatsApp y Teléfono</p>
                                        </div>
                                    </Link>
                                    <Link href="/reclamos" onClick={closeUnifiedMenu} className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-gray-50 border border-gray-100 active:bg-gray-100">
                                        <div className="p-2 bg-blue-600 rounded-lg text-white"><User size={18} /></div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-black uppercase text-gray-900">Sugerencias y Reclamos</h4>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Cuéntanos tu experiencia</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Removed Direct Call Footer for cleaner mobile UI */}
                    <div className="pb-12" />
                </div>
            </div>

            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={resetAssistant}
            />

            <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        {assistantView !== 'HOME' && searchIntent.type === 'NONE' && (
                            <button onClick={() => setAssistantView('HOME')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors group">
                                <ChevronLeft size={24} className="text-gray-400 group-hover:text-carmona-gold" />
                            </button>
                        )}
                        <span className="text-carmona-gold font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                            <Sparkles size={14} /> Asistente Inteligente
                        </span>
                    </div>
                    <button onClick={resetAssistant} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} className="text-gray-900" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50/50">
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
                                {searchIntent.type === 'TRUCKS' && "🚛 Detectado: Camiones y Buses"}
                                {searchIntent.type === 'USED' && "🚗 Detectado: Autos Seminuevos"}
                                {searchIntent.type === 'LOCATION' && "📍 Detectado: Sucursales y Ubicación"}
                                {searchIntent.type === 'BRAND_ONLY' && "🔍 Detectado: Búsqueda de Marca"}
                            </div>
                        )}
                    </div>

                    {searchIntent.type !== 'NONE' ? (
                        <div className="px-8 pb-8 animate-in slide-in-from-bottom-4 duration-300">
                            {searchIntent.type === 'QUOTE' && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-extrabold text-gray-900">¿Quieres cotizar un auto?</h2>
                                    {searchIntent.brand ? (
                                        <Link href={`/nuevos/${searchIntent.brand.name.toLowerCase().replace(/\s+/g, '-')}`} onClick={resetAssistant} className="block p-6 rounded-2xl bg-white border border-carmona-gold shadow-lg hover:shadow-xl transition-all group">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-carmona-gold/10 rounded-xl"><Car size={32} className="text-carmona-gold" /></div>
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
                                                <Link key={brand.name} href={`/nuevos/${brand.name.toLowerCase().replace(/\s+/g, '-')}`} onClick={resetAssistant} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-carmona-gold hover:shadow-md transition-all flex flex-col items-center gap-2">
                                                    <div className="relative w-full h-8"><Image src={brand.src} alt={brand.name} fill className="object-contain" /></div>
                                                    <span className="text-xs font-bold text-gray-400">{brand.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {searchIntent.type === 'SERVICE' && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-extrabold text-gray-900">Agenda tu Servicio Técnico</h2>
                                    {searchIntent.brand ? (
                                        <Link href={`/servicios/agendar?marca=${encodeURIComponent(searchIntent.brand.name)}`} onClick={resetAssistant} className="block p-6 rounded-2xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all group">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white/20 rounded-xl"><Calendar size={32} className="text-white" /></div>
                                                    <div>
                                                        <h3 className="text-lg font-bold">Agendar hora para {searchIntent.brand.name}</h3>
                                                        <p className="text-sm text-white/80">Mantenciones y reparaciones certificadas</p>
                                                    </div>
                                                </div>
                                                <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-3">
                                            {BRAND_LOGOS.map((brand) => (
                                                <Link key={brand.name} href={`/servicios/agendar?marca=${encodeURIComponent(brand.name)}`} onClick={resetAssistant} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                                                    <div className="relative w-8 h-8 flex-shrink-0"><Image src={brand.src} alt={brand.name} fill className="object-contain" /></div>
                                                    <span className="text-sm font-bold text-gray-600 group-hover:text-blue-700">{brand.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {searchIntent.type === 'PARTS' && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-extrabold text-gray-900">Repuestos y Accesorios</h2>
                                    <Link href="/repuestos" onClick={resetAssistant} className="block p-6 rounded-2xl bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white/20 rounded-xl"><Settings size={32} className="text-white" /></div>
                                                <div><h3 className="text-lg font-bold">Cotizar Repuestos</h3><p className="text-sm text-white/80">Originales y alternativos garantizados</p></div>
                                            </div>
                                            <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                </div>
                            )}

                            {(searchIntent.type === 'BRAND_ONLY' || searchIntent.type === 'TRUCKS' || searchIntent.type === 'LOCATION' || searchIntent.type === 'USED' || searchIntent.type === 'GENERAL') && (
                                <div className="space-y-6">
                                    {searchIntent.brand && (
                                        <div className="bg-white p-4 rounded-xl border border-carmona-gold/30 shadow-sm mb-4">
                                            <div className="flex items-center gap-4 mb-3">
                                                <div className="relative w-16 h-10"><Image src={searchIntent.brand.src} alt={searchIntent.brand.name} fill className="object-contain" /></div>
                                                <div><h3 className="text-lg font-bold text-gray-900">{searchIntent.brand.name}</h3><p className="text-xs text-gray-500">Resultados encontrados</p></div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Link href={`${searchIntent.isTruck ? '/camiones' : '/nuevos'}/${searchIntent.brand.name.toLowerCase().replace(/\s+/g, '-')}`} onClick={resetAssistant} className="px-3 py-2 bg-gray-50 text-gray-700 text-sm font-bold rounded-lg hover:bg-black hover:text-white transition-colors text-center">Ver Modelos</Link>
                                                <Link href={`/servicios/agendar?marca=${encodeURIComponent(searchIntent.brand.name)}`} onClick={resetAssistant} className="px-3 py-2 bg-gray-50 text-gray-700 text-sm font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center">Agendar Servicio</Link>
                                            </div>
                                        </div>
                                    )}

                                    {searchIntent.type === 'USED' && (
                                        <a href="https://seminuevos.automotrizcarmona.cl/" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl bg-gradient-to-r from-carmona-orange to-orange-600 text-white shadow-lg hover:shadow-xl transition-all group">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white/20 rounded-xl"><ShoppingBag size={32} /></div>
                                                    <div><h3 className="text-lg font-bold">Ver Seminuevos</h3><p className="text-sm text-white/80">Explora nuestro stock de usados garantizados</p></div>
                                                </div>
                                                <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </a>
                                    )}

                                    {searchIntent.type === 'LOCATION' && (
                                        <Link href="/sucursales" onClick={resetAssistant} className="block p-6 rounded-2xl bg-bruno-black text-white shadow-lg hover:bg-gray-900 transition-all group">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white/10 rounded-xl"><MapPin size={32} className="text-carmona-gold" /></div>
                                                    <div><h3 className="text-lg font-bold">Nuestras Sucursales</h3><p className="text-sm text-gray-400">Direcciones, teléfonos y horarios</p></div>
                                                </div>
                                                <ArrowRight size={24} className="text-carmona-gold group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    )}

                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Otras Opciones</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[...BRAND_LOGOS, ...TRUCK_LOGOS].filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 10).map((brand, idx) => (
                                            <Link key={`${brand.name}-${idx}`} href={`${TRUCK_LOGOS.some(t => t.name === brand.name) ? '/camiones' : '/nuevos'}/${brand.name.toLowerCase().replace(/\s+/g, '-')}`} onClick={resetAssistant} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-carmona-gold hover:shadow-md transition-all">
                                                <div className="relative w-8 h-8 flex-shrink-0"><Image src={brand.src} alt={brand.name} fill className="object-contain" /></div>
                                                <span className="text-sm font-bold text-gray-700">{brand.name}</span>
                                            </Link>
                                        ))}
                                        {[...BRAND_LOGOS, ...TRUCK_LOGOS].filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                            <div className="col-span-2 text-center py-8">
                                                <p className="text-gray-400">No encontramos resultados exactos...</p>
                                                <button onClick={() => setSearchQuery('')} className="mt-2 text-carmona-gold font-bold text-sm">Ver todas las opciones</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        assistantView === 'HOME' ? (
                            <div className="px-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">¿Cómo te ayudamos?</h2>
                                <p className="text-gray-500 mb-8">Selecciona una categoría o usa el buscador.</p>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <button onClick={() => setAssistantView('NEW_CARS')} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-carmona-gold hover:shadow-lg transition-all group">
                                        <div className="p-3 bg-carmona-gold/10 rounded-xl mb-3 text-carmona-gold"><Car size={32} /></div>
                                        <span className="text-sm font-bold text-gray-900">Autos Nuevos</span>
                                    </button>
                                    <button onClick={() => setAssistantView('NEW_TRUCKS')} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-carmona-gold hover:shadow-lg transition-all group">
                                        <div className="p-3 bg-blue-50/50 rounded-xl mb-3 text-blue-600"><Truck size={32} /></div>
                                        <span className="text-sm font-bold text-gray-900">Camiones y Buses</span>
                                    </button>
                                    <a href="https://seminuevos.automotrizcarmona.cl/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-carmona-orange hover:shadow-lg transition-all group">
                                        <div className="p-3 bg-carmona-orange/10 rounded-xl mb-3 text-carmona-orange"><ShoppingBag size={32} /></div>
                                        <span className="text-sm font-bold text-gray-900">Seminuevos</span>
                                    </a>
                                    <Link href="/servicios" onClick={resetAssistant} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-600 hover:shadow-lg transition-all group">
                                        <div className="p-3 bg-blue-50 rounded-xl mb-3 text-blue-600"><Wrench size={32} /></div>
                                        <span className="text-sm font-bold text-gray-900">Servicio Técnico</span>
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    <Link href="/repuestos" onClick={resetAssistant} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                                        <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Settings size={20} /></div>
                                        <span className="text-sm font-bold text-gray-700">Cotizar Repuestos</span>
                                        <ArrowRight size={16} className="ml-auto text-gray-300" />
                                    </Link>
                                    <Link href="/sucursales" onClick={resetAssistant} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><MapPin size={20} /></div>
                                        <span className="text-sm font-bold text-gray-700">Nuestras Sucursales</span>
                                        <ArrowRight size={16} className="ml-auto text-gray-300" />
                                    </Link>
                                    <Link href="/contacto" onClick={resetAssistant} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                                        <div className="p-2 bg-gray-100 text-gray-600 rounded-lg"><Phone size={20} /></div>
                                        <span className="text-sm font-bold text-gray-700">Contacto Directo</span>
                                        <ArrowRight size={16} className="ml-auto text-gray-300" />
                                    </Link>
                                </div>
                            </div>
                        ) : assistantView === 'NEW_CARS' ? (
                            <div className="px-8 pb-8 animate-in slide-in-from-right-8 duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <button onClick={() => setAssistantView('HOME')} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><ChevronLeft size={20} /></button>
                                    <h2 className="text-2xl font-extrabold text-gray-900">Autos Nuevos</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {BRAND_LOGOS.map((brand) => (
                                        <Link key={brand.name} href={`/nuevos/${brand.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-100 hover:border-carmona-gold hover:shadow-lg transition-all group" onClick={resetAssistant}>
                                            <div className="relative w-full h-12 mb-2"><Image src={brand.src} alt={brand.name} fill className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" /></div>
                                            <span className="text-sm font-bold text-gray-400 group-hover:text-gray-900">{brand.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="px-8 pb-8 animate-in slide-in-from-right-8 duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <button onClick={() => setAssistantView('HOME')} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><ChevronLeft size={20} /></button>
                                    <h2 className="text-2xl font-extrabold text-gray-900">Camiones y Buses</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {TRUCK_LOGOS.map((brand) => (
                                        <Link key={brand.name} href={`/camiones/${brand.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-600 hover:shadow-lg transition-all group" onClick={resetAssistant}>
                                            <div className="relative w-full h-12 mb-2"><Image src={brand.src} alt={brand.name} fill className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" /></div>
                                            <span className="text-sm font-bold text-gray-400 group-hover:text-gray-900">{brand.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>

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
