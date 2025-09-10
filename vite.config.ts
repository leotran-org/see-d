// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",               // or "0.0.0.0"
    port: 8080,
    proxy: {
      "/cms-api": {
        target: "https://admin.theleotran.com",
        changeOrigin: true,
        secure: true, // set to false only if the upstream uses a self-signed cert
        rewrite: (p) => p.replace(/^\/cms-api/, ""),
        // If the backend sets cookies (auth), uncomment one or both of these:
        // cookieDomainRewrite: "localhost",
        // cookiePathRewrite: { "/": "/" },
        // If you need custom headers:
        // headers: { "X-Forwarded-Host": "localhost:8080" }
      }
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));

