import { Vehicle } from './types';

export const BMW_MODELS: Vehicle[] = [
    {
        "id": "serie-1",
        "brand": "bmw",
        "name": "SERIE 1",
        "category": "HATCHBACK",
        "price": 29900000,
        "image": "/images/BMW/SERIE 1/MIN-SERIE1.png",
        "slogan": "THE NEW 1.",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "CONTROL ABSOLUTO",
                "desc": "Disfruta de una dirección precisa y una respuesta ágil que garantiza estabilidad y control en cada curva, manteniendo el dinamismo del nuevo BMW Serie 1 incluso en los giros más exigentes.",
                "image": "/images/BMW/SERIE 1/caracteristicas/CONTROL_ABSOLUTO (1).jpg"
            },
            {
                "title": "DESEMPEÑO QUE EMOCIONA",
                "desc": "El nuevo BMW Serie 1 se adapta a cualquier entorno gracias a su motor potente y una transmisión de alto rendimiento, ofreciendo una conducción ágil y eficiente tanto en la ciudad como en carretera.",
                "image": "/images/BMW/SERIE 1/caracteristicas/Desempeno_que_emociona.jpg"
            },
            {
                "title": "CLÁSICO. DEPORTIVO. ÚNICO",
                "desc": "En la parte delantera, la rejilla doble realza el espíritu deportivo del nuevo BMW Serie 1. El diseño de varillas verticales y diagonales transmite mucho dinamismo.",
                "image": "/images/BMW/SERIE 1/caracteristicas/Imagen1.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/SERIE 1/galeria/CONTROL_ABSOLUTO.jpg",
            "/images/BMW/SERIE 1/galeria/Interior_1.jpg",
            "/images/BMW/SERIE 1/galeria/Interior_3.jpg",
            "/images/BMW/SERIE 1/galeria/Interior_5.jpg",
            "/images/BMW/SERIE 1/galeria/Interior_6.jpg",
            "/images/BMW/SERIE 1/galeria/P90567870_lowRes_the-all-new-bmw-m135 (1).jpg",
            "/images/BMW/SERIE 1/galeria/P90567870_lowRes_the-all-new-bmw-m135.jpg",
            "/images/BMW/SERIE 1/galeria/Teconologia_1.jpg",
            "/images/BMW/SERIE 1/galeria/Teconologia_4.jpg",
            "/images/BMW/SERIE 1/galeria/Teconologia_5.jpg"
        ],
        "versions": [
            {
                "name": "120 Hatch Dynamic",
                "motor": "1.499 Twin Power Turbo",
                "transmission": "Steptronic doble embrage 7 vel.",
                "power": "170 / 4.700 - 6.500",
                "torque": "280 / 1.500 - 4.400",
                "traction": "Delantera",
                "listPrice": 35900000,
                "bonus": 6000000,
                "bonusPrice": 29900000
            },
            {
                "name": "120 Hatch M Sport",
                "motor": "1.499 Twin Power Turbo",
                "transmission": "Steptronic doble embrage 7 vel.",
                "power": "170 / 4.700 - 6.500",
                "torque": "280 / 1.500 - 4.400",
                "traction": "Delantera",
                "listPrice": 42900000,
                "bonus": 4000000,
                "bonusPrice": 38900000
            },
            {
                "name": "M135 Hatch xDrive",
                "motor": "1,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "306 / 5.000-6.250 (hp/rpm)",
                "torque": "450 / 1.750-4.500 (Nm/rpm)",
                "fuel": "Ciudad: 10,8 km/l - Carretera: 15,6 km/l - Mixto: 13,3 km/l",
                "traction": "xDrive",
                "listPrice": 59900000,
                "bonus": 6000000,
                "bonusPrice": 53900000
            }
        ],
        "desktopBanner": "/images/BMW/SERIE 1/banner/Banner_Serie_1_2.png",
        "mobileBanner": "/images/BMW/SERIE 1/banner/Banner_Serie_1_2.png",
        "videoUrl": "https://www.youtube.com/embed/uNx_WZ3Uezg"
    },
    {
        "id": "serie-2-gran-coupe",
        "brand": "bmw",
        "name": "Serie 2 Gran Coupe",
        "category": "COUPÉ",
        "price": 34900000,
        "image": "/images/BMW/SERIE 2 GRAN COUPE/MIN-SERIE2-GP.png",
        "slogan": "THE NEW 2.",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Siempre inconfundible.",
                "desc": "La parrilla BMW Iconic Glow atrae todas las miradas, especialmente en la oscuridad. La luz blanca resalta su contorno, siendo muy presente cuando el vehículo están parado o en marcha.",
                "image": "/images/BMW/SERIE 2 GRAN COUPE/caracteristicas/BMW_Serie_2_GC_Atras.jpg"
            },
            {
                "title": "Conducción más sólida. Control más directo.",
                "desc": "La suspensión M adaptativa con reducción de altura se adapta de manera autónoma al terreno y tu estilo de conducción. Con dirección deportiva M incluida para tomas curvas con mucha precisión.",
                "image": "/images/BMW/SERIE 2 GRAN COUPE/caracteristicas/BMW_Serie_2_GC_Perfil.jpg"
            },
            {
                "title": "Ágil por la curva.",
                "desc": "El mayor diámetro de las ruedas acentúa el aspecto atlético. Su BMW se agarra bien la carretera. Las maniobras de conducción se estabilizan y las curvas se toman con seguridad.",
                "image": "/images/BMW/SERIE 2 GRAN COUPE/caracteristicas/BMW_Serie_2_Iconic_Glow.png"
            }
        ],
        "gallery": [
            "/images/BMW/SERIE 2 GRAN COUPE/galeria/BMW_Serie_2_GC_Interior.png",
            "/images/BMW/SERIE 2 GRAN COUPE/galeria/BMW_Serie_2_GC_Tecnologia_1.jpg",
            "/images/BMW/SERIE 2 GRAN COUPE/galeria/BMW_Serie_2_GC_Tecnologia_2.jpg",
            "/images/BMW/SERIE 2 GRAN COUPE/galeria/BMW_Serie_2_GC_Tecnologia_3.jpg",
            "/images/BMW/SERIE 2 GRAN COUPE/galeria/BMW_Serie_2_Interior_2.jpg",
            "/images/BMW/SERIE 2 GRAN COUPE/galeria/BMW_Serie_2_Interior_3.jpg",
            "/images/BMW/SERIE 2 GRAN COUPE/galeria/Interior_4_S2_GC (1).jpg",
            "/images/BMW/SERIE 2 GRAN COUPE/galeria/Interior_4_S2_GC.jpg",
            "/images/BMW/SERIE 2 GRAN COUPE/galeria/foto_0000022820210818163246_A_1320x679 (1).jpg",
            "/images/BMW/SERIE 2 GRAN COUPE/galeria/foto_0000022820210818163246_A_1320x679.jpg"
        ],
        "versions": [
            {
                "name": "220 Gran Coupé Dynamic",
                "motor": "1.499 Twin Power Turbo",
                "transmission": "Steptronic doble embrage 7 vel.",
                "power": "170 / 4.700 - 6.500",
                "torque": "280 / 1.500 - 4.400",
                "traction": "Delantera",
                "listPrice": 39900000,
                "bonus": 5000000,
                "bonusPrice": 34900000
            },
            {
                "name": "M235 xDrive Gran Coupé HEA",
                "motor": "1.998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 7 vel.",
                "power": "300 / 5.750-6.500",
                "torque": "400 / 2.000-4.500",
                "traction": "xDrive (4x4 inteligente)",
                "listPrice": 69900000,
                "bonusPrice": 69900000,
                "bonus": 0
            }
        ],
        "desktopBanner": "/images/BMW/SERIE 2 GRAN COUPE/banner/BANNER_SERIE_2_GRAN_COUPE.jpg",
        "mobileBanner": "/images/BMW/SERIE 2 GRAN COUPE/banner/BANNER_SERIE_2_GRAN_COUPE.jpg",
        "videoUrl": "https://www.youtube.com/embed/pSrjaqolRCU"
    },
    {
        "id": "serie-2-coupé",
        "brand": "bmw",
        "name": "SERIE 2 COUPE",
        "category": "COUPÉ",
        "price": 47900000,
        "image": "/images/BMW/SERIE 2 COUPÉ/min-serie-2-coupe.png",
        "slogan": "CREADO PARA EMOCIONAR",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Los motores altamente eficientes del BMW Serie 2 Coupé",
                "desc": "El BMW 220i Coupé M Sport viene con un motor a gasolina de 4 cilindros en línea BMW TwinPower Turbo y el BMW M240i xDrive, un motor de gasolina de 6 cilindros en línea BMW M TwinPower Turbo con 275Kw (375 CV).",
                "image": "/images/BMW/SERIE 2 COUPÉ/caracteristicas/BMW_220i_Atras.png"
            },
            {
                "title": "El diseño de la zaga.",
                "desc": "Las llamativas luces traseras situadas en los extremos acentúan la amplitud del BMW Serie 2 Coupé. Las líneas horizontales generan así un juego de luces y sombras que realza la parte trasera.",
                "image": "/images/BMW/SERIE 2 COUPÉ/caracteristicas/BMW_220i_Frontal.png"
            },
            {
                "title": "Parrilla doble de un solo marco.",
                "desc": "La parrilla doble con un solo marco subraya el diseño de marcado carácter del BMW Serie 2 Coupé. En lugar de las clásicas varillas de parrilla, se ofrecen solapas de llamativo diseño. Estas se abren o se cierran en función de la demanda de aire y permiten también hacerse una idea de la potencia del motor escondido tras ellas.",
                "image": "/images/BMW/SERIE 2 COUPÉ/caracteristicas/image.1718186476674_1.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/SERIE 2 COUPÉ/galeria/220_Interior_2.jpg",
            "/images/BMW/SERIE 2 COUPÉ/galeria/BMW_220i_2.jpg",
            "/images/BMW/SERIE 2 COUPÉ/galeria/COSY_1_1.jpg",
            "/images/BMW/SERIE 2 COUPÉ/galeria/Modulo_Tecnologia_Seguridad_C_1320x679.jpg",
            "/images/BMW/SERIE 2 COUPÉ/galeria/foto_0000022820210818163246_A_1320x679.jpg"
        ],
        "versions": [
            {
                "name": "220i Coupé M Sport LCI",
                "motor": "1,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "184 / 5.000-6.500 (hp/rpm)",
                "torque": "300 / 1.350-4.000 (Nm /rpm)",
                "fuel": "11,5 km/l (mixto)",
                "traction": "Trasera",
                "listPrice": 49900000,
                "bonus": 2000000,
                "bonusPrice": 47900000
            },
            {
                "name": "M240i xDrive Coupé LCI",
                "motor": "2,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "387 / 5.800-6.500 (hp/rpm)",
                "torque": "500 / 1.900-5.000 (Nm /rpm)",
                "fuel": "12,5 km/l (mixto)",
                "traction": "xDrive",
                "listPrice": 70900000,
                "bonus": 5000000,
                "bonusPrice": 65900000
            }
        ],
        "desktopBanner": "/images/BMW/SERIE 2 COUPÉ/banner/cq5dam.jpg",
        "mobileBanner": "/images/BMW/SERIE 2 COUPÉ/banner/cq5dam.jpg",
        "videoUrl": "https://www.youtube.com/embed/5qByKvvHm6s"
    },
    {
        "id": "serie-3",
        "brand": "bmw",
        "name": "SERIE 3 HÍBRIDO",
        "category": "SEDÁN, HÍBRIDO",
        "price": 58900000,
        "image": "/images/BMW/SERIE 3/min-serie23.png",
        "slogan": "LO MEJOR DE AMBOS MUNDOS",
        "isHybrid": true,
        "isElectric": false,
        "features": [
            {
                "title": "Ingeniería que inspira",
                "desc": "Su motor deportivo de gasolina, TwinPower Turbo, le da a tu BMW Serie 3 híbrido flexibilidad y potencia para enfrentar cualquier obstáculo. Además de una máxima eficiencia gracias a la distribución inteligente de la energía y al cambio automático entre los motores. Perfecto para las necesidades y requisitos de tu vida diaria, gracias a la combinación de motor de gasolina y motor eléctrico..",
                "image": "/images/BMW/SERIE 3/caracteristicas/Modulo_Performance_C_948x619.jpg"
            },
            {
                "title": "Tecnología Híbrida",
                "desc": "Con la tecnología Mild Hybrid podrás reducir las emisiones, el consumo de combustible y obtener más dinamismo. Máxima flexibilidad: ideal para conductores que desean la máxima versatilidad.",
                "image": "/images/BMW/SERIE 3/caracteristicas/Modulo_Performance_D_948x619.jpg"
            },
            {
                "title": "Motor eléctrico",
                "desc": "Con el BMW serie 3 híbrido podrás conducir un auto con opción eléctrica sin generar emisiones y descubrir un mundo nuevo donde la conducción inteligente es protagonista. Siempre que retiras el pie del acelerador, la energía cinética se transforma en energía eléctrica y se almacena en la batería para disfrutar de más kilómetros de autonomía eléctrica.",
                "image": "/images/BMW/SERIE 3/caracteristicas/image.1652277822999.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/SERIE 3/galeria/Modulo_Diseno_Interior_A_948x619.jpg",
            "/images/BMW/SERIE 3/galeria/Modulo_Diseno_Interior_B_948x619.jpg",
            "/images/BMW/SERIE 3/galeria/Modulo_Diseno_Interior_C_948x619.jpg",
            "/images/BMW/SERIE 3/galeria/Modulo_Tecnologia_Seguridad_C_1320x679 (1).jpg",
            "/images/BMW/SERIE 3/galeria/Modulo_Tecnologia_Seguridad_C_1320x679.jpg",
            "/images/BMW/SERIE 3/galeria/Modulo_Tecnologia_Seguridad_D_1320x679.jpg",
            "/images/BMW/SERIE 3/galeria/Modulo_Tecnologia_Seguridad_E_1320x679.jpg"
        ],
        "versions": [
            {
                "name": "330e Berlina Dynamic LCI II",
                "motor": "1.998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "184 / 5.000-6.500. Comb: 292 hp",
                "torque": "300 / 1.350-4.000. Comb: 420 Nm.",
                "traction": "Trasera",
                "listPrice": 65900000,
                "bonus": 7000000,
                "bonusPrice": 58900000
            }
        ],
        "desktopBanner": "/images/BMW/SERIE 3/banner/Banner_Hero_1440x720.jpg",
        "mobileBanner": "/images/BMW/SERIE 3/banner/Banner_Hero_1440x720.jpg",
        "videoUrl": "https://www.youtube.com/embed/ANU0J5KLn_Y"
    },
    {
        "id": "serie-3",
        "brand": "bmw",
        "name": "SERIE 3",
        "category": "SEDAN",
        "price": 43400000,
        "image": "/images/BMW/SERIE 3/min-serie23.png",
        "slogan": "MOCIÓN EN CADA VIAJE",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Ingeniería que inspira",
                "desc": "Su amplia gama de motores deportivos de gasolina y diésel, TwinPower Turbo, le da a tu BMW Serie 3 flexibilidad y potencia para enfrentar cualquier obstáculo.",
                "image": "/images/BMW/SERIE 3/caracteristicas/Modulo_Performance_C_948x619.jpg"
            },
            {
                "title": "Conducción dinámica",
                "desc": "Todas sus características de agilidad, seguridad y dinamismo lo vuelven el sedán deportivo supremo.",
                "image": "/images/BMW/SERIE 3/caracteristicas/Modulo_Performance_D_948x619.jpg"
            },
            {
                "title": "Placer máximo",
                "desc": "Su motor BMW Twin Power Turbo te sorprenderá con su ágil entrega",
                "image": "/images/BMW/SERIE 3/caracteristicas/image.1652277822999.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/SERIE 3/galeria/Modulo_Diseno_Interior_A_948x619.jpg",
            "/images/BMW/SERIE 3/galeria/Modulo_Diseno_Interior_B_948x619.jpg",
            "/images/BMW/SERIE 3/galeria/Modulo_Diseno_Interior_C_948x619.jpg",
            "/images/BMW/SERIE 3/galeria/Modulo_Tecnologia_Seguridad_C_1320x679 (1).jpg",
            "/images/BMW/SERIE 3/galeria/Modulo_Tecnologia_Seguridad_C_1320x679.jpg",
            "/images/BMW/SERIE 3/galeria/Modulo_Tecnologia_Seguridad_D_1320x679.jpg",
            "/images/BMW/SERIE 3/galeria/Modulo_Tecnologia_Seguridad_E_1320x679.jpg"
        ],
        "versions": [
            {
                "name": "320i Berlina Urban LCI II",
                "motor": "1.998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "184 / 5.000-6.500 (hp/rpm)",
                "torque": "300 / 1.350-4.000(Nm/rpm)",
                "traction": "Trasera",
                "listPrice": 47900000,
                "bonus": 4500000,
                "bonusPrice": 43400000
            },
            {
                "name": "330e Berlina Dynamic LCI II",
                "motor": "1.998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "184 / 5.000-6.500. Comb: 292 hp",
                "torque": "300 / 1.350-4.000. Comb: 420 Nm.",
                "traction": "Trasera",
                "listPrice": 65900000,
                "bonus": 7000000,
                "bonusPrice": 58900000
            },
            {
                "name": "320i Berlina M Sport SE LCI II",
                "motor": "1.998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "184 / 5.000-6.500 (hp/rpm)",
                "torque": "300 / 1.350-4.000 (Nm/rpm)",
                "traction": "Trasera",
                "listPrice": 53900000,
                "bonus": 3500000,
                "bonusPrice": 50400000
            },
            {
                "name": "M340i xDrive Berlina LCI II 50th",
                "motor": "2.998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "387 / 5.800-6.500",
                "torque": "500 / 1.900-5.000",
                "traction": "xDrive",
                "listPrice": 79900000,
                "bonus": 5000000,
                "bonusPrice": 74900000
            }
        ],
        "desktopBanner": "/images/BMW/SERIE 3/banner/Banner_Hero_1440x720.jpg",
        "mobileBanner": "/images/BMW/SERIE 3/banner/Banner_Hero_1440x720.jpg",
        "videoUrl": "https://www.youtube.com/embed/b98aOUzWPuE"
    },
    {
        "id": "m4",
        "brand": "bmw",
        "name": "M440i Gran Coupé",
        "category": "COUPÉ",
        "price": 82400000,
        "image": "/images/BMW/M4/min-m4.png",
        "slogan": "MÁS ELEGANCIA, MÁS SIGNIFICADO",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Conduce como quieras.",
                "desc": "La suspensión M adaptativa combina el confort con el máximo dinamismo de conducción. Y se adapta de forma autónoma al estado de la calzada y a tu estilo de conducción personal.",
                "image": "/images/BMW/M4/caracteristicas/BMW_Motor.png"
            },
            {
                "title": "BMW M TwinPower Turbo",
                "desc": "Régimen de revoluciones elevado, desarrollo de potencia dinámico y el sonido poderoso característico de los modelos M. Un motor que te asegura la máxima diversión al conducir en todo momento.",
                "image": "/images/BMW/M4/caracteristicas/Exterior_3.png"
            },
            {
                "title": "Una impresión magnífica",
                "desc": "Luces traseras láser con delgados filamentos luminosos. Las líneas precisas en las luces traseras dan a tu BMW M una apariencia inconfundible.",
                "image": "/images/BMW/M4/caracteristicas/Imagen9.png"
            }
        ],
        "gallery": [
            "/images/BMW/M4/galeria/Banner_2_M4.png",
            "/images/BMW/M4/galeria/Exterior_4.png",
            "/images/BMW/M4/galeria/Exterior_5.png",
            "/images/BMW/M4/galeria/Interior_1.png",
            "/images/BMW/M4/galeria/Interior_10.png",
            "/images/BMW/M4/galeria/Interior_6.jpg"
        ],
        "versions": [
            {
                "name": "M440i xDrive Gran Coupé LCI II",
                "motor": "2.998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "387 / 5.800-6.500",
                "torque": "500 / 1.900-5.000",
                "traction": "xDrive",
                "listPrice": 86900000,
                "bonus": 4500000,
                "bonusPrice": 82400000
            }
        ],
        "desktopBanner": "/images/BMW/M4/banner/Banner.png",
        "mobileBanner": "/images/BMW/M4/banner/Banner.png",
        "videoUrl": "https://www.youtube.com/embed/zEVBMJ62dRY"
    },
    {
        "id": "i4",
        "brand": "bmw",
        "name": "i4",
        "category": "Eléctricos",
        "price": 79900000,
        "image": "/images/BMW/i4/min-i4.png",
        "slogan": "- 600 km* Autonomía eléctrica",
        "isHybrid": false,
        "isElectric": true,
        "features": [
            {
                "title": "Más autonomía",
                "desc": "Con su potente batería podrás realizar viajes más largos y tener una autonomía que alcanza hasta los 590 km. Más energía al motor y mayor placer al conducir.",
                "image": "/images/BMW/i4/caracteristicas/Modulo_Performance_B_948x619.jpg"
            },
            {
                "title": "Seguro y rápido",
                "desc": "Disfrute de una precisión en el manejo gracias a los componentes de suspensión, paneles de carrocería y un chasis hechos con materiales innovadores, como acero de alta resistencia y aluminio. La suspensión trasera de aire estándar ofrece una altura de manejo y comodidad consistentes.",
                "image": "/images/BMW/i4/caracteristicas/Modulo_Performance_C_948x619.jpg"
            },
            {
                "title": "BMW WALL BOX",
                "desc": "Con el BMW WALL BOX podrás cargar desde tu casa el BMW i4 con electricidad e incluso con energía solar. Ahorra tiempo cargando durante la noche.",
                "image": "/images/BMW/i4/caracteristicas/Modulo_Performance_D_948x619.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/i4/galeria/BMW-MY23-i4-Overview-MakeItYours-01-Desktop-v2.jpg",
            "/images/BMW/i4/galeria/BMW-MY23-i4-Overview-MakeItYours-03-Desktop.webp",
            "/images/BMW/i4/galeria/BMW-MY23-i4-Overview-MakeItYours-04-Desktop.webp",
            "/images/BMW/i4/galeria/BMW-MY23-i4-Overview-Tech-Carousel-02-ALL.jpg",
            "/images/BMW/i4/galeria/Modulo_Tecnologia_Seguridad_D_1320x679.jpg"
        ],
        "versions": [
            {
                "name": "i4 eDrive40 Gran Coupé M Sport LCI II",
                "motor": "Motor BMW eDrive de 5ta generación síncrono",
                "transmission": "Automatica de una sola velocidad y ratio fijo",
                "power": "340 Hp",
                "torque": "430 Nm",
                "traction": "Edrive",
                "listPrice": 87900000,
                "bonus": 8000000,
                "bonusPrice": 79900000
            }
        ],
        "desktopBanner": "/images/BMW/i4/banner/Banner_Hero_1440x720.jpg",
        "mobileBanner": "/images/BMW/i4/banner/Banner_Hero_1440x720.jpg",
        "videoUrl": "https://www.youtube.com/embed/BpzxXUesmqY"
    },
    {
        "id": "serie-4-convertible",
        "brand": "bmw",
        "name": "serie 4 convertible",
        "category": "Convertibles",
        "price": 53900000,
        "image": "/images/BMW/SERIE 4 CONVERTIBLE/min-serie-4cabrio.png",
        "slogan": "",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Respuesta para todo.",
                "desc": "El BMW Serie 4 Convertible ofrece una dirección deportiva variable que aporta respuestas más directas y eficientes al conducirlo. Además distribuye su peso 50:50 de la carga entre los ejes para una mayor agilidad, flexibilidad y versatilidad al volante.",
                "image": "/images/BMW/SERIE 4 CONVERTIBLE/caracteristicas/Exterior_4.jpeg"
            },
            {
                "title": "Potencia y eficiencia.",
                "desc": "El BMW Serie 4 Convertible entrega el máximo dinamismo posible con mayor eficiencia por medio de los motores BMW TwinPower Turbo, que ofrecen una eficiencia mejorada.",
                "image": "/images/BMW/SERIE 4 CONVERTIBLE/caracteristicas/Exterior_5.jpeg"
            },
            {
                "title": "Un símbolo de libertad.",
                "desc": "El techo textil del BMW Serie 4 Cabrio destaca por su elaboración exclusiva, reduce el ruido en el interior del vehículo y lo protege del frío. Durante el viaje, la capota de tela puede abrirse y cerrarse automáticamente hasta una velocidad de 50 km/h.",
                "image": "/images/BMW/SERIE 4 CONVERTIBLE/caracteristicas/Modulo_Performance_C_948x619.jpg"
            },
            {
                "title": "VERSIONES",
                "desc": "420i Cabriolet Dynamic LCI II Motor: 1,998 Twin Power Turbo Transmisión: Steptronic deportiva 8 vel. Potencia: 258 / 5.000-6.500 (hp/rpm) Torque: 400 / 1.550-4.400 (Nm/rpm) Consumo: 14,7 km/l (mixto) Tracción: Trasera PRECIO DE LISTA: $59,900,000 BONO DEL MES: $6,000,000",
                "image": "/images/BMW/SERIE 4 CONVERTIBLE/min-serie-4cabrio.png"
            },
            {
                "title": "M440i xDrive Cabriolet LCI II",
                "desc": "Motor: 2,998 Twin Power Turbo Transmisión: Steptronic deportiva 8 vel. Potencia: 387 / 5.800-6.500 (hp/rpm) Torque: 500 / 1.900-5.000 (Nm/rpm) Consumo: Ciudad: 9,4km/l - Carretera: 14,7km/l - Mixto: 12,2km/l) Tracción: xDrive PRECIO DE LISTA: $89,900,000 BONO DEL MES:$4,500,000",
                "image": "/images/BMW/SERIE 4 CONVERTIBLE/min-serie-4cabrio.png"
            }
        ],
        "gallery": [
            "/images/BMW/SERIE 4 CONVERTIBLE/galeria/Interior_1.jpeg",
            "/images/BMW/SERIE 4 CONVERTIBLE/galeria/Interior_2.jpeg",
            "/images/BMW/SERIE 4 CONVERTIBLE/galeria/Interior_3.jpeg",
            "/images/BMW/SERIE 4 CONVERTIBLE/galeria/Interior_6.jpeg",
            "/images/BMW/SERIE 4 CONVERTIBLE/galeria/Modulo_Performance_A_1440x610.png"
        ],
        "versions": [
            {
                "name": "420i Cabriolet Dynamic LCI II",
                "motor": "1,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "258 / 5.000-6.500 (hp/rpm)",
                "torque": "400 / 1.550-4.400 (Nm/rpm)",
                "fuel": "14,7 km/l (mixto)",
                "traction": "Trasera",
                "listPrice": 59900000,
                "bonus": 6000000,
                "bonusPrice": 53900000
            },
            {
                "name": "M440i xDrive Cabriolet LCI II",
                "motor": "2,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "387 / 5.800-6.500 (hp/rpm)",
                "torque": "500 / 1.900-5.000 (Nm/rpm)",
                "fuel": "Ciudad: 9,4km/l - Carretera: 14,7km/l - Mixto: 12,2km/l)",
                "traction": "xDrive",
                "listPrice": 89900000,
                "bonus": 4500000,
                "bonusPrice": 85400000
            }
        ],
        "desktopBanner": "/images/BMW/SERIE 4 CONVERTIBLE/banner/SERIE_4_CABRIO_4K.jpeg",
        "mobileBanner": "/images/BMW/SERIE 4 CONVERTIBLE/banner/SERIE_4_CABRIO_4K.jpeg",
        "videoUrl": "https://www.youtube.com/embed/3aWX8KSMR08"
    },
    {
        "id": "serie-4-coupe",
        "brand": "bmw",
        "name": "SERIE 4 COUPE",
        "category": "SUV",
        "price": 53900000,
        "image": "/images/BMW/SERIE 4 COUPE/min-serie4-coupe.png",
        "slogan": "UN SIMBOLO DE DEPORTIVIDAD",
        "isHybrid": false,
        "isElectric": false,
        "features": [],
        "gallery": [
            "/images/BMW/SERIE 4 COUPE/galeria/Modulo_Performance_A_1440x610_10.png",
            "/images/BMW/SERIE 4 COUPE/galeria/SERIE-4-INT-1.jpeg",
            "/images/BMW/SERIE 4 COUPE/galeria/SERIE-4-INT-2.jpeg",
            "/images/BMW/SERIE 4 COUPE/galeria/SERIE-4-INT-4 (1).jpeg",
            "/images/BMW/SERIE 4 COUPE/galeria/SERIE-4-INT-4.jpeg"
        ],
        "versions": [
            {
                "name": "430i Coupé M Sport SE LCI II",
                "motor": "1,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "258 / 4.500-6.500 (hp/rpm)",
                "torque": "400 / 1.600-4.000 (Nm/rpm)",
                "fuel": "15,1 km/l (mixto)",
                "traction": "Trasera",
                "listPrice": 60900000,
                "bonus": 7000000,
                "bonusPrice": 53900000
            },
            {
                "name": "M440i xDrive Coupé LCI II",
                "motor": "2,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "387 / 5.800-6.500 (hp/rpm)",
                "torque": "500 / 1.900-5.000 (Nm/rpm)",
                "fuel": "Ciudad: 9,7km/l - Carretera: 15,2km/l - Mixto: 12,5km/l",
                "traction": "xDrive",
                "listPrice": 85900000,
                "bonus": 10000000,
                "bonusPrice": 75900000
            }
        ],
        "desktopBanner": "/images/BMW/SERIE 4 COUPE/banner/SERIE-4-BANNER.jpeg",
        "mobileBanner": "/images/BMW/SERIE 4 COUPE/banner/SERIE-4-BANNER.jpeg",
        "videoUrl": "https://www.youtube.com/embed/Xe3dxpQlO88"
    },
    {
        "id": "serie-4-gran-coupe",
        "brand": "bmw",
        "name": "SERIE 4 GRAN COUPE",
        "category": "COUPE",
        "price": 47900000,
        "image": "/images/BMW/SERIE 4 GRAN COUPE/min-serie4.png",
        "slogan": "MÁS ELEGANCIA, MÁS SIGNIFICADO",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Un toque más oscuro",
                "desc": "Las molduras M Shadow Line de brillo intenso casan bien con cualquier acabado exterior de tu BMW. El color negro alrededor de ventanas y retrovisores realza su silueta.",
                "image": "/images/BMW/SERIE 4 GRAN COUPE/caracteristicas/Exterior_2.jpeg"
            },
            {
                "title": "Potencia y eficiencia",
                "desc": "El Serie 4 Gran Coupé entrega el máximo dinamismo posible con mayor eficiencia por medio de los motores BMW TwinPower Turbo, que ofrecen un sistema de inyección más avanzado, control de potencia variable y una estudiada tecnología de turbocompresión.",
                "image": "/images/BMW/SERIE 4 GRAN COUPE/caracteristicas/Exterior_3.jpeg"
            },
            {
                "title": "Una parrilla clásica con un nuevo marco.",
                "desc": "Un marco continuo en cromo mate rodea la parrilla. La estructura de malla poligonal plateada sobre fondo negro subraya su aspecto atractivo.",
                "image": "/images/BMW/SERIE 4 GRAN COUPE/caracteristicas/Exterior_4.jpeg"
            }
        ],
        "gallery": [
            "/images/BMW/SERIE 4 GRAN COUPE/galeria/Interior_1.jpeg",
            "/images/BMW/SERIE 4 GRAN COUPE/galeria/Interior_2.jpeg",
            "/images/BMW/SERIE 4 GRAN COUPE/galeria/Interior_4.jpeg",
            "/images/BMW/SERIE 4 GRAN COUPE/galeria/Modulo_Performance_A_1440x610_12.png"
        ],
        "versions": [
            {
                "name": "420i Gran Coupé Dynamic LCI II",
                "motor": "1.998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "184 / 5.000-6.500",
                "torque": "300 / 1.350-4.000",
                "traction": "Trasera",
                "listPrice": 54900000,
                "bonus": 7000000,
                "bonusPrice": 47900000
            },
            {
                "name": "M440i xDrive Gran Coupé LCI II",
                "motor": "2.998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "387 / 5.800-6.500",
                "torque": "500 / 1.900-5.000",
                "traction": "xDrive",
                "listPrice": 86900000,
                "bonus": 4500000,
                "bonusPrice": 82400000
            }
        ],
        "desktopBanner": "/images/BMW/SERIE 4 GRAN COUPE/banner/Serie_4_GC_Banner.jpeg",
        "mobileBanner": "/images/BMW/SERIE 4 GRAN COUPE/banner/Serie_4_GC_Banner.jpeg",
        "videoUrl": "https://www.youtube.com/embed/zEVBMJ62dRY"
    },
    {
        "id": "serie-5",
        "brand": "bmw",
        "name": "serie 5",
        "category": "sedan, híbrido",
        "price": 59900000,
        "image": "/images/BMW/SERIE 5/min-s5.png",
        "slogan": "",
        "isHybrid": true,
        "isElectric": false,
        "features": [
            {
                "title": "Estacionamiento inteligente",
                "desc": "Las funciones de estacionamiento, entre ellas el asistente de reversa, asistente de estacionamiento en paralelo, las cámaras de retroceso y sensores de estacionamiento están incluidas en el Parking Assistant y el Parking Assistant Plus (según versión).",
                "image": "/images/BMW/SERIE 5/caracteristicas/Foto_COmponente_7.png"
            },
            {
                "title": "BMW Iconic Glow",
                "desc": "Especialmente en la oscuridad llama la atención la parrilla BMW “ Iconic Glow”. La luz resalta sus contornos cuando el vehículo está parado o en marcha",
                "image": "/images/BMW/SERIE 5/caracteristicas/Foto_Componente_5.png"
            },
            {
                "title": "Deportivo y distinguido",
                "desc": "La Dirección deportiva variable con Servotronic crea una respuesta de dirección directa y ágil y asegura que se requiera menos esfuerzo para girar el volante a bajas velocidades. Esto mejora el manejo al conducir de manera más dinámica y reduce el esfuerzo necesario para conducir, estacionarse y girar.",
                "image": "/images/BMW/SERIE 5/caracteristicas/Foto_Componente_6.png"
            }
        ],
        "gallery": [
            "/images/BMW/SERIE 5/galeria/BMW-MY24-5Series-Overview-Tech-Carousel-03-ALL.jpg",
            "/images/BMW/SERIE 5/galeria/BMW_--_Serie_5_-_Performance.png",
            "/images/BMW/SERIE 5/galeria/Foto_1_Componente_3.png",
            "/images/BMW/SERIE 5/galeria/Foto_2_Componente_3.png",
            "/images/BMW/SERIE 5/galeria/Foto_3_Componente_3.png",
            "/images/BMW/SERIE 5/galeria/Foto_4_Componente_3.png"
        ],
        "versions": [
            {
                "name": "520i Berlina Heritage",
                "motor": "1,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "190 / 4.400-6.500 (hp/rpm)",
                "torque": "310 / 1.500-4.000 (Nm/rpm)",
                "fuel": "15,6 km/l (mixto)",
                "traction": "Trasera",
                "listPrice": 68900000,
                "bonus": 9000000,
                "bonusPrice": 59900000
            },
            {
                "name": "530e Berlina M Sport",
                "motor": "1,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "252 / 5.200-6.500 (hp/rpm)",
                "torque": "350 / 1.450-4.800 (Nm/rpm)",
                "fuel": "14,9 km/l (Mixto)",
                "traction": "Trasera",
                "listPrice": 85900000,
                "bonus": 6000000,
                "bonusPrice": 79900000
            }
        ],
        "desktopBanner": "/images/BMW/SERIE 5/banner/Serie_5_Banner_Web.png",
        "mobileBanner": "/images/BMW/SERIE 5/banner/Serie_5_Banner_Web.png",
        "videoUrl": "https://www.youtube.com/embed/48cb_0xfrcI"
    },
    {
        "id": "serie-8-coupe",
        "brand": "bmw",
        "name": "SERIE 8 COUPE",
        "category": "COUPPE",
        "price": 146900000,
        "image": "/images/BMW/SERIE 8 COUPE/min-s8.png",
        "slogan": "REDEFINIENDO EL LUJO",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Estaciónalo con facilidad",
                "desc": "Las funciones de estacionamiento, entre ellas el asistente de reversa, asistente de estacionamiento en paralelo, las cámaras de retroceso y sensores de estacionamiento están incluidas en el Parking Assistant y el Parking Assistant Plus (según versión).",
                "image": "/images/BMW/SERIE 8 COUPE/caracteristicas/Modulo_Performance_B_948x619.jpg"
            },
            {
                "title": "Contrólalo a tu gusto",
                "desc": "El BMW Serie 8 Coupé anuncia el BMW Live Cockpit Professional y BMW Operating System 7.0, compuesto por un display de control táctil de 10,25\" de alta resolución y un cuadro de instrumentos completamente digital de 12,3\". Contrólalo de forma intuitiva mediante gestos, control por voz, táctil y más.",
                "image": "/images/BMW/SERIE 8 COUPE/caracteristicas/Modulo_Performance_C_948x619.jpg"
            },
            {
                "title": "BMW Laserlight",
                "desc": "La luz láser BMW ilumina un campo de hasta 600 mts, casi dos veces más que los focos tradicionales. Tener una visibilidad mayor en la osucridad aumenta la seguridad de forma significativa. Los acentos en azul y las insignias \"BMW Laserlight\" resaltan las normas tecnológicas y deportividad del vehículo.",
                "image": "/images/BMW/SERIE 8 COUPE/caracteristicas/Modulo_Performance_D_948x619.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/SERIE 8 COUPE/galeria/Modulo_Diseno_Interior_A_948x619 (1).jpg",
            "/images/BMW/SERIE 8 COUPE/galeria/Modulo_Diseno_Interior_A_948x619.jpg",
            "/images/BMW/SERIE 8 COUPE/galeria/Modulo_Diseno_Interior_B_948x619.jpg",
            "/images/BMW/SERIE 8 COUPE/galeria/Modulo_Diseno_Interior_C_948x619.jpg",
            "/images/BMW/SERIE 8 COUPE/galeria/Modulo_Diseno_Interior_D_948x619.jpg",
            "/images/BMW/SERIE 8 COUPE/galeria/Modulo_Performance_A_1440x610_15.png",
            "/images/BMW/SERIE 8 COUPE/galeria/Modulo_Tecnologia_Seguridad_C_1320x679.jpg",
            "/images/BMW/SERIE 8 COUPE/galeria/Modulo_Tecnologia_Seguridad_D_1320x679.jpg",
            "/images/BMW/SERIE 8 COUPE/galeria/Modulo_Tecnologia_Seguridad_E_1320x679.jpg"
        ],
        "versions": [
            {
                "name": "M850i xDrive Coupé",
                "motor": "4,395 Twin Power Turbo",
                "transmission": "Steptronic deportiva de 8 velocidades",
                "power": "530 / 5.500-6.000 (hp/rpm)",
                "torque": "750 / 1.800-4.600 (Nm/rpm)",
                "fuel": "Ciudad: 6,9km/l - Carretera: 12,5km/l - Mixto: 9,6km/l",
                "traction": "xDrive",
                "listPrice": 146900000,
                "bonusPrice": 146900000,
                "bonus": 0
            }
        ],
        "desktopBanner": "/images/BMW/SERIE 8 COUPE/banner/Banner_Hero_1440x720.jpg",
        "mobileBanner": "/images/BMW/SERIE 8 COUPE/banner/Banner_Hero_1440x720.jpg",
        "videoUrl": "https://www.youtube.com/embed/1bzr2bKpqws"
    },
    {
        "id": "x1",
        "brand": "bmw",
        "name": "X1",
        "category": "SUV",
        "price": 36900000,
        "image": "/images/BMW/X1/min-x1.png",
        "slogan": "PERSIGUE TUS SUEÑOS",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Ingeniería que inspira",
                "desc": "El motor TwinPower Turbo combinado con la eficiente transmisión automática STEPTRONIC le da a tu BMW X1 flexibilidad para enfrentar cualquier obstáculo.",
                "image": "/images/BMW/X1/caracteristicas/06_Componente_E_-_800x800_1.png"
            },
            {
                "title": "Un chasis único",
                "desc": "Logra un movimiento casi imperceptible. Gracias a una distribución de peso equilibrada, además de su control dinámico de estabilidad y tracción, el BMW X1 funciona con comodidad y precisión ante cualquier situación y en todo lugar, proporcionando seguridad y confianza para toda la familia.",
                "image": "/images/BMW/X1/caracteristicas/07_Componente_F_-_800x800.jpg"
            },
            {
                "title": "Eficiencia y emisiones",
                "desc": "Los motores del BMW X1 aseguran economía de consumo y bajas emisiones, cumpliendo con los exigentes estándares actuales. Sus versiones a gasolina y diesel te garantizan potencia y desempeño inigualables, sin descuidar el medio ambiente.",
                "image": "/images/BMW/X1/caracteristicas/Modulo_Performance_B_948x619.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/X1/galeria/05_Componente_A_-_731x476.jpg",
            "/images/BMW/X1/galeria/05_Componente_B_-_731x476.jpg",
            "/images/BMW/X1/galeria/05_Componente_C_-_731x476.jpg",
            "/images/BMW/X1/galeria/05_Componente_D_-_731x476.jpg",
            "/images/BMW/X1/galeria/06_Componente_E_-_1440x610.png",
            "/images/BMW/X1/galeria/BMW-MY23-X1-Overview-Tech-Carousel-02-Desktop.jpg",
            "/images/BMW/X1/galeria/BMW-MY23-X1-Overview-Tech-Carousel-03-Desktop-v2.jpg",
            "/images/BMW/X1/galeria/BMW-MY23-X1-Overview-Tech-Carousel-03-Desktop-v2.webp"
        ],
        "versions": [
            {
                "name": "X1 sDrive18i Comfort",
                "motor": "1.499 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 7 vel.",
                "power": "156 / 4.900-6.500",
                "torque": "230 / 1.500-4.600",
                "traction": "sDrive",
                "listPrice": 41900000,
                "bonus": 5000000,
                "bonusPrice": 36900000
            },
            {
                "name": "X1 sDrive18i Dynamic",
                "motor": "1.499 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 7 vel.",
                "power": "156 / 4.900-6.500 (hp/rpm)",
                "torque": "230 / 1.500-4.600 (1.500-4600)",
                "fuel": "Ciudad: 12,5km/l - Carretera: 17,5km/l - Mixto: 15,4km/l",
                "traction": "BMW sDrive (delantera)",
                "listPrice": 46900000,
                "bonus": 5000000,
                "bonusPrice": 41900000
            },
            {
                "name": "X1 sDrive18d Dynamic",
                "motor": "1.995 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 7 vel.",
                "power": "150 hp (3,750 – 4,000 rpm)",
                "torque": "360 Nm (1,500 – 2,500 rpm)",
                "fuel": "Ciudad: 16,9km/l - Carretera: 22,2km/l - Mixto: 20km/l",
                "traction": "BMW sDrive (delantera)",
                "listPrice": 48900000,
                "bonus": 5000000,
                "bonusPrice": 43900000
            },
            {
                "name": "X1 sDrive18i M Sport",
                "motor": "1.499 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 7 vel.",
                "power": "156 / 4.900-6.500",
                "torque": "230 / 1.500-4.600",
                "traction": "BMW sDrive (delantera)",
                "listPrice": 51900000,
                "bonus": 7000000,
                "bonusPrice": 44900000
            },
            {
                "name": "X1 sDrive18d M Sport",
                "motor": "1.995 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 7 vel.",
                "power": "150 hp (3,750 – 4,000 rpm)",
                "torque": "360 Nm (1,500 – 2,500 rpm)",
                "traction": "BMW sDrive (delantera)",
                "listPrice": 53900000,
                "bonus": 6000000,
                "bonusPrice": 47900000
            },
            {
                "name": "X1 xDrive25e M Sport",
                "motor": "1.499 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 7 vel.",
                "power": "245 / 4.400 - 6.500",
                "torque": "477 / 1.500-4.000",
                "fuel": "Ciudad: 26,3km/l - Carretera: N/Akm/l - Mixto: 62,5km/l",
                "traction": "BMW xDrive (4x4 inteligente)",
                "listPrice": 60900000,
                "bonus": 6000000,
                "bonusPrice": 54900000
            },
            {
                "name": "X1 xDrive25e Dynamic",
                "motor": "1.499 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 7 vel.",
                "power": "245 / 4.400 - 6.500",
                "torque": "477 / 1.500-4.000",
                "traction": "BMW xDrive (4x4 inteligente)",
                "listPrice": 53900000,
                "bonus": 7000000,
                "bonusPrice": 46900000
            }
        ],
        "desktopBanner": "/images/BMW/X1/banner/03_Foto_Principal_Modelo_-_1440x720.jpg",
        "mobileBanner": "/images/BMW/X1/banner/03_Foto_Principal_Modelo_-_1440x720.jpg",
        "videoUrl": "https://www.youtube.com/embed/TtrE-I6Yo-E"
    },
    {
        "id": "x3",
        "brand": "bmw",
        "name": "X3 Híbrido",
        "category": "SUV, HÍBRIDO",
        "price": 75900000,
        "image": "/images/BMW/X3/MIN-X3.png",
        "slogan": "",
        "isHybrid": true,
        "isElectric": false,
        "features": [
            {
                "title": "Lo mejor de ambos mundos",
                "desc": "Sentirás el motor eléctrico del X3 30e xDrive en cuanto pises el acelerador. No obstante, la extraordinaria dinámica de marcha es tan solo una de las ventajas de la propulsión híbrida, que puedes pedir en una variante sin emisiones locales.",
                "image": "/images/BMW/X3/caracteristicas/COMPONENTE_C.png"
            },
            {
                "title": "Se ajusta a cualquier situación mientras conduces.",
                "desc": "La suspensión adaptativa adapta los amortiguadores automáticamente a la calzada. ¿Prefieres una conducción deportiva? El My Mode SPORT te permite conducir el BMW más pegado a la carretera.",
                "image": "/images/BMW/X3/caracteristicas/Componente_A.png"
            },
            {
                "title": "También en la oscuridad: inconfundible.",
                "desc": "Especialmente en la oscuridad llama la atención la parrilla BMW Iconic Glow. La luz blanca resalta sus contornos cuandoel vehículo está parado o en marcha.",
                "image": "/images/BMW/X3/caracteristicas/Componente_B_X3.png"
            }
        ],
        "gallery": [
            "/images/BMW/X3/galeria/BMW_THE_X3_CARRUSEL_V2_2.png",
            "/images/BMW/X3/galeria/BMW_THE_X3_CARRUSEL_V2_3.png",
            "/images/BMW/X3/galeria/BMW_X3_-_Componente_A.png",
            "/images/BMW/X3/galeria/P90567921_highRes_the-new-bmw-x3-20-xd.jpg",
            "/images/BMW/X3/galeria/P90567926_highRes_the-new-bmw-x3-20-xd.jpg",
            "/images/BMW/X3/galeria/P90568043_highRes_the-new-bmw-x3-20-xd.jpg",
            "/images/BMW/X3/galeria/X3_-_Componente_1.jpg",
            "/images/BMW/X3/galeria/X3_Componente_2.jpg"
        ],
        "versions": [
            {
                "name": "X3 30e xDrive Heritage",
                "motor": "1.998 Twin Power Turbo",
                "transmission": "Steptronic 8 vel.",
                "power": "299 / 4400 - 6500",
                "torque": "450 / 1500 - 4000",
                "traction": "xDrive",
                "listPrice": 79900000,
                "bonus": 4000000,
                "bonusPrice": 75900000
            }
        ],
        "desktopBanner": "/images/BMW/X3/banner/X3_Banner.png",
        "mobileBanner": "/images/BMW/X3/banner/X3_Banner.png",
        "videoUrl": "https://www.youtube.com/embed/_Hsshnc8Q6w"
    },
    {
        "id": "x2-m35i",
        "brand": "bmw",
        "name": "X2 M35i",
        "category": "SUV",
        "price": 60900000,
        "image": "/images/BMW/X2 M35i/min-x2-m35i.png",
        "slogan": "MAKE IT REAL.",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "RUEDAS DE 21\"",
                "desc": "Llantas de aleación M de 21 pulgadas con radios en Y estilo 874 M en bicolor Jet Black, con fresado brillante. Tamaño de rueda 8J x 21, neumáticos 245/35 R21.",
                "image": "/images/BMW/X2 M35i/caracteristicas/PERFORMANCE_12.png"
            },
            {
                "title": "INCONFUNDIBLE EN LA OSCURIDAD",
                "desc": "Especialmente en la oscuridad llama la atención la parrilla BMW Iconic Glow. La luz blanca reslta sus contornos cuando el vehículo está parado o en marcha.",
                "image": "/images/BMW/X2 M35i/caracteristicas/PERFORMANCE_23.png"
            },
            {
                "title": "DEPORTIVIDAD M",
                "desc": "El paquete M Sport Pro optimiza la dinámica de marcha e intensifica la óptica M, especialmente por el uso de acentos oscuros en lugar de cromados.",
                "image": "/images/BMW/X2 M35i/caracteristicas/Performance_2.png"
            }
        ],
        "gallery": [
            "/images/BMW/X2 M35i/galeria/BMW_Banner_Performance.png",
            "/images/BMW/X2 M35i/galeria/CARROUSEL_V1_03.png",
            "/images/BMW/X2 M35i/galeria/CARROUSEL_V1_04.png",
            "/images/BMW/X2 M35i/galeria/CARROUSEL_V2_04.png",
            "/images/BMW/X2 M35i/galeria/P90526440_lowRes_the-first-ever-bmw-i.jpg",
            "/images/BMW/X2 M35i/galeria/bmw_Ix2_2.png",
            "/images/BMW/X2 M35i/galeria/bmw_Ix2_3.png",
            "/images/BMW/X2 M35i/galeria/bmw_Ix2_4.png",
            "/images/BMW/X2 M35i/galeria/bmw_Ix2_5.png",
            "/images/BMW/X2 M35i/galeria/bmw_Ix2_7.png"
        ],
        "versions": [
            {
                "name": "X2 M35i xDrive",
                "motor": "1.998 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 7 vel.",
                "power": "300 / 5.750 - 6.500",
                "torque": "400 / 2.000-4.500",
                "fuel": "Ciudad: 10,2km/l - Carretera: 14,9km/l - Mixto: 12,8km/l",
                "traction": "xDrive",
                "listPrice": 65900000,
                "bonus": 5000000,
                "bonusPrice": 60900000
            }
        ],
        "desktopBanner": "/images/BMW/X2 M35i/banner/BMW_x2_M35i_Banner.png",
        "mobileBanner": "/images/BMW/X2 M35i/banner/BMW_x2_M35i_Banner.png",
        "videoUrl": "https://www.youtube.com/embed/lIew4-FyGFE"
    },
    {
        "id": "ix1",
        "brand": "bmw",
        "name": "iX1",
        "category": "SUV, Eléctricos",
        "price": 52400000,
        "image": "",
        "slogan": "THE NEW iX1",
        "isHybrid": false,
        "isElectric": true,
        "features": [
            {
                "title": "El compañero ideal",
                "desc": "Para recorridos espontáneos: con una autonomía de hasta 440 km.",
                "image": "/images/BMW/iX1/caracteristicas/cq5dam.resized.img.585.low.time1663251591940.jpg"
            },
            {
                "title": "Recarga rápida",
                "desc": "Recarga en solo 10 minutos hasta 120 km* de autonomía en un punto de carga High Power y 29 minutos para obtener hasta el 80% de la autonomía.",
                "image": "/images/BMW/iX1/caracteristicas/image.1653550482024.jpg"
            },
            {
                "title": "Máxima eficiencia",
                "desc": "Bajo consumo de solo 16,8–18,2 kWh/km gracias a tecnologías como la recuperación en la frenada.",
                "image": "/images/BMW/iX1/caracteristicas/image.1653978899782.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/iX1/galeria/1440x610_-_Banner_Performance_3.jpg",
            "/images/BMW/iX1/galeria/CARROUSEL_V2_02.png",
            "/images/BMW/iX1/galeria/CARROUSEL_V2_03.png",
            "/images/BMW/iX1/galeria/DI22_000065707_1.jpg",
            "/images/BMW/iX1/galeria/P90465694_lowRes_the-first-ever-bmw-i.jpg",
            "/images/BMW/iX1/galeria/P90465696_lowRes_the-first-ever-bmw-i.jpg",
            "/images/BMW/iX1/galeria/P90465716_lowRes_the-first-ever-bmw-i.jpg",
            "/images/BMW/iX1/galeria/cq5dam.resized.img.585.low.time1651441704648.jpg"
        ],
        "versions": [
            {
                "name": "iX1 eDrive 20 Comfort",
                "motor": "Motor síncrono BMW eDrive de 5ta generación",
                "transmission": "Automatica de una sola velocidad y ratio fijo",
                "power": "254 Nm",
                "torque": "170",
                "traction": "Delantera",
                "listPrice": 56900000,
                "bonus": 4500000,
                "bonusPrice": 52400000
            }
        ],
        "desktopBanner": "/images/BMW/iX1/banner/cq5dam.jpg",
        "mobileBanner": "/images/BMW/iX1/banner/cq5dam.jpg",
        "videoUrl": "https://www.youtube.com/embed/rJ03d8by2xI"
    },
    {
        "id": "x4",
        "brand": "bmw",
        "name": "X4",
        "category": "SUV",
        "price": 50900000,
        "image": "/images/BMW/X4/MIN-X4.png",
        "slogan": "PODEROSO Y DINÁMICO COUPÉ",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Cambios rápidos",
                "desc": "Experimenta un mayor rendimiento con los cambios precisos de la transmisión automática deportiva de 8 velocidades estándar. Cuando se combina con el xDrive estándar, la tracción total inteligente de BMW, conquistará las carreteras en cada viaje que tengas.",
                "image": "/images/BMW/X4/caracteristicas/Modulo_Performance_B_948x619.jpg"
            },
            {
                "title": "Motores dominantes",
                "desc": "El nuevo BMW X4 está disponible con una amplia gama de motores BMW TwinPower Turbo de última generación, el primero de 2.0L gasolina o diesel de cuatro cilindros y el motor de gasolina de 6 cilindros en línea de tres litros M Performance.",
                "image": "/images/BMW/X4/caracteristicas/Modulo_Performance_C_948x619.jpg"
            },
            {
                "title": "Manejo equilibrado",
                "desc": "El BMW X4 es un verdadero atleta con su distribución de peso 50/50 casi perfecta y suspensión M adaptativa estándar en el BMW X4 M40i, que ofrece una dinámica de conducción mejorada para una sensación más deportiva.",
                "image": "/images/BMW/X4/caracteristicas/Modulo_Performance_D_948x619.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/X4/galeria/Modulo_Diseno_Interior_A_948x619.jpg",
            "/images/BMW/X4/galeria/Modulo_Diseno_Interior_B_948x619.jpg",
            "/images/BMW/X4/galeria/Modulo_Diseno_Interior_C_948x619.jpg",
            "/images/BMW/X4/galeria/Modulo_Diseno_Interior_D_948x619.jpg",
            "/images/BMW/X4/galeria/Modulo_Performance_A_1440x610_3.png",
            "/images/BMW/X4/galeria/Modulo_Tecnologia_Seguridad_C_1320x679.jpg",
            "/images/BMW/X4/galeria/Modulo_Tecnologia_Seguridad_D_1320x679.jpg",
            "/images/BMW/X4/galeria/Modulo_Tecnologia_Seguridad_E_1320x679.jpg"
        ],
        "versions": [
            {
                "name": "X4 xDrive20i Dynamic S LCI",
                "motor": "1998 cm3",
                "power": "184 hp (5,000 – 6,500 rpm)",
                "torque": "300 Nm (1,350 – 4,000 rpm).",
                "fuel": "12,9 km (mixto)",
                "traction": "xDrive",
                "listPrice": 59900000,
                "bonus": 9000000,
                "bonusPrice": 50900000
            }
        ],
        "desktopBanner": "/images/BMW/X4/banner/Banner_Hero_1440x720.jpg",
        "mobileBanner": "/images/BMW/X4/banner/Banner_Hero_1440x720.jpg",
        "videoUrl": "https://www.youtube.com/embed/-8ygfFi7FWI"
    },
    {
        "id": "x6",
        "brand": "bmw",
        "name": "X6",
        "category": "SUV, HÍBRIDO",
        "price": 95900000,
        "image": "/images/BMW/X6/min-x6.png",
        "slogan": "DEPORTIVO Y PODEROSO",
        "isHybrid": true,
        "isElectric": false,
        "features": [
            {
                "title": "Deportividad perfecta",
                "desc": "Con xDrive, el sistema inteligente de tracción total de BMW, distribuye automáticamente la potencia entre las ruedas para una tracción y control óptimo. La suspensión M adaptativa, en el M60i como en el xDrive40i, te permite elegir entre una conducción más relajada o deportiva, mientras que los frenos deportivos M están siempre listos para la acción con una respuesta precisa y un aspecto destacado.",
                "image": "/images/BMW/X6/caracteristicas/X6_--_Exterior_4.png"
            },
            {
                "title": "Iconic Glow",
                "desc": "Envía un mensaje de poder y prestigio con la parrilla iluminada disponible con faros delanteros LED completos es un diseño icónico.",
                "image": "/images/BMW/X6/caracteristicas/X6_--_Performance_2.png"
            },
            {
                "title": "Potencial Puro",
                "desc": "te sitúa en una posición de potencia con los motores BMW TwinPower Turbo: un motor de 6 cilindros en línea mejorado con la última tecnología híbrida suave de 48 V en el X6 xDrive40i y un motor V-8 en el M60i con escape deportivo M disponible. Sistema.",
                "image": "/images/BMW/X6/caracteristicas/X6_-_Grilled_2.png"
            }
        ],
        "gallery": [
            "/images/BMW/X6/galeria/X6_--_Interior_2.png",
            "/images/BMW/X6/galeria/X6_--_Interior_climatizador.png",
            "/images/BMW/X6/galeria/X6_-_-_Curved_Display.png",
            "/images/BMW/X6/galeria/X6_-_-_Performance.png",
            "/images/BMW/X6/galeria/X6_-_Sky_Lounge.png"
        ],
        "versions": [
            {
                "name": "X6 xDrive40i M Sport LCI",
                "motor": "Mild Hybrid 48v, 2,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "381 / 5.200-6.250 (hp/rpm)",
                "torque": "540 / 1.825-5.000 (Nm/rpm)",
                "fuel": "Ciudad: 9,2km/l - Carretera: 11,9km/l - Mixto: 10,8km/l",
                "traction": "xDrive",
                "listPrice": 113900000,
                "bonus": 18000000,
                "bonusPrice": 95900000
            },
            {
                "name": "X6 xDrive30d M Sport LCI",
                "motor": "Mild Hybrid 48v, 2,993 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "298 / 4.000 (hp/rpm)",
                "torque": "670 / 1.500-2.500 (Nm/rpm)",
                "fuel": "Ciudad: 10,6km/l - Carretera: 14,9km/l - Mixto: 13km/l",
                "traction": "xDrive",
                "listPrice": 116900000,
                "bonus": 9000000,
                "bonusPrice": 107900000
            },
            {
                "name": "X6 M60i xDrive LCI",
                "motor": "Mild Hybrid 48v, 4.395 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "530 / 5.500-6.500 (hp/rpm)",
                "torque": "750 / 1.800-4.600 (Nm/rpm)",
                "fuel": "Ciudad: 6,3km/l - Carretera: 10,4km/l - Mixto: 8,4km/l",
                "traction": "xDrive",
                "listPrice": 144900000,
                "bonus": 9000000,
                "bonusPrice": 135900000
            }
        ],
        "desktopBanner": "/images/BMW/X6/banner/cq5dam.jpg",
        "mobileBanner": "/images/BMW/X6/banner/cq5dam.jpg",
        "videoUrl": "https://www.youtube.com/embed/cTEQ_kEghUY"
    },
    {
        "id": "x7",
        "brand": "bmw",
        "name": "X7",
        "category": "SUV",
        "price": 122900000,
        "image": "/images/BMW/X7/MIN-X7.png",
        "slogan": "",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Controles con estilo",
                "desc": "Un nuevo interruptor, disponible con acabado de vidrio, hace que la selección de marchas sea fácil e intuitiva.",
                "image": "/images/BMW/X7/caracteristicas/V11.jpg"
            },
            {
                "title": "Increíble interior",
                "desc": "En el nuevo BMW X7 el lujo te rodea. Cada detalle está bien pensado, cada acabado es elegante y cada viaje se disfruta. Cuenta con un hermoso techo panorámico de vidrio estándar que crea una sensación abierta y espaciosa.",
                "image": "/images/BMW/X7/caracteristicas/V9.jpg"
            },
            {
                "title": "Suspensión de aire.",
                "desc": "El confort se extiende más allá de la cabina del BMW X7. La suspensión neumática de dos ejes estándar brinda una comodidad de manejo increíble, mientras que la altura ajustable permite una entrada y carga más fácil.",
                "image": "/images/BMW/X7/caracteristicas/v8.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/X7/galeria/731x476_A.jpg",
            "/images/BMW/X7/galeria/731x476_B.jpg",
            "/images/BMW/X7/galeria/731x476_C.jpg",
            "/images/BMW/X7/galeria/731x476_D.jpg",
            "/images/BMW/X7/galeria/Banner_2.jpg",
            "/images/BMW/X7/galeria/Componente_D_v2.jpg",
            "/images/BMW/X7/galeria/Componetne_C_v2.jpg"
        ],
        "versions": [
            {
                "name": "X7 xDrive40i Pure Excellence LCI",
                "motor": "2,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "381 (5200 - 6250) (hp/rpm)",
                "torque": "520 (1850 - 5000) (Nm/rpm)",
                "fuel": "Ciudad: 8,7km/l - Carretera: 11,5km/l - Mixto: 10,3km/l",
                "traction": "xDrive",
                "listPrice": 131900000,
                "bonus": 9000000,
                "bonusPrice": 122900000
            },
            {
                "name": "X7 M60i xDrive LCI",
                "motor": "4.395 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "530 (5500 - 6000)",
                "torque": "750 (1800 - 4600)",
                "fuel": "Ciudad: 6,2km/l - Carretera: 10,1km/l - Mixto: 8,2km/l",
                "traction": "xDrive",
                "listPrice": 154900000,
                "bonus": 9000000,
                "bonusPrice": 145900000
            },
            {
                "name": "X7 xDrive40d Pure Excellence LCI",
                "motor": "2,993 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "352 / 4.400 (hp/rpm)",
                "torque": "520 / 1.750- 2.250 (Nm/rpm)",
                "fuel": "Ciudad: 10,4km/l - Carretera: 14,1km/l - Mixto: 12,5km/l",
                "traction": "xDrive",
                "listPrice": 139900000,
                "bonusPrice": 139900000,
                "bonus": 0
            }
        ],
        "desktopBanner": "/images/BMW/X7/banner/Banner.jpg",
        "mobileBanner": "/images/BMW/X7/banner/Banner.jpg",
        "videoUrl": "https://www.youtube.com/embed/hxD1d-wR1Qg"
    },
    {
        "id": "x5",
        "brand": "bmw",
        "name": "X5",
        "category": "SUV, HÍBRIDO",
        "price": 77900000,
        "image": "/images/BMW/X5/MIN-X5.png",
        "slogan": "",
        "isHybrid": true,
        "isElectric": false,
        "features": [
            {
                "title": "El poder de hacer más",
                "desc": "Disfruta de la aceleración y la capacidad de respuesta mejoradas del sistema Mild-Hybrid de 48 V de BMW, incluida la tecnología de última generación, ahora incluida de serie en el BMW M TwinPower Turbo V-8 de 4,4 litros que impulsa el X5 M60i. ¿Busca una mayor eficiencia? El BMW X5 xDrive50e híbrido eléctrico enchufable ahora es capaz de alcanzar hasta 40 millas de autonomía totalmente eléctrica.. También disponible en versión diesel.",
                "image": "/images/BMW/X5/caracteristicas/X5_--_EXterior_3 (1).png"
            },
            {
                "title": "Afronta cualquier camino con facilidad.",
                "desc": "No hay límites para la confianza cuando conduces un BMW X5. Disfruta de la precisión del control dinámico de la amortiguación, estándar en todos los modelos, o de su elección entre suspensión M adaptativa o suspensión de 2 ejes, disponible en modelos específicos. Por último, el xDrive50e y el M60i incluyen de serie el sistema inteligente de tracción total de BMW.",
                "image": "/images/BMW/X5/caracteristicas/X5_--_Motor.png"
            },
            {
                "title": "Un futuro brillante",
                "desc": "La nueva parrilla iluminada disponible resalta un exterior rediseñado, con una apariencia renovada para los parachoques, los faros, los respiraderos de aire, los embellecedores del escape y las luces traseras 3D.",
                "image": "/images/BMW/X5/caracteristicas/X5_-_Exterior_3.png"
            }
        ],
        "gallery": [
            "/images/BMW/X5/galeria/X5--_Interior_1.png",
            "/images/BMW/X5/galeria/X5_--_EXterior_3.png",
            "/images/BMW/X5/galeria/X5_--_Interior_3.png",
            "/images/BMW/X5/galeria/X5_--_Interior_5.png",
            "/images/BMW/X5/galeria/X5_--_Performance.png"
        ],
        "versions": [
            {
                "name": "X5 xDrive40i xLine LCI",
                "motor": "Mild Hybrid 48v, 2,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "381 / 5.200-6250 (hp/rpm)",
                "torque": "540/ 1.850-5.000 (Nm/rpm)",
                "fuel": "Ciudad: 9,2km/l - Carretera: 11,9km/l - Mixto: 10,8km/l",
                "traction": "xDrive",
                "listPrice": 86900000,
                "bonus": 9000000,
                "bonusPrice": 77900000
            },
            {
                "name": "X5 xDrive30d xLine LCI",
                "motor": "Mild Hybrid 48v, 2,993 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "298 / 4.000",
                "torque": "670 / 1.500-2.500",
                "fuel": "Ciudad: 10,6km/l - Carretera: 14,9km/l - Mixto: 13km/l",
                "traction": "xDrive",
                "listPrice": 88900000,
                "bonus": 9000000,
                "bonusPrice": 79900000
            },
            {
                "name": "X5 xDrive50e xLine LCI",
                "motor": "PHEV, 2,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "265 / 4.000 (hp/rpm)",
                "torque": "620 / 2.000-2.500 (Nm/rpm)",
                "fuel": "Ciudad: 10,28km/l - Carretera: N/Akm/l - Mixto: 52,63km/l",
                "traction": "xDrive",
                "listPrice": 104900000,
                "bonus": 7000000,
                "bonusPrice": 97900000
            },
            {
                "name": "X5 xDrive40i M Sport LCI",
                "motor": "Mild Hybrid 48v, 2,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "381 / 5.200-6.250 (hp/rpm)",
                "torque": "540 / 1.850-5.000 (Nm/rpm)",
                "fuel": "Ciudad: 9,2km/l - Carretera: 11,9km/l - Mixto: 10,8km/l",
                "traction": "xDrive",
                "listPrice": 108900000,
                "bonus": 9000000,
                "bonusPrice": 99900000
            },
            {
                "name": "X5 xDrive30d M Sport LCI",
                "motor": "Mild Hybrid 48v, 2,993 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "298 / 4.000-6.500",
                "torque": "450 / 1.500-2.500",
                "fuel": "Ciudad: 10,6km/l - Carretera: 14,9km/l - Mixto: 13km/l",
                "traction": "xDrive",
                "listPrice": 113900000,
                "bonus": 9000000,
                "bonusPrice": 104900000
            },
            {
                "name": "X5 xDrive50e M Sport LCI",
                "motor": "PHEV, 2,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "313 / 5.000-6.500 (hp/rpm)",
                "torque": "450 / 1.750-4.700 (Nm/rpm)",
                "traction": "xDrive",
                "listPrice": 121900000,
                "bonus": 9000000,
                "bonusPrice": 112900000
            },
            {
                "name": "X5 M60i xDrive LCI",
                "motor": "Mild Hybrid 48v, 4,395 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "530 / 5.500-6.000 (hp/rpm)",
                "torque": "750 / 1.800-4.600 (Nm/rpm)",
                "fuel": "Ciudad: 6,3km/l - Carretera: 10,4km/l - Mixto: 8,4km/l",
                "traction": "xDrive",
                "listPrice": 138900000,
                "bonus": 9000000,
                "bonusPrice": 129900000
            }
        ],
        "desktopBanner": "/images/BMW/X5/banner/cq5dam.resized.img.1680.large.time1673960417242.jpg",
        "mobileBanner": "/images/BMW/X5/banner/cq5dam.resized.img.1680.large.time1673960417242.jpg",
        "videoUrl": "https://www.youtube.com/embed/YkyIkD8eJ-k"
    },
    {
        "id": "x2",
        "brand": "bmw",
        "name": "X2",
        "category": "SUV",
        "price": 43900000,
        "image": "/images/BMW/X2/MIN-X2.png",
        "slogan": "",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "TECNOLOGÍA LED INTELIGENTE.",
                "desc": "Radiantemente claro e inconfundible: Los faros, las luces traseras, las luces de conducción diurna y de posición iluminan tanto en estático como en movimiento con los LED más modernos.",
                "image": "/images/BMW/X2/caracteristicas/BMW_Componente_B.png"
            },
            {
                "title": "DEPORTIVAMENTE EXTROVERTIDO.",
                "desc": "El diseño deportivo de las rejillas del radiador en Perlglanz cromado con rejilla de malla de serie resalta el llamativo aspecto.",
                "image": "/images/BMW/X2/caracteristicas/BMW_Componente_C.png"
            },
            {
                "title": "GRAN POTENCIA",
                "desc": "Su versión a bencina le garantizan potencia y desempeño inigualables, sin descuidar el medio ambiente.",
                "image": "/images/BMW/X2/caracteristicas/Interior_5.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/X2/galeria/BMW_Head_Up_Display.jpg",
            "/images/BMW/X2/galeria/BMW_X2_Performance.png",
            "/images/BMW/X2/galeria/Carga_inalambrica.jpg",
            "/images/BMW/X2/galeria/Componente_3.jpg",
            "/images/BMW/X2/galeria/Componente_4.jpg",
            "/images/BMW/X2/galeria/Interior_3.jpg",
            "/images/BMW/X2/galeria/Interior_6.jpg",
            "/images/BMW/X2/galeria/Techo_1.jpg"
        ],
        "versions": [
            {
                "name": "X2 sDrive20i M Sport",
                "motor": "1.499 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 7 vel.",
                "power": "170 / 4.700 - 6.500",
                "torque": "280 / 1.500 - 4.400",
                "traction": "sDrive",
                "listPrice": 55900000,
                "bonus": 6000000,
                "bonusPrice": 49900000
            },
            {
                "name": "X2 xDrive20d M Sport",
                "motor": "1.995 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 7 vel.",
                "power": "163 / 3.750 - 4.000",
                "torque": "400 / 1.500 - 2.500",
                "traction": "xDrive",
                "listPrice": 58900000,
                "bonus": 6000000,
                "bonusPrice": 52900000
            },
            {
                "name": "X2 sDrive20i Dynamic",
                "motor": "1.499 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 7 vel.",
                "power": "170 / 4.700 - 6.500",
                "torque": "280 / 1.500 - 4.400",
                "traction": "sDrive",
                "listPrice": 49900000,
                "bonus": 6000000,
                "bonusPrice": 43900000
            }
        ],
        "desktopBanner": "/images/BMW/X2/banner/BMW_x2_Header.png",
        "mobileBanner": "/images/BMW/X2/banner/BMW_x2_Header.png",
        "videoUrl": "https://www.youtube.com/embed/SaMqMDbi_ak"
    },
    {
        "id": "x3",
        "brand": "bmw",
        "name": "X3",
        "category": "SUV",
        "price": 49900000,
        "image": "/images/BMW/X3/MIN-X3.png",
        "slogan": "THE NEW X3",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Ser uno con la carretera",
                "desc": "La dirección deportiva variable con Servotronic mejora la sensación de conducción. Y hace que cada movimiento de la dirección sea más preciso.",
                "image": "/images/BMW/X3/caracteristicas/COMPONENTE_C.png"
            },
            {
                "title": "Una experiencia de conducción renovada.",
                "desc": "Un ambiente de conducción optimizado para ofrecerte confort y paz, mientras disfrutas de un viaje lleno de novedades. Una sensación de tranquilidad que solo la última tecnología puede proporcionar.",
                "image": "/images/BMW/X3/caracteristicas/Componente_A.png"
            },
            {
                "title": "Se ajusta a cualquier situación mientras conduces.",
                "desc": "La suspensión adaptativa adapta los amortiguadores automáticamente a la calzada. ¿Prefieres una conducción deportiva? El My Mode SPORT te permite conducir el BMW más pegado a la carretera.",
                "image": "/images/BMW/X3/caracteristicas/Componente_B_X3.png"
            }
        ],
        "gallery": [
            "/images/BMW/X3/galeria/BMW_THE_X3_CARRUSEL_V2_2.png",
            "/images/BMW/X3/galeria/BMW_THE_X3_CARRUSEL_V2_3.png",
            "/images/BMW/X3/galeria/BMW_X3_-_Componente_A.png",
            "/images/BMW/X3/galeria/P90567921_highRes_the-new-bmw-x3-20-xd.jpg",
            "/images/BMW/X3/galeria/P90567926_highRes_the-new-bmw-x3-20-xd.jpg",
            "/images/BMW/X3/galeria/P90568043_highRes_the-new-bmw-x3-20-xd.jpg",
            "/images/BMW/X3/galeria/X3_-_Componente_1.jpg",
            "/images/BMW/X3/galeria/X3_Componente_2.jpg"
        ],
        "versions": [
            {
                "name": "X3 20 sDrive Heritage",
                "motor": "1.998 Twin Power Turbo",
                "transmission": "Steptronic 8 vel.",
                "power": "190 / 4.400-6.500",
                "torque": "310 / 1.350-4.000",
                "traction": "sDrive",
                "listPrice": 65900000,
                "bonus": 5000000,
                "bonusPrice": 60900000
            },
            {
                "name": "X3 M50 xDrive",
                "motor": "2.998 Twin Power Turbo",
                "transmission": "Steptronic 8 vel.",
                "power": "398 / 5.200-6.250",
                "torque": "580 / 1.900-4.800",
                "traction": "xDrive",
                "listPrice": 91900000,
                "bonus": 4000000,
                "bonusPrice": 87900000
            },
            {
                "name": "X3 20 sDrive Dynamic",
                "motor": "1.998 Twin Power Turbo",
                "transmission": "Steptronic 8 vel.",
                "power": "190 / 4.400-6.500",
                "torque": "310 / 1.350-4.000",
                "traction": "sDrive",
                "listPrice": 57900000,
                "bonus": 8000000,
                "bonusPrice": 49900000
            },
            {
                "name": "X3 20d xDrive Dynamic",
                "transmission": "Steptronic 8 vel.",
                "power": "197 / 4.000",
                "torque": "400 / 1.500-2.750",
                "traction": "xDrive",
                "listPrice": 62900000,
                "bonus": 9000000,
                "bonusPrice": 53900000
            },
            {
                "name": "X3 30e xDrive Heritage",
                "motor": "1.998 Twin Power Turbo",
                "transmission": "Steptronic 8 vel.",
                "power": "299 / 4400 - 6500",
                "torque": "450 / 1500 - 4000",
                "traction": "xDrive",
                "listPrice": 79900000,
                "bonus": 4000000,
                "bonusPrice": 75900000
            }
        ],
        "desktopBanner": "/images/BMW/X3/banner/X3_Banner.png",
        "mobileBanner": "/images/BMW/X3/banner/X3_Banner.png",
        "videoUrl": "https://www.youtube.com/embed/_Hsshnc8Q6w"
    },
    {
        "id": "x1",
        "brand": "bmw",
        "name": "X1 HÍBRIDO",
        "category": "SUV, HÍBRIDOS",
        "price": 46900000,
        "image": "/images/BMW/X1/min-x1.png",
        "slogan": "PERSIGUE TUS SUEÑOS",
        "isHybrid": true,
        "isElectric": false,
        "features": [
            {
                "title": "Lo mejor de dos mundos",
                "desc": "Elige el modo de manejo, a combustión o completamente eléctrico.",
                "image": "/images/BMW/X1/caracteristicas/06_Componente_E_-_800x800_1.png"
            },
            {
                "title": "Un chasis único",
                "desc": "Logra un movimiento casi imperceptible. Gracias a una distribución de peso equilibrada, además de su control dinámico de estabilidad y tracción, el BMW X1 Híbrido funciona con comodidad y precisión ante cualquier situación y en todo lugar.",
                "image": "/images/BMW/X1/caracteristicas/07_Componente_F_-_800x800.jpg"
            },
            {
                "title": "Máximo placer de conducir con la máxima eficiencia.",
                "desc": "Con un motor de combustión con 110 kW (150 CV) y propulsión BMW eDrive con 130 kW (177 CV). Tendrás hasta 88 km* de autonomía totalmente eléctrica (WLTP) y modos de conducción inteligentes para una flexibilidad total.",
                "image": "/images/BMW/X1/caracteristicas/Modulo_Performance_B_948x619.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/X1/galeria/05_Componente_A_-_731x476.jpg",
            "/images/BMW/X1/galeria/05_Componente_B_-_731x476.jpg",
            "/images/BMW/X1/galeria/05_Componente_C_-_731x476.jpg",
            "/images/BMW/X1/galeria/05_Componente_D_-_731x476.jpg",
            "/images/BMW/X1/galeria/06_Componente_E_-_1440x610.png",
            "/images/BMW/X1/galeria/BMW-MY23-X1-Overview-Tech-Carousel-02-Desktop.jpg",
            "/images/BMW/X1/galeria/BMW-MY23-X1-Overview-Tech-Carousel-03-Desktop-v2.jpg",
            "/images/BMW/X1/galeria/BMW-MY23-X1-Overview-Tech-Carousel-03-Desktop-v2.webp"
        ],
        "versions": [
            {
                "name": "X1 xDrive25e Dynamic",
                "motor": "1.499 Twin Power Turbo",
                "transmission": "156 / 4.900-6.500",
                "power": "156 / 4.900-6.500",
                "torque": "230 / 1.500-4.600",
                "fuel": "15,3 km/l (mixto)",
                "traction": "sDrive",
                "listPrice": 53900000,
                "bonus": 7000000,
                "bonusPrice": 46900000
            },
            {
                "name": "X1 xDrive25e M Sport",
                "motor": "1.499 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 7 vel",
                "power": "245 / 4.400 - 6.500",
                "torque": "477 / 1.500-4.000",
                "traction": "xLine",
                "listPrice": 60900000,
                "bonus": 6000000,
                "bonusPrice": 54900000
            }
        ],
        "desktopBanner": "/images/BMW/X1/banner/03_Foto_Principal_Modelo_-_1440x720.jpg",
        "mobileBanner": "/images/BMW/X1/banner/03_Foto_Principal_Modelo_-_1440x720.jpg",
        "videoUrl": "https://www.youtube.com/embed/TtrE-I6Yo-E"
    },
    {
        "id": "ix2",
        "brand": "bmw",
        "name": "iX2",
        "category": "SUV, ELÉCTRICO",
        "price": 69900000,
        "image": "/images/BMW/iX2/min-ix2.png",
        "slogan": "",
        "isHybrid": false,
        "isElectric": true,
        "features": [
            {
                "title": "Fácil de cargar en cualquier momento.",
                "desc": "Llegar más lejos, ver más. Con una capacidad de la batería de hasta 64,8 kWh y una autonomía estimada de hasta 449 km, El BMW iX2 te lleva a tus destinos con toda tranquilidad. Y para trayectos más largos, la batería se recarga hasta el 80 % en tan solo 30 minutos",
                "image": "/images/BMW/iX2/caracteristicas/BMW_Iconic_Glow.png"
            },
            {
                "title": "BMW Iconic Glow",
                "desc": "Especialmente de noche destaca el BMW Iconic Glow de la rejilla del radiador, ya sea con el vehículo parado o en marcha: una luz blanca resalta sus marcados contornos. Una innovadora tecnología de fibras LED permite conseguir efectos de iluminación espectaculares que se ven al conducir, abrir y cerrar el vehículo.",
                "image": "/images/BMW/iX2/caracteristicas/BMW_iX2_1.png"
            },
            {
                "title": "Mas luz, más visión",
                "desc": "Los faros de LED iluminan la calzada de forma óptima. Para conducir de forma segura con la mejor luz por carreteras oscuras. También las luces traseras son en tecnología LED.",
                "image": "/images/BMW/iX2/caracteristicas/CARROUSEL_V2_05.png"
            }
        ],
        "gallery": [
            "/images/BMW/iX2/galeria/BMW_X2_Performance.png",
            "/images/BMW/iX2/galeria/CARROUSEL_V1_03.png",
            "/images/BMW/iX2/galeria/CARROUSEL_V1_04.png",
            "/images/BMW/iX2/galeria/CARROUSEL_V2_04.png",
            "/images/BMW/iX2/galeria/P90526440_lowRes_the-first-ever-bmw-i.jpg",
            "/images/BMW/iX2/galeria/bmw_Ix2_5.png"
        ],
        "versions": [
            {
                "name": "iX2 xDrive30 M Sport",
                "motor": "2 motores síncronos BMW eDrive de 5ta generación",
                "transmission": "Automatica de una sola velocidad y ratio fijo",
                "power": "313",
                "torque": "494 / 0",
                "traction": "xDrive",
                "listPrice": 77900000,
                "bonus": 8000000,
                "bonusPrice": 69900000
            }
        ],
        "desktopBanner": "/images/BMW/iX2/banner/1920x1080.png",
        "mobileBanner": "/images/BMW/iX2/banner/1920x1080.png",
        "videoUrl": "https://www.youtube.com/embed/se5CdhST4Cs"
    },
    {
        "id": "ix",
        "brand": "bmw",
        "name": "iX",
        "category": "Eléctricos",
        "price": 99900000,
        "image": "/images/BMW/iX/min-ix.png",
        "slogan": "",
        "isHybrid": false,
        "isElectric": true,
        "features": [
            {
                "title": "Batería de alto voltaje",
                "desc": "EL BMW IX esta equipado con una tecnología de última generación para maximizar la autonomía, sin sacrificar potencia ni dinamismo. Su eficiencia energética superior permite recorrer hasta 602 Km con una sola carga*.",
                "image": "/images/BMW/iX/caracteristicas/BMW_iX_Exterior_1.jpg"
            },
            {
                "title": "Mas ágil en un espacio reducido",
                "desc": "Con la dirección activa integral, las ruedas traseras de tu BMW también giran. Eso hace que en estacionamientos estrechos se necesite menos espacio para maniobrar",
                "image": "/images/BMW/iX/caracteristicas/BMW_iX_Exterior_2.jpg"
            },
            {
                "title": "La altura adecuada en cada situación",
                "desc": "Para obstáculos, un maletero lleno, o una conducción más deportiva. La suspensión neumática adaptativa en los dos ejes ajusta el tren de rodaje automáticamente o pulsando un botón",
                "image": "/images/BMW/iX/caracteristicas/BMW_iX_Exterior_3.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/iX/galeria/BME_iX_Banner_2.png",
            "/images/BMW/iX/galeria/BMW_iX_Interior_1 (1).jpg",
            "/images/BMW/iX/galeria/BMW_iX_Interior_1.jpg",
            "/images/BMW/iX/galeria/BMW_iX_Interior_2.jpg",
            "/images/BMW/iX/galeria/BMW_iX_Interior_5.jpg",
            "/images/BMW/iX/galeria/Banner_Form_Lanzamietno.png",
            "/images/BMW/iX/galeria/Modulo_Tecnologia_Seguridad_C_1320x679.jpg"
        ],
        "versions": [
            {
                "name": "iX xDrive45 Atelier",
                "motor": "2 motores eléctricos síncronos",
                "transmission": "Automática de una sola velocidad",
                "power": "408 HP",
                "torque": "700 Nm desde 0 rpm",
                "listPrice": 108900000,
                "bonus": 9000000,
                "bonusPrice": 99900000
            }
        ],
        "desktopBanner": "/images/BMW/iX/banner/BMW_iX_Banner_1.jpg",
        "mobileBanner": "/images/BMW/iX/banner/BMW_iX_Banner_1.jpg",
        "videoUrl": "https://www.youtube.com/embed/iBZJ1wH5WN0"
    },
    {
        "id": "x5",
        "brand": "bmw",
        "name": "X5 HÍBRIDO",
        "category": "SUV",
        "price": 97900000,
        "image": "/images/BMW/X5/MIN-X5.png",
        "slogan": "CARTEGORÍA: SUV, HÍBRIDO",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Ingeniería excepcional",
                "desc": "El BMW X5 Híbrido está disponible en gasolina, diesel y su opción eléctrica. Es el único modelo en toda su clase que funciona con motores de seis cilindros en línea, que se caracterizan por un refinamiento suave y acústica sedosa.",
                "image": "/images/BMW/X5/caracteristicas/X5_--_EXterior_3 (1).png"
            },
            {
                "title": "Preparado para desafíos",
                "desc": "El equipamiento de serie del BMW X5 HÍBRIDO incluye un sistema de control de crucero con función de frenado. Además de aviso de salida de carril y alerta de colisión frontal con intervención de frenado, que ahora también responde a los ciclistas.",
                "image": "/images/BMW/X5/caracteristicas/X5_--_Motor.png"
            },
            {
                "title": "Eficiencia y emisiones",
                "desc": "Los motores del BMW X5 Híbrido aseguran economía de consumo y bajas emisiones. Sus versiones a gasolina y diesel garantizan potencia y desempeño inigualables. Y con su opción eléctrica, podrás conducir sin generar emisiones y prácticamente en silencio.",
                "image": "/images/BMW/X5/caracteristicas/X5_-_Exterior_3.png"
            }
        ],
        "gallery": [
            "/images/BMW/X5/galeria/X5--_Interior_1.png",
            "/images/BMW/X5/galeria/X5_--_EXterior_3.png",
            "/images/BMW/X5/galeria/X5_--_Interior_3.png",
            "/images/BMW/X5/galeria/X5_--_Interior_5.png",
            "/images/BMW/X5/galeria/X5_--_Performance.png"
        ],
        "versions": [
            {
                "name": "X5 xDrive50e xLine LCI",
                "motor": "PHEV, 2,993 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "265 / 4.000 (hp/rpm)",
                "torque": "620 / 2.000-2.500 (Nm/rpm)",
                "fuel": "16,1 km/l (mixto)",
                "traction": "xDrive",
                "listPrice": 104900000,
                "bonus": 7000000,
                "bonusPrice": 97900000
            },
            {
                "name": "X5 xDrive50e M Sport LCI",
                "motor": "PHEV, 2,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel.",
                "power": "313 / 5.000-6.500 (hp/rpm)",
                "torque": "450 / 1.750-4.700 (Nm/rpm)",
                "traction": "xDrive",
                "listPrice": 121900000,
                "bonus": 9000000,
                "bonusPrice": 112900000
            }
        ],
        "desktopBanner": "/images/BMW/X5/banner/cq5dam.resized.img.1680.large.time1673960417242.jpg",
        "mobileBanner": "/images/BMW/X5/banner/cq5dam.resized.img.1680.large.time1673960417242.jpg",
        "videoUrl": "https://www.youtube.com/embed/RhjjzyuwDsM"
    },
    {
        "id": "xm",
        "brand": "bmw",
        "name": "XM",
        "category": "BMW M",
        "price": 223900000,
        "image": "/images/BMW/XM/min-xm.png",
        "slogan": "",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Motor híbrido enchufable de 8 cilindros",
                "desc": "El motor híbrido enchufable de 8 cilindros ofrece una experiencia de conducción emocionante, con una entrega de potencia superior y un sonido característico \"M\". El BMW XM utiliza una combinación experta de un motor eléctrico de 145 kW y un motor de gasolina V8 de 4.4 litros, equipado con dos turbocompresores, un sistema de control de válvulas totalmente variable VALVETRONIC y una inyección de combustible de alta precisión. Esta combinación permite al BMW XM acelerar sin límites y ofrecer una experiencia de conducción única.",
                "image": "/images/BMW/XM/caracteristicas/Captura_de_pantalla_2023-03-28_180418.png"
            },
            {
                "title": "Suspensión M Adaptativa",
                "desc": "La suspensión M adaptativa profesional proporciona un manejo deportivo sin comprometer la comodidad. La dirección activa integral ayuda a estabilizar el vehículo a altas velocidades y también reduce el radio de giro. Además, los estabilizadores activos disminuyen los movimientos laterales de la carrocería, lo que mejora tanto la dinámica como la comodidad del vehículo.",
                "image": "/images/BMW/XM/caracteristicas/Captura_de_pantalla_2023-03-28_180454.png"
            },
            {
                "title": "Diferencial M Sport",
                "desc": "El diferencial M Sport garantiza que la potencia de tu vehículo se transmita de manera óptima a la carretera. Este sistema distribuye la fuerza de manera variable entre las ruedas traseras, mejorando así la tracción y estabilidad en diversas situaciones, como al acelerar para salir de una curva, al tomar curvas a gran velocidad o cuando las condiciones de la carretera son variables.",
                "image": "/images/BMW/XM/caracteristicas/XM_MOTOR.png"
            }
        ],
        "gallery": [
            "/images/BMW/XM/galeria/BMW-MY23-XM-Gallery-14.webp",
            "/images/BMW/XM/galeria/BMW-MY23-XM-Gallery-21.jpg",
            "/images/BMW/XM/galeria/BMW-MY23-XM-Overview-Tech-Carousel-03-Desktop.webp",
            "/images/BMW/XM/galeria/BMW-MY23-XM-Overview-Tech-Carousel-04-Desktop-v2.webp",
            "/images/BMW/XM/galeria/BMW-MY23-XM-Overview-Tech-Carousel-05-Desktop-v2.webp",
            "/images/BMW/XM/galeria/Banner_XM_v2.png",
            "/images/BMW/XM/galeria/Captura_de_pantalla_2023-03-28_180325.png",
            "/images/BMW/XM/galeria/Captura_de_pantalla_2023-03-30_155447.png"
        ],
        "versions": [
            {
                "name": "XM",
                "motor": "4.395 Twin Power Turbo",
                "transmission": "Steptronic doble embrague 8 vel.",
                "power": "653 / 5400 - 7200",
                "torque": "800 / 1600 - 5000",
                "traction": "xDrive",
                "listPrice": 232900000,
                "bonus": 9000000,
                "bonusPrice": 223900000
            }
        ],
        "desktopBanner": "/images/BMW/XM/banner/cq5dam.jpg",
        "mobileBanner": "/images/BMW/XM/banner/cq5dam.jpg",
        "videoUrl": "https://www.youtube.com/embed/weEMOJmtTyw"
    },
    {
        "id": "m4-convertible",
        "brand": "bmw",
        "name": "M4 CONVERTIBLE",
        "category": "CONVERTIBLE, BMW M",
        "price": 123900000,
        "image": "/images/BMW/M4 CONVERTIBLE/min-m4.png",
        "slogan": "THE M4",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Motor de alta precisión",
                "desc": "El motor BMW M TwinPower Turbo de 3.0 litros de 6 cilindros en línea de este cupé de alto rendimiento puede generar hasta 503 caballos de fuerza en los modelos M4 Competition, lo que te lleva de 0 a 60 mph en tan solo 3,7 segundos.",
                "image": "/images/BMW/M4 CONVERTIBLE/caracteristicas/Exterior_3.jpg"
            },
            {
                "title": "Suspensión única",
                "desc": "Dispone de un sistema inteligente de tracción a las cuatro ruedas M xDrive, desarrollado especialmente para el uso en el BMW M4 Competition. Con una perfecta distribución de su peso, una suspensión optimizada y un sistema de tracción poderoso, una vez más es líder en conducción y experiencia.",
                "image": "/images/BMW/M4 CONVERTIBLE/caracteristicas/Luces_traseras.jpg"
            },
            {
                "title": "Luces traseras inconfundibles.",
                "desc": "El mejor estilo hasta por detrás: las luces traseras con tecnología láser impresionan por su patrón de luz ultra-preciso. Las haces de fibra óptica tridimensionales generan contornos extremadamente nítidos y mejoran la visibilidad.",
                "image": "/images/BMW/M4 CONVERTIBLE/caracteristicas/Modulo_Performance_B_948x619.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/M4 CONVERTIBLE/galeria/Asientos_M_Carbon.jpg",
            "/images/BMW/M4 CONVERTIBLE/galeria/Banner_2_M4_Cabrio.png",
            "/images/BMW/M4 CONVERTIBLE/galeria/Interior.jpg",
            "/images/BMW/M4 CONVERTIBLE/galeria/Interior_3.jpg",
            "/images/BMW/M4 CONVERTIBLE/galeria/Teconologia_y_Seguridad_3.jpg",
            "/images/BMW/M4 CONVERTIBLE/galeria/Teconologia_y_segurdad_4.jpg",
            "/images/BMW/M4 CONVERTIBLE/galeria/Volante_M.jpg"
        ],
        "versions": [
            {
                "name": "M4 Competition xDrive Cabriolet LCI II",
                "motor": "2,993 Twin Power Turbo",
                "transmission": "Steptronic M deportiva 8 velocidades con Dual Logic y levas en el volante",
                "power": "510 / 6.250 (hp/rpm)",
                "torque": "650 / 2.750-5.500 (Nm/rpm)",
                "fuel": "11,5 km/l (mixto)",
                "traction": "xDrive",
                "listPrice": 130900000,
                "bonus": 7000000,
                "bonusPrice": 123900000
            }
        ],
        "desktopBanner": "/images/BMW/M4 CONVERTIBLE/banner/4k_Banner_M4_Cabrio.png",
        "mobileBanner": "/images/BMW/M4 CONVERTIBLE/banner/4k_Banner_M4_Cabrio.png",
        "videoUrl": "https://www.youtube.com/embed/GIzm8TW_294"
    },
    {
        "id": "x5",
        "brand": "bmw",
        "name": "X5 M",
        "category": "SUV, BMW M",
        "price": 185900000,
        "image": "/images/BMW/X5/MIN-X5.png",
        "slogan": "THE NEW X5 M",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "BMW M TwinPower Turbo",
                "desc": "El motor de gasolina V8 BMW M TwinPower Turbo es un motor de elevadas prestaciones que entusiasma por su eficiente desarrollo de potencia y sonido deportivo.",
                "image": "/images/BMW/X5/caracteristicas/X5_--_EXterior_3 (1).png"
            },
            {
                "title": "Un atleta innato",
                "desc": "Equipado con dos turbo cargadores de doble entrada, inyección de alta presión y Valvetronic, la unidad de energía de alto desempeño impresiona tanto en el camino como en las pistas: Un torque de 750 Nm, aceleración de 0 a 100 km/h en 3,8 segundos y de 0 a 200 km/h en 13,4 segundos.",
                "image": "/images/BMW/X5/caracteristicas/X5_--_Motor.png"
            },
            {
                "title": "Precisión de cambio",
                "desc": "La transmisión automática deportiva M de 8 velocidades de cambio rápido con Drivelogic está finamente diseñada para brindar una respuesta rápida y suave, brindando una sensación deportiva a medida que se desliza a través de las marchas.",
                "image": "/images/BMW/X5/caracteristicas/X5_-_Exterior_3.png"
            }
        ],
        "gallery": [
            "/images/BMW/X5/galeria/X5--_Interior_1.png",
            "/images/BMW/X5/galeria/X5_--_EXterior_3.png",
            "/images/BMW/X5/galeria/X5_--_Interior_3.png",
            "/images/BMW/X5/galeria/X5_--_Interior_5.png",
            "/images/BMW/X5/galeria/X5_--_Performance.png"
        ],
        "versions": [
            {
                "name": "X5 M Competition LCI",
                "motor": "4,395 Twin Power Turbo",
                "transmission": "Steptronic M deportiva 8 velocidades con Dual Logic y levas en el volante",
                "power": "625 / 6.000 (hp/rpm)",
                "torque": "750 / 1.800-5.860 (Nm/rpm)",
                "fuel": "Ciudad: 5,7km/l - Carretera: 10,4km/l - Mixto: 8km/l",
                "traction": "M xDrive",
                "listPrice": 194900000,
                "bonus": 9000000,
                "bonusPrice": 185900000
            }
        ],
        "desktopBanner": "/images/BMW/X5/banner/cq5dam.resized.img.1680.large.time1673960417242.jpg",
        "mobileBanner": "/images/BMW/X5/banner/cq5dam.resized.img.1680.large.time1673960417242.jpg",
        "videoUrl": "https://www.youtube.com/embed/HmAK4_PYNnQ"
    },
    {
        "id": "m2",
        "brand": "bmw",
        "name": "M2",
        "category": "BMW M",
        "price": 97900000,
        "image": "/images/BMW/M2/min-m2.png",
        "slogan": "THE M2",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Deportista de élite",
                "desc": "El motor de gasolina de 6 cilindros en línea BMW M TwinPower Turbo ofrece una entrega de potencia dinámica y el característico sonido del motor M. Tecnologías altamente eficientes como doble VANOS, VALVETRONIC, High Precision Injection y un turbocompresor TwinScroll garantizan una deportividad de élite.",
                "image": "/images/BMW/M2/caracteristicas/BMW-MY23-M2Coupe-Overview-Performance-02-all.webp"
            },
            {
                "title": "Se adapta a su entorno",
                "desc": "Con el chasis M adaptativo con ajuste variable del amortiguador, se pueden ajustar individualmente las características del chasis: desde sensaciones cómodas de conducción diaria hasta especialmente deportivas para un manejo ágil. El sistema Driving Experience Control permite adaptar rápida y fácilmente el bastidor controlado electrónicamente a las condiciones de la carretera y a la situación de conducción.",
                "image": "/images/BMW/M2/caracteristicas/Componente_A_M2.jpg"
            },
            {
                "title": "Máxima agilidad",
                "desc": "La tracción trasera, el diferencial activo M estándar y la suspensión adaptativa M estándar trabajan en armonía, una potente combinación de agilidad y manejo. Siéntete en control cada vez que hagas una parada rápida con los frenos compuestos M estándar.",
                "image": "/images/BMW/M2/caracteristicas/Componente_B_M2.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/M2/galeria/BMW_M2_Componente_3.jpg",
            "/images/BMW/M2/galeria/BMW_M2_Componente_4.jpg",
            "/images/BMW/M2/galeria/Banner_m2_2.png",
            "/images/BMW/M2/galeria/EXTERIOR_7_M2.jpg",
            "/images/BMW/M2/galeria/Interior_1.jpg",
            "/images/BMW/M2/galeria/Interior_2.jpg",
            "/images/BMW/M2/galeria/Interior_5_M2.jpg"
        ],
        "versions": [
            {
                "name": "BMW M2 Coupé LCI",
                "motor": "2.979 Twin Power Turbo",
                "transmission": "M doble embrague de 7 vel.",
                "power": "460 HP / 6.250 RPM",
                "torque": "550 NM / 2.650-5.870 RPM",
                "traction": "Trasera",
                "listPrice": 104900000,
                "bonus": 7000000,
                "bonusPrice": 97900000
            },
            {
                "name": "M2 Coupé MT LCI",
                "motor": "2.993 Twin Power Turbo",
                "transmission": "Manual de 6 velocidades",
                "power": "480/ 6.250 (hp/rpm)",
                "torque": "550 / 2.650-6.130 (Nm/rpm)",
                "traction": "Trasera",
                "listPrice": 110900000,
                "bonus": 5000000,
                "bonusPrice": 105900000
            },
            {
                "name": "M2 Coupé CS LCI",
                "motor": "2.993 Twin Power Turbo",
                "transmission": "Steptronic M deportiva 8 velocidades con Dual Logic y levas en el volante",
                "power": "530 / 6.250 (hp/rpm)",
                "torque": "650 / 2.750-5.500 (Nm/rpm)",
                "listPrice": 149900000,
                "bonus": 9000000,
                "bonusPrice": 140900000
            }
        ],
        "desktopBanner": "/images/BMW/M2/banner/BMW_M2_Banner.png",
        "mobileBanner": "/images/BMW/M2/banner/BMW_M2_Banner.png",
        "videoUrl": "https://www.youtube.com/embed/GX1JGLVshWM"
    },
    {
        "id": "m3",
        "brand": "bmw",
        "name": "M3",
        "category": "BMW M",
        "price": 118900000,
        "image": "/images/BMW/M3/min-m3.png",
        "slogan": "THE M3",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Motor de alta precisión",
                "desc": "El motor BMW M TwinPower Turbo de 3.0 litros de 6 cilindros en línea de este sedán de alto rendimiento puede generar hasta 510 caballos de fuerza , lo que te lleva de 0 a 100 km/hr en tan solo 3,9 segundos.",
                "image": "/images/BMW/M3/caracteristicas/Componente_A.png"
            },
            {
                "title": "Suspensión única",
                "desc": "Dispone de un sistema de tracción trasera con un diferencial deportivo M, desarrollado especialmente para este modelo. Con una perfecta distribución de su peso, una suspensión optimizada y un sistema de tracción poderoso, una vez más es líder en conducción y experiencia.",
                "image": "/images/BMW/M3/caracteristicas/Modulo_Performance_B_948x619.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/M3/galeria/BMW_CUrved_Display_4.png",
            "/images/BMW/M3/galeria/Banner_2_M3.png",
            "/images/BMW/M3/galeria/M3.jpg",
            "/images/BMW/M3/galeria/M3_Curved_Display.png",
            "/images/BMW/M3/galeria/M3_Curved_Display_1.png",
            "/images/BMW/M3/galeria/Modulo_Diseno_Interior_A_948x619.jpg",
            "/images/BMW/M3/galeria/Modulo_Diseno_Interior_C_948x619.jpg",
            "/images/BMW/M3/galeria/Modulo_Tecnologia_Seguridad_D_1320x679.jpg"
        ],
        "versions": [
            {
                "name": "M3 Competition xDrive Berlina LCI II",
                "motor": "2.993 Twin Power Turbo",
                "transmission": "Steptronic M deportiva 8 velocidades con Dual Logic y levas en el volante",
                "power": "510 / 6.250",
                "torque": "650 / 2.750-5.500",
                "traction": "M xDrive",
                "listPrice": 125900000,
                "bonus": 7000000,
                "bonusPrice": 118900000
            },
            {
                "name": "M3 CS Touring LCI",
                "motor": "2.993 Twin Power Turbo",
                "transmission": "Steptronic M deportiva 8 velocidades con Dual Logic y levas en el volante",
                "power": "551 / 6.250 (hp/rpm)",
                "torque": "650 / 2.750-5.950 (Nm/rpm)",
                "listPrice": 200000000,
                "bonus": 15000000,
                "bonusPrice": 185000000
            }
        ],
        "desktopBanner": "/images/BMW/M3/banner/M3_Banner_4K.jpg",
        "mobileBanner": "/images/BMW/M3/banner/M3_Banner_4K.jpg",
        "videoUrl": "https://www.youtube.com/embed/sMI8NimLXdw"
    },
    {
        "id": "m5",
        "brand": "bmw",
        "name": "M5",
        "category": "BMW M",
        "price": 164900000,
        "image": "/images/BMW/M5/min-m5.png",
        "slogan": "THE M5",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Conduce hasta el límite.",
                "desc": "El eficiente sistema BMW eDrive tiene una autonomía totalmente eléctrica de hasta 40km*.",
                "image": "/images/BMW/M5/caracteristicas/M5_PHEV.jpg"
            },
            {
                "title": "Torque total desde la primera revolución.",
                "desc": "El motor eléctrico de 194 hp proporciona un potente empuje hacia adelante y maximiza la aceleración en una interacción perfecta con el motor V8 de 4.4 litros.",
                "image": "/images/BMW/M5/caracteristicas/Suspension.jpg"
            },
            {
                "title": "Modos que dejan huella.",
                "desc": "El M Drive Professional disponible es tu compañero confiable para vueltas rápidas, mientras que el Boost Control ofrece una aceleración impresionante.",
                "image": "/images/BMW/M5/caracteristicas/Versatilidad.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/M5/galeria/BMW_M5_-_PERFORMANCE.png",
            "/images/BMW/M5/galeria/Banner.png",
            "/images/BMW/M5/galeria/Componente_3.jpg",
            "/images/BMW/M5/galeria/Interior_1.jpg",
            "/images/BMW/M5/galeria/Interior_2.jpg",
            "/images/BMW/M5/galeria/Interior_3.jpg",
            "/images/BMW/M5/galeria/Interior_4.jpg",
            "/images/BMW/M5/galeria/Seguridad.jpg"
        ],
        "versions": [
            {
                "name": "M5 Berlina",
                "motor": "4.395 Twin Power Turbo",
                "transmission": "Steptronic M deportiva 8 velocidades con Dual Logic y levas en el volante",
                "power": "727 / 6.500",
                "torque": "1.000 / 1.800-5.400",
                "traction": "M xDrive",
                "listPrice": 173900000,
                "bonus": 9000000,
                "bonusPrice": 164900000
            }
        ],
        "desktopBanner": "/images/BMW/M5/banner/Banner_M5.png",
        "mobileBanner": "/images/BMW/M5/banner/Banner_M5.png",
        "videoUrl": "https://www.youtube.com/embed/-TPUS6Tqa4c"
    },
    {
        "id": "z4",
        "brand": "bmw",
        "name": "Z4",
        "category": "CONVERTIBLE",
        "price": 86400000,
        "image": "/images/BMW/Z4/min-z4.png",
        "slogan": "",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Dinamismo puro",
                "desc": "El Z4 tiene presencia que se traduce en increíble desempeño en la carretera. Con la tecnología más avanzada y los innovadores componentes de propulsión y suspensión, se alcanza un impresionante desempeño y un dinamismo de conducción de primera clase.",
                "image": "/images/BMW/Z4/caracteristicas/Modulo_Performance_B_948x619.jpg"
            },
            {
                "title": "Vértigo apasionado",
                "desc": "Conducir un BMW Z4 siempre ha sido un momento totalmente vertiginoso. Las razones de esto incluyen una suspensión perfectamente ajustada y una precisión de dirección superior, un subproducto de la tracción trasera, que permite una experiencia absolutamente superior.",
                "image": "/images/BMW/Z4/caracteristicas/Modulo_Performance_C_948x619.jpg"
            },
            {
                "title": "Cambio deportivo Steptronic",
                "desc": "El cambio deportivo Steptronic de 8 velocidades con sistema Launch Control hace posible cambios muy deportivos, tanto en modo automático como manual, por medio de las levas o la palanca de cambio, para deslizarse con comodidad o conducir con especial dinamismo.",
                "image": "/images/BMW/Z4/caracteristicas/Modulo_Performance_D_948x619.jpg"
            }
        ],
        "gallery": [
            "/images/BMW/Z4/galeria/Modulo_Diseno_Interior_A_948x619 (1).jpg",
            "/images/BMW/Z4/galeria/Modulo_Diseno_Interior_A_948x619.jpg",
            "/images/BMW/Z4/galeria/Modulo_Diseno_Interior_B_948x619.jpg",
            "/images/BMW/Z4/galeria/Modulo_Diseno_Interior_C_948x619.jpg",
            "/images/BMW/Z4/galeria/Modulo_Diseno_Interior_D_948x619.jpg",
            "/images/BMW/Z4/galeria/Modulo_Performance_A_1440x610_28.png",
            "/images/BMW/Z4/galeria/Modulo_Tecnologia_Seguridad_C_1320x679.jpg",
            "/images/BMW/Z4/galeria/Modulo_Tecnologia_Seguridad_D_1320x679.jpg",
            "/images/BMW/Z4/galeria/Modulo_Tecnologia_Seguridad_E_1320x679.jpg"
        ],
        "versions": [
            {
                "name": "Z4 M40i Roadster LCI",
                "motor": "2,998 Twin Power Turbo",
                "transmission": "Steptronic deportiva 8 vel. Con levas en el volante",
                "power": "387 / 5.800-6.500",
                "torque": "500 / 1.800-5.000",
                "fuel": "Ciudad: 10,2km/l - Carretera: 16,1km/l - Mixto: 13,3km/l",
                "traction": "Trasera",
                "listPrice": 91900000,
                "bonus": 5500000,
                "bonusPrice": 86400000
            }
        ],
        "desktopBanner": "/images/BMW/Z4/banner/Banner_Hero_1440x720.jpg",
        "mobileBanner": "/images/BMW/Z4/banner/Banner_Hero_1440x720.jpg",
        "videoUrl": ""
    }
];
