import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Dev, build and preview share the GitHub Pages project base.
export default defineConfig({
  base: "/ai-artwork/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
  server: { host: "0.0.0.0", port: 4174, strictPort: true, allowedHosts: true, fs: { allow: [".."] } },
  preview: { host: "0.0.0.0", port: 4174, strictPort: true },
})
