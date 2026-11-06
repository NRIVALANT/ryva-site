import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
