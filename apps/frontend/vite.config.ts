/// <reference types="vitest" />
import { resolve } from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    exclude: [
      "node_modules",
      "postcss.config.js",
      "tailwind.config.js",
      "src/components/ui/**",
      "dist",
      "vite.config.ts",
      "eslint.config.js",
      "src/schemas",
      "src/types",
      "src/vite-env.d.ts",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      cleanOnRerun: true,
      exclude: [
        "node_modules",
        "postcss.config.js",
        "tailwind.config.js",
        "src/components/ui/**",
        "dist",
        "vite.config.ts",
        "eslint.config.js",
        "src/schemas",
        "src/types",
        "src/vite-env.d.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
