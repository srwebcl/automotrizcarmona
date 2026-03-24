import { Vehicle } from './types';

export const HONDA_MODELS: Vehicle[] = [
    {
        id: 'civic',
        brand: 'honda',
        name: 'Honda Civic',
        category: 'Sedán',
        price: 24990000,
        image: '/images/honda/CIVIC/Honda-Civic-1024x427.webp',
        isHybrid: false,
        isNew: false,
        slogan: 'El legado continúa',
    },
    {
        id: 'wr-v',
        brand: 'honda',
        name: 'New WR-V',
        category: 'SUV',
        price: 21990000,
        image: '/images/honda/New WR-V/wrv-menu-1.webp',
        isHybrid: false,
        isNew: true,
        slogan: 'Aventuras sin límites',
        features: [
            {
                title: 'HSA – Asistente de arranque en pendientes',
                desc: 'Evita el retroceso del vehículo en pendientes manteniendo el freno accionado por segundos tras soltar el pedal.',
                image: '/images/honda/New WR-V/caracteristicas/hsa.webp'
            },
            {
                title: '6 Airbags',
                desc: 'Protección integral con airbags frontales, laterales y de cortina distribuidos estratégicamente.',
                image: '/images/honda/New WR-V/caracteristicas/seguridad-1.webp'
            },
            {
                title: 'Conectividad y Confort',
                desc: 'Pantalla multimedia de 10\'\', Climatizador automático con salidas traseras y Smart Entry con botón de encendido.',
                image: '/images/honda/New WR-V/caracteristicas/sensores.webp'
            }
        ],
        gallery: [
            '/images/honda/New WR-V/galeria/perf-1.webp',
            '/images/honda/New WR-V/galeria/perf-2.webp',
            '/images/honda/New WR-V/galeria/perf-3.webp',
            '/images/honda/New WR-V/galeria/perf-4.webp'
        ],
        versions: [
            {
                name: 'WR-V EX',
                motor: '1.5 i-VTEC',
                transmission: 'CVT con Paddle Shift',
                power: '121 HP',
                traction: 'FWD',
                fuel: 'Gasolina',
                listPrice: 23990000,
                bonus: 2000000,
                bonusPrice: 21990000
            },
            {
                name: 'WR-V Touring',
                motor: '1.5 i-VTEC',
                transmission: 'CVT con Paddle Shift',
                power: '121 HP',
                traction: 'FWD',
                fuel: 'Gasolina',
                listPrice: 24990000,
                bonus: 2000000,
                bonusPrice: 22990000
            }
        ],
        desktopBanner: '/images/honda/New WR-V/banner/Precio-_-Cuota-26-de-Marzo_WRV-Desktop-1-scaled.webp'
    },
    {
        id: 'hr-v',
        brand: 'honda',
        name: 'New Honda HR-V',
        category: 'SUV',
        price: 19990000,
        image: '/images/honda/New HR-V/Menu-HRV-Touring.webp',
        isHybrid: false,
        isNew: true,
        slogan: 'Sofisticación en cada detalle',
    },
    {
        id: 'zr-v',
        brand: 'honda',
        name: 'Honda ZR-V',
        category: 'SUV',
        price: 26990000,
        image: '/images/honda/ZR-V/Honda-ZRV-1024x427.webp',
        isHybrid: false,
        isNew: false,
    },
    {
        id: 'cr-v',
        brand: 'honda',
        name: 'Honda CR-V',
        category: 'SUV',
        price: 31990000,
        image: '/images/honda/CR-V/Honda-CRV-1024x427.webp',
        isHybrid: false,
        isNew: false,
        slogan: 'Liderazgo en movimiento',
    },
    {
        id: 'cr-v-hybrid',
        brand: 'honda',
        name: 'Honda CR-V e:HEV',
        category: 'SUV',
        price: 46990000,
        image: '/images/honda/CR-V e:HEV/Honda-CRV-Hybrid-1024x427.webp',
        isHybrid: true,
        isNew: true,
        slogan: 'Poder electrificado',
        features: [
            {
                title: 'Panel Digital TFT de 10,2"',
                desc: 'Alta definición que garantiza una lectura de información ágil y sencilla.',
                image: '/images/honda/CR-V e:HEV/caracteristicas/Feature_Interno_Botao_Start_Stop_CR_V_2024_1-copia.webp'
            },
            {
                title: 'Head Up Display',
                desc: 'Proyección de información en el parabrisas para mayor seguridad al leer datos del panel.',
                image: '/images/honda/CR-V e:HEV/caracteristicas/Feature_Interno_Head_UP_Display_CR_V_2024_1-copia.webp'
            },
            {
                title: 'Motor híbrido Honda e:HEV',
                desc: 'Sistema híbrido avanzado para un rendimiento eficiente y potente.',
                image: '/images/honda/CR-V e:HEV/caracteristicas/Feature_Interno_Multimdia_Apple_Car_CR_V_2024_1.webp'
            }
        ],
        gallery: [
            '/images/honda/CR-V e:HEV/galeria/CRV-01.webp',
            '/images/honda/CR-V e:HEV/galeria/ehev-energia.webp',
            '/images/honda/CR-V e:HEV/galeria/ehev-moto-electrico.webp',
            '/images/honda/CR-V e:HEV/galeria/ehev-rendimiento.webp',
            '/images/honda/CR-V e:HEV/galeria/ehev-unidad.webp'
        ],
        versions: [
            {
                name: 'CR-V Advanced Hybrid',
                motor: '2.0L e:HEV',
                transmission: 'E-CVT',
                power: '204 hp',
                traction: 'AWD',
                fuel: 'Híbrido (e:HEV)',
                listPrice: 49990000,
                bonus: 3000000,
                bonusPrice: 46990000
            }
        ],
        desktopBanner: '/images/honda/CR-V e:HEV/banner/Precio-_-Cuota-26-de-Marzo_CRV-AH-Desktop-scaled.webp'
    },
    {
        id: 'pilot',
        brand: 'honda',
        name: 'Honda Pilot',
        category: 'SUV',
        price: 56990000,
        image: '/images/honda/PILOT/Honda-Pilot-1024x427.webp',
        isHybrid: false,
        isNew: false,
        slogan: 'Espacio para grandes momentos',
        features: [
            {
                title: 'Estructura de la carrocería ACE',
                desc: 'Diseño exclusivo que distribuye la energía de un choque frontal de manera uniforme para proteger a los pasajeros.',
                image: '/images/honda/PILOT/caracteristicas/Pilot-carrusel-seguridad-web-1.jpg'
            },
            {
                title: 'Monitor de tránsito cruzado',
                desc: 'Usa sensores traseros para alertar sobre vehículos que se aproximan al retroceder.',
                image: '/images/honda/PILOT/caracteristicas/monitor-transito.jpg'
            },
            {
                title: '7 Modos de manejo',
                desc: 'Configuraciones versátiles para optimizar el rendimiento en diferentes terrenos.',
                image: '/images/honda/PILOT/caracteristicas/sistema-ciego.jpg'
            }
        ],
        gallery: [
            '/images/honda/PILOT/galeria/Pilot-carrusel-performance-web-1.jpg',
            '/images/honda/PILOT/galeria/Pilot-carrusel-performance-web-2.jpg',
            '/images/honda/PILOT/galeria/Pilot-carrusel-performance-web-3.jpg',
            '/images/honda/PILOT/galeria/Pilot-carrusel-performance-web-4.jpg'
        ],
        versions: [
            {
                name: 'Pilot Touring 3.5 AT 4x4',
                motor: 'V6 3.5L',
                transmission: '10AT',
                power: '285 hp',
                traction: '4x4',
                fuel: 'Gasolina',
                listPrice: 59990000, // Guessing from bonus
                bonus: 3000000,
                bonusPrice: 56990000
            },
            {
                name: 'Pilot Elite 3.5 AT 4x4',
                motor: 'V6 3.5L',
                transmission: '10AT',
                power: '285 hp',
                traction: '4x4',
                fuel: 'Gasolina',
                listPrice: 61990000,
                bonus: 3000000,
                bonusPrice: 58990000
            }
        ],
        desktopBanner: '/images/honda/PILOT/banner/Precio-_-Cuota-26-de-Marzo_Pilot-Desktop-1-scaled.webp'
    }
];
