import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sahifalar build vaqtida tayyorlanadi (har bir sahifa statik HTML).
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    // Mos kelmagan har qanday manzil uchun src/app/global-not-found.tsx ishlaydi.
    globalNotFound: true,
  },
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
