import { defineConfig } from "next";

export default defineConfig({
  experimental: {
    // Prefer Webpack for production builds to avoid Turbopack bundling test files
    turbo: false,
  },
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
  },
  webpack: (config, { isServer }) => {
    // Alias problematic WalletConnect/logging packages to an empty stub
    config.resolve.alias = {
      ...config.resolve.alias,
      '@walletconnect/universal-provider': require('path').resolve(__dirname, 'lib/stubs/empty.js'),
      '@walletconnect/ethereum-provider': require('path').resolve(__dirname, 'lib/stubs/empty.js'),
      '@walletconnect/logger': require('path').resolve(__dirname, 'lib/stubs/empty.js'),
      'pino': require('path').resolve(__dirname, 'lib/stubs/empty.js'),
      'thread-stream': require('path').resolve(__dirname, 'lib/stubs/empty.js'),
    };
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    // Ensure node-only logging/test packages are not bundled into client builds
    config.externals.push("pino-pretty", "encoding", "pino", "thread-stream");
    return config;
  },
});
