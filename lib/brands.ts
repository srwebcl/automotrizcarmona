
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
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-toyota.webp',
        seoTitle: 'Electromovilidad que se adapta a tu estilo de vida',
        brandColorCss: 'text-red-700',
        bannerSlides: [
            {
                web: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/autos-nuevos/toyota/banner/banner-toyota.webp',
                mobile: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/autos-nuevos/toyota/banner/banner-toyota.webp',
                type: 'image',
                link: '/nuevos/toyota/rav4-hibrido'
            },
        ],
        serviceImages: {
            repuestos: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/autos-nuevos/toyota/mas-info/repuestos-toyota.webp',
            sucursales: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/autos-nuevos/toyota/mas-info/sucursal-toyota.webp',
            usados: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/autos-nuevos/toyota/mas-info/usados-toyota.webp',
            servicio: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/autos-nuevos/toyota/mas-info/servicio-toyota.webp',
        }
    },
    volkswagen: {
        id: 'volkswagen',
        name: 'Volkswagen',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-vw.webp',
        seoTitle: 'Innovación y Tecnología Alemana para tu camino',
        brandColorCss: 'text-blue-900',
        bannerSlides: [
            {
                web: '/images/volkswagen/banner-vw-1.png',
                mobile: '/images/volkswagen/banner-vw-1.png',
                type: 'image'
            },
            {
                web: '/images/volkswagen/banner-vw-2.png',
                mobile: '/images/volkswagen/banner-vw-2.png',
                type: 'image'
            },]
    },
    audi: {
        id: 'audi',
        name: 'Audi',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-audi.webp',
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
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-honda.webp',
        seoTitle: 'Honda Chile | El Poder de los Sueños en Automotriz Carmona',
        brandColorCss: 'text-red-600',
        bannerSlides: [
            {
                web: '/images/honda/banner-wr-v_web.webp',
                mobile: '/images/honda/banner-wr-v_movil.webp',
                type: 'image'
            },
            {
                web: '/images/honda/banner-hr-v_web.webp',
                mobile: '/images/honda/banner-hr-v_movil.webp',
                type: 'image'
            },
            {
                web: '/images/honda/banner-cr-v_web.webp',
                mobile: '/images/honda/banner-cr-v_movil.webp',
                type: 'image'
            },
        ]
    },
    cupra: {
        id: 'cupra',
        name: 'Cupra',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-cupra.webp',
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
    bmw: {
        id: 'bmw',
        name: 'BMW',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-bmw.webp',
        seoTitle: 'BMW Chile | El Placer de Conducir en Automotriz Carmona',
        brandColorCss: 'text-blue-600',
        bannerSlides: [
            {
                web: '/images/bmw/banner-bmw.webp',
                mobile: '/images/bmw/banner-bmw.webp',
                type: 'image'
            }
        ]
    },
    'bmw-motorrad': {
        id: 'bmw-motorrad',
        name: 'BMW Motorrad',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-bmw-motorrad.webp',
        seoTitle: 'Make Life a Ride',
        brandColorCss: 'text-blue-600',
        bannerSlides: [
            {
                web: '/images/bmw-motorrad/banner-1.webp',
                mobile: '/images/bmw-motorrad/banner-1-mobile.webp',
                type: 'image'
            },
        ]
    },
    foton: {
        id: 'foton',
        name: 'Foton',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-foton.webp',
        seoTitle: 'Líder en Transporte y Eficiencia para tu Negocio',
        brandColorCss: 'text-black',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-200', title: 'FOTON SLIDER 1' }
        ],
        serviceImages: {
            repuestos: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/foton/mas-info/repuestos-foton.png',
            sucursales: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/foton/mas-info/sucursal-foton.png',
            usados: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/foton/mas-info/usados-foton.png',
            servicio: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/foton/mas-info/servicio-foton.png',
        }
    },
    mg: {
        id: 'mg',
        name: 'MG',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-mg.webp',
        seoTitle: 'MG | Driving Forward with Innovation',
        brandColorCss: 'text-red-600',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-red-50', title: 'MG SLIDER 1' }
        ]
    },
    maxus: {
        id: 'maxus',
        name: 'Maxus',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-maxus.webp',
        seoTitle: 'Maxus | Deliver the Future',
        brandColorCss: 'text-blue-800',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: 'MAXUS SLIDER 1' }
        ]
    },
    geely: {
        id: 'geely',
        name: 'Geely',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-geely.webp',
        seoTitle: 'Geely | Bring Happy Life into Your Drive',
        brandColorCss: 'text-blue-900',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: 'GEELY SLIDER 1' }
        ]
    },
    mini: {
        id: 'mini',
        name: 'Mini',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-mini.webp',
        seoTitle: 'Mini | Big Love',
        brandColorCss: 'text-black',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: 'MINI SLIDER 1' }
        ]
    },
    jetour: {
        id: 'jetour',
        name: 'Jetour',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-jetour.webp',
        seoTitle: 'Jetour | Drive Your Future',
        brandColorCss: 'text-red-700',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: 'JETOUR SLIDER 1' }
        ]
    },
    dongfeng: {
        id: 'dongfeng',
        name: 'Dongfeng',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-dongfeng.webp',
        seoTitle: 'Dongfeng | Drive Your Dreams',
        brandColorCss: 'text-red-700',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: 'DONGFENG SLIDER 1' }
        ]
    },
    iveco: {
        id: 'iveco',
        name: 'Iveco',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-iveco.webp',
        seoTitle: 'Iveco | Tu Socio para el Transporte Sustentable',
        brandColorCss: 'text-blue-800',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-blue-900', title: 'IVECO SLIDER 1' }
        ],
        serviceImages: {
            repuestos: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/iveco/mas-info/repuestos-iveco.png',
            sucursales: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/iveco/mas-info/sucursal-iveco.png',
            usados: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/iveco/mas-info/usados-iveco.png',
            servicio: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/iveco/mas-info/servicio-iveco.png',
        }
    },
    man: {
        id: 'man',
        name: 'MAN',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-man.webp',
        seoTitle: 'MAN | Simplifying Business',
        brandColorCss: 'text-red-700',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-900', title: 'MAN SLIDER 1' }
        ],
        serviceImages: {
            repuestos: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/man/mas-info/repuestos-man.png',
            sucursales: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/man/mas-info/sucursal-man.png',
            usados: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/man/mas-info/usados-man.png',
            servicio: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/man/mas-info/servicio-man.png',
        }
    },
    'vw-camiones': {
        id: 'vw-camiones',
        name: 'VW Camiones y Buses',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-vw-camiones.webp',
        seoTitle: 'Volkswagen Camiones y Buses | Menos, Usted no merece. Más, Usted no necesita.',
        brandColorCss: 'text-blue-900',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: 'VW CAMIONES SLIDER 1' }
        ],
        serviceImages: {
            repuestos: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/volkswagen-camiones/mas-info/repuestos-vw-camiones.png',
            sucursales: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/volkswagen-camiones/mas-info/sucursal-vw.png',
            usados: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/volkswagen-camiones/mas-info/usados-vw-camiones.png',
            servicio: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/volkswagen-camiones/mas-info/servicio-volkswagen.png',
        }
    },
    'foton-camiones': {
        id: 'foton-camiones',
        name: 'Foton Camiones',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-foton-camiones.webp',
        seoTitle: 'Foton Camiones | Eficiencia y Potencia para tu Negocio',
        brandColorCss: 'text-black',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-200', title: 'FOTON CAMIONES SLIDER 1' }
        ],
        serviceImages: {
            repuestos: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/foton/mas-info/repuestos-foton.png',
            sucursales: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/foton/mas-info/sucursal-foton.png',
            usados: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/foton/mas-info/usados-foton.png',
            servicio: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/camiones/foton/mas-info/servicio-foton.png',
        }
    },
    kaiyi: {
        id: 'kaiyi',
        name: 'Kaiyi',
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-kaiyi.webp',
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
        logo: 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev/logos/logo-soueast.webp',
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
    const existingConfig = BRANDS_CONFIG[id];

    if (existingConfig) return existingConfig;

    // Fallback logic for brands not in static config
    const name = decodeURIComponent(brandId)
        .split(/[ -]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const defaultServiceImages = {
        repuestos: `/images/${id}/repuestos-${id}`,
        sucursales: `/images/${id}/sucursal-${id}`,
        usados: `/images/${id}/usados-${id}`,
        servicio: `/images/${id}/servicio-${id}`,
    };

    const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || 'https://pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev';

    return {
        id,
        name,
        logo: `${cdnUrl}/logos/logo-${id}.webp`,
        seoTitle: `Descubre la Calidad Superior de ${name}`,
        brandColorCss: 'text-gray-900',
        bannerSlides: [
            { type: 'placeholder', bg: 'bg-gray-100', title: `${name.toUpperCase()} SLIDER 1` },
            { type: 'placeholder', bg: 'bg-gray-200', title: `${name.toUpperCase()} SLIDER 2` }
        ],
        serviceImages: defaultServiceImages
    };
};
