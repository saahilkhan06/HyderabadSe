import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**",
      },
      {
        protocol: "https",
        hostname: "logos.hunter.io",
      },
      {
        protocol: "https",
        hostname: "logo.debounce.com",
      },
      {
        protocol: "https",
        hostname: "img.logo.dev",
      },
      {
        protocol: "https",
        hostname: "cdn.brandfetch.io",
      },
    ],
  },
};

export default nextConfig;
