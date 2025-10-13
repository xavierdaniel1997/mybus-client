import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // 👈 allow Cloudinary images
      },
    ],
  },
};

export default nextConfig;
