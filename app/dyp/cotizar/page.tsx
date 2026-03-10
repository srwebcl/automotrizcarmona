'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    CheckCircle, MapPin, Mail, Phone, MessageCircle,
    ChevronDown, ArrowLeft, ArrowRight, User, Car, ClipboardList, Search,
} from 'lucide-react';

// ─── Brands ───────────────────────────────────────────────────────────────────
const ALL_BRANDS = [
    { name: 'Toyota', src: '/images/logos/logo-toyota.webp' },
    { name: 'Volkswagen', src: '/images/logos/logo-vw.webp' },
    { name: 'Audi', src: '/images/logos/logo-audi.webp' },
    { name: 'Seat', src: '/images/logos/logo-seat.webp' },
    { name: 'Cupra', src: '/images/logos/logo-cupra.webp' },
    { name: 'Honda', src: '/images/logos/logo-honda.webp' },
    { name: 'BMW', src: '/images/logos/logo-bmw.webp' },
    { name: 'BMW Motorrad', src: '/images/logos/logo-bmw-motorrad.webp' },
    { name: 'Mini', src: '/images/logos/logo-mini.webp' },
    { name: 'Maxus', src: '/images/logos/logo-maxus.webp' },
    { name: 'Jetour', src: '/images/logos/logo-jetour.webp' },
    { name: 'Kaiyi', src: '/images/logos/logo-kaiyi.webp' },
    { name: 'Karry', src: '/images/logos/logo-karry.webp' },
    { name: 'Geely', src: '/images/logos/logo-geely.webp' },
    { name: 'MG', src: '/images/logos/logo-mg.webp' },
    { name: 'Dongfeng', src: '/images/logos/logo-dongfeng.webp' },
    { name: 'Foton', src: '/images/logos/logo-foton.webp' },
    { name: 'VW Camiones', src: '/images/logos/logo-vw-camiones.webp' },
    { name: 'Foton Camiones', src: '/images/logos/logo-foton-camiones.webp' },
    { name: 'Iveco', src: '/images/logos/logo-iveco.webp' },
    { name: 'MAN', src: '/images/logos/logo-man.webp' },
];

// ─── Modelos por marca ────────────────────────────────────────────────────────
const MODELS_BY_BRAND: Record<string, string[]> = {
    'Toyota': ['Corolla', 'Corolla Cross', 'Hilux', 'Hilux SW4', 'RAV4', 'Yaris', 'Yaris Cross', 'Land Cruiser', 'Land Cruiser Prado', 'Fortuner', 'Camry', 'GR86', 'bZ4X', 'Rush', 'Wigo'],
    'Volkswagen': ['Golf', 'Polo', 'Vento', 'Tiguan', 'Taos', 'T-Cross', 'Amarok', 'Passat', 'Touareg', 'ID.4', 'ID.3', 'Touran'],
    'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'TT', 'RS3', 'RS6'],
    'Seat': ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco', 'Formentor', 'Mii'],
    'Cupra': ['Formentor', 'Born', 'Leon', 'Ateca'],
    'Honda': ['Civic', 'City', 'HR-V', 'CR-V', 'BR-V', 'Accord', 'Jazz', 'CB500F', 'CB500X', 'CB650R', 'CBR650R', 'Africa Twin'],
    'BMW': ['Serie 1', 'Serie 2', 'Serie 3', 'Serie 4', 'Serie 5', 'Serie 7', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'M2', 'M3', 'M4', 'M5', 'iX', 'i4', 'i7'],
    'BMW Motorrad': ['R 1250 GS', 'R 1250 RT', 'S 1000 RR', 'F 900 R', 'F 900 XR', 'G 310 R', 'G 310 GS', 'M 1000 RR'],
    'Mini': ['Cooper', 'Cooper S', 'Countryman', 'Clubman', 'Cabrio', 'Paceman'],
    'Maxus': ['T60', 'D90', 'MIFA 9', 'G50', 'V80', 'EV30', 'EV80'],
    'Jetour': ['X70', 'X90', 'Dashing'],
    'Kaiyi': ['X3 Pro', 'E5'],
    'Karry': ['K10', 'Karry Van'],
    'Geely': ['Emgrand', 'Coolray', 'Tugella', 'Okavango', 'Azkarra'],
    'MG': ['MG3', 'MG5', 'MG6', 'ZS', 'HS', 'RX5', 'ZS EV', 'MG4 EV', 'Cyberster'],
    'Dongfeng': ['SX6', '580', 'AX7'],
    'Foton': ['Tunland', 'Toano', 'View'],
    'VW Camiones': ['Constellation', 'Delivery', 'Worker'],
    'Foton Camiones': ['Aumark', 'Auman', 'Ollin'],
    'Iveco': ['Daily', 'Tector', 'Stralis', 'S-WAY'],
    'MAN': ['TGE', 'TGL', 'TGM', 'TGS', 'TGX'],
};

