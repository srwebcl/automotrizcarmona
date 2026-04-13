'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    CheckCircle, MapPin, Mail, Phone,
    ChevronDown, Clock, ArrowLeft, ArrowRight, User, Car, CalendarDays, Store
} from 'lucide-react';
import { API_URL } from '@/lib/api';



// ─── Data ─────────────────────────────────────────────────────────────────────
import { getLayoutBrands, LayoutBrandsData } from '@/lib/api/layoutBrands';

const SERVICE_TYPES = [
    'Mantención Preventiva (Aceite + Filtros)',
    'Revisión Técnica Anual',
    'Frenos y Sistema de Frenado',
    'Suspensión y Dirección',
    'Sistema Eléctrico e Iluminación',
    'Aire Acondicionado / Climatización',
    'Diagnóstico Computarizado',
    'Garantía de Fábrica',
    'Recuperación de Siniestro / Colisión',
    'Otro (especificar en comentarios)',
];

const TIME_BLOCKS = [
    { label: 'Bloque AM  (09:00 – 12:00)', value: 'AM' },
    { label: 'Bloque PM  (13:00 – 17:00)', value: 'PM' },
    { label: 'Tarde        (17:00 – 19:00)', value: 'TARDE' },
];

const STEPS = [
    { id: 1, label: 'Tus datos', icon: User },
    { id: 2, label: 'Tu vehículo', icon: Car },
    { id: 3, label: 'Fecha', icon: CalendarDays },
];

// ─── Reusable input ────────────────────────────────────────────────────────────
const inputCls =
    'w-full bg-[#f8f9fa] border-2 border-transparent focus:border-[#d2001c] focus:bg-white text-gray-900 font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400';

