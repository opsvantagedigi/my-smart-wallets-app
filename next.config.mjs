import { defineConfig } from "next";

export default defineConfig({
  experimental: {
    turbo: {
      rules: {
        "*.js": {
          externalPackages: [
            "@walletconnect/*",
            "pino",
            "thread-stream",
          ],
        },
      },
    },
  },
});
