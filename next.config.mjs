/** @type {import('next').NextConfig} */
let nextConfig = {
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
    config.externals.push('pino-pretty', 'encoding');
    return config;
  },
};

// If Sentry is installed, wrap config to enable Sentry's webpack plugin
try {
  const { withSentryConfig } = await import("@sentry/nextjs");
  const sentryWebpackPluginOptions = {
    silent: true,
  };
  nextConfig = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
} catch (e) {
  // Sentry not installed or optional - fall back to plain config
}

export default nextConfig;
