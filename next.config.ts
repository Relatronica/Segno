import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/trasparenza', destination: '/timeline', permanent: true },
      { source: '/trasparenza/:path*', destination: '/timeline/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
