/// <reference types="vitest" />
import { resolve } from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API = env.VITE_API_URL ?? "http://localhost:3000";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: API,
          changeOrigin: true,
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      exclude: [
        "node_modules/**",
        "dist/**",
        "**/*.d.ts",
        "eslint.config.js",
        "postcss.config.js",
        "tailwind.config.js",
        "vite.config.ts",
        "vitest.config.ts",
        "src/components/ui/**",
      ],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        cleanOnRerun: true,
        exclude: [
          "node_modules/**",
          "dist/**",
          "**/*.d.ts",
          "eslint.config.js",
          "postcss.config.js",
          "tailwind.config.js",
          "vite.config.ts",
          "vitest.config.ts",
          "src/components/ui/**",
        ],
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  };
});
