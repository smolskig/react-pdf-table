import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/index.ts"),
      name:"react-pdf-table",
      fileName: (format) => `react-pdf-table.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    }
  },
  plugins: [react(),  dts({
    insertTypesEntry: true,
}),],
});
