'use client';

import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { X, Car, Settings, Wrench } from 'lucide-react';
import { API_URL } from '@/lib/api';

const NUMBER = "56956599896"; // Actualizado por requerimiento del usuario (Tecnom por defecto)

function SmartWhatsAppButtonContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [showMenu, setShowMenu] = useState(false);
    const [config, setConfig] = useState({
        text: "¡Hola! ¿Necesitas ayuda?",
        message: "Hola, estoy en el sitio web de Automotriz Carmona y me gustaría recibir asesoría.",
        source: "Ventas"
    });
    const menuRef = useRef<HTMLDivElement>(null);

    // State para sucursales dinámicas de servicio técnico
    const [branches, setBranches] = useState<any[]>([]);
    const [dynamicNumber, setDynamicNumber] = useState<string>(NUMBER);

    // Dynamic config based on path
    useEffect(() => {
        let newConfig = {
            text: "¡Hola! ¿En qué te ayudamos hoy?",
            message: "Hola, vengo de la web de Automotriz Carmona y me gustaría recibir atención.",
            source: "Ventas"
        };

        if (pathname.startsWith('/nuevos') || pathname.startsWith('/camiones')) {
            const parts = pathname.split('/').filter(Boolean);
            if (parts.length >= 3) {
                // E.g. /nuevos/toyota/yaris -> parts = ['nuevos', 'toyota', 'yaris']
                const brand = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
                const model = parts[2].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                newConfig = {
                    text: `¿Te interesa este ${brand}?`,
                    message: `Hola, estoy viendo un ${brand} ${model} cero kilómetro en la web y me gustaría cotizarlo.`,
                    source: "Ventas"
                };
            } else if (parts.length === 2 && pathname.startsWith('/nuevos')) {
                const brand = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
                newConfig = {
                    text: `¿Buscas un ${brand}?`,
                    message: `Hola, estoy viendo los modelos de ${brand} en la web y me gustaría más información.`,
                    source: "Ventas"
                };
            } else {
                newConfig = {
                    text: "¿Buscas tu próximo 0km?",
                    message: "Hola, me interesa conocer más sobre los vehículos nuevos en stock.",
                    source: "Ventas"
                };
            }
        } else if (pathname.startsWith('/repuestos')) {
            newConfig = {
                text: "¿Necesitas repuestos originales?",
                message: "Hola, necesito cotizar repuestos/accesorios para mi vehículo a través de la web.",
                source: "Repuestos"
            };
        } else if (pathname.startsWith('/servicios')) {
            newConfig = {
                text: "¿Buscas agendar mantención?",
                message: "Hola, me gustaría agendar una hora en el Servicio Técnico.",
                source: "Servicio_Tecnico"
            };
        } else if (pathname.startsWith('/dyp')) {
            newConfig = {
                text: "¿Tu auto necesita una reparación?",
                message: "Hola, necesito cotizar un trabajo de Desabolladura y Pintura.",
                source: "Servicio_Tecnico"
            };
        } else if (pathname.startsWith('/seminuevos')) {
            newConfig = {
                text: "¿Buscas un auto usado?",
                message: "Hola, estoy interesado en conocer el stock de autos seminuevos.",
                source: "Ventas"
            };
        }

        setConfig(newConfig);

        // Reset interactions
        setShowMenu(false);
    }, [pathname]);

    // Fetch branches if in services
    useEffect(() => {
        if (pathname.startsWith('/servicios') || pathname.startsWith('/dyp')) {
            fetch(`${API_URL}/branches`)
                .then(r => r.json())
                .then(json => {
                    const data = json.data || json;
                    setBranches(data);
                })
                .catch(console.error);
        }
    }, [pathname]);

    // Calculate dynamic number if a brand is selected in services
    useEffect(() => {
        let newNumber = NUMBER; // default Tecnom number
        if ((pathname.startsWith('/servicios') || pathname.startsWith('/dyp')) && branches.length > 0) {
            const currentMarca = searchParams.get('marca');
            if (currentMarca) {
                const targetBranch = branches.find((b: any) => 
                    (b.type === 'Servicio Técnico' || b.type === 'Desabolladura y Pintura') &&
                    (b.brands_list || []).some((br: string) => br.toLowerCase() === currentMarca.toLowerCase()) &&
                    b.whatsapp
                );
                if (targetBranch) {
                    newNumber = targetBranch.whatsapp.replace(/\D/g, '');
                }
            }
        }
        setDynamicNumber(newNumber);
    }, [pathname, searchParams, branches]);

    // Extract unique service brands with their specific whatsapp number
    const serviceBrandsData = useMemo(() => {
        const brandsMap = new Map<string, string>();
        branches.forEach((b: any) => {
            if (b.type === 'Servicio Técnico' || b.type === 'Desabolladura y Pintura') {
                if (b.brands_list && b.whatsapp) {
                    b.brands_list.forEach((br: string) => {
                        // Keep the first branch's whatsapp for a brand
                        if (!brandsMap.has(br)) {
                            brandsMap.set(br, b.whatsapp.replace(/\D/g, ''));
                        }
                    });
                }
            }
        });
        return Array.from(brandsMap.entries())
            .map(([name, phone]) => ({ name, phone }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [branches]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Constructor de link con UTM params rescatados del sitio seminuevos
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const buildLink = (baseMessage: string, sourceParam?: string, targetNumber?: string) => {
        const currentUrl = isMounted ? window.location.href : `https://automotrizcarmona.cl${pathname}`;
        const finalSource = sourceParam || config.source;
        const num = targetNumber || dynamicNumber;

        // Adjunta los UTM para el CRM
        const finalMessage = `${baseMessage}\n\nEnlace: ${currentUrl}?utm_source=${encodeURIComponent(finalSource)}&utm_medium=wsp_web`;
        return `https://wa.me/${num}?text=${encodeURIComponent(finalMessage)}`;
    };

    const isHome = pathname === '/';
    const isServiceMenu = pathname.startsWith('/servicios') && !searchParams.get('marca');

    const handleMainClick = (e: React.MouseEvent) => {
        if (isHome || isServiceMenu) {
            e.preventDefault();
            setShowMenu(!showMenu);
        }
    };

    const mainHref = (isHome || isServiceMenu) ? "#" : buildLink(config.message);

    return (
        <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 group" ref={menuRef}>

            {/* Context Bubble (Solo en Hover y si el menú no está abierto) */}
            <div
                className={`
                    relative max-w-[280px] w-max bg-white text-gray-800 p-4 rounded-3xl rounded-br-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100
                    transform transition-all duration-300 ease-out origin-bottom
                    ${showMenu ? 'hidden' : 'opacity-0 scale-75 translate-y-8 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto'}
                `}
            >
                <div className="flex items-start gap-3 pr-4">
                    <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center text-lg">
                            👨‍💻
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <p className="text-[13px] font-bold text-gray-900 mb-0.5">Asesor Carmona</p>
                        <p className="text-xs font-medium leading-snug text-gray-600">
                            {config.text}
                        </p>
                    </div>
                </div>
            </div>

            {/* Menú Expandido */}
            <div
                className={`
                    absolute bottom-[72px] right-0 bg-white shadow-2xl rounded-2xl border border-gray-100 p-2 w-64
                    transform transition-all duration-300 origin-bottom-right
                    ${showMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                `}
            >
                <div className="p-3 border-b border-gray-50 mb-2">
                    <p className="text-sm font-bold text-gray-900">
                        {isServiceMenu ? "¿Para qué marca necesitas servicio?" : "¿Con qué área deseas hablar?"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {isServiceMenu ? "Selecciona la marca de tu vehículo para derivarte." : "Selecciona una opción para derivarte."}
                    </p>
                </div>
                <div className="flex flex-col gap-1 max-h-[250px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent' }}>
                    {isHome && (
                        <>
                            <a
                                href={buildLink("Hola, estoy en la web y me gustaría hablar con el área de Ventas (Nuevos o Seminuevos).", "Ventas")}
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                                onClick={() => setShowMenu(false)}
                            >
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                                    <Car size={18} />
                                </div>
                                <span className="text-sm font-bold text-gray-700">Ventas</span>
                            </a>
                            <a
                                href={buildLink("Hola, estoy en la web y necesito cotizar Repuestos u Accesorios.", "Repuestos")}
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                                onClick={() => setShowMenu(false)}
                            >
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg shrink-0">
                                    <Settings size={18} />
                                </div>
                                <span className="text-sm font-bold text-gray-700">Repuestos</span>
                            </a>
                            <a
                                href={buildLink("Hola, estoy en la web y necesito información sobre el Servicio Técnico.", "Servicio_Tecnico")}
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                                onClick={() => setShowMenu(false)}
                            >
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                                    <Wrench size={18} />
                                </div>
                                <span className="text-sm font-bold text-gray-700">Servicio Técnico</span>
                            </a>
                        </>
                    )}

                    {isServiceMenu && serviceBrandsData.map(brand => (
                        <a
                            key={brand.name}
                            href={buildLink(`Hola, necesito agendar o consultar sobre el Servicio Técnico para mi ${brand.name}.`, "Servicio_Tecnico", brand.phone)}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                            onClick={() => setShowMenu(false)}
                        >
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                                <Wrench size={18} />
                            </div>
                            <span className="text-sm font-bold text-gray-700">{brand.name}</span>
                        </a>
                    ))}
                    
                    {isServiceMenu && branches.length > 0 && serviceBrandsData.length === 0 && (
                        <div className="p-3 text-sm text-gray-500 text-center">
                            No hay sucursales configuradas.
                        </div>
                    )}
                    
                    {isServiceMenu && branches.length === 0 && (
                        <div className="p-3 text-sm text-gray-500 text-center animate-pulse">
                            Cargando sucursales...
                        </div>
                    )}
                </div>
            </div>

            {/* Main Button */}
            <a
                href={mainHref}
                target={(isHome || isServiceMenu) ? undefined : "_blank"}
                rel={(isHome || isServiceMenu) ? undefined : "noopener noreferrer"}
                onClick={handleMainClick}
                className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 z-10"
                aria-label="Contactar por WhatsApp"
            >
                <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>

                {/* Ping Animation Wrapper */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping duration-[2000ms] -z-10"></span>
            </a>
            
            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #d1d5db;
                }
            `}} />
        </div>
    );
}

export default function SmartWhatsAppButton() {
    return (
        <Suspense fallback={null}>
            <SmartWhatsAppButtonContent />
        </Suspense>
    );
}
