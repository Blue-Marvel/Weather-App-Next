import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: [ "via.placeholder.com"],
    remotePatterns: [
      new URL('https://openweathermap.org/img/wn/**')
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    }
  }
};

export default nextConfig;
