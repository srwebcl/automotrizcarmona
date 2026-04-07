'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface PromoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PromoModal({ isOpen, onClose }: PromoModalProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        nombre: '',
        rut: '',
        telefono: '',
        correo: '',
        marca: '',
        modelo: '',
        anio: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    source: 'Banner Promocional Home',
                    recipients: ['crivera@carmonaycia.cl', 'marketing@carmonaycia.cl']
                }),
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setFormData({ nombre: '', rut: '', telefono: '', correo: '', marca: '', modelo: '', anio: '' });
                }, 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div 
                className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gray-900 p-6 text-white relative">
                    <button 
                        onClick={onClose}
                        className="absolute right-4 top-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <h2 className="text-2xl font-black uppercase tracking-tight">Solicitar Información</h2>
                    <p className="text-gray-400 text-sm font-medium mt-1">Completa tus datos y te contactaremos a la brevedad.</p>
                </div>

                {/* Body */}
                <div className="p-8">
                    {status === 'success' ? (
                        <div className="py-12 text-center animate-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={48} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud Enviada!</h3>
                            <p className="text-gray-500">Hemos recibido tus datos correctamente. Un asesor te contactará pronto.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Nombre Completo</label>
                                    <input 
                                        required
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        placeholder="Ej: Juan Pérez"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">RUT</label>
                                    <input 
                                        required
                                        type="text"
                                        name="rut"
                                        value={formData.rut}
                                        onChange={handleChange}
                                        placeholder="12.345.678-9"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Teléfono</label>
                                    <input 
                                        required
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        placeholder="+56 9 1234 5678"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Correo Electrónico</label>
                                    <input 
                                        required
                                        type="email"
                                        name="correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                        placeholder="juan@ejemplo.cl"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Marca del Auto</label>
                                    <input 
                                        required
                                        type="text"
                                        name="marca"
                                        value={formData.marca}
                                        onChange={handleChange}
                                        placeholder="Ej: Volkswagen"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Modelo</label>
                                    <input 
                                        required
                                        type="text"
                                        name="modelo"
                                        value={formData.modelo}
                                        onChange={handleChange}
                                        placeholder="Ej: Amarok"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Año</label>
                                    <input 
                                        required
                                        type="text"
                                        name="anio"
                                        value={formData.anio}
                                        onChange={handleChange}
                                        placeholder="Ej: 2024"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-sm"
                                    />
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-rose-600 bg-rose-50 p-3 rounded-xl text-xs font-bold animate-in slide-in-from-top-2 duration-300">
                                    <AlertCircle size={16} />
                                    <span>Hubo un error al enviar. Por favor intenta nuevamente.</span>
                                </div>
                            )}

                            <button 
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest shadow-xl shadow-gray-200 hover:shadow-2xl hover:scale-[1.02] active:scale-100 mt-4"
                            >
                                {status === 'loading' ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send size={18} />
                                        <span>Enviar Solicitud</span>
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
