'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    CheckCircle, MessageSquare, Mail, Phone,
    ArrowLeft, ArrowRight, User, FileText, Share2, AlertCircle, ChevronDown, MapPin, Building, Clock
} from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────────────────────
const DEPARTMENTS = [
    'Centro Automotriz (Ventas)',
    'Servicio Técnico',
    'Desabolladura y Pintura',
    'Repuestos',
    'Camiones y Buses',
    'Seminuevos',
    'Otro'
];

const STEPS = [
    { id: 1, label: 'Tus datos', icon: User },
    { id: 2, label: 'Antecedentes', icon: FileText },
    { id: 3, label: 'Sugerencia / Reclamo', icon: MessageSquare },
];

// ─── Reusable input ────────────────────────────────────────────────────────────
const inputCls =
    'w-full bg-[#f8f9fa] border-2 border-transparent focus:border-[#d2001c] focus:bg-white text-gray-900 font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400';
const labelCls = 'block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2';

// ─── Main ─────────────────────────────────────────────────────────────────────
function ReclamosContent() {
    const router = useRouter();

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
        // Paso 1
        rut: '',
        nombre: '',
        apellido: '',
        correo: '',
        celular: '+56 9 ',
        // Paso 2
        departamento: '',
        patente: '',
        nroDocumento: '',
        // Paso 3
        tipo: '', // Sugerencia, Reclamo, Felicitacion
        mensaje: '',
        acceptPolicy: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        const checked = type === 'checkbox' ? target.checked : undefined;
        if (name === 'celular' && !value.startsWith('+56 9 ')) return;
        setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    };

    // ── Step validation ──────────────────────────────────────────────────────
    const step1Valid = form.rut && form.nombre && form.apellido && form.correo && form.celular.length > 6;
    const step2Valid = form.departamento; // patente y nro documento son opcionales pero ayudan
    const step3Valid = form.tipo && form.mensaje && form.acceptPolicy;

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
                    source: 'reclamos',
                    customer: {
                        rut: form.rut,
                        first_name: form.nombre,
                        last_name: form.apellido,
                        email: form.correo,
                        phone: form.celular,
                    },
                    request_details: {
                        service_type: form.departamento,
                        message: `[${form.tipo}] Patente: ${form.patente || 'N/A'} | Doc: ${form.nroDocumento || 'N/A'} | Mensaje: ${form.mensaje}`
                    }
                }),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                throw new Error('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert("Hubo un problema al enviar tu formulario. Por favor intentalo más tarde.");
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
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">¡Formulario Enviado!</h2>
                    <p className="text-gray-500 mb-8 border-b border-gray-100 pb-8 text-sm sm:text-base">
                        Hemos recibido tu <strong className="text-gray-900">{form.tipo.toLowerCase()}</strong> para el área de <strong className="text-gray-900">{form.departamento}</strong>.<br />
                        Nuestro equipo de Atención al Cliente revisará los antecedentes y se pondrá en contacto contigo a la brevedad.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left mb-8 text-sm space-y-3">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Resumen</p>
                        {[
                            ['Ticket', `#${Math.floor(Math.random() * 90000) + 10000}`],
                            ['Nombre', `${form.nombre} ${form.apellido}`],
                            ['RUT', form.rut],
                            ['Tipo', form.tipo],
                            ['Departamento', form.departamento],
                        ].map(([k, v]) => (
                            <div key={k} className="flex justify-between">
                                <span className="text-gray-500">{k}</span>
                                <span className="font-bold text-gray-900 text-right">{v}</span>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => router.push('/')} className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-colors">
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    // ── FORM ────────────────────────────────────────────────────────────────
    return (
        <main className="min-h-screen pt-[104px] lg:pt-[88px] pb-16 bg-[#f4f6f8] font-sans selection:bg-[#d2001c] selection:text-white">

            {/* ── TOPBAR: Volver + Pasos ── sticky ── */}
            <div className={`sticky z-40 bg-white border-b border-gray-100 shadow-sm transition-all duration-300 ${isScrolled ? 'top-[72px]' : 'top-[88px]'}`}>
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

                    <button onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors whitespace-nowrap flex-shrink-0">
                        <ArrowLeft size={15} />
                        <span className="hidden xs:inline">Volver</span>
                    </button>

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
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* ── LEFT: Formulario multi-paso ─────────────────────────────── */}
                    <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100">

                        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
                            Sugerencias y Reclamos
                        </h1>
                        <p className="text-gray-400 text-sm mb-8 border-b border-gray-100 pb-6">
                            Para Automotriz Carmona tu opinión es fundamental. Ayúdanos a mejorar contándonos tu experiencia.
                        </p>

                        <form onSubmit={handleSubmit}>

                            {/* ────────── PASO 1: Tus datos ────────── */}
                            {step === 1 && (
                                <div className="space-y-5 animate-fadeIn">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Paso 1 — Tus datos personales</p>

                                    <div>
                                        <label className={labelCls}>RUT *</label>
                                        <input type="text" name="rut" value={form.rut} onChange={handleChange}
                                            placeholder="Ej: 12.345.678-9" className={inputCls} required />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className={labelCls}>Nombre *</label>
                                            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className={inputCls} required />
                                        </div>
                                        <div>
                                            <label className={labelCls}>Apellido *</label>
                                            <input type="text" name="apellido" value={form.apellido} onChange={handleChange} className={inputCls} required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelCls}>Correo Electrónico *</label>
                                        <input type="email" name="correo" value={form.correo} onChange={handleChange}
                                            placeholder="tucorreo@ejemplo.cl" className={inputCls} required />
                                    </div>

                                    <div>
                                        <label className={labelCls}>Celular *</label>
                                        <input type="tel" name="celular" value={form.celular} onChange={handleChange} className={inputCls} required />
                                    </div>
                                </div>
                            )}

                            {/* ────────── PASO 2: Antecedentes ────────── */}
                            {step === 2 && (
                                <div className="space-y-5 animate-fadeIn">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Paso 2 — Antecedentes del Caso</p>

                                    <div>
                                        <label className={labelCls}>Departamento / Área de atención *</label>
                                        <div className="relative">
                                            <select name="departamento" value={form.departamento} onChange={handleChange}
                                                className={`${inputCls} appearance-none cursor-pointer pr-10`} required>
                                                <option value="">Selecciona un área...</option>
                                                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelCls}>Patente de tu vehículo <span className="normal-case font-normal text-gray-400">(Opcional)</span></label>
                                        <input type="text" name="patente" value={form.patente} onChange={handleChange}
                                            placeholder="Ej: AB1234 o ABCD12" className={`${inputCls} uppercase`} />
                                    </div>

                                    <div>
                                        <label className={labelCls}>Nro. de Factura, Guía o Cotización <span className="normal-case font-normal text-gray-400">(Opcional)</span></label>
                                        <input type="text" name="nroDocumento" value={form.nroDocumento} onChange={handleChange}
                                            placeholder="Ej: 123456" className={inputCls} />
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3 mt-4">
                                        <AlertCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={18} />
                                        <p className="text-sm text-blue-800">
                                            Proporcionar antecedentes como patente o número de documento nos ayuda a identificar tu caso mucho más rápido.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* ────────── PASO 3: Mensaje ────────── */}
                            {step === 3 && (
                                <div className="space-y-5 animate-fadeIn">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Paso 3 — Detalle de tu mensaje</p>

                                    <div>
                                        <label className={labelCls}>Tipo de mensaje *</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {['Sugerencia', 'Reclamo', 'Felicitación'].map((t) => (
                                                <label key={t}
                                                    className={`flex items-center justify-center p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${form.tipo === t
                                                        ? 'border-[#d2001c] bg-red-50 text-[#d2001c]'
                                                        : 'border-gray-100 bg-[#f8f9fa] hover:border-red-200 text-gray-600'
                                                        }`}>
                                                    <input type="radio" name="tipo" value={t}
                                                        checked={form.tipo === t} onChange={handleChange}
                                                        className="hidden" />
                                                    <span className="text-sm font-bold">{t}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelCls}>Mensaje *</label>
                                        <textarea name="mensaje" value={form.mensaje} onChange={handleChange}
                                            rows={6} placeholder="Escribe el detalle de tu situación de forma clara..."
                                            className={`${inputCls} resize-none`} required />
                                    </div>

                                    {/* Policy */}
                                    <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                                        <div className="flex items-center h-6">
                                            <input id="reclamo-terms" type="checkbox" name="acceptPolicy"
                                                checked={form.acceptPolicy} onChange={handleChange}
                                                className="w-5 h-5 rounded border-gray-300 accent-[#d2001c] cursor-pointer" required />
                                        </div>
                                        <label htmlFor="reclamo-terms" className="text-sm text-gray-600 leading-tight cursor-pointer">
                                            Autorizo a Automotriz Carmona a usar mis datos para dar seguimiento a este caso.
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
                                        Siguiente <ArrowRight size={16} />
                                    </button>
                                ) : (
                                    <button id="reclamo-submit" type="submit"
                                        disabled={isSubmitting || !step3Valid}
                                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#fdb2b9] hover:bg-[#ff9aa3] text-[#d2001c] disabled:opacity-50 disabled:cursor-not-allowed font-extrabold uppercase tracking-widest text-sm rounded-xl transition-colors">
                                        {isSubmitting ? 'Enviando...' : <><CheckCircle size={16} /> Enviar Mensaje</>}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* ── RIGHT: Trust Info (sticky) ──────────────────────── */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-28 bg-white p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">

                            <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-6">
                                <div className="w-16 h-16 bg-[#f8f9fa] rounded-full flex items-center justify-center flex-shrink-0">
                                    <Building size={24} className="text-[#d2001c]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Atención al Cliente</p>
                                    <h3 className="font-extrabold text-gray-900 uppercase tracking-tight text-lg leading-tight">
                                        Te escuchamos
                                    </h3>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                En Automotriz Carmona nos tomamos muy en serio tu retroalimentación. Constantemente revisamos estos formularios para optimizar nuestro servicio y garantizar tu satisfacción en cada visita.
                            </p>

                            {/* Contact Alternative */}
                            <div className="space-y-4 mb-6 pt-4 border-t border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Compromiso Carmona</p>

                                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                    <Clock size={20} className="text-[#d2001c] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Respuesta en 48 horas</p>
                                        <p className="text-xs text-gray-500 mt-1">Nos comprometemos a revisar y responder tu solicitud formal en un plazo máximo de 2 días hábiles.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                    <Share2 size={20} className="text-[#d2001c] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Canalización Inmediata</p>
                                        <p className="text-xs text-gray-500 mt-1">Tu mensaje llegará de forma directa a la jefatura del departamento asignado.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-6">
                                <p className="text-xs text-gray-400">Si buscas un contacto inmediato para temas generales, prefiere nuestros canales directos de <Link href="/contacto" className="text-[#d2001c] font-bold hover:underline">Atención Comercial</Link>.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default function ReclamosPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f4f6f8]" />}>
            <ReclamosContent />
        </Suspense>
    );
}
