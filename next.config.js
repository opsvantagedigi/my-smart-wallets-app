/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
