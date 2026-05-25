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
  images: {
    unoptimized: true,
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
