import { Vehicle } from './types';

export const TOYOTA_MODELS: Vehicle[] = [
    {
        id: 'bz4x',
        brand: 'toyota',
        name: 'BZ4X',
        category: 'SUV',
        price: 41990000,
        image: '/images/toyota/Hibridos/min_bZ4X.png',
        isHybrid: false,
        isElectric: true,
        isNew: true,
        slogan: 'Más que un eléctrico, un eléctrico Toyota',
    },
    {
        id: 'yaris-cross',
        brand: 'toyota',
        name: 'Yaris Cross',
        category: 'SUV',
        price: 20990000,
        image: '/images/toyota/Hibridos/min_yaris_cross.png',
        isHybrid: true,
        isNew: true,
        slogan: 'Todo eso y más',
        desktopBanner: '/images/toyota/SUV/yaris-cross/banner_80492.jpg',
        mobileBanner: '/images/toyota/SUV/yaris-cross/banner_80443.jpg',
        gallery: [
            '/images/toyota/SUV/yaris-cross/galeria_80998.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80549.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80657.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80714.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80765.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80833.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80901.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_80947.jpg',
            '/images/toyota/SUV/yaris-cross/galeria_81080.jpg'
        ],
        versions: [
            {
                name: 'YARIS CROSS HYBRID XI 1.5 CVT',
                transmission: 'Automática',
                traction: '4x2',
                fuel: 'Híbrido',
                listPrice: 24590000,
                bonusPrice: 20990000
            },
            {
                name: 'YARIS CROSS HYBRID XG 1.5 CVT',
                transmission: 'Automática',
                traction: '4x2',
                fuel: 'Híbrido',
                listPrice: 26590000,
                bonusPrice: 22990000
            }
        ],
        features: [
            {
                title: "Rendimiento y Motor 1.5L",
                desc: "Excelente desempeño con un motor 1.5L con opciones de transmisión MT y CVT. Alto rendimiento de combustible, ágil y cómodo.",
                icon: '/images/toyota/SUV/yaris-cross/galeria_80998.jpg'
            },
            {
                title: "Seguridad y Control Real",
                desc: "Frenos ABS, Asistencia de salida en pendiente (HAC), Control de Estabilidad (VSC) y distribución electrónica de frenado (EBD).",
                icon: '/images/toyota/SUV/yaris-cross/galeria_80947.jpg'
            },
            {
                title: "Conectividad y Pantalla TFT",
                desc: "Compatible con Apple CarPlay y Android Auto. Pantalla TFT avanzada de 7 pulgadas y velocímetro LED digital continuo (XG).",
                icon: '/images/toyota/SUV/yaris-cross/galeria_80657.jpg'
            },
            {
                title: "Llantas aro 17” y 18”",
                desc: "Llantas robustas para Yaris Cross acompañadas con un diseño distintivo.",
                icon: '/images/toyota/SUV/yaris-cross/galeria_80714.jpg'
            },
            {
                title: "Botón de Encendido",
                desc: "Máxima tecnología y fluidez. Smart Entry & Keyless Go para todas sus versiones.",
                icon: '/images/toyota/SUV/yaris-cross/galeria_80833.jpg'
            }
        ],
        videoUrl: 'https://www.youtube.com/embed/4dBDMEULD1Y'
    },
    {
        id: 'corolla-sedan',
        brand: 'toyota',
        name: 'Corolla',
        category: 'Sedán',
        price: 21990000,
        image: '/images/toyota/Sedan/min_corolla.png',
        isHybrid: true,
        isNew: false,
        slogan: 'Sigue haciendo historia'
    },
    {
        id: 'corolla-cross',
        brand: 'toyota',
        name: 'NEW Corolla Cross',
        category: 'SUV',
        price: 24490000,
        image: '/images/toyota/Hibridos/min_corolla_cross.png',
        isHybrid: true,
        isNew: true,
        slogan: 'La tradición de innovar'
    },
    {
        id: 'rav4',
        brand: 'toyota',
        name: 'Rav4',
        category: 'SUV',
        price: 30790000,
        image: '/images/toyota/Hibridos/min_rav4.png',
        isHybrid: true,
        isNew: false,
        slogan: 'Recorriendo los caminos'
    },
    {
        id: 'yaris-sedan',
        brand: 'toyota',
        name: 'Yaris',
        category: 'Sedán',
        price: 11490000,
        image: '/images/toyota/Sedan/min_yaris.png',
        isHybrid: false,
        isNew: false,
        slogan: 'Tu primer Toyota'
    },
    {
        id: 'raize',
        brand: 'toyota',
        name: 'Raize',
        category: 'SUV',
        price: 13990000,
        image: '/images/toyota/SUV/min_raize.png',
        isHybrid: false,
        isNew: true,
        slogan: 'Conecta con tu lado divertido'
    },
    {
        id: 'land-cruiser-prado',
        brand: 'toyota',
        name: 'Land Cruiser Prado',
        category: 'SUV',
        price: 48990000,
        image: '/images/toyota/SUV/min_land_cruiser.png',
        isHybrid: false,
        isNew: true,
        slogan: 'Leyenda todoterreno'
    },
    {
        id: 'hilux',
        brand: 'toyota',
        name: 'Hilux',
        category: 'Camioneta',
        price: 26990000,
        image: '/images/toyota/Pickup/min_hilux.png',
        isHybrid: false,
        isNew: true,
        slogan: 'La pick-up indestructible'
    },
    {
        id: 'fortuner',
        brand: 'toyota',
        name: 'Fortuner',
        category: 'SUV',
        price: 32990000,
        image: '/images/toyota/SUV/min_fortuner.png',
        isHybrid: false,
        isNew: false,
        slogan: 'Aventura con estilo'
    },
    {
        id: '4runner',
        brand: 'toyota',
        name: '4Runner',
        category: 'SUV',
        price: 36990000,
        image: '/images/toyota/SUV/min_4runner.png',
        isHybrid: false,
        isNew: false,
        slogan: 'Espíritu libre'
    },
    {
        id: 'yaris-gr',
        brand: 'toyota',
        name: 'GR Yaris',
        category: 'Gazoo Racing',
        price: 41990000,
        image: '/images/toyota/Gazoo-Racing/min_yaris_gr.png',
        isHybrid: false,
        isNew: true,
        slogan: 'Adrenaline has a new Generation'
    },
    {
        id: 'hilux-gr',
        brand: 'toyota',
        name: 'Hilux GR-S',
        category: 'Gazoo Racing',
        price: 43990000,
        image: '/images/toyota/Gazoo-Racing/min_hilux_gr.png',
        isHybrid: false,
        isNew: true,
        slogan: 'Gazoo Racing Sport'
    },
    {
        id: 'fortuner-gr',
        brand: 'toyota',
        name: 'Fortuner GR-S',
        category: 'Gazoo Racing',
        price: 45990000,
        image: '/images/toyota/Gazoo-Racing/min_fortuner_gr.png',
        isHybrid: false,
        isNew: true,
        slogan: 'Gazoo Racing Sport'
    }
];
