
export interface BrandConfig {
    id: string;
    name: string;
    logo: string;
    seoTitle: string;
    brandColorCss: string; // Tailwind class for brand color (e.g., 'text-red-700')
    bannerSlides: {
        web?: string;
        mobile?: string;
        type?: 'placeholder' | 'image';
        bg?: string;
        title?: string;
        link?: string;
    }[];
    serviceImages?: {
        repuestos?: string;
        sucursales?: string;
        usados?: string;
        servicio?: string;
    };
}

export const BRANDS_CONFIG: Record<string, BrandConfig> = {
    toyota: {
        id: 'toyota',
        name: 'Toyota',
        logo: '/images/logos/logo-toyota.webp',
        seoTitle: 'Electromovilidad que se adapta a tu estilo de vida',
        brandColorCss: 'text-red-700',
        bannerSlides: [
            {
                web: '/images/toyota/banner-toyota.png',
                mobile: '/images/toyota/banner-toyota.png',
                type: 'image',
                link: '/nuevos/toyota/All-New-RAV4-Hybrid'
            },
            {
                web: '/images/toyota/Hibridos/corolla-cross-hybrid/banner_68478.jpg',
                mobile: '/images/toyota/Hibridos/corolla-cross-hybrid/banner_68417.jpg',
                type: 'image'
            }
        ]
    },
    volkswagen: {
        id: 'volkswagen',
        name: 'Volkswagen',
        logo: '/images/logos/logo-vw.webp',
        seoTitle: 'Innovación y Tecnología Alemana para tu camino',
        brandColorCss: 'text-blue-900',
        bannerSlides: [
            { 
                web: '/images/volkswagen/banner-web-tcross-1280x960-copy1 (1).jpeg', 
                mobile: '/images/volkswagen/banner-web-tcross-1280x960-copy1 (1).jpeg', 
                type: 'image' 
            },
            { 
                web: '/images/volkswagen/banner-web-tiguan-1280x960-1.webp', 
                mobile: '/images/volkswagen/banner-web-tiguan-1280x960-1.webp', 
                type: 'image' 
            },
            { 
                web: '/images/volkswagen/banner-web-transporter-1280x960-1.webp', 
                mobile: '/images/volkswagen/banner-web-transporter-1280x960-1.webp', 
                type: 'image' 
            }
        ]
    },
    audi: {
        id: 'audi',
        name: 'Audi',
        logo: '/images/logos/logo-audi.webp',
        seoTitle: 'Liderazgo a través de la Tecnología y el Diseño',
        brandColorCss: 'text-gray-900',
        bannerSlides: [
            { 
                web: '/images/audi/banner-audi.webp', 
                mobile: '/images/audi/banner-audi.webp', 
                type: 'image' 
            }
        ]
    },
    honda: {
        id: 'honda',
        name: 'Honda',
        logo: '/images/logos/logo-honda.webp',
        seoTitle: 'Honda Chile | El Poder de los Sueños en Automotriz Carmona',
        brandColorCss: 'text-red-600',
        bannerSlides: [
            { 
                web: '/images/honda/banner-honda.webp', 
                mobile: '/images/honda/banner-honda.webp', 
                type: 'image' 
            }
        ]
    },
    cupra: {
        id: 'cupra',
        name: 'Cupra',
        logo: '/images/logos/logo-cupra.webp',
        seoTitle: 'Cupra | Siente el Impulso de una nueva era en Automotriz Carmona',
        brandColorCss: 'text-gray-900',
        bannerSlides: [
            { 
                web: '/images/cupra/banner-cupra.png', 
                mobile: '/images/cupra/banner-cupra.png', 
                type: 'image' 
            }
        ],
        serviceImages: {
            repuestos: '/images/cupra/repuestos-cupra.png',
            sucursales: '/images/cupra/sucursales-cupra.jpg',
            usados: '/images/cupra/cupra-usados.png',
            servicio: '/images/cupra/servicio-cupra.png',
        }
    },
    seat: {
        id: 'seat',
        name: 'Seat',
        logo: '/images/logos/logo-seat.webp',
        seoTitle: 'Seat | Emoción en Movimiento y Diseño Urbano en Automotriz Carmona',
        brandColorCss: 'text-gray-900',
        bannerSlides: [
            { 
                web: '/images/seat/banner-seat1.jpg', 
                mobile: '/images/seat/banner-seat1.jpg', 
                type: 'image' 
            },
            { 
                web: '/images/seat/ibiza/banner/banner-seat2.jpg', 
                mobile: '/images/seat/ibiza/banner/banner-seat2.jpg', 
                type: 'image' 
            }
        ]
    },
    bmw: {
        id: 'bmw',
        name: 'BMW',
        logo: '/images/logos/logo-bmw.webp',
        seoTitle: 'BMW Chile | El Placer de Conducir en Automotriz Carmona',
        brandColorCss: 'text-blue-600',
        bannerSlides: [
            { 
                web: '/images/bmw/banner-bmw.jpg', 
                mobile: '/images/bmw/banner-bmw.jpg', 
                type: 'image' 
            }
        ]
    },
    'bmw-motorrad': {
        id: 'bmw-motorrad',
        name: 'BMW Motorrad',
        logo: '/images/logos/logo-bmw-motorrad.webp',
        seoTitle: 'Make Life a Ride',
        brandColorCss: 'text-blue-600',
        bannerSlides: [
            { 
                web: '/images/bmw-motorrad/banner-1.avif', 
                mobile: '/images/bmw-motorrad/banner-1.avif', 
                type: 'image' 
            },
            { 
                web: '/images/bmw-motorrad/banner-2.avif', 
                mobile: '/images/bmw-motorrad/banner-2.avif', 
                type: 'image' 
            }
        ]
    },
    foton: {
        id: 'foton',
        name: 'Foton',
        logo: '/images/logos/logo-foton.webp',
        seoTitle: 'Líder en Transporte y Eficiencia para tu Negocio',
        brandColorCss: 'text-black',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-200', title: 'FOTON SLIDER 1' }
        ]
    },
    mg: {
        id: 'mg',
        name: 'MG',
        logo: '/images/logos/logo-mg.webp',
        seoTitle: 'MG | Driving Forward with Innovation',
        brandColorCss: 'text-red-600',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-red-50', title: 'MG SLIDER 1' }
        ]
    },
    maxus: {
        id: 'maxus',
        name: 'Maxus',
        logo: '/images/logos/logo-maxus.webp',
        seoTitle: 'Maxus | Deliver the Future',
        brandColorCss: 'text-blue-800',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: 'MAXUS SLIDER 1' }
        ]
    },
    geely: {
        id: 'geely',
        name: 'Geely',
        logo: '/images/logos/logo-geely.webp',
        seoTitle: 'Geely | Bring Happy Life into Your Drive',
        brandColorCss: 'text-blue-900',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: 'GEELY SLIDER 1' }
        ]
    },
    mini: {
        id: 'mini',
        name: 'Mini',
        logo: '/images/logos/logo-mini.webp',
        seoTitle: 'Mini | Big Love',
        brandColorCss: 'text-black',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: 'MINI SLIDER 1' }
        ]
    },
    jetour: {
        id: 'jetour',
        name: 'Jetour',
        logo: '/images/logos/logo-jetour.webp',
        seoTitle: 'Jetour | Drive Your Future',
        brandColorCss: 'text-red-700',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: 'JETOUR SLIDER 1' }
        ]
    },
    dongfeng: {
        id: 'dongfeng',
        name: 'Dongfeng',
        logo: '/images/logos/logo-dongfeng.webp',
        seoTitle: 'Dongfeng | Drive Your Dreams',
        brandColorCss: 'text-red-700',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: 'DONGFENG SLIDER 1' }
        ]
    },
    iveco: {
        id: 'iveco',
        name: 'Iveco',
        logo: '/images/logos/logo-iveco.webp',
        seoTitle: 'Iveco | Tu Socio para el Transporte Sustentable',
        brandColorCss: 'text-blue-800',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-blue-900', title: 'IVECO SLIDER 1' }
        ]
    },
    man: {
        id: 'man',
        name: 'MAN',
        logo: '/images/logos/logo-man.webp',
        seoTitle: 'MAN | Simplifying Business',
        brandColorCss: 'text-red-700',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-900', title: 'MAN SLIDER 1' }
        ]
    },
    'vw-camiones': {
        id: 'vw-camiones',
        name: 'VW Camiones y Buses',
        logo: '/images/logos/logo-vw-camiones.webp',
        seoTitle: 'Volkswagen Camiones y Buses | Menos, Usted no merece. Más, Usted no necesita.',
        brandColorCss: 'text-blue-900',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: 'VW CAMIONES SLIDER 1' }
        ]
    },
    'foton-camiones': {
        id: 'foton-camiones',
        name: 'Foton Camiones',
        logo: '/images/logos/logo-foton-camiones.webp',
        seoTitle: 'Foton Camiones | Eficiencia y Potencia para tu Negocio',
        brandColorCss: 'text-black',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-200', title: 'FOTON CAMIONES SLIDER 1' }
        ]
    },
    kaiyi: {
        id: 'kaiyi',
        name: 'Kaiyi',
        logo: '/images/logos/logo-kaiyi.webp',
        seoTitle: 'Kaiyi | Innovación y Confort para tu Familia',
        brandColorCss: 'text-blue-600',
        bannerSlides: [
            { 
                web: '/images/kaiyi/banner-kaiyi-1.webp', 
                mobile: '/images/kaiyi/banner-kaiyi-1.webp', 
                type: 'image' 
            },
            { 
                web: '/images/kaiyi/banner-kaiyi-2.webp', 
                mobile: '/images/kaiyi/banner-kaiyi-2.webp', 
                type: 'image' 
            }
        ],
        serviceImages: {
            repuestos: '/images/kaiyi/repuestos-kaiyi.png',
            sucursales: '/images/kaiyi/sucursal-kaiyi.png',
            usados: '/images/kaiyi/usados-kaiyi.png',
            servicio: '/images/kaiyi/servicio-kaiyi.png',
        }
    },
    soueast: {
        id: 'soueast',
        name: 'Soueast',
        logo: '/images/logos/logo-soueast.webp',
        seoTitle: 'Soueast | Diseño y Calidad Superior',
        brandColorCss: 'text-red-600',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-red-50', title: 'SOUEAST SLIDER 1' }
        ]
    }
}

export const getBrandConfig = (brandId: string): BrandConfig => {
    // Normalize brandId from URL (handles decode and spaces)
    const id = decodeURIComponent(brandId).toLowerCase().replace(/\s+/g, '-');
    const config = BRANDS_CONFIG[id];

    if (config) return config;

    // Fallback logic
    const name = decodeURIComponent(brandId)
        .split(/[ -]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return {
        id,
        name,
        logo: `/images/logos/logo-${id}.webp`,
        seoTitle: `Descubre la Calidad Superior de ${name}`,
        brandColorCss: 'text-gray-900',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: `${name.toUpperCase()} SLIDER 1` },
            { type: 'placeholder', bg: 'bg-gray-200', title: `${name.toUpperCase()} SLIDER 2` }
        ]
    };
};
