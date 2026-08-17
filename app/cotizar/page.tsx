'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { getModelDetails, getTruckBrands, getTrucksByBrand, API_URL } from '@/lib/api';
import { formatRutMasked, isValidRut } from '@/lib/rut';
import { CheckCircle, Info, ChevronDown, ArrowLeft, Car, User, Truck as TruckIcon, MapPin, Phone, Store } from 'lucide-react';



const STEPS = [
    { id: 1, label: 'Tu vehículo', icon: Car },
    { id: 2, label: 'Tus datos', icon: User },
];

function CotizarContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const marca = searchParams.get('marca') || 'toyota';
    const modeloId = searchParams.get('modelo');
    const versionQuery = searchParams.get('version');
    const vinQuery = searchParams.get('vin');

    const [model, setModel] = useState<any>(null);
    const [version, setVersion] = useState<any>(null);
    const [availableVersions, setAvailableVersions] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(!!modeloId);
    const [success, setSuccess] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Form data
    const [formData, setFormData] = useState({
        rut: '',
        nombre: '',
        apellido: '',
        correo: '',
        empresa: '',
        celular: '+56 9 ',
        ciudad: '',
        acceptPolicy: false
    });

    const [branches, setBranches] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/branches`)
            .then(r => r.json())
            .then(json => setBranches(json.data || json))
            .catch(console.error);
    }, []);

    const brandBranches = React.useMemo(() => {
        return branches.filter(b => 
            (b.brands_list || []).some((br: string) => br.toLowerCase() === marca.toLowerCase()) && 
            b.type === 'Sala de Ventas'
        );
    }, [branches, marca]);

    const availableCities = React.useMemo(() => {
        return [...new Set(brandBranches.map(b => b.city))].sort();
    }, [brandBranches]);

    // Set default city if exactly 1 is available, or clear if current city is invalid
    useEffect(() => {
        if (availableCities.length === 1) {
            setFormData(p => ({ ...p, ciudad: availableCities[0] }));
        } else if (availableCities.length > 1 && !availableCities.includes(formData.ciudad)) {
            setFormData(p => ({ ...p, ciudad: '' }));
        }
    }, [availableCities, formData.ciudad]);

    useEffect(() => {
        const loadModelData = async () => {
            if (modeloId) {
                // Primero intentamos como auto nuevo
                let apiModel = await getModelDetails(marca.toLowerCase(), modeloId);
                
                if (apiModel) {
                    setModel(apiModel);
                    const availableVers = (apiModel.versions && apiModel.versions.length > 0) ? apiModel.versions : [
                        {
                            name: `${apiModel.name} Base`,
                            transmission: 'Manual',
                            fuel: 'Gasolina',
                            listPrice: apiModel.price,
                            bonusPrice: apiModel.price
                        }
                    ];
                    const foundVersion = availableVers.find((v: any) => v.name === versionQuery);
                    
                    // Si viene un VIN, buscamos si es una unidad en promoción
                    if (vinQuery && apiModel.promoUnits) {
                        const promoUnit = apiModel.promoUnits.find((u: any) => u.vin === vinQuery);
                        if (promoUnit) {
                            setVersion({
                                name: promoUnit.versionName || foundVersion?.name || apiModel.name,
                                sapMaterialCode: foundVersion?.sapMaterialCode,
                                transmission: foundVersion?.transmission || '-',
                                fuel: foundVersion?.fuel || '-',
                                listPrice: promoUnit.listPrice || (promoUnit.promoPrice + promoUnit.promoBonus),
                                bonusPrice: promoUnit.promoPrice,
                                vin: promoUnit.vin,
                                isPromotion: true
                            });
                        } else {
                            setVersion(foundVersion || availableVers[0]);
                        }
                    } else {
                        setVersion(foundVersion || availableVers[0]);
                    }

                    setAvailableVersions(availableVers);
                } else {
                    // Si no es un auto, buscamos en camiones
                    const trucksData = await getTrucksByBrand(marca.toLowerCase());
                    if (trucksData) {
                        const truckModel = trucksData.trucks.find(t => t.slug === modeloId);
                        if (truckModel) {
                            // Adaptamos el formato de camion a la vista de cotización
                            const adaptedTruck = {
                                name: truckModel.name,
                                image: truckModel.image_url,
                                price: 0, // Los camiones no tienen precio base definido aún
                                isTruck: true
                            };
                            setModel(adaptedTruck);
                            const truckVersion = {
                                name: truckModel.name,
                                transmission: '-',
                                fuel: '-',
                                listPrice: 0,
                                bonusPrice: 0,
                                isTruck: true
                            };
                            setVersion(truckVersion);
                            setAvailableVersions([truckVersion]);
                        }
                    }
                }
            }
            setIsLoading(false);
        };
        loadModelData();
    }, [marca, modeloId, versionQuery, vinQuery]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        if (name === 'celular') {
            // Force start with +56 9
            if (!value.startsWith('+56 9 ')) {
                return;
            }
        }
        if (name === 'rut') {
            // Auto-formatea con puntos y guión mientras el cliente escribe
            // (ej: "17.625.818-7"), sin importar cómo lo haya tipeado.
            setFormData(prev => ({ ...prev, rut: formatRutMasked(value) }));
            return;
        }
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // RUT válido (dígito verificador correcto) — solo se marca error si ya
    // hay algo escrito, para no mostrar el error apenas se abre el formulario.
    const rutTouched = formData.rut.length > 0;
    const rutIsValid = !rutTouched || isValidRut(formData.rut);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.acceptPolicy) return;
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source: 'ventas',
                    customer: {
                        rut: formData.rut,
                        first_name: formData.nombre,
                        last_name: formData.apellido,
                        email: formData.correo,
                        phone: formData.celular,
                        company: formData.empresa,
                        city: formData.ciudad,
                    },
                    vehicle: {
                        brand_name: marca,
                        model_name: model?.name,
                        version_name: version?.name,
                        sap_material_code: version?.sapMaterialCode || null,
                        price: version?.bonusPrice || version?.listPrice || model?.price || 0,
                        vin: version?.vin || null,
                        year: new Date().getFullYear().toString(),
                        is_truck: !!model?.isTruck
                    },
                    request_details: {
                        message: `Cotización solicitada para ${marca} ${model?.name}${version?.vin ? ` (UNIDAD PROMO VIN: ${version.vin})` : ''}${!model?.isTruck ? ` - Versión: ${version?.name}` : ''}. Empresa: ${formData.empresa || 'N/A'}`
                    }
                }),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/');
                }, 6000);
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert("Hubo un problema al procesar tu cotización. Por favor reintenta.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-[#f4f6f8] px-4 font-sans">
                <div className="max-w-2xl bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 text-center relative overflow-hidden">
                    {/* Simulated email header banner */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-[#d2001c]"></div>

                    <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle size={32} />
                    </div>

                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">¡Gracias por cotizar!</h2>
                    <p className="text-gray-500 mb-8 border-b border-gray-100 pb-8 text-sm sm:text-base">
                        Hemos recibido tu solicitud de cotización y un ejecutivo de Automotriz Carmona te contactará a la brevedad. <br />
                        *(Por favor revisa tu bandeja de entrada o spam para ver los detalles)*
                    </p>

                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left mb-8 shadow-inner">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Simulación de tu correo (Automotriz Carmona):</p>
                        <h3 className="text-xl font-extrabold text-[#d2001c] mb-2 uppercase tracking-tight">{marca} {version?.name || model?.name}</h3>

                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-6">
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Precio con Financiamiento</p>
                                <p className="text-lg font-bold text-gray-700">{formatPrice(version?.bonusPrice || model?.price)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Precio de Lista</p>
                                <p className="text-lg font-bold text-gray-400 line-through">{formatPrice(version?.listPrice || model?.price + 1000000)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Transmisión</p>
                                <p className="text-base font-bold text-gray-900">{version?.transmission}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Combustible</p>
                                <p className="text-base font-bold text-gray-900">{version?.fuel}</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-sm font-bold text-gray-900 mb-1">¿Existe financiamiento para este auto?</p>
                            <p className="text-sm text-gray-500">Sí, ofrecemos financiamiento mediante Crédito Inteligente o Convencional, puedes solicitar una simulación al ejecutivo de ventas cuando te contacte.</p>
                        </div>
                    </div>

                    <button onClick={() => router.push('/')} className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-lg font-bold transition-colors">
                        Volver al Inicio
                    </button>
                    <p className="text-xs text-gray-400 mt-4">Redirigiendo automáticamente en unos segundos...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen pt-[104px] lg:pt-[88px] pb-12 bg-[#f4f6f8] font-sans selection:bg-[#d2001c] selection:text-white">
            {/* ── TOPBAR ── */}
            <div className={`sticky z-40 bg-white border-b border-gray-100 shadow-sm transition-all duration-300 ${isScrolled ? 'top-[72px]' : 'top-[88px]'}`}>
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
                    <Link href={vinQuery ? `/liquidacion?vin=${vinQuery}` : (model?.isTruck ? `/camiones/${marca.toLowerCase()}` : `/nuevos/${marca.toLowerCase()}/${modeloId}`)}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors whitespace-nowrap flex-shrink-0">
                        <ArrowLeft size={15} />
                        <span className="hidden sm:inline">{vinQuery ? 'Volver a Liquidación' : (model?.isTruck ? `Volver a ${marca.charAt(0).toUpperCase() + marca.slice(1)}` : 'Volver a Versiones')}</span>
                        <span className="sm:hidden">Volver</span>
                    </Link>

                    <div className="flex items-center gap-1 sm:gap-2">
                        {STEPS.map((s, idx) => {
                            const stepStr = 2; // Hardcoded we are on step 2 (Cotización)
                            const done = s.id < stepStr; const active = s.id === stepStr; const Icon = s.icon;
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

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* LEFT COLUMN: Form */}
                    <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                            Comencemos con tu información
                        </h1>
                        <p className="text-gray-500 mb-8 border-b border-gray-100 pb-8 text-sm sm:text-base">
                            Ingresa tu <strong className="text-gray-900">RUT</strong> y verifica tus datos para proceder con la cotización de tu vehículo nuevo.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Ciudad */}
                            {availableCities.length > 1 && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ciudad de Atención *</label>
                                    <div className="relative">
                                        <select
                                            name="ciudad"
                                            value={formData.ciudad}
                                            onChange={handleChange}
                                            className="w-full bg-[#f8f9fa] border-2 border-transparent focus:border-[#d2001c] focus:bg-white text-gray-900 font-medium rounded-xl px-4 py-3.5 outline-none transition-all appearance-none cursor-pointer"
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

                            {/* RUT Field */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">RUT *</label>
                                <input
                                    type="text"
                                    inputMode="text"
                                    name="rut"
                                    value={formData.rut}
                                    onChange={handleChange}
                                    placeholder="Ej: 12.345.678-9"
                                    maxLength={12}
                                    aria-invalid={!rutIsValid}
                                    className={`w-full bg-[#f8f9fa] border-2 focus:bg-white text-gray-900 font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400 ${rutIsValid ? 'border-transparent focus:border-[#d2001c]' : 'border-red-300 focus:border-red-400'}`}
                                    required
                                />
                                {!rutIsValid && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                        El RUT ingresado no es válido. Revisa el número y el dígito verificador.
                                    </p>
                                )}
                            </div>

                            {/* Nombre & Apellido */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nombre *</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="w-full bg-[#f8f9fa] border-2 border-transparent focus:border-[#d2001c] focus:bg-white text-gray-900 font-medium rounded-xl px-4 py-3.5 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Apellido *</label>
                                    <input
                                        type="text"
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleChange}
                                        className="w-full bg-[#f8f9fa] border-2 border-transparent focus:border-[#d2001c] focus:bg-white text-gray-900 font-medium rounded-xl px-4 py-3.5 outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Correo Electrónico *</label>
                                <input
                                    type="email"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    placeholder="tucorreo@ejemplo.cl"
                                    className="w-full bg-[#f8f9fa] border-2 border-transparent focus:border-[#d2001c] focus:bg-white text-gray-900 font-medium rounded-xl px-4 py-3.5 outline-none transition-all"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Celular *</label>
                                    <input
                                        type="tel"
                                        name="celular"
                                        value={formData.celular}
                                        onChange={handleChange}
                                        className="w-full bg-[#f8f9fa] border-2 border-transparent focus:border-[#d2001c] focus:bg-white text-gray-900 font-medium rounded-xl px-4 py-3.5 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Empresa (Opcional)</label>
                                    <input
                                        type="text"
                                        name="empresa"
                                        value={formData.empresa}
                                        onChange={handleChange}
                                        placeholder="Nombre de tu empresa"
                                        className="w-full bg-[#f8f9fa] border-2 border-transparent focus:border-[#d2001c] focus:bg-white text-gray-900 font-medium rounded-xl px-4 py-3.5 outline-none transition-all"
                                    />
                                </div>
                            </div>



                            {/* Checkbox */}
                            <div className="flex items-start gap-3 mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center h-6">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        name="acceptPolicy"
                                        checked={formData.acceptPolicy}
                                        onChange={handleChange}
                                        className="w-5 h-5 rounded border-gray-300 text-[#d2001c] focus:ring-[#d2001c] accent-[#d2001c] cursor-pointer"
                                        required
                                    />
                                </div>
                                <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                                    Acepto recibir comunicaciones de Automotriz Carmona. <a href="#" className="underline hover:text-gray-900">Revisa nuestra Política de privacidad.</a>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.acceptPolicy || !isValidRut(formData.rut)}
                                className="w-full sm:w-auto mt-4 px-10 py-4 bg-gray-900 hover:bg-black text-white disabled:bg-gray-400 disabled:cursor-not-allowed font-extrabold uppercase tracking-widest rounded-xl transition-colors min-w-[200px]"
                            >
                                {isSubmitting ? 'Procesando...' : 'Cotizar'}
                            </button>
                        </form>

                        {/* ── INFO DINÁMICA DE CONTACTO (MOBILE ONLY) ── */}
                        <div className="block lg:hidden mt-10 pt-8 border-t border-gray-200 space-y-4">
                            {(() => {
                                const salesBranch = brandBranches.find(b => b.city === formData.ciudad) 
                                                    || brandBranches[0] 
                                                    || { address: 'Avenida Balmaceda 3681', city: 'La Serena', phone: '+56 9 8474 9397' }; // Fallback

                                return (
                                    <>
                                        <div className="flex items-start gap-3">
                                            <MapPin size={18} className="text-[#d2001c] mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Donde encontrarnos</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {salesBranch.address}
                                                </p>
                                                <p className="text-[11px] text-gray-500">{salesBranch.city}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone size={18} className="text-[#d2001c] flex-shrink-0" />
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Central de Ventas</p>
                                                <p className="text-sm font-semibold text-gray-900">{salesBranch.phone || '+56 9 8474 9397'}</p>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Resumen del Vehículo */}
                    <div className="lg:col-span-5 relative">
                        {/* Sticky container limits the scrolling bounding rect */}
                        <div className="sticky top-28 bg-white p-4 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">

                            {/* Head Vehicle Info */}
                            {model && version ? (
                                <>
                                    <div className="flex items-center gap-3 sm:gap-4 border-b border-gray-100 pb-4 sm:pb-6 mb-4 sm:mb-6">
                                        <div className="relative w-20 sm:w-24 h-12 sm:h-14 bg-[#f8f9fa] rounded-lg">
                                            {model.image ? (
                                                <Image
                                                    src={model.image}
                                                    alt={model.name}
                                                    fill
                                                    className="object-contain p-1"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <TruckIcon size={24} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 pr-2">
                                            <h3 className="font-extrabold text-gray-900 uppercase tracking-tight text-base sm:text-lg leading-tight mb-1">
                                                {marca} {model.name}
                                            </h3>
                                            {(availableVersions.length > 1 && !model.isTruck) ? (
                                                <div className="relative w-full mt-1.5">
                                                    <select 
                                                        className="w-full text-[12px] sm:text-[13px] font-bold text-gray-700 bg-[#f8f9fa] border-2 border-transparent hover:border-gray-200 focus:border-[#d2001c] focus:bg-white rounded-lg pl-3 pr-8 py-1.5 sm:py-2 outline-none appearance-none cursor-pointer transition-colors truncate shadow-sm"
                                                        value={version.name}
                                                        onChange={(e) => {
                                                            const newVersion = e.target.value;
                                                            router.push(`/cotizar?marca=${marca}&modelo=${modeloId}&version=${encodeURIComponent(newVersion)}`);
                                                        }}
                                                    >
                                                        {availableVersions.map((v: any, idx: number) => (
                                                            <option key={idx} value={v.name}>{v.name.replace(new RegExp(`^${model.name}\\s*`, 'i'), '')}</option>
                                                        ))}
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#d2001c]">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500 uppercase font-medium mt-0.5">
                                                    {model.isTruck ? 'Modelo Camión' : version.name.replace(new RegExp(`^${model.name}\\s*`, 'i'), '')}
                                                </p>
                                            )}
                                            {version?.vin && (
                                                <p className="text-[10px] font-black text-[#d2001c] uppercase tracking-widest mt-1">
                                                    VIN: {version.vin}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Pricing List */}
                                    {!model.isTruck ? (
                                        <div className="space-y-2 sm:space-y-4">
                                            <div className="flex justify-between items-center group pt-2 sm:pt-4 pb-1 sm:pb-2 border-b border-gray-50">
                                                <span className="text-gray-400 font-medium text-xs sm:text-sm">
                                                    Precio de Lista
                                                </span>
                                                <span className="font-bold text-gray-400 line-through text-sm sm:text-base">{formatPrice(version.listPrice)}</span>
                                            </div>
                                            <div className="flex justify-between items-center group mb-1 sm:mb-2">
                                                <span className="text-gray-500 font-medium flex items-center gap-1.5 text-xs sm:text-sm">
                                                    {version.isPromotion ? 'Bono Liquidación' : 'Bono Financiamiento'} <Info size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                                                </span>
                                                <span className="font-bold text-gray-600 text-sm sm:text-base">{formatPrice((version.listPrice - (version.bonusPrice || version.listPrice)) || version.bonus)}</span>
                                            </div>
                                            <div className="flex justify-between items-center group mt-2 sm:mt-4">
                                                <span className="text-gray-900 font-bold flex items-center gap-1.5 text-sm sm:text-base">
                                                    {version.isPromotion ? 'Precio Liquidación' : 'Precio con Financiamiento'}
                                                </span>
                                                <span className="font-black text-gray-900 text-lg sm:text-xl">{formatPrice(version.bonusPrice)}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                                            <div className="flex gap-3">
                                                <Info className="text-blue-500 flex-shrink-0" size={18} />
                                                <p className="text-sm text-blue-700 leading-snug">
                                                    Debido a la naturaleza técnica de los camiones, el precio final y las especificaciones se entregarán de forma personalizada por un ejecutivo.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {/* ── INFO DINÁMICA DE CONTACTO (DESKTOP ONLY) ── */}
                                    <div className="hidden lg:block mt-8 pt-6 border-t border-gray-100 space-y-4">
                                        {(() => {
                                            const salesBranch = brandBranches.find(b => b.city === formData.ciudad) 
                                                                || brandBranches[0] 
                                                                || { address: 'Avenida Balmaceda 3681', city: 'La Serena', phone: '+56 9 8474 9397' }; // Fallback

                                            return (
                                                <>
                                                    <div className="flex items-start gap-3">
                                                        <MapPin size={18} className="text-[#d2001c] mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Donde encontrarnos</p>
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {salesBranch.address}
                                                            </p>
                                                            <p className="text-[11px] text-gray-500">{salesBranch.city}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Phone size={18} className="text-[#d2001c] flex-shrink-0" />
                                                        <div>
                                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Central de Ventas</p>
                                                            <p className="text-sm font-semibold text-gray-900">{salesBranch.phone || '+56 9 8474 9397'}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </>
                            ) : isLoading ? (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-12 h-12 border-4 border-gray-100 border-t-[#d2001c] rounded-full animate-spin mb-4 shadow-sm" />
                                    <p className="text-gray-500 font-medium animate-pulse">Cargando información del vehículo...</p>
                                </div>
                            ) : (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                    </div>
                                    <p className="text-gray-500 font-medium">No se ha seleccionado ningún vehículo.</p>
                                    <p className="text-sm text-gray-400 mt-2">Por favor regresa al catálogo y elige el modelo que quieres cotizar.</p>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default function CotizarPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f4f6f8]" />}>
            <CotizarContent />
        </Suspense>
    );
}
