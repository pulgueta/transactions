import { resolve } from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import biome from "vite-plugin-biome";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API = env.VITE_API_URL ?? "http://localhost:3000";

  return {
    plugins: [
      biome({
        applyFixes: true,
        mode: "check",
        files: ".",
        logKind: "pretty",
      }),
      react(),
    ],
    server: {
      proxy: {
        "/api": {
          target: API,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  };
});
