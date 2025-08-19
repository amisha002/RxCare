import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const baseConfig = {
  output: "export",
  trailingSlash: true,
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
  async rewrites() {
    return [];
  },
};

const withPWAWrapped = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: undefined,
  buildExcludes: [/middleware-manifest\.json$/],
  publicExcludes: [],
  cacheOnFrontEndNav: true,
  fallbacks: {},
});

export default withPWAWrapped({
  ...baseConfig,
});