// ─── Step indicator ────────────────────────────────────────────────────────────
function StepBar({ current }: { current: number }) {
    return (
        <div className="flex items-center gap-0 mb-8">
            {STEPS.map((step, idx) => {
                const done = step.id < current;
                const active = step.id === current;
                const Icon = step.icon;
                return (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center gap-1.5">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${done ? 'bg-[#d2001c] text-white' :
                                active ? 'bg-[#d2001c] text-white shadow-lg shadow-[#d2001c]/30 scale-110' :
                                    'bg-gray-100 text-gray-400'
                                }`}>
                                {done ? <CheckCircle size={18} /> : <Icon size={18} />}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${active ? 'text-[#d2001c]' : done ? 'text-gray-500' : 'text-gray-300'}`}>
                                {step.label}
                            </span>
                        </div>
                        {idx < STEPS.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all duration-500 ${done ? 'bg-[#d2001c]' : 'bg-gray-100'}`} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function AgendarContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const preselected = searchParams.get('marca') || '';

    const [layoutBrands, setLayoutBrands] = useState<LayoutBrandsData>({ cars: [], trucks: [] });
    useEffect(() => {
        getLayoutBrands().then(setLayoutBrands);
    }, []);

    const ALL_BRANDS = [...layoutBrands.cars, ...layoutBrands.trucks].filter(b => b.show_in_services);

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
        rut: '',
        nombre: '',
        apellido: '',
        correo: '',
        celular: '+56 9 ',
        marca: preselected,
        tipoServicio: '',
        fechaTentativa: '',
        bloqueHorario: '',
        comentarios: '',
        ciudad: '',
        acceptPolicy: false,
    });

    const [branches, setBranches] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/branches`)
            .then(r => r.json())
            .then(json => setBranches(json.data || json))
            .catch(console.error);
    }, []);

    const brandBranches = React.useMemo(() => {
        if (!form.marca) return [];
        return branches.filter(b => 
            (b.brands_list || []).some((br: string) => br.toLowerCase() === form.marca.toLowerCase()) && 
            (b.type === 'Servicio Técnico' || b.type === 'Desabolladura y Pintura')
        );
    }, [branches, form.marca]);

    const availableCities = React.useMemo(() => {
        return [...new Set(brandBranches.map(b => b.city))].sort();
    }, [brandBranches]);

    // Set default city if exactly 1 is available, or clear if current city is invalid
    useEffect(() => {
        if (availableCities.length === 1) {
            setForm(p => ({ ...p, ciudad: availableCities[0] }));
        } else if (availableCities.length > 0 && !availableCities.includes(form.ciudad)) {
            setForm(p => ({ ...p, ciudad: availableCities[0] }));
        }
    }, [availableCities, form.ciudad]);

    useEffect(() => {
        if (preselected) setForm(p => ({ ...p, marca: preselected }));
    }, [preselected]);

    const brand = ALL_BRANDS.find(b => b.name.toLowerCase() === form.marca.toLowerCase());
    const todayStr = new Date().toISOString().split('T')[0];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        const checked = type === 'checkbox' ? target.checked : undefined;
        if (name === 'celular' && !value.startsWith('+56 9 ')) return;
        setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    };

    // ── Step validation ──────────────────────────────────────────────────────
    const step1Valid = form.rut && form.nombre && form.apellido && form.correo && form.celular.length > 6;
    const step2Valid = form.marca && form.tipoServicio;
    const step3Valid = form.fechaTentativa && form.bloqueHorario && form.acceptPolicy;

    const handleNext = () => {
        if (step < 3) setStep(s => s + 1);
    };
    const handleBack = () => {
        if (step > 1) setStep(s => s - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!step3Valid) return;
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source: 'servicio_tecnico',
                    customer: {
                        rut: form.rut,
                        first_name: form.nombre,
                        last_name: form.apellido,
                        email: form.correo,
                        phone: form.celular,
                        city: form.ciudad,
                    },
                    vehicle: {
                        brand_name: form.marca,
                    },
                    request_details: {
                        service_type: form.tipoServicio,
                        message: `Fecha tentativa: ${form.fechaTentativa} | Bloque: ${form.bloqueHorario} | Comentarios: ${form.comentarios}`
                    }
                }),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                throw new Error('Failed to submit service booking');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert("Hubo un problema al agendar tu hora. Por favor intentalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
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
                        Recibimos tu agendamiento para <strong className="text-gray-900">{form.marca}</strong>.<br />
                        Un ejecutivo te contactará en las próximas 24 hrs.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left mb-8 text-sm space-y-3">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Resumen</p>
                        {[
                            ['Nombre', `${form.nombre} ${form.apellido}`],
                            ['Marca', form.marca],
                            ['Servicio', form.tipoServicio],
                            ['Fecha', form.fechaTentativa ? new Date(form.fechaTentativa + 'T12:00:00').toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' }) : '—'],
                            ['Bloque', TIME_BLOCKS.find(b => b.value === form.bloqueHorario)?.label || '—'],
                        ].map(([k, v]) => (
                            <div key={k} className="flex justify-between">
                                <span className="text-gray-500">{k}</span>
                                <span className="font-bold text-gray-900 text-right max-w-[60%]">{v}</span>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => router.push('/servicios')} className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-colors">
                        Volver a Servicios
                    </button>
                </div>
            </div>
        );
    }

    // ── FORM ────────────────────────────────────────────────────────────────
    return (
        <main className="min-h-screen pt-[88px] pb-16 bg-[#f4f6f8] font-sans selection:bg-[#d2001c] selection:text-white">

            {/* ── TOPBAR: Volver + Pasos ── sticky, sigue la altura del navbar ── */}
            <div className={`sticky z-40 bg-white border-b border-gray-100 shadow-sm transition-all duration-300 ${isScrolled ? 'top-[72px]' : 'top-[88px]'}`}>
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

                    {/* Back link */}
                    <Link href="/servicios"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors whitespace-nowrap flex-shrink-0">
                        <ArrowLeft size={15} />
                        <span className="hidden xs:inline">Volver a Selección de Marca</span>
                        <span className="xs:hidden">Volver</span>
                    </Link>

                    {/* Step indicator — compact horizontal */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {STEPS.map((s, idx) => {
                            const done = s.id < step;
                            const active = s.id === step;
                            const Icon = s.icon;
                            return (
                                <React.Fragment key={s.id}>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${done ? 'bg-[#d2001c] text-white' :
                                            active ? 'bg-[#d2001c] text-white ring-2 ring-[#d2001c]/20' :
                                                'bg-gray-100 text-gray-400'
                                            }`}>
                                            {done ? <CheckCircle size={14} /> : <Icon size={14} />}
                                        </div>
                                        <span className={`text-xs font-bold hidden sm:inline whitespace-nowrap ${active ? 'text-[#d2001c]' : done ? 'text-gray-500' : 'text-gray-300'
                                            }`}>{s.label}</span>
                                    </div>
                                    {idx < STEPS.length - 1 && (
                                        <div className={`w-6 sm:w-10 h-0.5 rounded-full mx-1 flex-shrink-0 ${done ? 'bg-[#d2001c]' : 'bg-gray-100'
                                            }`} />
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

                    {/* ── LEFT: Multi-step form ─────────────────────────────── */}
                    <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100">

                        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
                            Agenda tu Hora de Servicio
                        </h1>
                        <p className="text-gray-400 text-sm mb-8 border-b border-gray-100 pb-6">
                            Completa los 3 pasos. Un ejecutivo confirmará tu cita en menos de 24 hrs.
                        </p>

                        <form onSubmit={handleSubmit}>

                            {/* ────────── PASO 1: Tus datos ────────── */}
                            {step === 1 && (
                                <div className="space-y-5 animate-fadeIn">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Paso 1 — Tus datos personales</p>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">RUT *</label>
                                        <input id="agendar-rut" type="text" name="rut" value={form.rut} onChange={handleChange}
                                            placeholder="Ej: 12.345.678-9" className={inputCls} required />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nombre *</label>
                                            <input id="agendar-nombre" type="text" name="nombre" value={form.nombre} onChange={handleChange} className={inputCls} required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Apellido *</label>
                                            <input id="agendar-apellido" type="text" name="apellido" value={form.apellido} onChange={handleChange} className={inputCls} required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Correo Electrónico *</label>
                                        <input id="agendar-correo" type="email" name="correo" value={form.correo} onChange={handleChange}
                                            placeholder="tucorreo@ejemplo.cl" className={inputCls} required />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Celular *</label>
                                        <input id="agendar-celular" type="tel" name="celular" value={form.celular} onChange={handleChange} className={inputCls} required />
                                    </div>
                                </div>
                            )}

                            {/* ────────── PASO 2: Tu vehículo ────────── */}
                            {step === 2 && (
                                <div className="space-y-5 animate-fadeIn">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Paso 2 — Tu vehículo</p>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Marca *</label>
                                        <div className="relative">
                                            <select id="agendar-marca" name="marca" value={form.marca} onChange={handleChange}
                                                className={`${inputCls} appearance-none cursor-pointer pr-10`} required>
                                                <option value="">Selecciona una marca...</option>
                                                {ALL_BRANDS.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                                            </select>
                                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tipo de Servicio *</label>
                                        <div className="relative">
                                            <select id="agendar-tipo" name="tipoServicio" value={form.tipoServicio} onChange={handleChange}
                                                className={`${inputCls} appearance-none cursor-pointer pr-10`} required>
                                                <option value="">Selecciona el tipo de servicio...</option>
                                                {SERVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Comentarios adicionales</label>
                                        <textarea id="agendar-comentarios" name="comentarios" value={form.comentarios} onChange={handleChange}
                                            rows={4} placeholder="Describe brevemente el problema o lo que necesitas..."
                                            className={`${inputCls} resize-none`} />
                                    </div>

                                    {/* Ciudad */}
                                    {availableCities.length > 1 && (
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ciudad de Atención *</label>
                                            <div className="relative">
                                                <select
                                                    name="ciudad"
                                                    value={form.ciudad}
                                                    onChange={handleChange}
                                                    className={`${inputCls} appearance-none cursor-pointer pr-10`}
                                                    required
                                                >
                                                    <option value="">Selecciona la ciudad...</option>
                                                    {availableCities.map(c => (
                                                        <option key={`${c}`} value={c as string}>{c as string}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ────────── PASO 3: Fecha ────────── */}
                            {step === 3 && (
                                <div className="space-y-5 animate-fadeIn">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Paso 3 — Fecha y horario tentativo</p>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Fecha Preferida *</label>
                                        <input id="agendar-fecha" type="date" name="fechaTentativa" value={form.fechaTentativa}
                                            onChange={handleChange} min={todayStr}
                                            className={`${inputCls} cursor-pointer`} required />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Bloque Horario *</label>
                                        <div className="space-y-2">
                                            {TIME_BLOCKS.map(({ label, value }) => (
                                                <label key={value}
                                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.bloqueHorario === value
                                                        ? 'border-[#d2001c] bg-red-50'
                                                        : 'border-gray-100 bg-[#f8f9fa] hover:border-red-200'
                                                        }`}>
                                                    <input type="radio" name="bloqueHorario" value={value}
                                                        checked={form.bloqueHorario === value} onChange={handleChange}
                                                        className="accent-[#d2001c] w-4 h-4 flex-shrink-0" />
                                                    <Clock size={16} className={form.bloqueHorario === value ? 'text-[#d2001c]' : 'text-gray-400'} />
                                                    <span className={`text-sm font-bold ${form.bloqueHorario === value ? 'text-[#d2001c]' : 'text-gray-600'}`}>{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Policy */}
                                    <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                                        <div className="flex items-center h-6">
                                            <input id="agendar-terms" type="checkbox" name="acceptPolicy"
                                                checked={form.acceptPolicy} onChange={handleChange}
                                                className="w-5 h-5 rounded border-gray-300 accent-[#d2001c] cursor-pointer" required />
                                        </div>
                                        <label htmlFor="agendar-terms" className="text-sm text-gray-600 leading-tight cursor-pointer">
                                            Acepto recibir comunicaciones de Automotriz Carmona.{' '}
                                            <Link href="/legal" target="_blank" className="underline hover:text-gray-900">Política de privacidad.</Link>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* ── Navigation buttons ──────────────────────────── */}
                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                                {step > 1 ? (
                                    <button type="button" onClick={handleBack}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:border-gray-300 hover:bg-gray-50 transition-all text-sm">
                                        <ArrowLeft size={16} /> Atrás
                                    </button>
                                ) : <div />}

                                {step < 3 ? (
                                    <button type="button" onClick={handleNext}
                                        disabled={step === 1 ? !step1Valid : !step2Valid}
                                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#d2001c] hover:bg-[#b0001a] text-white rounded-xl font-extrabold uppercase tracking-widest text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#d2001c]/20">
                                        Continuar <ArrowRight size={16} />
                                    </button>
                                ) : (
                                    <button id="agendar-submit" type="submit"
                                        disabled={isSubmitting || !step3Valid}
                                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#fdb2b9] hover:bg-[#ff9aa3] text-[#d2001c] disabled:opacity-50 disabled:cursor-not-allowed font-extrabold uppercase tracking-widest text-sm rounded-xl transition-colors">
                                        {isSubmitting ? 'Enviando...' : <><CheckCircle size={16} /> Solicitar Agendamiento</>}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* ── RIGHT: Contact info (sticky) ──────────────────────── */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-28 bg-white p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">

                            {/* Brand logo */}
                            <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-6">
                                {brand ? (
                                    <div className="relative w-20 h-12 bg-[#f8f9fa] rounded-lg flex-shrink-0">
                                        <Image src={brand.logo_url} alt={brand.name} fill className="object-contain p-1" />
                                    </div>
                                ) : (
                                    <div className="w-20 h-12 bg-[#f8f9fa] rounded-lg flex-shrink-0 flex items-center justify-center text-gray-300 text-xs font-bold uppercase">Logo</div>
                                )}
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Servicio Técnico</p>
                                    <h3 className="font-extrabold text-gray-900 uppercase tracking-tight text-lg leading-tight">
                                        {brand ? brand.name : 'Carmona Automotriz'}
                                    </h3>
                                </div>
                            </div>

                            {/* ── INFO DINÁMICA DE CONTACTO ── */}
                            <div className="space-y-5 mb-6">
                                {(() => {
                                    const stBranch = brandBranches.find(b => b.city === form.ciudad && b.type === 'Servicio Técnico')
                                                     || brandBranches.find(b => b.city === form.ciudad) 
                                                     || brandBranches[0] 
                                                     || { address: 'Av. Balmaceda 3681', city: 'La Serena', email: 'callcenter@carmonaycia.cl', phone: '+56 9 5647 7727' };

                                    return (
                                        <>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] flex items-center justify-center flex-shrink-0">
                                                    <MapPin size={18} className="text-[#d2001c]" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Sucursal / Dirección</p>
                                                    <p className="text-sm font-semibold text-gray-900">{stBranch?.address || 'Av. Balmaceda 3681, La Serena'}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{stBranch?.city || 'La Serena'}, Chile</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] flex items-center justify-center flex-shrink-0">
                                                    <Mail size={18} className="text-[#d2001c]" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Correo Servicio</p>
                                                    <a href={`mailto:${stBranch?.email || 'callcenter@carmonaycia.cl'}`}
                                                        className="text-sm font-semibold text-gray-900 hover:text-[#d2001c] transition-colors break-all">
                                                        {stBranch?.email || 'callcenter@carmonaycia.cl'}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="border-t border-gray-100 pt-6">
                                                <a href={`tel:${(stBranch?.phone || '+56 9 5647 7727').replace(/\s+/g, '')}`} id="agendar-phone-btn"
                                                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-widest bg-[#f8f9fa] hover:bg-gray-100 text-gray-900 border-2 border-gray-100 hover:border-gray-200 transition-colors">
                                                    <Phone size={18} /> Llamar {stBranch?.phone || '+56 9 5647 7727'}
                                                </a>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>

                            <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed">
                                Fecha y horario <strong>tentativos</strong>. Un ejecutivo confirmará los detalles exactos.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default function AgendarPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f4f6f8]" />}>
            <AgendarContent />
        </Suspense>
    );
}
