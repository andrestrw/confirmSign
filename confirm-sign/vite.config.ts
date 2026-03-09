import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      "/v4.0": {
        target: "https://api-sandbox.confirmsign.com",
        changeOrigin: true,
        secure: false,
      },
      "/veremail": {
        target: "https://sandbox.confirmsign.com",
        changeOrigin: true,
        secure: false,
        followRedirects: true,
      },
    },
  },
});
