import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1405",
        pathname: "/uploads/**",
      },
    ],
  },
};

const config = withNextIntl(nextConfig);

// Fix next-intl turbopack configuration for Next.js 15+
if ((config.experimental as any)?.turbo) {
  config.turbopack = (config.experimental as any).turbo;
  delete (config.experimental as any).turbo;
  if (Object.keys((config.experimental as any)).length === 0) {
    delete (config as any).experimental;
  }
}

export default config;
