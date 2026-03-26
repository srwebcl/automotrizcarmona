# 🚗 Plataforma Web Automotora (22 Marcas) — Arquitectura Completa

## 📌 Objetivo

Desarrollar un sitio web escalable para una automotora chilena que:

* Representa +22 marcas
* Maneja +600 modelos
* Incluye autos nuevos, usados, servicio técnico y repuestos
* Integra formularios con CRM
* Integra contacto por WhatsApp
* Funciona con alto rendimiento y SEO

---

# 🧠 Arquitectura General

Separación de responsabilidades:

* **Frontend:** Experiencia de usuario + SEO
* **Backend:** Lógica de negocio + administración
* **Base de datos:** Estructura centralizada y escalable
* **CDN:** Imágenes optimizadas

---

# ⚙️ Stack Tecnológico

## Frontend

* Next.js (App Router)
* Deploy en Vercel
* SSR + SSG para SEO

## Backend

* Laravel 11
* Filament (panel de administración)

## Base de Datos

* PostgreSQL (Neon serverless)

## Infraestructura

* Cloudways + Vultr (backend)
* Cloudflare (imágenes + CDN)

---

# 🧱 Modelo de Datos (PostgreSQL)

## 🏷️ marcas

* id
* nombre
* slug
* logo_url
* estado
* created_at

---

## 🚘 modelos

* id
* marca_id (FK)
* nombre
* slug
* categoria_id
* segmento
* carroceria
* imagen_url
* estado

---

## 🚗 versiones

* id
* modelo_id (FK)
* nombre
* slug
* precio
* moneda
* combustible_id
* transmision_id
* traccion_id
* motor
* potencia_hp
* torque_nm
* equipamiento (JSONB)
* ficha_tecnica (JSONB)
* estado

---

## 🔧 tablas de normalización

* combustibles
* transmisiones
* tracciones
* categorias

---

## 🚙 vehiculos_usados

* id
* marca
* modelo
* año
* km
* precio
* descripcion

---

## 🧠 tabla auxiliar (normalización avanzada)

### brand_raw_data

* id
* texto_original
* valor_normalizado
* tipo (tracción, transmisión, etc)

---

# 🚗 Normalización de Datos

## Tracción (ejemplo)

* FWD / RWD → 4x2
* AWD → AWD
* 4WD → 4x4

---

## Combustible

* Gasolina
* Diésel
* Híbrido
* Híbrido enchufable
* Eléctrico

---

## Transmisión

* Manual
* Automática
* CVT
* DCT

---

## Categorías

* SUV
* Hatchback
* Sedán
* Pickup
* Comercial
* Deportivo

---

# ⚡ Carga Masiva de Datos

## Flujo recomendado

```
Scraper / API
   ↓
JSON crudo
   ↓
Normalización
   ↓
Importación a DB
```

---

## Laravel Command

```
php artisan import:vehicles
```

Funciones:

* Limpieza de datos
* Mapeo de valores
* Inserción masiva

---

# 🧩 Backend (Laravel + Filament)

## Funcionalidades

### CRUD

* Marcas
* Modelos
* Versiones
* Vehículos usados

---

## UX Admin

* Selectores dependientes
* Filtros avanzados
* Edición rápida
* Carga masiva

---

## Roles

* Admin
* Marketing
* Vendedor

---

# 🌐 API (Laravel)

## Endpoints

```
/api/marcas
/api/modelos?marca=toyota
/api/versiones?modelo=corolla
/api/usados
```

---

## Integraciones

### CRM

Flujo:

```
Frontend → Laravel → CRM
```

---

### WhatsApp

Formato:

```
https://wa.me/569XXXXXXXX?text=Consulta%20Toyota%20Corolla
```

---

# 🖥️ Frontend (Next.js)

## Estructura de rutas

```
/autos
/autos/suv
/autos/toyota
/toyota/corolla
/toyota/corolla/xei-2-0
```

---

## Páginas principales

### Home

* Marcas
* Buscador
* Destacados

---

### Catálogo

* Filtros:

  * marca
  * precio
  * tipo
  * transmisión

---

### Ficha modelo

* Versiones
* Especificaciones
* CTA (cotizar / WhatsApp)

---

### Usados

* Marketplace con filtros

---

### Servicio técnico

* Agenda de horas

---

### Repuestos

* Formulario con VIN

---

# 🚀 Fases del Proyecto

## Fase 1 – Infraestructura (1 semana)

* Setup Neon
* Setup Laravel + Filament
* Deploy backend

---

## Fase 2 – Base de datos (1 semana)

* Migraciones
* Relaciones
* Panel admin

---

## Fase 3 – Datos (2 semanas)

* Scraping
* Normalización
* Importación

---

## Fase 4 – Frontend (2–3 semanas)

* Catálogo
* Fichas
* SEO

---

## Fase 5 – Integraciones (1 semana)

* CRM
* WhatsApp

---

# 💡 Buenas Prácticas

## SEO

* URLs indexables por versión
* Schema.org
* SSR

---

## Performance

* ISR (Next.js)
* CDN (Cloudflare)

---

## Base de datos

* Uso de JSONB
* Índices en campos clave
* Full-text search

---

## Escalabilidad

* Multi-marca
* Multi-sucursal
* Multi-país

---

# 🧨 Resumen Final

Arquitectura:

* Frontend: Next.js (Vercel)
* Backend: Laravel + Filament (Cloudways + Vultr)
* DB: Neon (PostgreSQL)
* Imágenes: Cloudflare

---

## 🔥 Clave del éxito

> Normalización + estructura de datos + automatización de carga

---

## 🚀 Resultado esperado

* Plataforma rápida
* Escalable
* SEO optimizado
* Fácil de administrar
* Preparada para crecimiento futuro

---
