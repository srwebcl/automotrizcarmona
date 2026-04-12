import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLegalDocuments, LegalDocument } from '@/lib/api';
import { Shield, ChevronRight, FileText, CheckCircle } from 'lucide-react';

// Generates the DOM safely from rich text content if needed or just use dangerouslySetInnerHTML
function LegalContent({ content }: { content: string }) {
    return (
        <div 
            className="styled-legal-content text-gray-600 space-y-4 pt-4 border-t border-gray-100"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

// Estilos globales de emergencia inyectables en caso de que Tailwind Typography no esté disponible
const CustomStyles = () => (
    <style dangerouslySetInnerHTML={{__html: `
        .styled-legal-content h1, .styled-legal-content h2, .styled-legal-content h3 { font-weight: bold; color: #111827; margin-top: 1.5em; margin-bottom: 0.5em; }
        .styled-legal-content h2 { font-size: 1.25rem; }
        .styled-legal-content h3 { font-size: 1.1rem; }
        .styled-legal-content p { margin-bottom: 1em; line-height: 1.6; }
        .styled-legal-content ul { list-style-type: disc; margin-left: 1.5em; margin-bottom: 1em; }
        .styled-legal-content ol { list-style-type: decimal; margin-left: 1.5em; margin-bottom: 1em; }
        .styled-legal-content a { color: #d2001c; text-decoration: underline; }
        .styled-legal-content strong { font-weight: bold; color: #374151; }
    `}} />
);

export default async function LegalPage() {
    const docs = await getLegalDocuments();

    // Agrupar por marcas para mostrar limpio orgánicamente
    const groupedDocs = docs.reduce((acc, doc) => {
        if (!acc[doc.brand_name]) {
            acc[doc.brand_name] = {
                logo_url: doc.logo_url,
                documents: []
            };
        }
        acc[doc.brand_name].documents.push(doc);
        return acc;
    }, {} as Record<string, { logo_url: string | null; documents: LegalDocument[] }>);

    return (
        <main className="min-h-screen bg-[#f4f6f8] pt-[88px] pb-24 font-sans selection:bg-[#d2001c] selection:text-white">
            <CustomStyles />
            
            {/* Header / Hero */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-16 text-center">
                    <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-red-50 text-[#d2001c] mb-6">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Centro <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d2001c] to-red-500">Legal</span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto md:text-lg">
                        Términos de servicio, políticas de privacidad y garantías sobre la recolección de datos y los vehículos de nuestras plataformas comerciales.
                    </p>
                </div>
            </div>

            {/* Contenido */}
            <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-12 space-y-12">
                
                {/* Bloque Legal General */}
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <FileText className="text-[#d2001c]" /> Política de Privacidad General
                    </h2>
                    
                    <div className="space-y-5 text-gray-600 text-sm md:text-base leading-relaxed">
                        <p>
                            En <strong>Automotriz Carmona</strong>, valoramos su privacidad y nos comprometemos a proteger sus datos personales. La información recopilada a través de nuestros formularios (tales como cotizaciones, agendamientos de servicio técnico y canales de contacto directo) será utilizada exclusivamente con el propósito de:
                        </p>
                        <ul className="space-y-2 mt-4 ml-2">
                            {[
                                'Atender y responder sus solicitudes comerciales.',
                                'Agendar y gestionar horas de Servicio Técnico.',
                                'Notificarle sobre posibles campañas de recall y seguridad.',
                                'Envío ocasional de información promocional en caso de haberlo consentido.'
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="pt-4">
                            Tus datos se encuentran resguardados con los mayores estándares de encriptación y no se venden a redes de anunciantes externos. Podrás darte de baja en cualquier momento siguiendo el enlace ubicado al inferior de cualquier correo automatizado.
                        </p>
                    </div>
                </div>

                {/* Bloque: Legales de Marcas desde la base de datos (Filament) */}
                {Object.keys(groupedDocs).length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-extrabold text-gray-900 pl-2">
                            Garantías y Términos por Marca
                        </h3>

                        {Object.entries(groupedDocs).map(([brandName, data]) => (
                            <div key={brandName} id={data.documents[0]?.brand_slug || brandName.toLowerCase()} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm scroll-mt-[100px]">
                                <div className="p-6 md:px-8 border-b border-gray-50 flex items-center gap-4 bg-[#f8f9fa]">
                                    {data.logo_url && (
                                        <div className="relative w-16 h-10 flex-shrink-0">
                                            <Image src={data.logo_url} alt={brandName} fill className="object-contain" />
                                        </div>
                                    )}
                                    <h4 className="font-bold text-gray-900 text-lg uppercase tracking-tight">{brandName}</h4>
                                </div>
                                <div className="p-6 md:p-8 space-y-10">
                                    {data.documents.map((doc) => (
                                        <div key={doc.id} className="group">
                                            <h5 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#d2001c] transition-colors">{doc.title}</h5>
                                            {doc.excerpt && (
                                                <p className="text-sm font-medium text-gray-500 mb-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                    {doc.excerpt}
                                                </p>
                                            )}
                                            {/* Contenido HTML crudo formateado para tipografía Rich Editor de Filament */}
                                            <LegalContent content={doc.content} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Botón Volver */}
                <div className="pt-8 text-center border-t border-gray-200">
                    <Link href="/" className="inline-flex items-center gap-2 font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest text-sm">
                        Volver al Inicio <ChevronRight size={16} />
                    </Link>
                </div>
                
            </div>
        </main>
    );
}
