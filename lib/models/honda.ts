import { Vehicle } from './types';

export const HONDA_MODELS: Vehicle[] = [
    {
        id: 'civic',
        brand: 'honda',
        name: 'Honda Civic',
        category: 'Sedán',
        price: 29990000,
        image: '/images/honda/CIVIC/Honda-Civic-1024x427.webp',
        isHybrid: false,
        isNew: false,
        slogan: 'El legado continúa',
        features: [
            {
                title: 'Motor Turbo 1.5L',
                desc: 'Nueva generación con motor de aleación de aluminio y 16 válvulas DOHC i-VTEC.',
                image: '/images/honda/CIVIC/caracteristicas/motor.webp'
            },
            {
                title: 'VSA - Estabilizador de Vehículo',
                desc: 'Optimiza la seguridad equilibrando automáticamente la tracción y el frenado de forma independiente.',
                image: '/images/honda/CIVIC/caracteristicas/vsa.jpg'
            },
            {
                title: 'Equipamiento Tecnológico',
                desc: 'Pantalla táctil de 9", navegador integrado y sistema de audio de 6 parlantes.',
                image: '/images/honda/CIVIC/caracteristicas/pantalla-tactil.jpg'
            }
        ],
        gallery: [
            '/images/honda/CIVIC/galeria/1.webp',
            '/images/honda/CIVIC/galeria/2.jpg',
            '/images/honda/CIVIC/galeria/3.webp',
            '/images/honda/CIVIC/galeria/4.jpg',
            '/images/honda/CIVIC/galeria/5.webp'
        ],
        versions: [
            {
                name: 'Civic Touring CVT 1.5T',
                motor: '1.5T',
                transmission: 'CVT',
                power: '176 hp',
                traction: 'FWD',
                fuel: 'Gasolina',
                listPrice: 31390000,
                bonus: 1400000,
                bonusPrice: 29990000
            }
        ],
        desktopBanner: '/images/honda/CIVIC/banner/Precio-_-Cuota-26-de-Marzo_Civic-Escritorio-scaled.webp',
        mobileBanner: '/images/honda/CIVIC/banner/Precio-_-Cuota-26-de-Marzo_Civic-Escritorio-scaled.webp'
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
        name: 'New HR-V',
        category: 'SUV',
        price: 25990000,
        image: '/images/honda/New HR-V/Menu-HRV-Touring.webp',
        isHybrid: false,
        isNew: true,
        slogan: 'Sofisticación en cada detalle',
        features: [
            {
                title: 'Sistema ULT',
                desc: 'Sistema de configuración de asientos versátil exclusivo de Honda para maximizar el espacio de carga.',
                image: '/images/honda/New HR-V/Menu-HRV-Touring.webp'
            },
            {
                title: 'HDC - Control de descenso de pendientes',
                desc: 'Permite bajar superficies inclinadas de forma controlada sin intervención manual de los frenos.',
                image: '/images/honda/New HR-V/Menu-HRV-Touring.webp'
            },
            {
                title: 'Iluminación Full LED',
                desc: 'Sistema de iluminación completo en LED para mayor visibilidad y estética moderna.',
                image: '/images/honda/New HR-V/Menu-HRV-Touring.webp'
            }
        ],
        gallery: [
            '/images/honda/New HR-V/galeria/1.webp',
            '/images/honda/New HR-V/galeria/2.webp',
            '/images/honda/New HR-V/galeria/3.webp',
            '/images/honda/New HR-V/galeria/4.webp',
            '/images/honda/New HR-V/galeria/5.webp',
            '/images/honda/New HR-V/galeria/6.webp',
            '/images/honda/New HR-V/galeria/7.webp',
            '/images/honda/New HR-V/galeria/8.jpg'
        ],
        versions: [
            {
                name: 'New HR-V Touring',
                motor: '1.5L i-VTEC',
                transmission: 'Automática CVT',
                power: '119 hp',
                traction: 'FWD',
                fuel: 'Gasolina',
                listPrice: 26990000,
                bonus: 1000000,
                bonusPrice: 25990000
            }
        ],
        desktopBanner: '/images/honda/New HR-V/banner/Precio-_-Cuota-26-de-Marzo_HRV-Desktop-1-scaled.webp',
        mobileBanner: '/images/honda/New HR-V/banner/Precio-_-Cuota-26-de-Marzo_HRV-Desktop-1-scaled.webp'
    },
    {
        id: 'zr-v',
        brand: 'honda',
        name: 'Honda ZR-V',
        category: 'SUV',
        price: 29490000,
        image: '/images/honda/ZR-V/Honda-ZRV-1024x427.webp',
        isHybrid: false,
        isNew: false,
        slogan: 'Sofisticación deportiva',
        features: [
            {
                title: 'LKAS - Asistencia para mantenerse en el carril',
                desc: 'Facilita la conducción manteniendo el vehículo centrado en el carril.',
                image: '/images/honda/ZR-V/caracteristicas/asistencia-cambio-carril.jpg'
            },
            {
                title: 'ACC - Control crucero adaptable',
                desc: 'Sistema inteligente que se adapta a la velocidad de los vehículos delante.',
                image: '/images/honda/ZR-V/caracteristicas/control-crucero.jpg'
            },
            {
                title: 'RDM - Mitigación de salida de carril',
                desc: 'Alerta mediante vibración del volante y señal en tablero si el vehículo cruza el límite de la vía.',
                image: '/images/honda/ZR-V/caracteristicas/salida-carril.jpg'
            }
        ],
        gallery: [
            '/images/honda/ZR-V/galeria/ZRV-carrusel-diseno-web-1.jpg',
            '/images/honda/ZR-V/galeria/ZRV-carrusel-diseno-web-2.jpg',
            '/images/honda/ZR-V/galeria/ZRV-carrusel-diseno-web-3.jpg',
            '/images/honda/ZR-V/galeria/ZRV-carrusel-diseno-web-4.jpg',
            '/images/honda/ZR-V/galeria/ZRV-carrusel-diseno-web-5.jpg',
            '/images/honda/ZR-V/galeria/ZRV-carrusel-diseno-web-6.jpg',
            '/images/honda/ZR-V/galeria/ZRV-carrusel-confort-web-1.jpg',
            '/images/honda/ZR-V/galeria/ZRV-carrusel-confort-web-4.jpg',
            '/images/honda/ZR-V/galeria/ZRV-carrusel-confort-web-verdadera4.jpg'
        ],
        versions: [
            {
                name: 'ZR-V EXL 2.0 AUT. 4X2',
                motor: '2.0L',
                transmission: 'CVT',
                power: '155 hp',
                traction: '4x2',
                fuel: 'Gasolina',
                listPrice: 31990000,
                bonus: 2500000,
                bonusPrice: 29490000
            },
            {
                name: 'ZR-V TOURING 2.0 AUT. 4X2',
                motor: '2.0L',
                transmission: 'CVT',
                power: '155 hp',
                traction: '4x2',
                fuel: 'Gasolina',
                listPrice: 33490000,
                bonus: 3000000,
                bonusPrice: 30490000
            }
        ],
        desktopBanner: '/images/honda/ZR-V/banner/Precio-_-Cuota-26-de-Marzo_ZRV-Desktop-1-scaled.webp'
    },
    {
        id: 'cr-v',
        brand: 'honda',
        name: 'Honda CR-V',
        category: 'SUV',
        price: 39990000,
        image: '/images/honda/CR-V/Honda-CRV-1024x427.webp',
        isHybrid: false,
        isNew: false,
        slogan: 'Liderazgo en movimiento',
        features: [
            {
                title: 'Motor 1.5 Turbo VTEC',
                desc: 'Equilibrio entre potencia y eficiencia con tecnología VTEC Turbo.',
                image: '/images/honda/CR-V/caracteristicas/Civic-carrusel-motor-2.webp'
            },
            {
                title: 'Sistema de audio Bose premium',
                desc: 'Equipamiento con 12 altavoces para una experiencia de sonido superior.',
                image: '/images/honda/CR-V/caracteristicas/RENDIMIENTO.webp'
            },
            {
                title: 'Tracción Real Time 4x4',
                desc: 'Control y tracción inteligente para cualquier terreno.',
                image: '/images/honda/CR-V/caracteristicas/AWD.webp'
            }
        ],
        gallery: [
            '/images/honda/CR-V/galeria/CRV-carrusel-diseno-1.webp',
            '/images/honda/CR-V/galeria/CRV-carrusel-diseno-2.webp',
            '/images/honda/CR-V/galeria/CRV-carrusel-diseno-3.webp',
            '/images/honda/CR-V/galeria/CRV-carrusel-tecnologia-1.jpg',
            '/images/honda/CR-V/galeria/CRV-carrusel-tecnologia-2.webp',
            '/images/honda/CR-V/galeria/CRV-carrusel-tecnologia-3.webp',
            '/images/honda/CR-V/galeria/crv-portada-v2.webp'
        ],
        versions: [
            {
                name: 'CR-V Touring 1.5 Turbo Aut. 4x4',
                motor: '1.5 Turbo VTEC',
                transmission: 'Automática',
                power: '188 hp',
                traction: '4x4',
                fuel: 'Gasolina',
                listPrice: 42990000,
                bonus: 3000000,
                bonusPrice: 39990000
            }
        ],
        desktopBanner: '/images/honda/CR-V/banner/Precio-_-Cuota-26-de-Marzo_CRV-Desktop-1-scaled.webp'
    },
    {
        id: 'cr-v-hybrid',
        brand: 'honda',
        name: 'Honda CR-V e:HEV',
        category: 'SUV, Híbrido',
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
                listPrice: 59990000,
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
