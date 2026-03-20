# PLAN DE DESARROLLO E INTEGRACIÓN: Automotriz Carmona (Premium Backend)

## Contexto Arquitectónico
- **Frontend Existente:** Next.js 15 (App Router), React 19, Tailwind CSS v4.
- **Nuevo Backend (Headless CMS):** Laravel 12 + Filament v3 + PostgreSQL (Neon) dentro de `/backend`.
- **Integración Externa:** Tecnom CRM (vía REST API con formato ADF XML y Basic Auth).
- **Objetivo General:** Crear el backend desde cero con un panel Filament altamente optimizado en UX (Español, SPA, Pestañas), exponer una API REST, y refactorizar el frontend para conectarlo.

---

## FASE 1: Base de Datos y Modelos Core (Laravel 12)
**Objetivo:** Levantar la estructura de datos en la carpeta `/backend`.

- [ ] **Paso 1.1:** Inicializar Laravel 12 en `/backend`. Configurar el `.env` para usar PostgreSQL (Neon).
- [ ] **Paso 1.2:** Crear migraciones y modelos Eloquent: 
  - `Brand`: `name`, `slug`, `logo_url`, `brand_color_css`, `seo_title`, `legal_text` (text), `hero_banners` (json).
  - `VehicleModel`: `brand_id`, `name`, `slug`, `category`, `thumbnail_url`, `desktop_banner_url`, `mobile_banner_url`, `video_url`, `gallery` (json), `base_price`, `slogan`, `is_new`, `is_hybrid`, `is_electric`.
  - `VehicleVersion`: `vehicle_model_id`, `name`, `transmission`, `traction`, `fuel`, `list_price`, `bonus_price`.
  - `Feature`: `vehicle_model_id`, `title`, `description`, `image_url`.
  - `Lead`: `source`, `rut`, `name`, `email`, `phone`, `vehicle_id`, `message`, `crm_synced`.

---

## FASE 2: UX/UI del Panel Administrativo (Filament v3)
**Objetivo:** Construir un panel premium, rápido y en español.

- [ ] **Paso 2.1: Configuración Global.** Instalar Filament v3. En `AdminPanelProvider`: establecer el idioma a español (`es`), activar `->spa()`, poner el Primary Color en `#d2001c`, y cambiar el nombre a 'Automotriz Carmona'.
- [ ] **Paso 2.2: BrandResource.** Crear el CRUD de Marcas. Usar `RichEditor` para `legal_text` y un `Repeater` para `hero_banners` (imagen desktop, imagen mobile, título).
- [ ] **Paso 2.3: VehicleModelResource (UX Premium).** Crear el CRUD de Modelos usando **Tabs (Pestañas)**:
  - *Tab 1 (Datos):* Select de Marca (con búsqueda), Nombre, Categoría, y Toggles para (is_new, is_hybrid). El Slug debe autogenerarse y estar oculto/read-only.
  - *Tab 2 (Multimedia):* FileUploads para miniatura, banners y galería (múltiple). Input para video_url.
  - *Tab 3 (Versiones):* Usar `Repeater` relacional para agregar Versiones y Precios directamente aquí.
  - *Tab 4 (Equipamiento):* Usar `Repeater` relacional para agregar Features.

---

## FASE 3: Motor de Leads y Tecnom CRM (ADF XML)
**Objetivo:** Recibir datos del frontend y enviarlos a Tecnom.

- [ ] **Paso 3.1: Servicio ADF.** Crear `TecnomCrmService.php` que tome un modelo `Lead`, genere el XML en formato ADF 1.0 y lo envíe por HTTP POST con Basic Auth.
- [ ] **Paso 3.2: API de Recepción.** Crear ruta POST `/api/v1/leads`, validar con FormRequest, guardar en BD y encolar el Job para Tecnom.

---

## FASE 4: APIs de Catálogo y Next.js
**Objetivo:** Consumir el catálogo desde el frontend.

- [ ] **Paso 4.1: Rutas API GET.** Crear endpoints `/api/v1/brands` y `/api/v1/models/{brand}/{model}` usando JsonResources.
- [ ] **Paso 4.2: Frontend Next.js.** Instalar `zustand` para el estado global (`useUIStore.ts`). Crear fetchers en `lib/services/api.ts` y eliminar `'use client'` de las páginas de catálogo para usar SSR/ISR.
- [ ] **Paso 4.3: Conectar Formularios.** Apuntar `/cotizar`, `/servicios/agendar`, etc., al nuevo endpoint POST de Laravel.