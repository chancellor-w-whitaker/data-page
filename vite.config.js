import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({ lintOnStart: true, emitWarning: true, emitError: true }),
  ],
  build: {
    outDir: "Y:/Reports/DataPage",
    emptyOutDir: true,
  },
  base: "./",
});
