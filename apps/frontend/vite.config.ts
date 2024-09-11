import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import biome from "vite-plugin-biome";

export default defineConfig({
  plugins: [
    biome({
      applyFixes: true,
      mode: "check",
      files: ".",
      logKind: "pretty",
    }),
    react(),
  ],
});
