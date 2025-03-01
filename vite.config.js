import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/naver-image": {
        target: "https://openapi.naver.com/v1/search/image",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/naver-image/, ""),
        headers: {
          "X-Naver-Client-Id": "hUR6rTR_Vk5ehdWpSLPQ",
          "X-Naver-Client-Secret": "cUjSvvglPq"
        }
      }
    }
  }
});
