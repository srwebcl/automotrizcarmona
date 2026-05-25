He analizado el archivo y tus URLs antiguas siguen patrones muy claros de WordPress y del tema que usabas anteriormente. Podemos dividirlas en 3 grupos principales, y para solucionarlo, te preparé el código exacto que debes agregar a tu proyecto de Next.js (generalmente en el archivo next.config.js o next.config.mjs que está en la raíz de tu proyecto).

Aquí está el diagnóstico y la solución:

🔍 Análisis de tus URLs antiguas
Patrón de Vehículos (Ej: /project/mg-rx9/, /project_category/citroen/):
Tu WordPress antiguo usaba el tipo de entrada "project" (probablemente de un portafolio o plugin) para mostrar los autos y marcas. Todas estas deben redirigir a tu nuevo catálogo.

Patrón de Servicios (Ej: /taller, /servicio-tecnico/agendar-citroen/):
Rutas estáticas que deben ir a tu nueva landing de Servicio Técnico.

Basura de WordPress (Ej: /wp-content/uploads/...):
Archivos PDF viejos o carpetas internas de WordPress que ya no existen. Estas deben morir con un código 410.

Subdominio de Usados (Ej: https://www.seminuevos.automotrizcarmona.cl/...):
Si este subdominio también apuntaba a Vercel, requerirá redirección; si no, configúralo en tu proveedor de DNS.

💻 Solución: Código para next.config.js
Abre o crea el archivo next.config.js en tu proyecto de Next.js e incorpora estas reglas:

JavaScript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 1. Redirecciones de Modelos Específicos (Mapeo General)
      // Todo lo que era /project/algo pasará al catálogo principal para que el usuario busque
      {
        source: '/project/:slug*',
        destination: '/autos', // O si tienes un buscador inteligente: /autos?q=:slug*
        permanent: true, // Esto es el 301 para recuperar el SEO
      },
      
      // 2. Redirecciones de Marcas o Categorías
      {
        source: '/project_category/:slug*',
        destination: '/autos', 
        permanent: true,
      },

      // 3. Redirecciones de Servicio Técnico y Taller
      {
        source: '/taller',
        destination: '/servicio-tecnico',
        permanent: true,
      },
      {
        source: '/servicio-tecnico/:path*',
        destination: '/servicio-tecnico',
        permanent: true,
      },
    ];
  },

  // Las páginas basura (wp-content, wp-admin) deben dar un Error 410 (Gone) 
  // para que Google las borre rápido en lugar de un simple 404.
  // Next.js permite esto en las "rewrites" o usando middleware, pero 
  // una forma práctica es rutearlas a una página que devuelve 404 estricto o manejarlo por Middleware.
};

module.exports = nextConfig;
🧹 ¿Qué hacer con la "Basura de WordPress" (wp-content, etc.)?
Para decirle a Google explícitamente "esto se borró" (Error 410) o devolver un 404 estricto para rutas de WordPress, te recomiendo crear un archivo middleware.ts (o .js) en la raíz de tu proyecto (junto a app o src):

TypeScript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // Si la URL contiene patrones clásicos de WordPress
  if (url.startsWith('/wp-content') || url.startsWith('/wp-admin') || url.startsWith('/wp-includes')) {
    // Devuelve un error 410 (Gone) para limpiar Google Search Console rápido
    return new NextResponse('Esta página ha sido eliminada permanentemente.', { status: 410 });
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    '/wp-content/:path*',
    '/wp-admin/:path*',
    '/wp-includes/:path*'
  ],
};
🚀 Siguientes Pasos
Sube estos cambios a Vercel: Al hacer el deploy, Vercel aplicará estas redirecciones 301 en su red Edge, por lo que serán ultra rápidas.

Valida en Google Search Console: Vuelve a la página de "No se ha encontrado (404)", y dale al botón que dice "Validar corrección". Google empezará a rastrear nuevamente esas URLs y verá que ahora redirigen (301) o se han ido (410), limpiando así tus reportes de errores en unas semanas.