import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import oxlint from "vite-plugin-oxlint";

export default defineConfig({
	plugins: [
		react(),
		oxlint({
			configFile: "eslint.config.js",
			path: "src",
			params: "--fix --max-warnings 0",
		}),
	],
});
