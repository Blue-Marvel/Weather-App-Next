import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: [ "via.placeholder.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        // port: '',
        pathname: '/150/**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    }
  }
};

export default nextConfig;
