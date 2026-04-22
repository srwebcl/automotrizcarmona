'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Share2, MessageCircle, Link as LinkIcon } from 'lucide-react';

interface ShareButtonProps {
    url?: string;
    title?: string;
    className?: string;
}

export default function ShareButton({ url, title, className = "" }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Evitar errors de hidratación usando un default vacío hasta que el cliente monte
    const [currentUrl, setCurrentUrl] = useState(url || '');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(url || window.location.href);
        }
    }, [url]);

    const shareTitle = title || 'Mira este vehículo en Automotriz Carmona';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: shareTitle,
                    url: currentUrl
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            setIsOpen(!isOpen);
        }
    };

    const handleShareClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Intentar usar native share si es móvil
        if (typeof navigator !== 'undefined' && typeof navigator.share === 'function' && /Mobi|Android/i.test(navigator.userAgent)) {
            handleNativeShare();
        } else {
            setIsOpen(!isOpen);
        }
    };

    const copyToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentUrl) {
            navigator.clipboard.writeText(currentUrl);
            alert('¡Enlace copiado al portapapeles!');
        }
        setIsOpen(false);
    };

    const shareLinks = {
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} ${currentUrl}`)}`,
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
            <button
                onClick={handleShareClick}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black hover:bg-white hover:scale-105 transition-all z-10"
                title="Compartir"
                aria-label="Compartir"
            >
                <Share2 size={18} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-2 flex flex-col min-w-[180px] z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <a
                        href={shareLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:text-[#25D366] transition-colors"
                    >
                        <MessageCircle size={18} /> WhatsApp
                    </a>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 transition-colors w-full text-left"
                    >
                        <LinkIcon size={18} /> Copiar enlace
                    </button>
                </div>
            )}
        </div>
    );
}
