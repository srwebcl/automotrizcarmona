# Documentación Técnica y Funcional - Automotriz Carmona

Este documento provee un análisis profundo y detallado de la arquitectura, stack, funcionalidades y estado actual del proyecto **Automotriz Carmona**.

---

## 1. Stack Tecnológico Actual

El proyecto está construido sobre un stack moderno y fuertemente tipado de frontend:

- **Framework Core**: Next.js v15 (App Router). *Nota: En el `package.json` figura la versión "16.1.6" que parece apuntar a versiones RC o canary avanzadas, junto con React 19.*
- **Renderizado de Interfaz**: React 19 (`react`, `react-dom`).
- **Estilos**: Tailwind CSS v4 con `@tailwindcss/postcss`. Configuración simplificada y moderna para utilidades CSS.
- **Tipado**: TypeScript v5. Tipos estrictos habilitados en casi todos los componentes descubiertos.
- **Librerías UI Adicionales**:
  - `embla-carousel-react` y `embla-carousel-autoplay` para carruseles de productos, banners y galerías.
  - `lucide-react` para toda la iconografía moderna, ligera y en formato SVG vectorial.
  - `clsx` y `tailwind-merge` para el manejo avanzado y dinámico de clases de Tailwind.
- **Herramientas de Desarrollo**: ESLint v9 con configuración para Next.js 14/15.
- **Motor / Backend**: **Headless Frontend / Siteless Backend**. Actualmente, la información de modelos y vehículos (`MOCK_VEHICLES`, `BRAND_LOGOS`, `TRUCK_LOGOS`) está **100% hardcodeada** mediante constantes en archivos de TypeScript (`lib/data.ts`, `lib/brands.ts`, `lib/models/toyota.ts`, etc.). No existe una integración directa con una base de datos externa tipo Postgres o Mongo, ni mediante un CMS.

---

## 2. Funcionalidades Detalladas

La aplicación utiliza la funcionalidad de _App Router_ de Next.js (`/app`) y tiene definidos varios flujos de usuario completos:

### A. Home y Exploración General (`/`)
- Muestra los vehículos destacados mediante un carrusel dinámico.
- Componente `DiscoverMoreCarousel` para explorar ofertas y categorías.
- `QuickAccessBar` para navegación rápida inferior o lateral.
- Integramos un componente `Hero` principal y secciones promocionales.

### B. Catálogo de Nuevos (`/nuevos`, `/nuevos/[brand]`, `/nuevos/[brand]/[id]`)
- Rutas dinámicas manejadas por carpetas `[brand]` y `[id]`.
- Muestra grillas de marcas filtradas dependiendo si son autos ligeros o pesados.
- Generación estática de modelos asociados a las marcas de vehículos livianos y pesados. 

### C. Catálogo de Camiones y Buses (`/camiones`, `/camiones/[brand]`, `/camiones/[brand]/[id]`)
- Mantiene una separación conceptual de autos nuevos de pasajeros vs vehículos de maquinaria/camiones.
- La ruta `/camiones/[brand]/[id]` funciona como un esquema de reserva o página en construcción.

### D. Áreas de Post Venta y Soporte
- **Servicio Técnico** (`/servicios`, `/servicios/agendar`): Vista donde el cliente puede consultar y pre-agendar mantenimientos.
- **Repuestos** (`/repuestos`, `/repuestos/cotizar`): Área para cotización de autopartes.
- **Desabolladura y Pintura** (`/dyp`, `/dyp/cotizar`): Sección específica de colisiones (DyP) que invoca un `DypBanner`.

### E. Utilidades e Información del Concesionario
- **Sucursales** (`/sucursales`): Mapas y listados de centros de atención.
- **Noticias** (`/noticias`): Blog/Novedades (ej. "Bienvenido @diego13_sanchez...").
- **Contacto y Reclamos** (`/contacto`, `/reclamos`): Formularios de captura y flujos de tickets/sugerencias de la plataforma de posventa.

