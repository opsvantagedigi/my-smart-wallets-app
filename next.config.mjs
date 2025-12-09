/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [{ source: '/', destination: '/landing', permanent: true }];
  },
  env: {
    NEXT_PUBLIC_APP_URL: 'https://marz.opsvantagedigital.online',
  },
};

export default nextConfig;
