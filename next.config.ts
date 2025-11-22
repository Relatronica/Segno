import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Ottimizzazioni per produzione
  compress: true,
  poweredByHeader: false,
  // Headers di sicurezza
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
};

export default nextConfig;
