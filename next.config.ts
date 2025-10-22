import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "readymadeui.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com", 
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;

