'use client';

import React, { useState, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    CheckCircle, Paperclip, X as XIcon,
    ArrowLeft, Share2, AlertCircle, ChevronDown, Building, Clock
} from 'lucide-react';

// ─── CRM endpoint ──────────────────────────────────────────────────────────
const CRM_API_URL = 'https://reclamos.automotrizcarmona.cl/api/public/claims';

// ─── Catálogos (iguales a los del CRM — src/lib/constants.ts) ─────────────
const BRANDS = [
    'Audi', 'BMW', 'BMW Motorrad', 'CUPRA', 'Dongfeng', 'Foton', 'Geely',
    'Honda', 'Jetour', 'Kaiyi', 'Karry', 'Maxus', 'MG', 'MINI', 'SEAT',
    'Soueast', 'Toyota', 'Volkswagen', 'Volvo',
    'Foton Camiones', 'Iveco', 'MAN', 'VW Camiones',
];
const USED_CAR_BRANDS = ['Usados', 'Usados Premium'];
const AREAS = ['Ventas', 'Servicio Técnico', 'Repuestos', 'Recursos Humanos'];
const BRANCHES = ['La Serena', 'Copiapó'];

const PHONE_PREFIX = '+56 9 ';

// ─── Validación de RUT chileno (igual al CRM — src/lib/rut.ts) ────────────
function isValidRut(raw: string): boolean {
    const clean = raw.replace(/[.\s]/g, '').toUpperCase();
    const match = clean.match(/^(\d{1,8})-?([0-9K])$/);
    if (!match) return false;
    const [, body, checkDigit] = match;
    let sum = 0;
    let multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
        sum += Number(body[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    const remainder = 11 - (sum % 11);
    const expected = remainder === 11 ? '0' : remainder === 10 ? 'K' : String(remainder);
    return expected === checkDigit;
}

// ─── Reusable input ────────────────────────────────────────────────────────────
const inputCls =
    'w-full bg-[#f8f9fa] border-2 border-transparent focus:border-[#d2001c] focus:bg-white text-gray-900 font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400';
const labelCls = 'block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2';

// ─── Main ─────────────────────────────────────────────────────────────────────
function ReclamosContent() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ticketCode, setTicketCode] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [showMissing, setShowMissing] = useState(false);

    const [form, setForm] = useState({
        // Tus datos
        customerName: '',
        rut: '',
        email: '',
        phone: PHONE_PREFIX,
        branch: '',
        // Antecedentes (vehículo / caso)
        noVehicle: false,
        brand: '',
        vehicleModel: '',
        plate: '',
        eventDate: '',
        area: '',
        // Mensaje
        description: '',
        expectedSolution: '',
        acceptPolicy: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        const checked = type === 'checkbox' ? target.checked : undefined;
        setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    };

    // El celular siempre queda como "+56 9 XXXX XXXX": se descarta todo lo
    // que no sea dígito, se saca el "56 9" fijo si el usuario lo reescribe,
    // se limita a 8 dígitos reales y se formatea con el espacio al medio.
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '');
        const withoutPrefix = digits.startsWith('569') ? digits.slice(3) : digits;
        const number = withoutPrefix.slice(0, 8);
        const formatted = number.length > 4 ? `${number.slice(0, 4)} ${number.slice(4)}` : number;
        setForm((p) => ({ ...p, phone: PHONE_PREFIX + formatted }));
    };
    const phoneDigitsCount = form.phone.slice(PHONE_PREFIX.length).replace(/\D/g, '').length;

    // El input de archivo reemplaza su selección completa cada vez que se
    // reabre el explorador — se fusiona con lo ya elegido para poder ir
    // agregando adjuntos de a uno, igual que en el formulario del CRM.
    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = Array.from(e.target.files ?? []);
        setFiles((prev) => {
            const merged = [...prev];
            for (const f of picked) {
                if (!merged.some((m) => m.name === f.name && m.size === f.size && m.lastModified === f.lastModified)) {
                    merged.push(f);
                }
            }
            return merged;
        });
    };
    const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

    // ── Qué falta para poder enviar ──────────────────────────────────────────
    const missingFields: string[] = [];
    if (!form.customerName.trim()) missingFields.push('Nombre completo');
    if (!isValidRut(form.rut)) missingFields.push('RUT válido');
    if (!/\S+@\S+\.\S+/.test(form.email)) missingFields.push('Correo electrónico válido');
    if (phoneDigitsCount < 8) missingFields.push('Celular completo (8 dígitos)');
    if (!form.branch) missingFields.push('Sucursal');
    if (!form.area) missingFields.push('Área relacionada');
    if (!form.eventDate) missingFields.push('Fecha de compra o visita');
    if (!form.noVehicle) {
        if (!form.brand) missingFields.push('Marca del vehículo');
        if (!form.vehicleModel.trim()) missingFields.push('Modelo del vehículo');
        if (!form.plate.trim()) missingFields.push('Patente');
    }
    if (form.description.trim().length < 10) missingFields.push('Descripción de los hechos (mínimo 10 caracteres)');
    if (!form.expectedSolution.trim()) missingFields.push('Solución que esperas');
    if (!form.acceptPolicy) missingFields.push('Autorización de uso de tus datos');
    const isFormValid = missingFields.length === 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) {
            setShowMissing(true);
            return;
        }
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const fd = new FormData();
            fd.set('customerName', form.customerName);
            fd.set('rut', form.rut);
            fd.set('email', form.email);
            fd.set('phone', form.phone);
            fd.set('branch', form.branch);
            fd.set('eventDate', form.eventDate);
            fd.set('area', form.area);
            fd.set('description', form.description);
            fd.set('expectedSolution', form.expectedSolution);
            if (form.noVehicle) {
                fd.set('noVehicle', 'true');
            } else {
                fd.set('brand', form.brand);
                fd.set('vehicleModel', form.vehicleModel);
                fd.set('plate', form.plate);
            }
            for (const file of files) fd.append('attachments', file);

            const response = await fetch(CRM_API_URL, { method: 'POST', body: fd });
            const data = await response.json();

            if (response.ok && data.success) {
                setTicketCode(data.code);
                setSuccess(true);
            } else {
                throw new Error(data.error || 'Error al enviar el formulario');
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            setSubmitError(error?.message || 'Hubo un problema al enviar tu formulario. Por favor intentalo más tarde.');
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
                        Hemos recibido tu reclamo para el área de <strong className="text-gray-900">{form.area}</strong>.<br />
                        Nuestro equipo de Atención al Cliente revisará los antecedentes y se pondrá en contacto contigo a la brevedad.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left mb-8 text-sm space-y-3">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Resumen</p>
                        {[
                            ['Ticket', ticketCode],
                            ['Nombre', form.customerName],
                            ['RUT', form.rut],
                            ['Área', form.area],
                            ['Sucursal', form.branch],
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
        <main className="h-screen pt-[104px] lg:pt-[88px] bg-[#f4f6f8] font-sans selection:bg-[#d2001c] selection:text-white flex flex-col overflow-y-auto lg:overflow-hidden">

            {/* ── TOPBAR: Volver ── */}
            <div className="shrink-0 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center">
                    <button onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors whitespace-nowrap flex-shrink-0">
                        <ArrowLeft size={15} />
                        <span>Volver</span>
                    </button>
                </div>
            </div>

            {/* ── CONTENIDO: en desktop, altura fija (lo que sobra del viewport);
                 la columna de confianza queda fija y el formulario scrollea
                 dentro de su propia columna. En mobile, todo se apila y la
                 página entera hace scroll normal — el formulario va primero
                 para no obligar a bajar antes de ver los campos. ── */}
            <div className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-6 lg:py-8 lg:min-h-0 lg:flex lg:gap-8">

                {/* Formulario — en desktop queda a la derecha con scroll propio */}
                <div className="lg:order-2 lg:w-7/12 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:pr-2">
                    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100">

                        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
                            Sugerencias y Reclamos
                        </h1>
                        <p className="text-gray-400 text-sm mb-8 border-b border-gray-100 pb-6">
                            Para Automotriz Carmona tu opinión es fundamental. Ayúdanos a mejorar contándonos tu experiencia.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* ── Tus datos ── */}
                            <div className="space-y-5">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tus datos personales</p>

                                <div>
                                    <label className={labelCls}>Nombre Completo *</label>
                                    <input type="text" name="customerName" value={form.customerName} onChange={handleChange} className={inputCls} />
                                </div>

                                <div>
                                    <label className={labelCls}>RUT *</label>
                                    <input type="text" name="rut" value={form.rut} onChange={handleChange}
                                        placeholder="Ej: 12.345.678-9" className={inputCls} />
                                    {form.rut && !isValidRut(form.rut) && (
                                        <p className="text-xs text-red-600 font-medium mt-1.5">RUT inválido — revisa el dígito verificador.</p>
                                    )}
                                </div>

                                <div>
                                    <label className={labelCls}>Correo Electrónico *</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange}
                                        placeholder="tucorreo@ejemplo.cl" className={inputCls} />
                                </div>

                                <div>
                                    <label className={labelCls}>Celular *</label>
                                    <input type="tel" inputMode="numeric" name="phone" value={form.phone} onChange={handlePhoneChange} className={inputCls} />
                                </div>

                                <div>
                                    <label className={labelCls}>Sucursal *</label>
                                    <div className="relative">
                                        <select name="branch" value={form.branch} onChange={handleChange}
                                            className={`${inputCls} appearance-none cursor-pointer pr-10`}>
                                            <option value="">Selecciona una sucursal...</option>
                                            {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* ── Antecedentes del caso ── */}
                            <div className="space-y-5 pt-6 border-t border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Antecedentes del caso</p>

                                <div>
                                    <label className={labelCls}>Área relacionada *</label>
                                    <div className="relative">
                                        <select name="area" value={form.area} onChange={handleChange}
                                            className={`${inputCls} appearance-none cursor-pointer pr-10`}>
                                            <option value="">Selecciona un área...</option>
                                            {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelCls}>Fecha de compra o visita *</label>
                                    <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} className={inputCls} />
                                </div>

                                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f8f9fa] cursor-pointer">
                                    <input type="checkbox" name="noVehicle" checked={form.noVehicle} onChange={handleChange}
                                        className="w-5 h-5 rounded border-gray-300 accent-[#d2001c] cursor-pointer" />
                                    <span className="text-sm font-medium text-gray-700">Este reclamo no está relacionado con un vehículo</span>
                                </label>

                                {!form.noVehicle && (
                                    <>
                                        <div>
                                            <label className={labelCls}>Marca *</label>
                                            <div className="relative">
                                                <select name="brand" value={form.brand} onChange={handleChange}
                                                    className={`${inputCls} appearance-none cursor-pointer pr-10`}>
                                                    <option value="">Selecciona una marca...</option>
                                                    <optgroup label="Vehículos Usados">
                                                        {USED_CAR_BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                                                    </optgroup>
                                                    <optgroup label="Marcas Oficiales">
                                                        {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                                                    </optgroup>
                                                </select>
                                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelCls}>Modelo *</label>
                                            <input type="text" name="vehicleModel" value={form.vehicleModel} onChange={handleChange}
                                                placeholder="Ej: Yaris Cross" className={inputCls} />
                                        </div>

                                        <div>
                                            <label className={labelCls}>Patente *</label>
                                            <input type="text" name="plate" value={form.plate} onChange={handleChange}
                                                placeholder="Ej: AB1234 o ABCD12" className={`${inputCls} uppercase`} />
                                        </div>
                                    </>
                                )}

                                <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={18} />
                                    <p className="text-sm text-blue-800">
                                        Si tu reclamo no está relacionado con un vehículo (ej. Recursos Humanos), marca la casilla de arriba.
                                    </p>
                                </div>
                            </div>

                            {/* ── Mensaje ── */}
                            <div className="space-y-5 pt-6 border-t border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Detalle de tu mensaje</p>

                                <div>
                                    <label className={labelCls}>Describe los hechos *</label>
                                    <textarea name="description" value={form.description} onChange={handleChange}
                                        rows={5} placeholder="Escribe el detalle de tu situación de forma clara..."
                                        className={`${inputCls} resize-none`} />
                                </div>

                                <div>
                                    <label className={labelCls}>Solución que esperas *</label>
                                    <textarea name="expectedSolution" value={form.expectedSolution} onChange={handleChange}
                                        rows={3} placeholder="¿Qué solución esperas de parte de Carmona?"
                                        className={`${inputCls} resize-none`} />
                                </div>

                                <div>
                                    <label className={labelCls}>Adjuntar imágenes o documentos <span className="normal-case font-normal text-gray-400">(Opcional)</span></label>
                                    {files.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {files.map((file, i) => (
                                                <span key={`${file.name}-${file.size}-${file.lastModified}`} className="flex items-center gap-1.5 bg-red-50 text-[#d2001c] border border-red-100 text-xs font-semibold pl-2.5 pr-1.5 py-1 rounded-lg">
                                                    <Paperclip size={12} />
                                                    <span className="max-w-[160px] truncate">{file.name}</span>
                                                    <button type="button" onClick={() => removeFile(i)} className="p-0.5 rounded-full hover:bg-red-100 transition-colors">
                                                        <XIcon size={13} />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <button type="button" onClick={() => fileInputRef.current?.click()}
                                        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-[#d2001c] rounded-xl py-4 text-sm font-bold text-gray-500 hover:text-[#d2001c] transition-colors">
                                        <Paperclip size={18} /> Seleccionar Archivos
                                    </button>
                                    <input type="file" ref={fileInputRef} onChange={handleFilesChange} className="hidden" multiple />
                                </div>

                                {/* Policy */}
                                <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                                    <div className="flex items-center h-6">
                                        <input id="reclamo-terms" type="checkbox" name="acceptPolicy"
                                            checked={form.acceptPolicy} onChange={handleChange}
                                            className="w-5 h-5 rounded border-gray-300 accent-[#d2001c] cursor-pointer" />
                                    </div>
                                    <label htmlFor="reclamo-terms" className="text-sm text-gray-600 leading-tight cursor-pointer">
                                        Autorizo a Automotriz Carmona a usar mis datos para dar seguimiento a este caso.
                                    </label>
                                </div>

                                {submitError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl p-4">{submitError}</div>
                                )}
                            </div>

                            {/* ── Enviar — el botón deja clarísimo si está listo o qué falta ── */}
                            <div className="pt-6 border-t border-gray-100">
                                <button
                                    id="reclamo-submit"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-extrabold uppercase tracking-widest text-sm transition-all ${isFormValid
                                        ? 'bg-[#d2001c] hover:bg-[#b0001a] text-white shadow-lg shadow-[#d2001c]/30 cursor-pointer'
                                        : 'bg-gray-100 text-gray-400 cursor-pointer hover:bg-gray-200'
                                        } ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                                >
                                    {isSubmitting ? (
                                        'Enviando...'
                                    ) : isFormValid ? (
                                        <><CheckCircle size={18} /> Enviar Reclamo</>
                                    ) : (
                                        <><AlertCircle size={18} /> Falta completar información</>
                                    )}
                                </button>
                                {!isFormValid && showMissing && (
                                    <p className="text-xs text-gray-500 mt-3 text-center leading-relaxed">
                                        Para enviar, completa: <span className="font-semibold text-gray-700">{missingFields.join(' · ')}</span>
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* ── Trust Info — en desktop queda a la izquierda, fija ── */}
                <div className="lg:order-1 lg:w-5/12 lg:h-full mt-8 lg:mt-0">
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">

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
