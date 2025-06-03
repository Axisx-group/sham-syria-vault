
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-mobile',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index-mobile.html')
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env.MOBILE_BUILD': 'true'
  }
});
