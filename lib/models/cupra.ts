import { Vehicle } from './types';

export const CUPRA_MODELS: Vehicle[] = [
    {
        id: 'formentor',
        brand: 'cupra',
        name: 'Formentor',
        category: 'SUV',
        price: 33090000,
        image: '/images/cupra/Formentor/formentor.webp',
        slogan: 'Pura adrenalina',
        features: [
            {
                title: 'Sistema de sonido inmersivo Sennheiser',
                desc: 'Experiencia profunda diseñada para acompañarte en cada momento.',
                image: '/images/cupra/Formentor/caracteristicas/sonido-inmersivo.webp'
            },
            {
                title: 'Radio touchscreen de 12,9"',
                desc: 'Interacción intuitiva y conectividad avanzada.',
                image: '/images/cupra/Formentor/caracteristicas/radio-touch.webp'
            },
            {
                title: 'Digital Cockpit 10,25"',
                desc: 'Visualización personalizable y nítida del rendimiento.',
                image: '/images/cupra/Formentor/caracteristicas/digital-cockpit.webp'
            }
        ],
        gallery: [
            '/images/cupra/Formentor/galeria/CUPRA-FORMENTOR-PA-001.webp',
            '/images/cupra/Formentor/galeria/CUPRA-FORMENTOR-PA-009.webp',
            '/images/cupra/Formentor/galeria/CUPRA-FORMENTOR-PA-035.webp',
            '/images/cupra/Formentor/galeria/CUPRA-FORMENTOR-PA-076.jpeg',
            '/images/cupra/Formentor/galeria/CUPRA-FORMENTOR-PA-153.webp',
            '/images/cupra/Formentor/galeria/CUPRA-Formentor-2025-fascias-deportivas.webp',
            '/images/cupra/Formentor/galeria/CUPRA-Formentor-2025-luz-trasera-infinita.webp',
            '/images/cupra/Formentor/galeria/CUPRA-Formentor-2025-obsesion-por-el-control.webp'
        ],
        versions: [
            {
                name: 'Formentor 2.0 TSI 204hp 4Drive',
                transmission: 'DSG7',
                traction: '4Drive',
                fuel: 'Gasolina',
                motor: '2.0TSI',
                power: '204 hp',
                listPrice: 36990000,
                bonusPrice: 33090000,
                bonus: 3900000
            },
            {
                name: 'Formentor VZ 2.0 TSI AT 4Drive',
                transmission: 'DSG7',
                traction: '4Drive',
                fuel: 'Gasolina',
                motor: '2.0TSI',
                power: '333 hp',
                listPrice: 44990000,
                bonusPrice: 42090000,
                bonus: 2900000
            },
            {
                name: 'Formentor VZ 2.0 TSI AT 4Drive | Pintura Mate + Llantas Cobre',
                transmission: 'DSG7',
                traction: '4Drive',
                fuel: 'Gasolina',
                motor: '2.0TSI',
                power: '333 hp',
                listPrice: 47990000,
                bonusPrice: 45090000,
                bonus: 2900000
            },
            {
                name: 'Formentor VZ Black Rebel 2.0 TSI AT 4Drive',
                transmission: 'DSG7',
                traction: '4Drive',
                fuel: 'Gasolina',
                motor: '2.0TSI',
                power: '333 hp',
                listPrice: 47990000,
                bonusPrice: 45090000,
                bonus: 2900000
            }
        ]
    },
    {
        id: 'formentor-ehybrid',
        brand: 'cupra',
        name: 'Formentor e-Hybrid',
        category: 'SUV',
        price: 35490000,
        image: '/images/cupra/Formentor e-Hybrid/formentor e-hybrid.webp',
        isHybrid: true,
        slogan: 'Potencia electrificada',
        features: [
            {
                title: 'Asientos Bucket',
                desc: 'Asientos Bucket de cuero con ajuste eléctrico en altura y soporte lumbar, diseñados para ofrecer confort y estilo.',
                image: '/images/cupra/Formentor e-Hybrid/caracteristicas/asientos.webp'
            },
            {
                title: 'Iluminación LED',
                desc: 'Luces diurnas, principales y traseras LED que ofrecen una firma luminosa única y mejor visibilidad.',
                image: '/images/cupra/Formentor e-Hybrid/caracteristicas/limunicaion-led.webp'
            },
            {
                title: 'Llantas de aleación de 18"',
                desc: 'Llantas deportivas con logo CUPRA en cobre, diseñadas para una conducción precisa y dinámica.',
                image: '/images/cupra/Formentor e-Hybrid/caracteristicas/llantas.webp'
            }
        ],
        gallery: [
            '/images/cupra/Formentor e-Hybrid/galeria/CUPRA-FORMENTOR-PA-007-copy2.webp',
            '/images/cupra/Formentor e-Hybrid/galeria/CUPRA-FORMENTOR-PA-037-copy1.webp',
            '/images/cupra/Formentor e-Hybrid/galeria/CUPRA-FORMENTOR-PA-127-copy1.webp',
            '/images/cupra/Formentor e-Hybrid/galeria/CUPRA-FORMENTOR-PA-168-copy1.webp'
        ],
        versions: [
            {
                name: 'Formentor 1.5 TSI e-Hybrid',
                transmission: 'DSG6',
                traction: '4x2',
                fuel: 'Híbrido Enchufable',
                motor: '1.5TSI',
                power: '204 hp',
                listPrice: 40990000,
                bonusPrice: 35490000,
                bonus: 5500000
            }
        ]
    },
    {
        id: 'leon',
        brand: 'cupra',
        name: 'León',
        category: 'Hatchback',
        price: 27590000,
        image: '/images/cupra/Leon/leon.webp',
        isHybrid: true,
        slogan: 'El pulso de una nueva era',
        features: [
            {
                title: 'Asientos delanteros tipo bucket con ajuste eléctrico',
                desc: 'Asientos con ajuste de altura y lumbar eléctrico que ofrecen un soporte y confort superior. Diseño con hilo rojo.',
                image: '/images/cupra/Leon/caracteristicas/asientos-bucket.webp'
            },
            {
                title: 'Cargador inalámbrico',
                desc: 'Carga inalámbrica para mantener el ritmo sin interrupciones.',
                image: '/images/cupra/Leon/caracteristicas/cargador-inalambrico.webp'
            },
            {
                title: 'Placa iluminada en pisaderas laterales',
                desc: 'Bienvenida proyectando exclusividad y carácter en cada entrada.',
                image: '/images/cupra/Leon/caracteristicas/placa-iluminada.webp'
            }
        ],
        gallery: [
            '/images/cupra/Leon/galeria/CUPRA-LEON-PA-011.webp',
            '/images/cupra/Leon/galeria/CUPRA-LEON-PA-031-copy1.webp',
            '/images/cupra/Leon/galeria/CUPRA-LEON-PA-031.webp',
            '/images/cupra/Leon/galeria/CUPRA-LEON-PA-037.webp',
            '/images/cupra/Leon/galeria/CUPRA-LEON-PA-102.webp',
            '/images/cupra/Leon/galeria/cupra-leon-2025-obsession-por-la-ciudad.webp'
        ],
        versions: [
            {
                name: 'Cupra Leon 1.5 TSI mHEV AT | Colores Cat A',
                transmission: 'DSG7',
                traction: '4x2',
                fuel: 'Gasolina / mHEV',
                motor: '1.5TSI',
                power: '150 hp',
                listPrice: 31490000,
                bonusPrice: 27590000,
                bonus: 3900000
            },
            {
                name: 'Cupra Leon 1.5 TSI mHEV AT | Colores Cat B',
                transmission: 'DSG7',
                traction: '4x2',
                fuel: 'Gasolina / mHEV',
                motor: '1.5TSI',
                power: '150 hp',
                listPrice: 31490000,
                bonusPrice: 28290000,
                bonus: 3200000
            },
            {
                name: 'Cupra Leon VZ 2.0 TSI AT',
                transmission: 'DSG7',
                traction: '4X2',
                fuel: 'Gasolina',
                motor: '2.0TSI',
                power: '300 hp',
                listPrice: 40490000,
                bonusPrice: 37490000,
                bonus: 3000000
            },
            {
                name: 'Cupra Leon VZ 2.0 TSI AT | Pintura Mate + Llantas Cobre',
                transmission: 'DSG7',
                traction: '4X2',
                fuel: 'Gasolina',
                motor: '2.0TSI',
                power: '300 hp',
                listPrice: 43490000,
                bonusPrice: 40490000,
                bonus: 3000000
            }
        ]
    },
    {
        id: 'tavascan',
        brand: 'cupra',
        name: 'Tavascan',
        category: 'Eléctrico',
        price: 47590000,
        image: '/images/cupra/Tavascan/tavascan.webp',
        isElectric: true,
        slogan: 'Un sueño hecho realidad',
        features: [
            {
                title: 'Atmósfera cálida',
                desc: 'Paneles perforados retroiluminados en las puertas y detalles de luz en el panel frontal y portavasos.',
                image: '/images/cupra/Tavascan/caracteristicas/atmosfera.webp'
            },
            {
                title: 'El centro de todo',
                desc: 'Columna central de diseño artesanal con toques de cobre y pantalla central orientada al conductor.',
                image: '/images/cupra/Tavascan/caracteristicas/centro-de-todo.webp'
            },
            {
                title: 'Asientos Bucket',
                desc: 'Asientos ergonómicos con ajuste eléctrico de altura y lumbar. Opciones de tapiz en tela y cuero según versión.',
                image: '/images/cupra/Tavascan/caracteristicas/asientos.webp'
            }
        ],
        gallery: [
            '/images/cupra/Tavascan/galeria/CUPRA-TAVASCAN-015.webp',
            '/images/cupra/Tavascan/galeria/CUPRA-TAVASCAN-019.webp',
            '/images/cupra/Tavascan/galeria/CUPRA-TAVASCAN-074.webp',
            '/images/cupra/Tavascan/galeria/CUPRA-TAVASCAN-133-copy1.webp',
            '/images/cupra/Tavascan/galeria/cupra-tavascan-2024-black-and-copper-wheel.webp',
            '/images/cupra/Tavascan/galeria/new-electric-cupra-rear-lighting-2024.webp'
        ],
        versions: [
            {
                name: 'Tavascan Adrenaline 82 kWh',
                transmission: 'AT',
                traction: 'RWD',
                fuel: 'Eléctrico',
                motor: 'Eléctrico',
                power: '286 hp',
                listPrice: 50990000,
                bonusPrice: 47590000,
                bonus: 3400000
            },
            {
                name: 'Tavascan Extreme 82 kWh',
                transmission: 'AT',
                traction: 'RWD',
                fuel: 'Eléctrico',
                motor: 'Eléctrico',
                power: '286 hp',
                listPrice: 53990000,
                bonusPrice: 50590000,
                bonus: 3400000
            },
            {
                name: 'Tavascan Extreme 82 kWh | Pintura Mate',
                transmission: 'AT',
                traction: 'RWD',
                fuel: 'Eléctrico',
                motor: 'Eléctrico',
                power: '286 hp',
                listPrice: 55490000,
                bonusPrice: 52090000,
                bonus: 3400000
            }
        ]
    },
    {
        id: 'terramar',
        brand: 'cupra',
        name: 'Terramar',
        category: 'SUV',
        price: 37190000,
        image: '/images/cupra/Terramar/terramar.webp',
        isHybrid: true,
        isNew: true,
        slogan: 'El nuevo SUV de CUPRA',
        features: [
            {
                title: 'Perfección en cada detalle',
                desc: 'Interior envolvente con materiales premium, iluminación ambiental y diseño de líneas fluidas.',
                image: '/images/cupra/Terramar/caracteristicas/perfeccion.webp'
            },
            {
                title: 'Asientos delanteros tipo bucket',
                desc: 'Asientos con ajuste eléctrico de altura y lumbar ergonómicos. Opciones de tapiz de tela y cuero según versión.',
                image: '/images/cupra/Terramar/caracteristicas/asientos.webp'
            },
            {
                title: 'Radio touchscreen de 12,9"',
                desc: 'Compatibilidad Full Link inalámbrica con Android Auto y Apple Carplay.',
                image: '/images/cupra/Terramar/caracteristicas/radio.webp'
            }
        ],
        gallery: [
            '/images/cupra/Terramar/galeria/CUPRA-TERRAMAR-002X.jpeg',
            '/images/cupra/Terramar/galeria/CUPRA-TERRAMAR-112X.jpeg',
            '/images/cupra/Terramar/galeria/CUPRA-TERRAMAR-126-Normal.webp',
            '/images/cupra/Terramar/galeria/CUPRA-TERRAMAR-140.webp'
        ],
        versions: [
            {
                name: 'Terramar 1.5 TSI mHEV AT',
                transmission: 'DSG7',
                traction: '4X2',
                fuel: 'Gasolina / mHEV',
                motor: '1.5TSI',
                power: '150 hp',
                listPrice: 39990000,
                bonusPrice: 37190000,
                bonus: 2800000
            },
            {
                name: 'Terramar High 1.5 TSI mHEV AT',
                transmission: 'DSG7',
                traction: '4X2',
                fuel: 'Gasolina / mHEV',
                motor: '1.5TSI',
                power: '150 hp',
                listPrice: 43990000,
                bonusPrice: 41690000,
                bonus: 2300000
            },
            {
                name: 'Terramar High 1.5 TSI mHEV AT | Pintura Mate',
                transmission: 'DSG7',
                traction: '4X2',
                fuel: 'Gasolina / mHEV',
                motor: '1.5TSI',
                power: '150 hp',
                listPrice: 45490000,
                bonusPrice: 43190000,
                bonus: 2300000
            }
        ]
    }
];