// ─── Steps ────────────────────────────────────────────────────────────────────
const STEPS = [
    { id: 1, label: 'Tus datos', icon: User },
    { id: 2, label: 'Tu vehículo', icon: Car },
    { id: 3, label: 'Solicitud', icon: ClipboardList },
];

const inputCls =
    'w-full bg-[#f8f9fa] border-2 border-transparent focus:border-[#d2001c] focus:bg-white text-gray-900 font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400';
const labelCls = 'block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2';

// ─── Model Autocomplete ───────────────────────────────────────────────────────
function ModeloAutocomplete({
    marca, value, onChange,
}: { marca: string; value: string; onChange: (v: string) => void }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(value);
    const wrapRef = useRef<HTMLDivElement>(null);
    const catalog = MODELS_BY_BRAND[marca] || [];
    const suggestions = query.length >= 3
        ? catalog.filter(m => m.toLowerCase().includes(query.toLowerCase()))
        : [];

    useEffect(() => { setQuery(value); }, [value]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        onChange(e.target.value);
        setOpen(true);
    };

    const select = (model: string) => {
        setQuery(model);
        onChange(model);
        setOpen(false);
    };

    return (
        <div ref={wrapRef} className="relative">
            <div className="relative">
                <input
                    id="dyp-modelo"
                    type="text"
                    value={query}
                    onChange={handleInput}
                    onFocus={() => query.length >= 3 && setOpen(true)}
                    placeholder={marca ? 'Escribe 3 letras para sugerencias...' : 'Selecciona una marca primero'}
                    disabled={!marca}
                    className={`${inputCls} pr-10 disabled:opacity-50`}
                    autoComplete="off"
                    required
                />
                <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {open && suggestions.length > 0 && (
                <ul className="absolute z-30 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden max-h-52 overflow-y-auto">
                    {suggestions.map(m => (
                        <li key={m}>
                            <button
                                type="button"
                                onMouseDown={() => select(m)}
                                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-red-50 hover:text-[#d2001c] transition-colors"
                            >
                                {m}
                            </button>
                        </li>
                    ))}
                    <li className="px-4 py-2 text-xs text-gray-400 border-t border-gray-50 italic">
                        ¿No aparece? Termina de escribirlo manualmente.
                    </li>
                </ul>
            )}
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function CotizarDypContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const preselected = searchParams.get('marca') || '';

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const [form, setForm] = useState({
        // Paso 1 (Datos Personales)
        rut: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '+56 9 ',

        // Paso 2 (Vehículo)
        marca: preselected,
        modelo: '',
        anio: '',
        vin: '',

        // Paso 3 (Solicitud)
        solicitud: '',
        acceptPolicy: false,
    });

    useEffect(() => {
        if (preselected) setForm(p => ({ ...p, marca: preselected }));
    }, [preselected]);

    const brand = ALL_BRANDS.find(b => b.name.toLowerCase() === form.marca.toLowerCase());
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        const checked = type === 'checkbox' ? target.checked : undefined;
        if (name === 'telefono' && !value.startsWith('+56 9 ')) return;
        if (name === 'marca') setForm(p => ({ ...p, marca: value, modelo: '' }));
        else setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    };

    // Validaciones
    const step1Valid = form.rut && form.nombre && form.apellido && form.correo && form.telefono.length > 6;
    const step2Valid = form.marca && form.modelo && form.anio && form.vin && form.vin.length >= 8;
    const step3Valid = form.solicitud && form.acceptPolicy;

    const handleNext = () => { if (step < 3) setStep(s => s + 1); };
    const handleBack = () => { if (step > 1) setStep(s => s - 1); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!step3Valid) return;
        setIsSubmitting(true);
        setTimeout(() => { setIsSubmitting(false); setSuccess(true); }, 1500);
    };

    // ── SUCCESS ─────────────────────────────────────────────────────────────
    if (success) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-[#f4f6f8] px-4 font-sans">
                <div className="max-w-2xl w-full bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 text-center relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-2 bg-[#d2001c]" />
                    <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">¡Solicitud Enviada!</h2>
                    <p className="text-gray-500 mb-8 border-b border-gray-100 pb-8 text-sm sm:text-base">
                        Recibimos tu solicitud de Desabolladura y Pintura para{' '}
                        <strong className="text-gray-900">{form.marca} {form.modelo} {form.anio}</strong>.<br />
                        Un asesor de nuestro departamento de Desabolladura y Pintura te contactará en las próximas 24 hrs.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left mb-8 text-sm space-y-3">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Resumen</p>
                        {([
                            ['Vehículo', `${form.marca} ${form.modelo} ${form.anio}`],
                            ['VIN/Chasis', form.vin],
                            ['Solicitud', form.solicitud],
                            ['Nombre', `${form.nombre} ${form.apellido}`],
                        ] as [string, string][]).map(([k, v]) => (
                            <div key={k} className="flex justify-between gap-4">
                                <span className="text-gray-500 flex-shrink-0">{k}</span>
                                <span className="font-bold text-gray-900 text-right">{v}</span>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => router.push('/dyp')}
                        className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-colors">
                        Volver a Inicio
                    </button>
                </div>
            </div>
        );
    }

    // ── FORM ────────────────────────────────────────────────────────────────
    return (
        <main className="min-h-screen pt-[88px] pb-16 bg-[#f4f6f8] font-sans selection:bg-[#d2001c] selection:text-white">

            {/* ── TOPBAR ── */}
            <div className={`sticky z-40 bg-white border-b border-gray-100 shadow-sm transition-all duration-300 ${isScrolled ? 'top-[72px]' : 'top-[88px]'}`}>
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
                    <Link href="/dyp"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors whitespace-nowrap flex-shrink-0">
                        <ArrowLeft size={15} />
                        <span className="hidden sm:inline">Volver a Selección de Marca</span>
                        <span className="sm:hidden">Volver</span>
                    </Link>

                    <div className="flex items-center gap-1 sm:gap-2">
                        {STEPS.map((s, idx) => {
                            const done = s.id < step; const active = s.id === step; const Icon = s.icon;
                            return (
                                <React.Fragment key={s.id}>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${done ? 'bg-[#d2001c] text-white' : active ? 'bg-[#d2001c] text-white ring-2 ring-[#d2001c]/20' : 'bg-gray-100 text-gray-400'}`}>
                                            {done ? <CheckCircle size={14} /> : <Icon size={14} />}
                                        </div>
                                        <span className={`text-xs font-bold hidden sm:inline whitespace-nowrap ${active ? 'text-[#d2001c]' : done ? 'text-gray-500' : 'text-gray-300'}`}>{s.label}</span>
                                    </div>
                                    {idx < STEPS.length - 1 && (
                                        <div className={`w-6 sm:w-10 h-0.5 rounded-full mx-1 flex-shrink-0 ${done ? 'bg-[#d2001c]' : 'bg-gray-100'}`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── CONTENIDO ── */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* LEFT */}
                    <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
                        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight mb-1">Desabolladura y Pintura</h1>
                        <p className="text-gray-400 text-sm mb-8 border-b border-gray-100 pb-6">
                            Completa los 3 pasos con los datos de tu vehículo para obtener tu cotización o agendar tu reparación detallada.
                        </p>

                        <form onSubmit={handleSubmit}>

                            {/* ── PASO 1: Datos personales ── */}
                            {step === 1 && (
                                <div className="space-y-5">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Paso 1 — Tus datos personales</p>

                                    <div>
                                        <label className={labelCls}>RUT *</label>
                                        <input id="dyp-rut" type="text" name="rut" value={form.rut}
                                            onChange={handleChange} placeholder="Ej: 12.345.678-9" className={inputCls} required />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className={labelCls}>Nombre *</label>
                                            <input id="dyp-nombre" type="text" name="nombre" value={form.nombre} onChange={handleChange} className={inputCls} required />
                                        </div>
                                        <div>
                                            <label className={labelCls}>Apellido *</label>
                                            <input id="dyp-apellido" type="text" name="apellido" value={form.apellido} onChange={handleChange} className={inputCls} required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelCls}>Correo Electrónico *</label>
                                        <input id="dyp-correo" type="email" name="correo" value={form.correo}
                                            onChange={handleChange} placeholder="tucorreo@ejemplo.cl" className={inputCls} required />
                                    </div>

                                    <div>
                                        <label className={labelCls}>Teléfono / Celular *</label>
                                        <input id="dyp-telefono" type="tel" name="telefono" value={form.telefono} onChange={handleChange} className={inputCls} required />
                                    </div>
                                </div>
                            )}

                            {/* ── PASO 2: Vehículo ── */}
                            {step === 2 && (
                                <div className="space-y-5">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Paso 2 — Tu vehículo</p>

                                    <div>
                                        <label className={labelCls}>Marca *</label>
                                        <div className="relative">
                                            <select id="dyp-marca" name="marca" value={form.marca} onChange={handleChange}
                                                className={`${inputCls} appearance-none cursor-pointer pr-10`} required>
                                                <option value="">Selecciona una marca...</option>
                                                {ALL_BRANDS.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                                            </select>
                                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelCls}>Modelo * <span className="normal-case font-normal text-gray-400">(escribe 3 letras)</span></label>
                                        <ModeloAutocomplete
                                            marca={form.marca}
                                            value={form.modelo}
                                            onChange={v => setForm(p => ({ ...p, modelo: v }))}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelCls}>Año *</label>
                                        <div className="relative">
                                            <select id="dyp-anio" name="anio" value={form.anio} onChange={handleChange}
                                                className={`${inputCls} appearance-none cursor-pointer pr-10`} required>
                                                <option value="">Selecciona el año...</option>
                                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                                            </select>
                                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelCls}>VIN / N° Chasis * <span className="normal-case font-normal text-gray-400">(Obligatorio para pintura y desabolladura exacta)</span></label>
                                        <input id="dyp-vin" type="text" name="vin" value={form.vin}
                                            onChange={handleChange} placeholder="Ej: 9FBJF59H8P0012345"
                                            className={`${inputCls} uppercase tracking-widest border-2 border-red-100 hover:border-red-200 focus:border-[#d2001c]`}
                                            maxLength={17} required />
                                    </div>
                                </div>
                            )}

                            {/* ── PASO 3: Solicitud ── */}
                            {step === 3 && (
                                <div className="space-y-5">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Paso 3 — Solicitud de Reparación</p>

                                    <div>
                                        <label className={labelCls}>Descripción de Daños / Solicitud *</label>
                                        <textarea id="dyp-solicitud" name="solicitud" value={form.solicitud}
                                            onChange={handleChange} rows={6}
                                            placeholder="Por favor, describe detalladamente los daños de tu vehículo o el servicio que necesitas (Pintura completa, abolladura en puerta, choque trasero, etc.)"
                                            className={`${inputCls} resize-none`} required />
                                    </div>

                                    <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                                        <div className="flex items-center h-6">
                                            <input id="dyp-terms" type="checkbox" name="acceptPolicy"
                                                checked={form.acceptPolicy} onChange={handleChange}
                                                className="w-5 h-5 rounded border-gray-300 accent-[#d2001c] cursor-pointer" required />
                                        </div>
                                        <label htmlFor="dyp-terms" className="text-sm text-gray-600 leading-tight cursor-pointer">
                                            Acepto recibir comunicaciones de Automotriz Carmona.{' '}
                                            <a href="#" className="underline hover:text-gray-900">Política de privacidad.</a>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Nav buttons */}
                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                {step > 1 ? (
                                    <button type="button" onClick={handleBack}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:border-gray-300 hover:bg-gray-50 transition-all text-sm">
                                        <ArrowLeft size={16} /> Atrás
                                    </button>
                                ) : <div />}

                                {step < 3 ? (
                                    <button type="button" onClick={handleNext}
                                        disabled={(step === 1 && !step1Valid) || (step === 2 && !step2Valid)}
                                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#d2001c] hover:bg-[#b0001a] text-white rounded-xl font-extrabold uppercase tracking-widest text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#d2001c]/20">
                                        Continuar <ArrowRight size={16} />
                                    </button>
                                ) : (
                                    <button id="dyp-submit" type="submit"
                                        disabled={isSubmitting || !step3Valid}
                                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#fdb2b9] hover:bg-[#ff9aa3] text-[#d2001c] disabled:opacity-50 disabled:cursor-not-allowed font-extrabold uppercase tracking-widest text-sm rounded-xl transition-colors">
                                        {isSubmitting ? 'Enviando...' : <><CheckCircle size={16} /> Enviar Solicitud</>}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* RIGHT: Contact */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-28 bg-white p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">

                            <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-6">
                                {brand ? (
                                    <div className="relative w-20 h-12 bg-[#f8f9fa] rounded-lg flex-shrink-0">
                                        <Image src={brand.src} alt={brand.name} fill className="object-contain p-1" />
                                    </div>
                                ) : (
                                    <div className="w-20 h-12 bg-[#f8f9fa] rounded-lg flex-shrink-0 flex items-center justify-center text-gray-300 text-xs font-bold uppercase">Logo</div>
                                )}
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Desabolladura y Pintura</p>
                                    <h3 className="font-extrabold text-gray-900 uppercase tracking-tight text-lg leading-tight">
                                        {brand ? brand.name : 'Carmona Automotriz'}
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-5 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] flex items-center justify-center flex-shrink-0">
                                        <MapPin size={18} className="text-[#d2001c]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Dirección</p>
                                        <p className="text-sm font-semibold text-gray-900">Planella 1234, Coquimbo</p>
                                        <p className="text-xs text-gray-500 mt-0.5">IV Región, Chile</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] flex items-center justify-center flex-shrink-0">
                                        <Mail size={18} className="text-[#d2001c]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Correo DyP</p>
                                        <a href="mailto:dyp@carmonaycia.cl"
                                            className="text-sm font-semibold text-gray-900 hover:text-[#d2001c] transition-colors break-all">
                                            dyp@carmonaycia.cl
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6 space-y-3">
                                <a href="https://wa.me/56984749397?text=Hola%2C%20necesito%20agendar%20en%20Desabolladura%20y%20Pintura"
                                    target="_blank" rel="noopener noreferrer" id="dyp-whatsapp-btn"
                                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-widest bg-[#25D366] hover:bg-[#1ebe5c] text-white transition-colors">
                                    <MessageCircle size={18} /> Hablar con un Asesor
                                </a>
                                <a href="tel:+56512200201" id="dyp-phone-btn"
                                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-widest bg-[#f8f9fa] hover:bg-gray-100 text-gray-900 border-2 border-gray-100 hover:border-gray-200 transition-colors">
                                    <Phone size={18} /> Llamar +56 51 220 0201
                                </a>
                            </div>

                            <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed">
                                Evaluaremos tu solicitud con nuestros técnicos expertos en menos de <strong>24 hrs.</strong>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default function DypCotizarPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f4f6f8]" />}>
            <CotizarDypContent />
        </Suspense>
    );
}