### F. Asistente Inteligente Universal (Navbar Integrado)
Dentro de `components/Navbar.tsx` reside una de las funcionalidades más potentes y personalizadas de la web: **Un Asistente de Búsqueda Semántica ("¿Te Ayudo?")**.
- Responde a intenciones mediante RegExp o sub-strings (ej. si el usuario busca "taller", "revisión" se redirige a intent `SERVICE`; si busca "camion", va a `TRUCKS`, etc.).
- Modifica el modal responsivo y muestra `Links` directos sugiriendo llamadas a la acción en base al texto introducido, sin necesidad de conectarse a un modelo de IA de pago, sólo con lógica semántica simulada.

---

## 3. Lo que "NO SIRVE y ES CONSIDERADO BASURA" (Código Muerto / Incompleto)

A raíz del análisis profundo del código, se expone lo siguiente que debería ser depurado o refactorizado:

1. **Rutas No Funcionales / En Construcción Permanente:**
   - La página `/camiones/[brand]/[id]/page.tsx` actualmente **no sirve para visualizar camiones**. Renderiza el texto por defecto de relleno: _"Estamos trabajando para traerte todos los detalles técnicos, versiones y precios de las unidades [brand] pronto."_. Es un "dead-end" (callejón sin salida) que perjudica la retención del usuario.
   
2. **Hardcodeo y Datos de Prueba (`MOCK_VEHICLES`):**
   - En `lib/data.ts` y todos los datos en `lib/models/*`, se encuentra una gran cantidad de datos quemados en el código. Esto no es "basura" *per se*, pero se vuelve insostenible a largo plazo para un e-commerce automotriz real. Hay que conectar esto a un Gestor de Contenidos o ERP automotriz.
   
3. **El archivo `package.json` tiene metadata basura:**
   - El proyecto internamente se sigue llamando `"name": "temp_project", "version": "0.1.0"`. Esto indica que no ha sido configurado para un deploy a producción serio y conserva nombres de andamiaje. 
   
4. **Vistas de Cotización No Dinámicas:**
   - `/cotizar/page.tsx` no parece manejar un estado centralizado (Context / Redux / Zustand). Cada cotización se reinicia o depende del Link de la query de la URL. Si hay mucha data, puede fallar sin un manejo de estado local.

5. **Librerías innecesarias o archivos sin uso:**
   - Hay logos en `public/images/logos/` que están definidos pero pueden o no estar mostrándose debido a que algunos son híbridos y otros no (ej. "SOUEAST_BLACK_Logo.png" rompe la convención de "logo-[brand].webp", lo que aumenta la deuda técnica de assets).

---

## 4. Información Técnica y Funcional Adicional (Recomendaciones)

1. **Gestor de Estado (Zustand) para Modal:**
   El componente `Navbar.tsx` es enorme (más de 650 líneas) porque controla *demasiado* estado local (menus, submenus, modales unificados, asistente, strings de busqueda). 
   - **Recomendación:** Mover `searchIntent`, `searchQuery` y los flags modales a un "store" global simple usando `Zustand` o `Context API`. Y separar el Asistente en un componente `<SmartAssistantModal />`.

2. **SEO y Metadata Next.js:**
   Actualmente el `layout.tsx` principal trae un título genérico ("Automotriz Carmona | Líderes en Venta..."). Para mejorar el SEO local de Automotoras, se recomienda agregar `generateMetadata` en las rutas dinámicas como `[brand]` y `[id]`.

3. **Arquitectura Escalable de Carga:**
   Las imágenes en Next.js actúan impecable gracias al componente `<Image />`, pero para logos de alta compresión se está usando una mezcla de `.webp` y `.png` (ej. Soueast y Seminuevos). Migrar TODO a `.webp` desde Webpack aliviará el Bandwidth y el LCP (Largest Contentful Paint).

4. **Patrón de Fetching Futuro:**
   Ya que todos los componentes son `use client` en gran medida o invocan hooks interactivos en la página (Embla Carousel), las páginas como `app/page.tsx` deberían dividirse en envoltorios "Server Components" para el SEO y data fetching, y "Client Components" estrictos para los Carruseles, optimizando así el SSR de Next.js.
