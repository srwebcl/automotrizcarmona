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
