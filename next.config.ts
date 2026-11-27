import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CLAUDE.md, règle 8 : AVIF d'abord, WebP en repli (Next ne sert que WebP par défaut).
  images: { formats: ["image/avif", "image/webp"] },
  // Tailwind 4 est traité par le loader Turbopack : le projet n'a pas de
  // @tailwindcss/postcss. Sans cette règle, les @import de globals.css échouent.
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
