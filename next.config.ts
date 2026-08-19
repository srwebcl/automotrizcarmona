import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/project/:slug*',
        destination: '/autos',
        permanent: true,
      },
      {
        source: '/project_category/:slug*',
        destination: '/autos', 
        permanent: true,
      },
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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  images: {
    // Las imágenes en R2 nunca se sobreescriben bajo la misma URL (Filament genera
    // un nombre de archivo único en cada subida), así que es seguro cachear las
    // variantes optimizadas por mucho tiempo. El default de Next.js es 60 segundos,
    // lo que forzaba a regenerar (y volver a cobrar como transformación en Vercel)
    // la misma imagen constantemente bajo tráfico normal. 1 año = 31536000 segundos.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'pub-5f17f36d654d46e6a6a748a95586b21f.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'www.automotrizcarmona.cl',
      },
      {
        protocol: 'https',
        hostname: 'api.automotrizcarmona.cl',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
    ],
  },
};

export default nextConfig;
