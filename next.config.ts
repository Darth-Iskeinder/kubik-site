import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Скрыть служебный значок «N» в углу при разработке (ошибки Next.js всё равно покажет)
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
