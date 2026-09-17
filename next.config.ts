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
      { source: '/strumenti', destination: '/', permanent: true },
      { source: '/chi-siamo', destination: '/segnala', permanent: true },
      { source: '/chi-siamo/:path*', destination: '/segnala', permanent: true },
      { source: '/news', destination: '/', permanent: true },
      { source: '/percorsi', destination: '/', permanent: true },
      { source: '/percorsi/:path*', destination: '/', permanent: true },
      { source: '/risorse', destination: '/', permanent: true },
      { source: '/risorse/:path*', destination: '/', permanent: true },
      { source: '/glossario', destination: '/', permanent: true },
      { source: '/mappa-digitale', destination: '/', permanent: true },
      { source: '/stack-etico', destination: '/', permanent: true },
      { source: '/process-designer', destination: '/', permanent: true },
      { source: '/metodologia', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
