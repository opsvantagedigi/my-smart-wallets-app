/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // Force use of Webpack instead of Turbopack
  },
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.alchemyapi.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
