import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// const outDir = "Y:/Reports/DataPage2";

const base = "/static";

const outDir = base.substring(1);

// https://vitejs.dev/config/
export default defineConfig({
  experimental: {
    renderBuiltUrl: (filename) =>
      `.${base}${filename[0] === "/" ? "" : "/"}${filename}`,
  },
  build: { emptyOutDir: true, outDir },
  plugins: [react()],
  base,
});
