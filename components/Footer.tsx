import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] text-gray-400 border-t border-white/10">
            {/* Main Footer Content */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Column 1: Brand & Info */}
                    <div className="space-y-6">
                        <Link href="/" className="block">
                            <Image
                                src="/images/logo-carmona.avif"
                                alt="Automotriz Carmona"
                                width={180}
                                height={40}
                                className="brightness-0 invert opacity-100 hover:opacity-80 transition-opacity"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Somos el concesionario automotriz más grande de la tercera y cuarta región. Representantes oficiales de las principales marcas del mercado.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="https://www.instagram.com/automotrizcarmona" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-xl hover:bg-white hover:text-black transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.facebook.com/automotrizcarmona" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-xl hover:bg-white hover:text-black transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.linkedin.com/company/automotriz-carmona" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-xl hover:bg-white hover:text-black transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Vehículos */}
                    <div className="space-y-5 lg:pl-8">
                        <h4 className="text-white font-extrabold text-sm uppercase tracking-widest mb-6">Vehículos</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/nuevos" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-gray-600 transform group-hover:translate-x-1 group-hover:text-carmona-gold transition-all" /> Autos Nuevos</Link></li>
                            <li><a href="https://seminuevos.automotrizcarmona.cl/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-gray-600 transform group-hover:translate-x-1 group-hover:text-carmona-gold transition-all" /> Seminuevos</a></li>
                            <li><a href="https://seminuevos.automotrizcarmona.cl/catalogo?is_premium=1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-gray-600 transform group-hover:translate-x-1 group-hover:text-carmona-gold transition-all" /> Seminuevos Premium</a></li>
                            <li><Link href="/camiones" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-gray-600 transform group-hover:translate-x-1 group-hover:text-carmona-gold transition-all" /> Camiones y Buses</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Servicios & Corporativo */}
                    <div className="space-y-5">
                        <h4 className="text-white font-extrabold text-sm uppercase tracking-widest mb-6">Servicios y Empresa</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/servicios" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-gray-600 transform group-hover:translate-x-1 group-hover:text-carmona-gold transition-all" /> Servicio Técnico</Link></li>
                            <li><Link href="/repuestos" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-gray-600 transform group-hover:translate-x-1 group-hover:text-carmona-gold transition-all" /> Repuestos Originales</Link></li>
                            <li><Link href="/dyp/cotizar" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-gray-600 transform group-hover:translate-x-1 group-hover:text-carmona-gold transition-all" /> Desabolladura y Pintura</Link></li>
                            <li className="pt-2"><Link href="/sucursales" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-gray-600 transform group-hover:translate-x-1 group-hover:text-carmona-gold transition-all" /> Sucursales</Link></li>
                            <li><Link href="/noticias" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-gray-600 transform group-hover:translate-x-1 group-hover:text-carmona-gold transition-all" /> Noticias</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contacto */}
                    <div className="space-y-5">
                        <h4 className="text-white font-extrabold text-sm uppercase tracking-widest mb-6">Mesa Central</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="text-gray-300" size={16} />
                                </div>
                                <span className="pt-1 leading-snug">Casa Matriz: Balmaceda 3681,<br />La Serena, IV Región</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <Phone className="text-gray-300" size={16} />
                                </div>
                                <span className="font-bold text-white">+56 51 220 0200</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-gray-300" size={16} />
                                </div>
                                <span>contacto@carmonaycia.cl</span>
                            </li>
                        </ul>

                        <div className="pt-2 flex gap-3">
                            <Link href="/contacto" className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-4 rounded-xl transition-colors text-xs text-center border border-white/10">
                                Contactar
                            </Link>
                            <Link href="/reclamos" className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#aa8323] hover:opacity-90 text-white shadow-lg font-extrabold py-3 px-4 rounded-xl transition-opacity text-xs text-center border border-transparent">
                                Reclamos
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Legal Strip */}
            <div className="bg-black py-6 border-t border-white/5">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6 test-xs text-gray-500">
                    <p className="text-xs order-3 md:order-1 text-center md:text-left">&copy; {new Date().getFullYear()} Automotriz Carmona. Todos los derechos reservados.</p>
                    
                    <a href="https://www.webpay.cl/company/33128" target="_blank" rel="noopener noreferrer" className="order-1 md:order-2 hover:opacity-80 transition-opacity" aria-label="Verificado por Webpay">
                        <Image src="/images/logo-webpay-pago-seguro.svg" alt="Webpay Pago Seguro Automotriz Carmona" width={120} height={35} className="h-7 w-auto object-contain" />
                    </a>

                    <div className="flex flex-wrap gap-4 md:gap-8 justify-center text-xs font-medium order-2 md:order-3">
                        <a href="https://compliance.automotrizcarmona.cl/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-carmona-gold"></span> Compliance y Denuncias</a>
                        <Link href="/legal" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span> Términos y Condiciones</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
