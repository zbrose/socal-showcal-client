import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // you can change this if needed
    proxy: {
      "/api": {
        target: "http://localhost:8000", // matches your old CRA proxy
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": "/src", // allows imports like import x from "@/components/x"
    },
  },
});
