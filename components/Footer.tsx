import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 border-t border-gray-900">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Column 1: Brand / Explore */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-lg border-l-4 border-carmona-gold pl-3">EXPLORAR</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/nuevos" className="hover:text-carmona-gold transition-colors block py-1">Autos Nuevos</a></li>
                            <li><a href="/seminuevos" className="hover:text-carmona-gold transition-colors block py-1">Seminuevos Certificados</a></li>
                            <li><a href="/servicios" className="hover:text-carmona-gold transition-colors block py-1">Servicio Técnico</a></li>
                            <li><a href="/repuestos" className="hover:text-carmona-gold transition-colors block py-1">Repuestos Originales</a></li>
                            <li><a href="/dp" className="hover:text-carmona-gold transition-colors block py-1">Desabolladura y Pintura</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Company */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-lg border-l-4 border-carmona-gold pl-3">EMPRESA</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/nosotros" className="hover:text-carmona-gold transition-colors block py-1">Quiénes Somos</a></li>
                            <li><a href="/sucursales" className="hover:text-carmona-gold transition-colors block py-1">Nuestras Sucursales</a></li>
                            <li><a href="/trabaja-con-nosotros" className="hover:text-carmona-gold transition-colors block py-1">Trabaja con Nosotros</a></li>
                            <li><a href="/legal" className="hover:text-carmona-gold transition-colors block py-1">Términos y Condiciones</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-lg border-l-4 border-carmona-gold pl-3">CONTÁCTANOS</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-carmona-gold mt-1" size={16} />
                                <span>Av. Balmaceda 1234,<br />La Serena, IV Región</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-carmona-gold" size={16} />
                                <span>+56 9 1234 5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-carmona-gold" size={16} />
                                <span>contacto@automotrizcarmona.cl</span>
                            </li>
                        </ul>

                        <div className="pt-4">
                            <button className="bg-carmona-gold hover:bg-carmona-orange text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm w-full md:w-auto">
                                Escribir a Whatsapp
                            </button>
                        </div>
                    </div>

                    {/* Column 4: Socials & Hours */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-white font-bold text-lg mb-4">SÍGUENOS</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded hover:bg-carmona-gold hover:text-white transition-all"><Instagram size={20} /></a>
                                <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded hover:bg-carmona-gold hover:text-white transition-all"><Facebook size={20} /></a>
                                <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded hover:bg-carmona-gold hover:text-white transition-all"><Linkedin size={20} /></a>
                                <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded hover:bg-carmona-gold hover:text-white transition-all"><Youtube size={20} /></a>
                            </div>
                        </div>

                        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                            <h5 className="text-white font-bold text-sm mb-2">Horario de Atención</h5>
                            <p className="text-xs leading-relaxed">
                                <strong className="text-gray-300">Ventas:</strong><br />
                                Lun a Vie: 09:00 - 19:00 hrs.<br />
                                Sábado: 10:00 - 14:00 hrs.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Legal Strip */}
            <div className="bg-bruno-black py-4 border-t border-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Automotriz Carmona. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">Políticas de Privacidad</a>
                        <a href="#" className="hover:text-white">Canal de Denuncias</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
