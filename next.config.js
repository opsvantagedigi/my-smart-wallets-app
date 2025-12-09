/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'opsvantagedigital.online',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_APP_URL: 'https://marz.opsvantagedigital.online',
  },
};

module.exports = nextConfig;
