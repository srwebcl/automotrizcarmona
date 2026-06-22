# Stack Técnico y Estrategia de Despliegue (Automotriz Carmona)

Este documento sirve como "fuente de la verdad" para que cualquier agente de IA o nuevo desarrollador entienda la infraestructura técnica del proyecto y sepa exactamente cómo llevar cambios a producción de forma segura.

## 1. Arquitectura del Proyecto

El proyecto tiene una arquitectura desacoplada (Headless):

- **Frontend (Cliente):** Next.js (App Router), React, TailwindCSS, TypeScript.
- **Backend (API & CMS):** Laravel 11+, Filament PHP v3 (Panel de Administración).
- **Base de Datos:** PostgreSQL (pgsql).
- **Almacenamiento de Archivos (Imágenes/Banners):** Cloudflare R2 (Object Storage S3-compatible).

## 2. Infraestructura y Hosting

- **Frontend Hosting:** Vercel (Conectado al repositorio de GitHub).
- **Backend Hosting:** Cloudways (DigitalOcean/AWS u otro proveedor bajo la capa de Cloudways).

## 3. Flujo de Despliegue a Producción (Paso a Paso)

Debido a que los sistemas están separados, el despliegue requiere sincronización, especialmente cuando hay migraciones de bases de datos.

### A. Despliegue del Frontend (Next.js)
El despliegue del frontend es 100% automatizado mediante integración continua (CI/CD).
1. Guarda los cambios localmente y abre la terminal en la raíz del proyecto.
2. Ejecuta: `git add .`
3. Ejecuta: `git commit -m "Descripción clara de los cambios visuales"`
4. Ejecuta: `git push origin main`
5. Vercel detectará el push automáticamente, construirá (`build`) el sitio y lo publicará en producción en 1-2 minutos.

### B. Despliegue del Backend (Laravel/Filament)
Dado que el Backend reside en Cloudways y usa "Deployment via GIT", el proceso tiene un paso adicional crítico cuando involucra Base de Datos.

1. **Subir código a Git:**
   - Ubícate en la carpeta del backend (`cd backend`).
   - Ejecuta: `git add .`
   - Ejecuta: `git commit -m "Descripción de los cambios de backend o base de datos"`
   - Ejecuta: `git push origin main`

2. **Hacer Pull en Cloudways:**
   - Ingresa al panel web de Cloudways.
   - Ve a la aplicación (App) de tu backend.
   - En el menú lateral, dirígete a **"Deployment via GIT"**.
   - Presiona el botón para hacer **"Pull"** de los últimos cambios de tu repositorio.

3. **Ejecutar Comandos por Terminal SSH (Solo si hay Migraciones/Cambios estructurales):**
   - Entra a la consola SSH (Terminal) desde el propio panel de Cloudways (o vía cliente externo como Termius).
   - Navega a la carpeta pública de tu aplicación: `cd public_html` (o la ruta raíz de tu app en Cloudways).
   - Limpia cachés de Laravel:
     `php artisan optimize:clear`
   - Si creaste migraciones (nuevas columnas o tablas), ejecuta obligatoriamente:
     `php artisan migrate --force`
     *(El `--force` evita que te pida confirmación interactiva en producción).*

### Regla de Oro para Despliegues Simultáneos
Si una característica nueva requiere cambios en el Backend Y en el Frontend (por ejemplo: agregar una columna en la BD y luego mostrarla en la web):
1. **SIEMPRE despliega primero el Backend.** Haz el Pull en Cloudways y corre `php artisan migrate`. Esto asegura que cuando el Frontend vaya a consultar la API, los datos ya existan y no se caiga la web por un error 500.
2. **Luego despliega el Frontend.** Haz el push a Vercel.
