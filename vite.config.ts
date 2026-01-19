import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && command === "serve" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Fix ketcher-react babel runtime issue
      "@babel/runtime/regenerator": "regenerator-runtime",
      // Fix assert module for ketcher-react
      "assert": "assert",
    },
  },
  define: {
    'process.env': {},
    'process.version': JSON.stringify(''),
    'process.browser': true,
    'global': 'globalThis',
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // Disable sourcemaps to reduce memory usage significantly
    sourcemap: false,
    // Enable minification but use esbuild which is faster and uses less memory
    minify: 'esbuild',
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 5000,
    // Target modern browsers only
    target: 'esnext',
    // CommonJS options
    commonjsOptions: {
      transformMixedEsModules: true,
      // Fix lodash default export issue – treat lodash as having a default export
      defaultIsModuleExports: (id: string) => id.includes('lodash'),
    },
    rollupOptions: {
      // Limit parallel operations to reduce memory pressure
      maxParallelFileOps: 1,
      output: {
        // Let Vite/Rollup handle chunking automatically - manual chunking was causing React loading issues
        // manualChunks is disabled to fix "Cannot read properties of undefined (reading 'forwardRef')" error
      },
    },
  },
  optimizeDeps: {
    // Include lodash and ketcher for pre-bundling so they are converted to ESM correctly
    include: ['lodash', 'lodash-es', 'ketcher-react', 'ketcher-core', 'regenerator-runtime', 'assert', 'eventemitter3', 'events'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  // Increase memory for esbuild
  esbuild: {
    // Use faster settings
    logLevel: 'warning',
    treeShaking: true,
  },
}));
