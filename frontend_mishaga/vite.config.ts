import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
  resolve: {
    alias: {
      app: "/src/app",
      widgets: "/src/widgets",
      assets: "/src/assets",
      entities: "/src/entities",
      features: "/src/features",
      pages: "/src/pages",
      shared: "/src/shared",
    }
  }
})
