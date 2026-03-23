import { Vehicle } from './types';

export const VOLKSWAGEN_MODELS: Vehicle[] = [
    {
        "id": "GLI",
        "brand": "volkswagen",
        "name": "Nuevo GLI",
        "category": "Sedán",
        "price": 28990000,
        "image": "/images/volkswagen/GLI/min-jetta-gli.webp",
        "slogan": "El indomable de la familia",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Máxima puntuación en seguridad",
                "desc": "El Volkswagen GLI (basado en la plataforma del Jetta) cuenta con 5 estrellas en Latin NCAP y 6 airbags de serie fabricados en tela sintética de alta resistencia, diseñados para brindar protección total a todos los pasajeros en milésimas de segundo.",
                "image": "/images/volkswagen/GLI/caracteristicas/6airbags.webp"
            },
            {
                "title": "Adrenalina y emoción",
                "desc": "Impulsado por un potente motor 2.0 L TSI que entrega 230 Hp y 350 Nm de torque, ofreciendo sensaciones asombrosas al volante. Se complementa con una transmisión DSG de 7 velocidades para cambios rápidos y fluidos en cualquier trayecto.",
                "image": "/images/volkswagen/GLI/caracteristicas/detector-fatiga.webp"
            },
            {
                "title": "Deportividad en su máxima expresión",
                "desc": "Presenta un diseño exterior agresivo con detalles en rojo característicos de la línea deportiva GLI, parrilla frontal imponente, llantas de aleación de 18” y sunroof panorámico que refuerzan su personalidad y elegancia única.",
                "image": "/images/volkswagen/GLI/caracteristicas/motor-gli-40.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/GLI/galeria/vw-gli-asiento-(3)-copy1.webp",
            "/images/volkswagen/GLI/galeria/vw-gli-emblema-25.webp",
            "/images/volkswagen/GLI/galeria/vw-gli-emblemas.webp",
            "/images/volkswagen/GLI/galeria/vw-gli-iluminacion-ambiental.webp",
            "/images/volkswagen/GLI/galeria/vw-gli-linea-led-(2)-(1).webp",
            "/images/volkswagen/GLI/galeria/vw-gli-pantalla-touch.webp",
            "/images/volkswagen/GLI/galeria/vw-gli-techo-corredizo-panoramico.webp",
            "/images/volkswagen/GLI/galeria/vw_gli_stage_1920X1080-(1)-(2) (1).webp"
        ],
        "versions": [
            {
                "name": "Nuevo Jetta 2.0 TSI AT GLI",
                "motor": "2.0 TSI",
                "transmission": "AT DSG 7 Velocidades",
                "power": "230 HP",
                "torque": "350 Nm",
                "traction": "4x2",
                "fuel": "Mixto 13,3 km/L",
                "listPrice": 30990000,
                "bonus": 2000000,
                "bonusPrice": 28990000
            }
        ],
        "desktopBanner": "/images/volkswagen/GLI/banner/vw_gli_stage_1920X1080-(1)-(2).webp",
        "mobileBanner": "/images/volkswagen/GLI/banner/vw_gli_stage_1920X1080-(1)-(2).webp"
    },
    {
        "id": "Tera",
        "brand": "volkswagen",
        "name": "Nuevo Tera",
        "category": "SUV",
        "price": 14790000,
        "image": "/images/volkswagen/Tera/VW-Tera-min.webp",
        "slogan": "El nuevo ícono para tu nueva era",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Máxima puntuación en seguridad",
                "desc": "El Volkswagen Tera recibió 5 estrellas en el protocolo de pruebas de Latin NCAP (2025), evaluando el nivel de seguridad entregado para los vehículos vendidos en América Latina y Caribe.",
                "image": "/images/volkswagen/Tera/caracteristicas/airbags.webp"
            },
            {
                "title": "6 Airbags de serie",
                "desc": "La protección es prioridad en el Nuevo Tera, contando con 6 airbags de serie distribuidos estratégicamente entre frontales, laterales y de cortina para brindar cobertura completa.",
                "image": "/images/volkswagen/Tera/caracteristicas/fatiga.webp"
            },
            {
                "title": "Opciones de motorización MSI y TSI",
                "desc": "Ofrece un motor MSI de 110 HP y 155 Nm para un manejo confiable, y un motor TSI de 109 HP con 170 Nm de torque para una respuesta más dinámica en aceleraciones y pendientes.",
                "image": "/images/volkswagen/Tera/caracteristicas/indicador-presion.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/Tera/galeria/TS0754_VW_SoMo_Energy_T-Cross_AmbientLight_WIDE-(web).webp",
            "/images/volkswagen/Tera/galeria/tera01.webp",
            "/images/volkswagen/Tera/galeria/tera07.webp",
            "/images/volkswagen/Tera/galeria/tera16.webp",
            "/images/volkswagen/Tera/galeria/tera22.webp"
        ],
        "versions": [
            {
                "name": "Nuevo Tera Trend MT",
                "motor": "1.6 MSI",
                "transmission": "Manual 5 Vel.",
                "power": "110 HP",
                "torque": "155 Nm",
                "traction": "4x2",
                "fuel": "No especificado",
                "listPrice": 16590000,
                "bonus": 1800000,
                "bonusPrice": 14790000
            },
            {
                "name": "Nuevo Tera Comfort MT",
                "motor": "1.6 MSI",
                "transmission": "Manual 5 Vel.",
                "power": "110 HP",
                "torque": "155 Nm",
                "traction": "4x2",
                "fuel": "No especificado",
                "listPrice": 17490000,
                "bonus": 1800000,
                "bonusPrice": 15690000
            },
            {
                "name": "Nuevo Tera Comfort AT",
                "motor": "1.0 TSI",
                "transmission": "Automática 6 Vel.",
                "power": "109 HP",
                "torque": "170 Nm",
                "traction": "4x2",
                "fuel": "No especificado",
                "listPrice": 18990000,
                "bonus": 1800000,
                "bonusPrice": 17190000
            },
            {
                "name": "Nuevo Tera High AT",
                "motor": "1.0 TSI AT",
                "transmission": "Automática 6 Vel.",
                "power": "109 HP",
                "torque": "170 Nm",
                "traction": "4x2",
                "fuel": "No especificado",
                "listPrice": 20690000,
                "bonus": 1800000,
                "bonusPrice": 18890000
            },
            {
                "name": "Nuevo Tera Outfit AT",
                "motor": "1.0 TSI AT",
                "transmission": "Automática 6 Vel.",
                "power": "109 HP",
                "torque": "170 Nm",
                "traction": "4x2",
                "fuel": "No especificado",
                "listPrice": 21090000,
                "bonus": 1700000,
                "bonusPrice": 19390000
            }
        ],
        "desktopBanner": "/images/volkswagen/Tera/banner/tera2.webp",
        "mobileBanner": "/images/volkswagen/Tera/banner/tera2.webp"
    },
    {
        "id": "amarok",
        "brand": "volkswagen",
        "name": "Nueva Amarok V6",
        "category": "Pick-Up",
        "price": 39990000,
        "image": "/images/volkswagen/amarok/min-amarok.webp",
        "slogan": "La Potencia está de vuelta",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "El motor más potente del segmento",
                "desc": "Equipada con un motor Turbo diésel 3.0 L de 6 cilindros que entrega 258 Hp y un imponente torque de 580 Nm, gestionados por una transmisión automática de 8 velocidades para una fuerza sin límites.",
                "image": "/images/volkswagen/amarok/caracteristicas/AIRBAGS-2.webp"
            },
            {
                "title": "6 Airbags y frenos de disco",
                "desc": "Cuenta con cuatro frenos de disco que aseguran un frenado potente y preciso en todo terreno, además de airbags frontales, laterales y de cortina que se despliegan de manera controlada para brindar protección integral.",
                "image": "/images/volkswagen/amarok/caracteristicas/DSCF0413.webp"
            },
            {
                "title": "Diseño hecho para dominar el camino",
                "desc": "Presenta una estética imponente con llantas de aleación de hasta 20”, luces LED y un parachoques delantero con nuevo inserto decorativo en la parrilla que refuerza su carácter aventurero y desafiante.",
                "image": "/images/volkswagen/amarok/caracteristicas/Frenos-abs-off-road.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/amarok/galeria/CARGA-2.webp",
            "/images/volkswagen/amarok/galeria/HR_AMAROK_DIA-1_0309_V2_CMYK.webp",
            "/images/volkswagen/amarok/galeria/HR_AMAROK_DIA-1_0881_V1.webp",
            "/images/volkswagen/amarok/galeria/HR_AMAROK_DIA-3_0018_V1_CMYK.webp",
            "/images/volkswagen/amarok/galeria/HR_AMAROK_DIA-3_0286_V1_CMYK.webp",
            "/images/volkswagen/amarok/galeria/MOTOR-2-(1).webp",
            "/images/volkswagen/amarok/galeria/TRACCION-(1).webp",
            "/images/volkswagen/amarok/galeria/control-de-traccion-ASR.webp"
        ],
        "versions": [
            {
                "name": "Amarok 3.0 V6 AT Comfortline",
                "motor": "Turbo 3.0 de 6 cilindros",
                "transmission": "AT 8 Velocidades",
                "power": "258 HP",
                "torque": "580 Nm",
                "traction": "4MOTION",
                "fuel": "No especificado",
                "listPrice": 44490000,
                "bonus": 4500000,
                "bonusPrice": 39990000
            },
            {
                "name": "Amarok 3.0 V6 AT Highline",
                "motor": "Turbo 3.0 de 6 cilindros",
                "transmission": "AT 8 Velocidades",
                "power": "258 HP",
                "torque": "580 Nm",
                "traction": "4MOTION",
                "fuel": "No especificado",
                "listPrice": 47490000,
                "bonus": 2500000,
                "bonusPrice": 44990000
            },
            {
                "name": "Amarok 3.0 V6 AT Extreme",
                "motor": "Turbo 3.0 de 6 cilindros",
                "transmission": "AT 8 Velocidades",
                "power": "258 HP",
                "torque": "580 Nm",
                "traction": "4MOTION",
                "fuel": "No especificado",
                "listPrice": 49990000,
                "bonus": 2500000,
                "bonusPrice": 47490000
            }
        ],
        "desktopBanner": "/images/volkswagen/amarok/banner/banner.webp",
        "mobileBanner": "/images/volkswagen/amarok/banner/banner.webp"
    },
    {
        "id": "atlas",
        "brand": "volkswagen",
        "name": "Atlas",
        "category": "SUV",
        "price": 46990000,
        "image": "/images/volkswagen/atlas/min-atlas.webp",
        "slogan": "==================================================",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Seguridad integral",
                "desc": "El Volkswagen Atlas cuenta con 6 airbags de serie, brindando protección integral a todos los ocupantes en cada trayecto. Incluye asistentes avanzados como Front Assist, Travel Assist, mantenimiento de carril \"Lane Assist\" y sensor de punto ciego \"Side Assist\".",
                "image": "/images/volkswagen/atlas/caracteristicas/airbags.webp"
            },
            {
                "title": "Motor 2.0 TSI 4MOTION",
                "desc": "La combinación perfecta de potencia y eficiencia. Con sus 273 hp y 370 Nm de torque, este motor ofrece una respuesta inmediata junto a la tracción 4x4 4MOTION, que distribuye la potencia de manera inteligente entre las cuatro ruedas para garantizar máxima tracción y control.",
                "image": "/images/volkswagen/atlas/caracteristicas/front-assist.webp"
            },
            {
                "title": "Espacio para todos",
                "desc": "Un SUV diseñado para brindar comodidad y versatilidad en aventuras familiares, contando con tres corridas de asientos, sunroof panorámico y tecnología enfocada en el confort, como el climatizador automático de 3 zonas y asientos delanteros calefaccionados y ventilados.",
                "image": "/images/volkswagen/atlas/caracteristicas/vw-ngw6-showroom-atlas-performance-imagery-overview-copia.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/atlas/galeria/34624ddb-63c5-4ccf-83c9-1f8d32e492c1.webp",
            "/images/volkswagen/atlas/galeria/captura-de-pantalla-2024-05-22-a-la-s-21-53-17.webp",
            "/images/volkswagen/atlas/galeria/captura-de-pantalla-2024-05-22-a-la-s-21-58-35.webp",
            "/images/volkswagen/atlas/galeria/my24-atlas-design-easyopenliftgate-right-focus-replacement-copia.webp",
            "/images/volkswagen/atlas/galeria/vw-ngw6-showroom-atlas-design-imagery-exterior-1-overview-copia.png",
            "/images/volkswagen/atlas/galeria/vw-ngw6-showroom-atlas-design-imagery-exterior-2-headlights-copia.webp",
            "/images/volkswagen/atlas/galeria/vw-ngw6-showroom-atlas-design-imagery-interior-1-overview-copia.webp"
        ],
        "versions": [
            {
                "name": "Atlas 2.0 TSI AT Comfortline 4Motion",
                "motor": "2.0 TSI",
                "transmission": "AT 8 velocidades",
                "power": "273 HP",
                "torque": "370 Nm",
                "traction": "4Motion",
                "fuel": "Mixto 10,2 Km/L",
                "listPrice": 51990000,
                "bonus": 5000000,
                "bonusPrice": 46990000
            },
            {
                "name": "Atlas 2.0 TSI AT Limited 4Motion",
                "motor": "2.0 TSI",
                "transmission": "AT 8 velocidades",
                "power": "273 HP",
                "torque": "370 Nm",
                "traction": "4Motion",
                "fuel": "Mixto 10,5 Km/L",
                "listPrice": 55390000,
                "bonus": 2250000,
                "bonusPrice": 53140000
            }
        ],
        "desktopBanner": "/images/volkswagen/atlas/banner/5.webp",
        "mobileBanner": "/images/volkswagen/atlas/banner/5.webp"
    },
    {
        "id": "caravelle",
        "brand": "volkswagen",
        "name": "Nuevo Caravelle",
        "category": "Comercial",
        "price": 34300000,
        "image": "/images/volkswagen/caravelle/min-caravelle.webp",
        "slogan": "Donde caben todos, caben todos tus planes.",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Seguridad para todos",
                "desc": "El Nuevo Caravelle está preparado para cuidar de cada pasajero incorporando 6 airbags, incluyendo airbags de cortina para mayor cobertura, y frenos de disco en las 4 ruedas que aseguran un frenado preciso y confiable.",
                "image": "/images/volkswagen/caravelle/caracteristicas/899436-(web).webp"
            },
            {
                "title": "Potencia que mueve tu negocio",
                "desc": "Su motor turbo diésel 2.0 de 4 cilindros entrega 150 Hp y 360 Nm de torque, combinado con una transmisión automática de 8 velocidades y capacidad para transportar hasta 884 kg en su interior.",
                "image": "/images/volkswagen/caravelle/caracteristicas/Como-estacionarse-paralelo.webp"
            },
            {
                "title": "Diseño y funcionalidad",
                "desc": "Cuenta con accesos amplios y prácticos, parachoques en color carrocería Gris Grafito, llantas de aleación de 16” e iluminación exterior 100% LED para garantizar mayor visibilidad en cada trayecto.",
                "image": "/images/volkswagen/caravelle/caracteristicas/VW-Airbag-(1).webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/caravelle/galeria/3-(7)-copy1.webp",
            "/images/volkswagen/caravelle/galeria/CV001170PIC.webp",
            "/images/volkswagen/caravelle/galeria/VW-Caravelle-Gris-3.jpeg",
            "/images/volkswagen/caravelle/galeria/VW-Caravelle-Gris-4-copy1.webp",
            "/images/volkswagen/caravelle/galeria/frontal_tres_cuartos-removebg-preview.webp"
        ],
        "versions": [
            {
                "name": "Caravelle 2.0 TDI AT - Pasajeros",
                "motor": "2.0 Turbo Diésel",
                "transmission": "AT 8 Vel.",
                "power": "150 HP",
                "torque": "360 Nm",
                "listPrice": 35990000,
                "bonus": 1690000,
                "bonusPrice": 34300000,
                "traction": "4x2",
                "fuel": "N/A"
            }
        ],
        "desktopBanner": "/images/volkswagen/caravelle/banner/VW-Caravelle-Gris-4.webp",
        "mobileBanner": "/images/volkswagen/caravelle/banner/VW-Caravelle-Gris-4.webp"
    },
    {
        "id": "jetta",
        "brand": "volkswagen",
        "name": "Nuevo Jetta",
        "category": "Sedán",
        "price": 22640000,
        "image": "/images/volkswagen/jetta/miniatura.webp",
        "slogan": "Renovado por fuera, fiel a su esencia por dentro.",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Máxima puntuación en seguridad",
                "desc": "El Volkswagen Jetta recibió 5 estrellas en el protocolo de pruebas de Latin NCAP 2025, que evalúa el nivel de seguridad entregado por los vehículos vendidos en América Latina y Caribe, confirmando el compromiso de la marca con la protección desde su versión estándar.",
                "image": "/images/volkswagen/jetta/caracteristicas/airbags.webp"
            },
            {
                "title": "6 airbags de serie",
                "desc": "La integridad de los pasajeros es la prioridad. El vehículo cuenta con 6 bolsas de aire indispensables fabricadas en tela sintética de alta resistencia que se inflan en milésimas de segundo en caso de accidente para brindar una protección integral.",
                "image": "/images/volkswagen/jetta/caracteristicas/motor-gli-40.webp"
            },
            {
                "title": "Motor 1.4 Turbo 250TSI",
                "desc": "El pilar de su potencia es el motor TSI 1.4 de 4 cilindros que entrega 150 Hp de potencia y 250 Nm de torque. Incluye una transmisión automática de 8 velocidades y modos de conducción adaptables, como el modo ECO para maximizar el rendimiento.",
                "image": "/images/volkswagen/jetta/caracteristicas/motor-turbo.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/jetta/galeria/1.jpeg",
            "/images/volkswagen/jetta/galeria/3.webp",
            "/images/volkswagen/jetta/galeria/vw-jetta-asientos-3.webp",
            "/images/volkswagen/jetta/galeria/vw-jetta-cajuela.webp",
            "/images/volkswagen/jetta/galeria/vw-jetta-tablero-(2).webp",
            "/images/volkswagen/jetta/galeria/vw-jetta-vestiduras-2.webp"
        ],
        "versions": [
            {
                "name": "Nuevo Jetta 1.4 TSI AT Comfortline Sky",
                "motor": "1.4 TSI",
                "transmission": "Automática de 8 velocidades",
                "power": "150 HP",
                "torque": "250 Nm",
                "traction": "4x2",
                "fuel": "No especificado",
                "listPrice": 25990000,
                "bonus": 3350000,
                "bonusPrice": 22640000
            }
        ],
        "desktopBanner": "/images/volkswagen/jetta/banner/3.webp",
        "mobileBanner": "/images/volkswagen/jetta/banner/3.webp"
    },
    {
        "id": "new-iD4",
        "brand": "volkswagen",
        "name": "ID.4",
        "category": "Eléctrico",
        "price": 50990000,
        "image": "/images/volkswagen/new-iD4/min-id.webp",
        "slogan": "Ser 100% eléctrico, está en tu ID",
        "isHybrid": false,
        "isElectric": true,
        "features": [
            {
                "title": "Máxima puntuación en seguridad",
                "desc": "El Volkswagen ID.4 recibió 5 estrellas en el protocolo de pruebas de Euro NCAP (2021), que evalúa el nivel de seguridad entregado por los vehículos vendidos en el mercado europeo.",
                "image": "/images/volkswagen/new-iD4/caracteristicas/_B6A0414.webp"
            },
            {
                "title": "7 airbags de serie",
                "desc": "Eleva los estándares de protección con un sistema que incluye airbags frontales para conductor y acompañante, airbags laterales, de cortina y un airbag central, ofreciendo una cobertura integral para todos los ocupantes.",
                "image": "/images/volkswagen/new-iD4/caracteristicas/airbags.webp"
            },
            {
                "title": "Energía que inspira movimiento",
                "desc": "Un SUV 100% eléctrico e innovador diseñado para moverse sin emisiones y con estilo, ofreciendo un rendimiento que responde con fuerza y una autonomía combinada de hasta 556 km.",
                "image": "/images/volkswagen/new-iD4/caracteristicas/colicion-frontal.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/new-iD4/galeria/5.webp",
            "/images/volkswagen/new-iD4/galeria/6-(1).webp",
            "/images/volkswagen/new-iD4/galeria/86-2772_still-ID4-23-eletrico-basico_aerea-3-4-tras_azul-dusk_amb-dia_adv_br_1920x10-3WoDOrbUmU-Llantas.webp",
            "/images/volkswagen/new-iD4/galeria/DB2023AU00850_web_1600-Llantas.webp",
            "/images/volkswagen/new-iD4/galeria/_B6A0410.webp",
            "/images/volkswagen/new-iD4/galeria/_B6A0415.webp",
            "/images/volkswagen/new-iD4/galeria/_B6A0419.webp",
            "/images/volkswagen/new-iD4/galeria/_B6A0481.webp",
            "/images/volkswagen/new-iD4/galeria/turismos_detalles-del-nuevo-id4_tecnologia_Img02_1080x1080px1-(1).webp"
        ],
        "versions": [
            {
                "name": "ID.4 Pro 82kWh",
                "motor": "Motor eléctrico",
                "transmission": "Automática 1 Vel.",
                "power": "286 HP",
                "torque": "545 Nm",
                "traction": "No especificada",
                "fuel": "Autonomía combinada de 556 km",
                "listPrice": 53950000,
                "bonus": 2960000,
                "bonusPrice": 50990000
            }
        ],
        "desktopBanner": "/images/volkswagen/new-iD4/banner/86-2772_still-ID4-23-eletrico-basico_Llantas-Azul-Costa.jpeg",
        "mobileBanner": "/images/volkswagen/new-iD4/banner/86-2772_still-ID4-23-eletrico-basico_Llantas-Azul-Costa.jpeg"
    },
    {
        "id": "new-tiguan",
        "brand": "volkswagen",
        "name": "Nuevo Tiguan",
        "category": "SUV",
        "price": 34490000,
        "image": "/images/volkswagen/new-tiguan/min-tiguan.webp",
        "slogan": "La magia de llevarte lejos",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Máxima puntuación en seguridad",
                "desc": "El Volkswagen Tiguan recibió 5 estrellas en el protocolo de pruebas de Latin NCAP (2025), que evalúa el nivel de seguridad entregado por los vehículos vendidos en América Latina y Caribe.",
                "image": "/images/volkswagen/new-tiguan/caracteristicas/3-copy2.webp"
            },
            {
                "title": "6 Airbags de serie",
                "desc": "La protección es prioridad, contando con 6 airbags distribuidos estratégicamente entre frontales, laterales y de cortina para brindar una cobertura completa en caso de impacto.",
                "image": "/images/volkswagen/new-tiguan/caracteristicas/Airbags.webp"
            },
            {
                "title": "Adrenalina y emoción",
                "desc": "Impulsado por un motor 1.4 TSI que combina eficiencia y fuerza, ofreciendo 150 HP entre 5.000 y 6.000 RPM junto a un torque de 250 Nm para una respuesta ágil y poderosa.",
                "image": "/images/volkswagen/new-tiguan/caracteristicas/imagen-1.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/new-tiguan/galeria/2-copy3.webp",
            "/images/volkswagen/new-tiguan/galeria/Medium-19339-my25-tiguan-se-pyrite-9532.webp",
            "/images/volkswagen/new-tiguan/galeria/Original-18356-LIPMANJL10806RT.webp",
            "/images/volkswagen/new-tiguan/galeria/Original-18387-LIPMANJL11296RT.webp",
            "/images/volkswagen/new-tiguan/galeria/descarga-(3).webp",
            "/images/volkswagen/new-tiguan/galeria/image-(28).webp",
            "/images/volkswagen/new-tiguan/galeria/vw-tiguan-2025-camara360-2.webp",
            "/images/volkswagen/new-tiguan/galeria/vw-tiguan-2025-faros-led2.webp"
        ],
        "versions": [
            {
                "name": "Comfort AT",
                "motor": "1.4 TSI",
                "transmission": "DSG 7 Vel.",
                "power": "150 hp / 5.000 – 6.000 rpm",
                "torque": "250 nm",
                "traction": "No especificada",
                "fuel": "No especificado",
                "listPrice": 36490000,
                "bonus": 2000000,
                "bonusPrice": 34490000
            },
            {
                "name": "R-Line AT",
                "motor": "1.4 TSI",
                "transmission": "DSG 7 Vel.",
                "power": "150 hp / 5.000 – 6.000 rpm",
                "torque": "250 nm",
                "traction": "No especificada",
                "fuel": "No especificado",
                "listPrice": 39490000,
                "bonus": 2000000,
                "bonusPrice": 37490000
            }
        ],
        "desktopBanner": "/images/volkswagen/new-tiguan/banner/1-copy2.webp",
        "mobileBanner": "/images/volkswagen/new-tiguan/banner/1-copy2.webp"
    },
    {
        "id": "nivus",
        "brand": "volkswagen",
        "name": "Nuevo Nivus",
        "category": "SUV",
        "price": 15390000,
        "image": "/images/volkswagen/nivus/min-nivus.webp",
        "slogan": "El atrevido de la familia",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Seguridad 5 estrellas",
                "desc": "El sistema de asistencia delantera Volkswagen con frenado automático de emergencia está diseñado para advertir de una posible colisión y asistir frenando para evitar o reducir el impacto de un choque mediante sensores de radar o cámara.",
                "image": "/images/volkswagen/nivus/caracteristicas/nivus_assistente_faixa.webp"
            },
            {
                "title": "Adrenalina y emoción",
                "desc": "Sentirás toda la potencia, torque y performance en cada viaje gracias al motor Turbo 1.0 TSI de serie, el cual cuenta con una potencia de 116 HP a 5.500 rpm y 200 Nm de torque.",
                "image": "/images/volkswagen/nivus/caracteristicas/nivus_assistente_traseiro_saida.webp"
            },
            {
                "title": "Un diseño que impone estilo",
                "desc": "Redefine el estilo con líneas de diseño únicas, una renovada parrilla frontal con una franja lumínica de foco a foco y llantas de aleación con un diseño moderno y lleno de personalidad.",
                "image": "/images/volkswagen/nivus/caracteristicas/nivus_controle_adaptativo_velecidade.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/nivus/galeria/Nuevo-Nivus-8.webp",
            "/images/volkswagen/nivus/galeria/_MG_0683.webp",
            "/images/volkswagen/nivus/galeria/_MG_0802.webp",
            "/images/volkswagen/nivus/galeria/_MG_1012.webp",
            "/images/volkswagen/nivus/galeria/_MG_2449-(1).webp",
            "/images/volkswagen/nivus/galeria/_MG_2451.webp",
            "/images/volkswagen/nivus/galeria/_MG_2480_B.webp",
            "/images/volkswagen/nivus/galeria/_MG_2503.webp",
            "/images/volkswagen/nivus/galeria/nivus_design_rodas.webp"
        ],
        "versions": [
            {
                "name": "Nivus 1.0 TSI MT Comfortline",
                "motor": "1.0 TSI",
                "transmission": "Manual 5 Vel.",
                "power": "101 HP",
                "torque": "170 Nm",
                "fuel": "Mixto 15,2 km/L",
                "listPrice": 18890000,
                "bonus": 3500000,
                "bonusPrice": 15390000,
                "traction": "4x2"
            },
            {
                "name": "Nivus 1.0 TSI AT Comfortline",
                "motor": "1.0 TSI",
                "transmission": "Automática 6 Vel.",
                "power": "116 HP",
                "torque": "200 Nm",
                "fuel": "Mixto 15 km/L",
                "listPrice": 20390000,
                "bonus": 2650000,
                "bonusPrice": 17740000,
                "traction": "4x2"
            },
            {
                "name": "Nivus 1.0 TSI AT Highline",
                "motor": "1.0 TSI",
                "transmission": "Automática 6 Vel.",
                "power": "116 HP",
                "torque": "200 Nm",
                "listPrice": 21790000,
                "bonus": 2800000,
                "bonusPrice": 18990000,
                "traction": "4x2",
                "fuel": "N/A"
            },
            {
                "name": "Nivus 1.0 TSI AT Outfit",
                "motor": "1.0 TSI AT",
                "transmission": "AT 6 Velocidades",
                "power": "116 HP",
                "torque": "200 Nm",
                "listPrice": 22590000,
                "bonus": 2600000,
                "bonusPrice": 19990000,
                "traction": "4x2",
                "fuel": "N/A"
            }
        ],
        "desktopBanner": "/images/volkswagen/nivus/banner/banner_nivus_1920x1080_2.webp",
        "mobileBanner": "/images/volkswagen/nivus/banner/banner_nivus_1920x1080_2.webp"
    },
    {
        "id": "nuevo-transporter",
        "brand": "volkswagen",
        "name": "Nuevo Transporter",
        "category": "Comercial",
        "price": 27300000,
        "image": "/images/volkswagen/nuevo-transporter/min-transporter.webp",
        "slogan": "Aquí tienes el archivo Markdown del Nuevo Transporter estructurado para tu sistema de importación, utilizando únicamente la información proporcionada:",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Máxima puntuación en seguridad",
                "desc": "El Volkswagen Transporter recibió 5 estrellas en el protocolo de pruebas de Euro NCAP (2025), evaluando el nivel de seguridad entregado por los vehículos vendidos en el mercado europeo.",
                "image": "/images/volkswagen/nuevo-transporter/caracteristicas/Cabina-Transporter.webp"
            },
            {
                "title": "Potencia que mueve tu negocio",
                "desc": "Equipado con un motor turbo diésel 2.0 de 4 cilindros que entrega 150 HP y un torque de 360 Nm, combinado con una transmisión manual de 6 velocidades. Incorpora tecnología AdBlue para reducir emisiones, contribuyendo a un transporte más limpio.",
                "image": "/images/volkswagen/nuevo-transporter/caracteristicas/Como-estacionarse-paralelo.webp"
            },
            {
                "title": "Diseño funcional y gran capacidad",
                "desc": "Ofrece una capacidad de carga de hasta 1.181,7 kg y un volumen de zona de carga de 6,6 metros cúbicos. Cuenta con iluminación 100% LED y opciones de puerta trasera única o doble para adaptarse a las necesidades de carga de cada negocio.",
                "image": "/images/volkswagen/nuevo-transporter/caracteristicas/image045.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/nuevo-transporter/galeria/3-824x557.webp",
            "/images/volkswagen/nuevo-transporter/galeria/Compartimento-frontal-copiloto-(1).webp",
            "/images/volkswagen/nuevo-transporter/galeria/Compartimento-tablero-central-(1).webp",
            "/images/volkswagen/nuevo-transporter/galeria/Compartimentos-puerta-transporter-(1).webp",
            "/images/volkswagen/nuevo-transporter/galeria/Interior-Piloto.webp",
            "/images/volkswagen/nuevo-transporter/galeria/Puerta-Lateral.webp",
            "/images/volkswagen/nuevo-transporter/galeria/Tamano-transporter.webp",
            "/images/volkswagen/nuevo-transporter/galeria/Transporter-puerta-trasera-una-pieza.webp",
            "/images/volkswagen/nuevo-transporter/galeria/superior-transparente-2-seats.webp",
            "/images/volkswagen/nuevo-transporter/galeria/tr003179pic-(web).webp",
            "/images/volkswagen/nuevo-transporter/galeria/tr003232pic-(web).webp"
        ],
        "versions": [
            {
                "name": "Transporter 2.0 TDI MT - Carga (puerta simple)",
                "motor": "2.0 Turbo Diésel",
                "transmission": "MT 6 Vel.",
                "power": "150 HP",
                "torque": "360 Nm",
                "traction": "No especificada",
                "fuel": "No especificado",
                "listPrice": 29990000,
                "bonus": 2690000,
                "bonusPrice": 27300000
            },
            {
                "name": "Transporter 2.0 TDI MT - Carga (puerta doble)",
                "motor": "2.0 Turbo Diésel",
                "transmission": "MT 6 Vel.",
                "power": "150 HP",
                "torque": "360 Nm",
                "traction": "No especificada",
                "fuel": "No especificado",
                "listPrice": 30990000,
                "bonus": 1690000,
                "bonusPrice": 29300000
            }
        ],
        "desktopBanner": "/images/volkswagen/nuevo-transporter/banner/banner-web-transportador-709x582-1-copy3.webp",
        "mobileBanner": "/images/volkswagen/nuevo-transporter/banner/banner-web-transportador-709x582-1-copy3.webp"
    },
    {
        "id": "polo",
        "brand": "volkswagen",
        "name": "Polo",
        "category": "Hatchback",
        "price": 14190000,
        "image": "/images/volkswagen/polo/miniatura.webp",
        "slogan": "Celebra 50 años de historia como sinónimo de innovación y accesibilidad.",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "4 airbags",
                "desc": "Eficiencia y practicidad para proteger a los ocupantes mediante airbags frontales y laterales con protección de cabeza y tórax, garantizando que los pasajeros viajen seguros en todo momento.",
                "image": "/images/volkswagen/polo/caracteristicas/asistente-subida.webp"
            },
            {
                "title": "Motor 1.0 TSI",
                "desc": "Motor de alta eficiencia que ofrece un gran rendimiento con menor consumo de combustible. Proporciona la potencia precisa y cuenta con una transmisión Tiptronic de 6 velocidades para responder de forma ágil.",
                "image": "/images/volkswagen/polo/caracteristicas/perfomance.webp"
            },
            {
                "title": "Llantas de aleación de 16\"",
                "desc": "Componentes de aluminio que complementan el diseño y estilo del vehículo, aportando un aspecto moderno que se adapta a la perfección a cada trayecto.",
                "image": "/images/volkswagen/polo/caracteristicas/seguridad.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/polo/galeria/71-2314-still-polo-23-highline-tsi-at-basico-visao-frontal-bancos-6k6k-vermelho-sunset-ambientada-adv-br-full-hd.webp",
            "/images/volkswagen/polo/galeria/vw-polo-04-copia-copy1.webp",
            "/images/volkswagen/polo/galeria/vw-polo-aireacondicionado-2-copia-(1).webp",
            "/images/volkswagen/polo/galeria/vw-polo-faro-led-copia.webp",
            "/images/volkswagen/polo/galeria/vw-polo-faros-automaticos-sensor-activos-copia.webp",
            "/images/volkswagen/polo/galeria/vw-polo-rin-copia.webp"
        ],
        "versions": [
            {
                "name": "Polo 1.6 MT Comfortline",
                "motor": "1.6 MSI",
                "transmission": "Manual 5 vel.",
                "power": "110 HP",
                "torque": "155 Nm",
                "traction": "4x2",
                "fuel": "Ciudad 11,5 km/l",
                "listPrice": 16990000,
                "bonus": 2800000,
                "bonusPrice": 14190000
            },
            {
                "name": "Polo 1.0 AT Comfortline",
                "motor": "1.0 TSI",
                "transmission": "Automática 6 vel.",
                "power": "101 HP",
                "torque": "170 Nm",
                "traction": "4x2",
                "fuel": "Ciudad 11,2 km/l",
                "listPrice": 17990000,
                "bonus": 2200000,
                "bonusPrice": 15790000
            },
            {
                "name": "Polo 1.0 AT Highline",
                "motor": "1.0 TSI",
                "transmission": "Automática 6 vel.",
                "power": "101 HP",
                "torque": "170 Nm",
                "traction": "4x2",
                "fuel": "Ciudad 11,2 km/l",
                "listPrice": 18990000,
                "bonus": 1550000,
                "bonusPrice": 17440000
            }
        ],
        "desktopBanner": "/images/volkswagen/polo/banner/banner-web-polo-50-709x582-1-copy2.webp",
        "mobileBanner": "/images/volkswagen/polo/banner/banner-web-polo-50-709x582-1-copy2.webp"
    },
    {
        "id": "polo-track",
        "brand": "volkswagen",
        "name": "Polo Track",
        "category": "Hatchback",
        "price": 12290000,
        "image": "/images/volkswagen/polo-track/miniatura.png",
        "slogan": "El comienzo perfecto",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Sistema electrónico de estabilización (ESC)",
                "desc": "Una tecnología de seguridad activa que ayuda a mantener el control del vehículo en situaciones de riesgo, como maniobras bruscas o superficies resbaladizas. El ESC actúa automáticamente para evitar derrapes y pérdida de estabilidad, brindando mayor seguridad al conducir.",
                "image": "/images/volkswagen/polo-track/caracteristicas/VW-Polo-Airbag.webp"
            },
            {
                "title": "Motor 1.6 MSI",
                "desc": "Equipado con un motor MSI 1.6 que ofrece una potencia de 110 HP a 5.800 RPM y un torque de 155 Nm, brindando una respuesta ágil y eficiente en ciudad y carretera.",
                "image": "/images/volkswagen/polo-track/caracteristicas/abs.webp"
            },
            {
                "title": "Llantas de acero 15”",
                "desc": "Diseño resistente que combina durabilidad y funcionalidad para enfrentar cada trayecto con seguridad, pensado para ofrecer un andar firme y confiable en todo tipo de caminos.",
                "image": "/images/volkswagen/polo-track/caracteristicas/bloqueo-diferecial.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/polo-track/galeria/11.webp",
            "/images/volkswagen/polo-track/galeria/1630a30b-c6e2-4617-b019-6429d5019595.webp",
            "/images/volkswagen/polo-track/galeria/180e9f88-3e93-4875-98dc-31c91f94f679.webp",
            "/images/volkswagen/polo-track/galeria/745682df-7b56-4189-8d03-004221eab4fc.webp",
            "/images/volkswagen/polo-track/galeria/76-2403_still-polo_track-23-mpi-_3-4-traseira_2r2r-platinum_amb-noite-acao_adv_br_full-hd.webp",
            "/images/volkswagen/polo-track/galeria/77-2423_still-polo_track-23-mpi-p7d_visao-frontal-bancos_2r2r-platinum_amb_ddx-br_.webp",
            "/images/volkswagen/polo-track/galeria/9899f504-370c-419a-9394-0c642a495075.webp",
            "/images/volkswagen/polo-track/galeria/vw-polo-track-auto-moderno-interior-aire-acondicionado.webp",
            "/images/volkswagen/polo-track/galeria/vw-polo-track-radio-ajuste-(1).webp"
        ],
        "versions": [
            {
                "name": "Polo 1.6 MT Track",
                "motor": "1.6 MSI",
                "transmission": "MT 5",
                "power": "110 hp",
                "torque": "155 Nm",
                "traction": "4x2",
                "fuel": "Ciudad 18.2 km/l",
                "listPrice": 14490000,
                "bonus": 2200000,
                "bonusPrice": 12290000
            }
        ],
        "desktopBanner": "/images/volkswagen/polo-track/banner/76-2402_still-polo_track-23-mpi-_5-8-frente_2r2r-platinum_amb-noite_adv_br_full-hd.webp",
        "mobileBanner": "/images/volkswagen/polo-track/banner/76-2402_still-polo_track-23-mpi-_5-8-frente_2r2r-platinum_amb-noite_adv_br_full-hd.webp"
    },
    {
        "id": "saveiro-cabina-doble",
        "brand": "volkswagen",
        "name": "Saveiro Cabina Doble",
        "category": "Pick-Up",
        "price": 13550000,
        "image": "/images/volkswagen/saveiro-cabina-doble/min-saveiro.webp",
        "slogan": "Siempre listo para tus proyectos",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "2 airbags frontales",
                "desc": "Ubicados estratégicamente en la parte delantera, se despliegan de manera controlada en caso de impacto para ofrecer una barrera adicional de protección para el conductor y el pasajero, minimizando el riesgo de lesiones en situaciones de emergencia.",
                "image": "/images/volkswagen/saveiro-cabina-doble/caracteristicas/captura-de-pantalla-2024-01-04-a-la-s-23-05-56.webp"
            },
            {
                "title": "Performance y eficiencia",
                "desc": "Equipada con un motor dinámico de 1.6L de 4 cilindros y 16 válvulas que ofrece un torque máximo a bajas revoluciones y respuestas rápidas, permitiendo una mayor economía de combustible en cada kilómetro.",
                "image": "/images/volkswagen/saveiro-cabina-doble/caracteristicas/captura-de-pantalla-2024-01-09-a-la-s-22-50-47.webp"
            },
            {
                "title": "Diseño robusto y funcional",
                "desc": "Potencia, resistencia y versatilidad en un solo vehículo, diseñada para acompañarte en cada desafío y proyecto, logrando que el trabajo y las aventuras lleguen más lejos con un andar firme y confiable.",
                "image": "/images/volkswagen/saveiro-cabina-doble/caracteristicas/life-saveiro-24-extreme-amb-br-759.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/saveiro-cabina-doble/galeria/94-br-3121-still-saveiro-24-extreme-tsi-close-traseira-com-badge-x3x3-oliver-amb-adv-br.webp",
            "/images/volkswagen/saveiro-cabina-doble/galeria/94-br-3122-still-saveiro-24-extreme-tsi-close-camera-re-x3x3-oliver-amb-adv-br.webp",
            "/images/volkswagen/saveiro-cabina-doble/galeria/94-br-3124-still-saveiro-24-extreme-tsi-close-cacamba-com-capota-x3x3-oliver-amb-adv-br.webp",
            "/images/volkswagen/saveiro-cabina-doble/galeria/captura-de-pantalla-2024-01-04-a-la-s-21-55-20-copy1.webp",
            "/images/volkswagen/saveiro-cabina-doble/galeria/saveiro-768-v02-nueva.webp",
            "/images/volkswagen/saveiro-cabina-doble/galeria/slide-3-1.webp"
        ],
        "versions": [
            {
                "name": "Saveiro 1.6 MT Cabina Doble",
                "motor": "1.6L",
                "transmission": "MT 5 Velocidades",
                "power": "110 Hp",
                "torque": "155 Nm",
                "traction": "4x2",
                "fuel": "Mixto 13,0 km/lt",
                "listPrice": 15340000,
                "bonus": 1790000,
                "bonusPrice": 13550000
            }
        ],
        "desktopBanner": "/images/volkswagen/saveiro-cabina-doble/banner/sav-front-view-edit-03-1920x1080px-1-copia-2.webp",
        "mobileBanner": "/images/volkswagen/saveiro-cabina-doble/banner/sav-front-view-edit-03-1920x1080px-1-copia-2.webp"
    },
    {
        "id": "saveiro-cabina-simple",
        "brand": "volkswagen",
        "name": "Saveiro Cabina Simple",
        "category": "Pick-Up",
        "price": 10850000,
        "image": "/images/volkswagen/saveiro-cabina-simple/min-saveiro.webp",
        "slogan": "Siempre listo para tus proyectos",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "2 airbags frontales",
                "desc": "Ubicados estratégicamente en la parte delantera, se despliegan de manera controlada en caso de impacto para ofrecer una barrera adicional de protección para el conductor y el pasajero, minimizando el riesgo de lesiones en situaciones de emergencia.",
                "image": "/images/volkswagen/saveiro-cabina-simple/caracteristicas/HHC.webp"
            },
            {
                "title": "Performance y eficiencia",
                "desc": "Equipada con un motor dinámico de 1.6L que ofrece un torque máximo a bajas revoluciones y respuestas rápidas, permitiendo una mayor economía de combustible en cada kilómetro.",
                "image": "/images/volkswagen/saveiro-cabina-simple/caracteristicas/abs.webp"
            },
            {
                "title": "Diseño robusto para el trabajo",
                "desc": "Potencia, resistencia y versatilidad en un solo vehículo con una capacidad de carga de 667 Kg y un volumen de Pick-Up de 924 litros, lista para impulsar todos tus proyectos sin importar el desafío.",
                "image": "/images/volkswagen/saveiro-cabina-simple/caracteristicas/esc.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/saveiro-cabina-simple/galeria/94-br-3121-still-saveiro-24-extreme-tsi-close-traseira-com-badge-x3x3-oliver-amb-adv-br.webp",
            "/images/volkswagen/saveiro-cabina-simple/galeria/94-br-3122-still-saveiro-24-extreme-tsi-close-camera-re-x3x3-oliver-amb-adv-br.webp",
            "/images/volkswagen/saveiro-cabina-simple/galeria/94-br-3124-still-saveiro-24-extreme-tsi-close-cacamba-com-capota-x3x3-oliver-amb-adv-br.webp",
            "/images/volkswagen/saveiro-cabina-simple/galeria/captura-de-pantalla-2024-01-04-a-la-s-21-55-20-copy1.webp",
            "/images/volkswagen/saveiro-cabina-simple/galeria/captura-de-pantalla-2024-01-04-a-la-s-22-05-13-copy1.webp",
            "/images/volkswagen/saveiro-cabina-simple/galeria/life-saveiro-24-extreme-amb-br-1383-v01.webp",
            "/images/volkswagen/saveiro-cabina-simple/galeria/saveiro-768-v02-nueva.webp",
            "/images/volkswagen/saveiro-cabina-simple/galeria/slide-3-1.webp"
        ],
        "versions": [
            {
                "name": "Cabina Simple Lite 1.6 MT",
                "motor": "1.6L",
                "transmission": "MT 5 velocidades",
                "power": "110 HP",
                "torque": "155 Nm",
                "traction": "4x2",
                "fuel": "Mixto 13,0 km/lt",
                "listPrice": 12640000,
                "bonus": 1790000,
                "bonusPrice": 10850000
            }
        ],
        "desktopBanner": "/images/volkswagen/saveiro-cabina-simple/banner/ok_s2.webp",
        "mobileBanner": "/images/volkswagen/saveiro-cabina-simple/banner/ok_s2.webp"
    },
    {
        "id": "t-cross",
        "brand": "volkswagen",
        "name": "T-Cross",
        "category": "SUV",
        "price": 18990000,
        "image": "/images/volkswagen/t-cross/min-tcross.webp",
        "slogan": "Bájate del pasado. Súbete al nuevo T-Cross.",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Máxima puntuación en seguridad",
                "desc": "El Volkswagen T-Cross recibió 5 estrellas en el protocolo de pruebas de Latin NCAP (2020-2024), evaluando el nivel de seguridad entregado para los vehículos vendidos en América Latina y Caribe.",
                "image": "/images/volkswagen/t-cross/caracteristicas/airbags.webp"
            },
            {
                "title": "Seguridad al máximo",
                "desc": "Cuenta con 6 airbags de serie (frontales, laterales y de cortina) y asistentes avanzados como el frenado de emergencia (AEB), asistente de mantenimiento de carril, sensor de punto ciego y alerta de tráfico cruzado.",
                "image": "/images/volkswagen/t-cross/caracteristicas/carril-seguridad.webp"
            },
            {
                "title": "Confort y Estilo",
                "desc": "Presenta un tapizado en cuero de alta calidad que ofrece durabilidad y confort en diversas condiciones climáticas. El diseño interior se complementa con un sunroof panorámico, iluminación ambiental y un cuadro de instrumentos digital de hasta 10,25\".",
                "image": "/images/volkswagen/t-cross/caracteristicas/control-crucero.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/t-cross/galeria/14-T-CROSS-1-copy1.webp",
            "/images/volkswagen/t-cross/galeria/16-17.webp",
            "/images/volkswagen/t-cross/galeria/cargador-inalambrico-para-smarthphone2-copia.webp",
            "/images/volkswagen/t-cross/galeria/luces-led-t-cross.webp",
            "/images/volkswagen/t-cross/galeria/vw-tcross-pablovaz009-esp-200-(1).webp"
        ],
        "versions": [
            {
                "name": "T-Cross 1.0 TSI AT Comfortline",
                "motor": "1.0 TSI",
                "transmission": "Automática 6 Vel.",
                "power": "116 HP",
                "torque": "200 Nm",
                "traction": "4x2",
                "fuel": "No especificado",
                "listPrice": 21490000,
                "bonus": 2500000,
                "bonusPrice": 18990000
            },
            {
                "name": "T-Cross 1.0 TSI AT Highline",
                "motor": "1.0 TSI",
                "transmission": "Automática 6 Vel.",
                "power": "116 HP",
                "torque": "200 Nm",
                "traction": "4x2",
                "fuel": "No especificado",
                "listPrice": 22490000,
                "bonus": 2000000,
                "bonusPrice": 20490000
            },
            {
                "name": "T-Cross 1.0 TSI AT Highline Sport S",
                "motor": "1.0 TSI",
                "transmission": "Automática 6 Vel.",
                "power": "116 HP",
                "torque": "200 Nm",
                "traction": "4x2",
                "fuel": "No especificado",
                "listPrice": 23990000,
                "bonus": 1300000,
                "bonusPrice": 22690000
            }
        ],
        "desktopBanner": "/images/volkswagen/t-cross/banner/banner-t-cross-casa-dragao-1920x1080-copia.webp",
        "mobileBanner": "/images/volkswagen/t-cross/banner/banner-t-cross-casa-dragao-1920x1080-copia.webp"
    },
    {
        "id": "taos",
        "brand": "volkswagen",
        "name": "Taos",
        "category": "SUV",
        "price": 23740000,
        "image": "/images/volkswagen/taos/min-taos.webp",
        "slogan": "Un SUVW con superpoderes",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Máxima puntuación en seguridad",
                "desc": "El Volkswagen Taos recibió 5 estrellas en el nuevo protocolo de pruebas de Latin NCAP (2020-2024), que evalúa el nivel de seguridad entregado por los vehículos vendidos en América Latina y Caribe.",
                "image": "/images/volkswagen/taos/caracteristicas/airbags-nivus-hero-sunset-suv-camioneta-colombia.webp"
            },
            {
                "title": "6 airbags",
                "desc": "Extendiendo su protección a lo largo de las ventanas, los airbags de cortina se despliegan en caso de colisión lateral o vuelco, añadiendo una capa adicional de seguridad para los ocupantes de los asientos delanteros y traseros.",
                "image": "/images/volkswagen/taos/caracteristicas/front-assist-17-copia-1-.webp"
            },
            {
                "title": "Tecnología inteligente, conducción segura",
                "desc": "Taos tiene sentidos en alerta para todo lo que sucede a tu alrededor con Front Assist con Monitoreo de Peatones, Punto Ciego y Mantenimiento de carril \"Lane Assist\" para máxima protección.",
                "image": "/images/volkswagen/taos/caracteristicas/taos-21-hero-250tsi-mojave-blind-spot-detection-psh-psl-amb-aerea-01-bra-placa-taos.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/taos/galeria/11-45.webp",
            "/images/volkswagen/taos/galeria/14-23-(1).webp",
            "/images/volkswagen/taos/galeria/16-17.webp",
            "/images/volkswagen/taos/galeria/2-214-(1).webp",
            "/images/volkswagen/taos/galeria/2-baul.webp",
            "/images/volkswagen/taos/galeria/98-3250-still-tiguan-24-r-line-300tsi-ps2-park-assist-1920x1080-copia.webp",
            "/images/volkswagen/taos/galeria/ASIENTOS-TAOS.webp",
            "/images/volkswagen/taos/galeria/iq-light.webp",
            "/images/volkswagen/taos/galeria/taos-llantas19.webp"
        ],
        "versions": [
            {
                "name": "Comfortline AT",
                "motor": "1.4L TSI",
                "transmission": "AT 6 Velocidades",
                "power": "150 HP",
                "torque": "250 Nm",
                "traction": "4x2",
                "fuel": "Mixto 13,7 Km/L",
                "listPrice": 25790000,
                "bonus": 2050000,
                "bonusPrice": 23740000
            },
            {
                "name": "Highline AT",
                "motor": "1.4L TSI",
                "transmission": "AT 6 Velocidades",
                "power": "150 HP",
                "torque": "250 Nm",
                "traction": "4x2",
                "fuel": "Mixto 13,7 Km/L",
                "listPrice": 29190000,
                "bonus": 1750000,
                "bonusPrice": 27440000
            }
        ],
        "desktopBanner": "/images/volkswagen/taos/banner/header-taos-mm-(1).webp",
        "mobileBanner": "/images/volkswagen/taos/banner/header-taos-mm-(1).webp"
    },
    {
        "id": "virtus",
        "brand": "volkswagen",
        "name": "Virtus",
        "category": "Sedán",
        "price": 17240000,
        "image": "/images/volkswagen/virtus/miniatura.webp",
        "slogan": "Su virtud está en los detalles",
        "isHybrid": false,
        "isElectric": false,
        "features": [
            {
                "title": "Máxima puntuación en seguridad",
                "desc": "El Volkswagen Virtus recibió 5 estrellas en el nuevo protocolo de pruebas de Latin NCAP (2020-2024), que evalúa el nivel de seguridad entregado por los vehículos vendidos en América Latina y Caribe.",
                "image": "/images/volkswagen/virtus/caracteristicas/airbags.webp"
            },
            {
                "title": "6 airbags",
                "desc": "Como equipamiento de serie, el vehículo cuenta con 6 airbags totales, los cuales incluyen 2 frontales para conductor y acompañante, 2 airbags laterales delanteros y airbags de cortina.",
                "image": "/images/volkswagen/virtus/caracteristicas/captura-de-pantalla-2023-12-27-a-la-s-21-14-17.webp"
            },
            {
                "title": "Motor 1.0 TSI de serie",
                "desc": "Este modelo está equipado con un motor TSI que garantiza potencia y economía, ofreciendo 170 Nm de par y 109 caballos de potencia para un rendimiento equilibrado y confiable.",
                "image": "/images/volkswagen/virtus/caracteristicas/front-assist-17-copia-1-.webp"
            }
        ],
        "gallery": [
            "/images/volkswagen/virtus/galeria/00741-03-32mm-z274-1920x1080px-copia.webp",
            "/images/volkswagen/virtus/galeria/captura-de-pantalla-2023-12-27-a-la-s-20-15-44.webp",
            "/images/volkswagen/virtus/galeria/captura-de-pantalla-2023-12-27-a-la-s-21-14-17.webp",
            "/images/volkswagen/virtus/galeria/imagen-02-copia.webp",
            "/images/volkswagen/virtus/galeria/r1a0418v3-1-1-.webp",
            "/images/volkswagen/virtus/galeria/r1a9986-v2psd.webp",
            "/images/volkswagen/virtus/galeria/virtus-23-hl-tsi-basico-porta-malas-copia.webp"
        ],
        "versions": [
            {
                "name": "Virtus 1.0 TSI AT Comfortline Plus",
                "motor": "1.0 TSI",
                "transmission": "AT 6 Velocidades",
                "power": "109 hp",
                "torque": "170 Nm",
                "fuel": "Mixto 14,8 Km/L",
                "listPrice": 19890000,
                "bonus": 2650000,
                "bonusPrice": 17240000,
                "traction": "4x2"
            }
        ],
        "desktopBanner": "/images/volkswagen/virtus/banner/captura-de-pantalla-2023-12-27-a-la-s-21-19-50.webp",
        "mobileBanner": "/images/volkswagen/virtus/banner/captura-de-pantalla-2023-12-27-a-la-s-21-19-50.webp"
    }
];
