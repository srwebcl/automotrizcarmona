# PLANTILLA ESTÁNDAR CARMONA — AUTOS, MOTOS Y CAMIONES
# Versión 2.0 — Unificada para todas las marcas y tipos de vehículo.
# Esta plantilla es escaneada automáticamente por el sistema de importación de Automotriz Carmona.
# Mantén la sintaxis, los dos puntos (:) y las palabras clave intactas. Solo reemplaza lo que está entre corchetes [].
# Para agregar más de una versión, repite el bloque "VERSIÓN:" tantas veces como necesites.

==================================================
# ──────────────────────────────────────────────
# 1. ENLACE Y SLUG (REQUERIDO)
# ──────────────────────────────────────────────
# El texto a la derecha de la última "/" en el link será el "id" en la URL de Carmona.
# Ejemplo: "https://www.marca.cl/modelos/nuevo-tiguan" → slug = "nuevo-tiguan"
https://www.tu-marca.cl/modelos/[slug-del-modelo]

# ──────────────────────────────────────────────
# 2. IDENTIFICACIÓN DEL MODELO (REQUERIDO)
# ──────────────────────────────────────────────
MARCA: [Ej: Toyota / BMW / Volkswagen / Iveco / BMW Motorrad]
MODELO: [Nombre comercial. Ej: Hilux / Serie 3 / Daily]
TIPO: [liviano / moto / camion-bus]
CATEGORÍA: [SUV / Sedán / Hatchback / Pick-Up / Moto-Sport / Moto-Tour / Camión / Bus / etc.]
SLOGAN: [Una sola frase corta. Ej: "The New Hilux." — dejar vacío si no aplica]
IVA INCLUIDO: [Sí / No — "No" para comerciales que se venden + IVA como Pick-Up doble cabina carga, camiones y buses]

# ──────────────────────────────────────────────
# 3. VIDEO (OPCIONAL)
# ──────────────────────────────────────────────
VIDEO: https://youtu.be/[ID_DEL_VIDEO]

# ──────────────────────────────────────────────
# 4. CARACTERÍSTICAS DESTACADAS (RECOMENDADO: 3 a 4 tarjetas)
# Cada bloque CARACTERÍSTICA corresponde a una imagen en la carpeta /caracteristicas/
# ──────────────────────────────────────────────
CARACTERÍSTICAS:

CARACTERÍSTICA 1:
Título: [Ej: Motor Turbo 2.8 TDI]
Descripción: [Texto breve. Ej: Motor diésel de alto rendimiento con 204 hp para cualquier terreno.]

CARACTERÍSTICA 2:
Título: [Ej: Pantalla Táctil 10"]
Descripción: [Texto breve.]

CARACTERÍSTICA 3:
Título: [Ej: Sistema de Seguridad Activa]
Descripción: [Texto breve.]

CARACTERÍSTICA 4:
Título: [Ej: Conectividad Apple CarPlay / Android Auto]
Descripción: [Texto breve. — Omitir bloque completo si no aplica]

# ──────────────────────────────────────────────
# 5. VERSIONES (REQUERIDO — repite el bloque por cada variante)
# ──────────────────────────────────────────────
VERSIONES:

VERSIÓN:
Nombre: [Nombre exacto de la versión. Ej: Hilux SR 4x4 Diesel AT]
Motor: [Ej: 2.8 TDI / 1.5 Turbo / Motor eléctrico síncrono 5ta gen.]
Combustible: [Gasolina / Diésel / Gas / Híbrido / Eléctrico] (Usa exactamente uno de estos términos)
Transmisión: [Mecánica / Automática / CVT] (Puedes agregar los cambios, ej: Automática 8 vel.)
Rendimiento Mixto: [Ej: 14.5 km/l — para eléctricos: Consumo Mixto 16.8 kWh/100km]
Autonomía Eléctrica: [Solo para híbridos/eléctricos. Ej: 80 km eléctricos / Omitir si no aplica]
Potencia: [Ej: 204 hp / 150 kW]
Torque: [Ej: 420 Nm]
Tracción: [4x2 / 4x4 / AWD / FWD / RWD] (Usar opciones predeterminadas base, aunque las marcas tengan nombres propios como xDrive)
Puertas: [2 / 4 / 5]
Asientos: [2 / 5 / 7 / 8]
Airbags: [Número. Ej: 6 / 8]
PRECIO DE LISTA: $[Precio bruto sin descuento. Ej: 25.990.000]
BONO MARCA: $[Descuento de la marca sobre precio lista. Ej: 1.000.000 — "0" si no aplica]
BONO FINANCIAMIENTO: $[Descuento adicional por financiamiento. Ej: 2.000.000 — "0" si no aplica]
PRECIO CON FINANCIAMIENTO: $[Precio final aplicando bonos. Ej: 22.990.000]

VERSIÓN:
Nombre: [Nombre exacto de la siguiente versión]
Motor: [...]
Combustible: [...]
Transmisión: [...]
Rendimiento Mixto: [...]
Autonomía Eléctrica: [...]
Potencia: [...]
Torque: [...]
Tracción: [...]
Puertas: [...]
Asientos: [...]
Airbags: [...]
PRECIO DE LISTA: $[...]
BONO MARCA: $[...]
BONO FINANCIAMIENTO: $[...]
PRECIO CON FINANCIAMIENTO: $[...]

==================================================

# ──────────────────────────────────────────────
# INSTRUCCIONES RÁPIDAS
# ──────────────────────────────────────────────
# 1. SLUG: Copia el enlace real de la marca (ej: bmw.cl/modelos/serie-3).
#    El sistema extrae automáticamente el slug de la URL.
#
# 2. TIPO DE VEHÍCULO:
#    - "liviano"    → autos SUV, sedán, hatchback, pick-up, etc.
#    - "moto"       → cualquier motocicleta (incluyendo scooters eléctricos)
#    - "camion-bus" → camiones, furgones de carga, buses, minibuses
#
# 3. IVA: Si vendes en precio + IVA (ej: Hilux doble cabina carga, Daily, buses),
#    indicar: IVA INCLUIDO: No
#    El sitio mostrará automáticamente el símbolo "+ IVA" junto al precio.
#
# 4. COMBUSTIBLE → define si el vehículo muestra la etiqueta "Híbrido" o "100% Eléctrico"
#    en su tarjeta y si aparece el campo "Autonomía Eléctrica" en las características.
#
# 5. VERSIONES: Añade cuantas versiones necesites repitiendo el bloque "VERSIÓN:".
#    Puedes omitir campos que no apliquen (ej: Autonomía Eléctrica en gasolina).
#
# 6. IMÁGENES: El sistema busca automáticamente:
#    → Banner:        /publico/images/[marca]/[MODELO]/banner/banner.avif (o .jpg/.png/.webp)
#    → Miniatura:     /images/[marca]/[MODELO]/min.[ext]
#    → Galería:       /images/[marca]/[MODELO]/galeria/1.avif, 2.avif ...
#    → Características: /images/[marca]/[MODELO]/caracteristicas/[nombre].avif ...
#
# 7. MOTOS: Usar Tracción = "Cadena" / "Cardán" / "Banda" según corresponda.
#    La cilindrada va en el campo "Motor" (ej: 1.170 cc Boxer).
