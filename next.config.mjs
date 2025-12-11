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
    turbo: {
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
      // Explicitly set root to avoid workspace root inference warnings due to multiple lockfiles
      root: process.cwd(),
      rules: {
        "*.js": {
          externalPackages: [
            "@walletconnect/*",
            "pino",
            "thread-stream"
          ],
        },
      },
    },
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
    config.externals.push('pino-pretty', 'encoding', 'pino', 'thread-stream');
    return config;
  },
};

export default nextConfig;
