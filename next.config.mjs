/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js"; // ✅ built-in sensible defaults

const nextConfig = {
  experimental: {
    webpackBuildWorker: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
        ],
      },
    ];
  },
};

// ✅ Wrap with PWA and add runtimeCaching
export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // disabled in dev
  register: true,
  skipWaiting: true,
  runtimeCaching, // ✅ ensures offline caching of pages/assets/APIs
  buildExcludes: [/middleware-manifest\.json$/],
})(nextConfig);
