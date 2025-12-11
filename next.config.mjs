import { defineConfig } from 'next'

export default defineConfig({
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
    // Disable Turbopack to prevent bundling node_modules tests/README
    turbo: false,
    // If enabling turbo later, uncomment to externalize problematic packages
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
})
