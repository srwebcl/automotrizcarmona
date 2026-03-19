import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
        hostname: 'szm-jou.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'www.brunofritsch.cl',
      },
    ],
  },
};

export default nextConfig;
