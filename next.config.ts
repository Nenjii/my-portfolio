import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization for external sources (Firebase Storage cover images, etc.)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "**.firebasestorage.app" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Don't advertise the framework
  poweredByHeader: false,
};

export default nextConfig;
