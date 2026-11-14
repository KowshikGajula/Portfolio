import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2020",
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // three.js is only pulled in by a dynamic import inside VantaNet, so it
        // stays out of the entry graph on purpose — do not list it here.
        manualChunks: {
          motion: ["framer-motion"],
          gsap: ["gsap"],
          lenis: ["lenis"],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
