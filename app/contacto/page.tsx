'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, MessageSquare, Mail, Phone, MapPin, Send } from 'lucide-react';
import ContactoBanner from '@/components/ContactoBanner';

const DISCOVER_ITEMS = [
    {
        title: 'Autos Nuevos',
        subtitle: 'Stock disponible',
        link: '/nuevos',
        image: '/images/banners/NUEVO-TIGUAN-2025-07-1350x499.png',
    },
    {
        title: 'Seminuevos',
        subtitle: 'Calidad certificada',
        link: 'https://seminuevos.automotrizcarmona.cl',
        image: '/images/toyota/Pickup/hilux/galeria_2408.jpg',
    },
    {
        title: 'Repuestos',
        subtitle: 'Repuestos genuinos',
        link: '/repuestos',
        image: '/images/quick_access_repuestos_1770350949447.png',
    },
    {
        title: 'Sucursales',
        subtitle: 'Encuéntranos aquí',
        link: '/sucursales',
        image: '/images/quick_access_servicio_1770350934207.png',
    },
];

export default function ContactoPage() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        motivo: '',
        mensaje: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally send the data mapping to the backend or CRM
        console.log("Form Submitted", formData);
        alert("Mensaje enviado con éxito. Te contactaremos pronto.");
    };

    return (
        <main className="min-h-screen bg-white font-sans pt-[88px]">
            {/* 1. BANNER */}
            <ContactoBanner />

            {/* 2. FORMULARIO E INFO */}
            <section className="bg-white py-14 md:py-20">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 mb-4 text-sm font-bold tracking-widest text-gray-500 uppercase">
                            <MessageSquare size={16} />
                            <span>Atención al Cliente</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight mb-5">
                            Ponte en{' '}
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">
                                Contacto
                            </span>
                        </h1>
                        <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                            Completa el formulario a continuación o comunícate a través de nuestros canales directos. Estamos aquí para ayudarte.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                        {/* Información Directa (Izquierda) */}
                        <div className="lg:w-1/3 flex flex-col gap-8">
                            <div>
                                <h3 className="text-xl font-extrabold text-gray-900 mb-6">Información General</h3>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-xl text-gray-500 flex-shrink-0">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Teléfono</p>
                                            <a href="tel:+56984749397" className="text-gray-900 font-medium hover:text-carmona-orange transition-colors">+56 9 8474 9397</a>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-xl text-gray-500 flex-shrink-0">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                                            <a href="mailto:contacto@carmona.cl" className="text-gray-900 font-medium hover:text-carmona-orange transition-colors">contacto@carmona.cl</a>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-xl text-gray-500 flex-shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Casa Matriz</p>
                                            <p className="text-gray-900 font-medium">Ruta 5 Norte Km 465<br />Coquimbo, Chile</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-auto">
                                <h4 className="font-bold text-gray-900 mb-2">Horario de Atención Central</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li className="flex justify-between"><span>Lunes a Viernes</span><span className="font-medium text-gray-900">8:30 a 19:00 hrs</span></li>
                                    <li className="flex justify-between"><span>Sábados</span><span className="font-medium text-gray-900">9:00 a 14:00 hrs</span></li>
                                    <li className="flex justify-between"><span>Domingos</span><span className="font-medium text-gray-900">Cerrado</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* Formulario (Derecha) */}
                        <div className="lg:w-2/3 bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/20">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Nombre */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">Nombre completo <span className="text-[#d2001c]">*</span></label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            required
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d2001c] focus:ring-1 focus:ring-[#d2001c] transition-all"
                                            placeholder="Ej. Juan Pérez"
                                        />
                                    </div>

                                    {/* Teléfono */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">Teléfono <span className="text-[#d2001c]">*</span></label>
                                        <input
                                            type="tel"
                                            name="telefono"
                                            required
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d2001c] focus:ring-1 focus:ring-[#d2001c] transition-all"
                                            placeholder="+56 9 1234 5678"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">Correo electrónico <span className="text-[#d2001c]">*</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d2001c] focus:ring-1 focus:ring-[#d2001c] transition-all"
                                            placeholder="correo@ejemplo.com"
                                        />
                                    </div>

                                    {/* Motivo */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">Motivo de contacto <span className="text-[#d2001c]">*</span></label>
                                        <div className="relative">
                                            <select
                                                name="motivo"
                                                required
                                                value={formData.motivo}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d2001c] focus:ring-1 focus:ring-[#d2001c] transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Selecciona el motivo...</option>
                                                <option value="Ventas">Cotización o consulta de Ventas</option>
                                                <option value="Servicios">Consulta sobre Servicio Técnico</option>
                                                <option value="Repuestos">Consulta sobre Repuestos</option>
                                                <option value="Sugerencias">Sugerencias o Reclamos</option>
                                                <option value="Otro">Otro Motivo</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mensaje */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Mensaje <span className="text-[#d2001c]">*</span></label>
                                    <textarea
                                        name="mensaje"
                                        required
                                        rows={5}
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d2001c] focus:ring-1 focus:ring-[#d2001c] transition-all resize-none"
                                        placeholder="Escribe tu consulta o comentario aquí..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#d2001c] hover:bg-black text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    Enviar Mensaje
                                    <Send size={18} />
                                </button>
                                <p className="text-xs text-gray-400 text-center mt-4">
                                    Tus datos están seguros y serán utilizados únicamente para contactarte en relación a tu solicitud.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. DESCUBRE MÁS CARMONA */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col items-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight text-center">
                            Descubre más{' '}
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">Carmona</span>
                        </h2>
                        <div className="w-24 h-1 mt-4 rounded-full bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {DISCOVER_ITEMS.map((item) => (
                            <Link
                                key={item.title}
                                href={item.link}
                                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-lg"
                            >
                                <div className="absolute inset-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10">
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">
                                        {item.subtitle}
                                    </p>
                                    <h3 className="text-2xl font-black uppercase mb-4">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                                        <span>EXPLORAR</span>
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </section>
        </main>
    );
}
