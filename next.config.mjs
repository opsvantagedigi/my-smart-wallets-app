/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.alchemyapi.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    // Prefer disabling Turbopack entirely for production builds
    turbo: false,
    // If enabling turbo later, ensure problematic packages are externalized
    // turbo: {
    //   rules: {
    //     "*.js": {
    //       externalPackages: [
    //         "@walletconnect/*",
    //         "pino",
    //         "thread-stream",
    //       ],
    //     },
    //   },
    // },
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
    // Ensure node-only logging/test packages are not bundled into client
    config.externals.push('pino-pretty', 'encoding', 'pino', 'thread-stream');
    return config;
  },
};

export default nextConfig;
