import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The cinematic experience moved from /cinematic/* to the root.
    return [
      { source: "/cinematic", destination: "/", permanent: true },
      { source: "/cinematic/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
