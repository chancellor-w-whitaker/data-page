import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: { outDir: "Y:/Reports/DataPage2", emptyOutDir: true },
  plugins: [react()],
  base: "",
});
