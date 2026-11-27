import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "ui",
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  preview: {
    port: 8080,
  },
});
