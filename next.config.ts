import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF is not on by default in Next 16; it is ~20% smaller than WebP.
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 31 days instead of the 4h default.
    minimumCacheTTL: 2678400,
    qualities: [50, 60, 75],
  },
  async headers() {
    // Video + poster files in /public/media bypass next/image, so this is
    // what actually caches them long-term.
    return [
      {
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    // The cinematic experience moved from /cinematic/* to the root.
    return [
      { source: "/cinematic", destination: "/", permanent: true },
      { source: "/cinematic/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
