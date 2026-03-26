# PROMPT PARA NOTEBOOK LM - CREADOR DE MODELOS CARMONA

Copiar todo el texto que está debajo de la línea punteada y pegarlo en Notebook LM (junto a los PDFs de listas de precios y fichas técnicas de la marca) para que te devuelva el archivo `info.md` perfectamente estructurado.

------------------------------------------------------------------------------------------------

**INSTRUCCIONES PARA EL ASISTENTE (NOTEBOOK LM):**

A partir de las fuentes proporcionadas (listas de precios, fichas técnicas, sitio web de la marca), necesito que extraigas la información de los vehículos y la estructures EXACTAMENTE según la plantilla que te entregaré a continuación. 

Este resultado será procesado por un script computacional estricto en Python, por lo tanto, es **absolutamente obligatorio** seguir estas reglas inquebrantables:

1.  **Formatos de Precios:** Los precios (`PRECIO DE LISTA`, `BONO MARCA`, `BONO FINANCIAMIENTO`, `PRECIO CON FINANCIAMIENTO`) **NO DEBEN TENER PUNTOS NI SÍMBOLOS EXTRAÑOS** más allá del signo peso inicial. Ej Correcto: `$25990000`. Ej Incorrecto: `$25.990.000`. Si el precio no existe o es cero, escribe `$0`.
2.  **Opciones Predeterminadas (Tracción):** Usar exclusivamente: `4x2`, `4x4`, `AWD`, `FWD`, `RWD`. (Traduce términos de marca como 'quattro', '4MOTION', 'xDrive', 'All4' a la opción predeterminada correspondiente).
3.  **Opciones Predeterminadas (Combustible):** Usar exclusivamente: `Gasolina`, `Diésel`, `Gas`, `Híbrido`, `Eléctrico`.
4.  **Opciones Predeterminadas (Transmisión):** Usar exclusivamente: `Mecánica`, `Automática`, `CVT` (puedes añadir velocidades, ej: `Automática 8 Vel`).
5.  **Opciones Predeterminadas (Vehículo):** 
    -   TIPO solo puede ser: `liviano`, `moto` o `camion-bus`.
    -   CATEGORÍA debe ser estándar: `SUV`, `Hatchback`, `Sedán`, `Pick-Up`, `Deportivo`, `Camión`, `Furgón`, "Scooter".
6.  **IVA Relacionado:** Si detectas que se trata de Pick-Ups Doble Cabina comerciales, Furgones o Camiones, pon `IVA INCLUIDO: No`. Para el resto (SUV, Sedán, etc), pon `IVA INCLUIDO: Sí`.
7.  **Sintaxis Literal:** Las etiquetas como `PRECIO DE LISTA:`, `Nombre:`, `VERSIONS:`, etc., no pueden ser removidas ni alteradas.

A continuación, la estructura vacía que debes rellenar por **CADA** modelo base que encuentres en los documentos. Devuelve el código en formato texto plano para que yo pueda guardarlo en un archivo `info.md`:

```markdown
https://www.marca.cl/modelos/[slug-del-modelo-todo-minusculas-con-guiones]

MARCA: [Nombre de la Marca]
MODELO: [Nombre del Modelo, ej: Serie 3]
TIPO: [liviano / moto / camion-bus]
CATEGORÍA: [SUV / Hatchback / etc]
SLOGAN: [Una frase impactante corta, u omitir si no hay]
IVA INCLUIDO: [Sí / No]

VIDEO: [Opcional: Si encuentras URL corta de YT ponla aquí, sino omite el link pero deja "VIDEO: "]

CARACTERÍSTICAS:

CARACTERÍSTICA 1:
Título: [Destacado principal, ej: Interior Tecnológico]
Descripción: [Desc extraída de los brochures]

CARACTERÍSTICA 2:
Título: [Destacado]
Descripción: [Breve]

CARACTERÍSTICA 3:
Título: [Destacado]
Descripción: [Breve]

VERSIONES:

VERSIÓN:
Nombre: [Nombre explícito de la variante comercial, ej: 1.5 TSI Comfortline]
Motor: [ej: 1.5 TSI]
Combustible: [Gasolina / Diésel / Híbrido / Eléctrico]
Transmisión: [Mecánica / Automática / CVT]
Rendimiento Mixto: [ej: 14.5 km/l]
Autonomía Eléctrica: [Solo rellenar si es Híbrido PHEV o Eléctrico, si no, dejar vacío el campo]
Potencia: [ej: 150 hp]
Torque: [ej: 250 Nm]
Tracción: [4x2 / AWD / 4x4]
Puertas: [ej: 5]
Asientos: [ej: 5]
Airbags: [ej: 6]
PRECIO DE LISTA: $[Rellenar sin puntos ej: 20990000]
BONO MARCA: $[Rellenar sin puntos, sino $0]
BONO FINANCIAMIENTO: $[Rellenar sin puntos, si existe bono de crédito particular, sino $0]
PRECIO CON FINANCIAMIENTO: $[Calculado. Rellenar sin puntos]

[... Repetir todo el bloque VERSIÓN: las veces que sea necesario para enumerar todas las variantes especificadas en las listas de precios...]

```

(Asegúrate de procesar todos los modelos que te he entregado, uno tras otro, generando este bloque con precisión algorítmica y calculando adecuadamente la resta matemática en los Bonos para el "Precio con Financiamiento" si es que la lista de precios me la da particionada).
