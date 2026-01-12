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
        // Simplified manual chunks - only split the most important vendors
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // Core React
            if (id.includes("react-dom")) return "vendor-react";
            if (id.includes("react-router")) return "vendor-react";
            if (id.includes("react/")) return "vendor-react";
            
            // Syncfusion is very large
            if (id.includes("@syncfusion")) return "vendor-syncfusion";
            
            // Editor libraries
            if (id.includes("@blocknote") || id.includes("@tiptap") || id.includes("prosemirror")) return "vendor-editor";
            
            // All other vendors in one chunk
            return "vendor";
          }
          
          // Split large data files into their own chunks
          if (id.includes("/src/data/extractedFullQuestionsWithMarkScheme")) return "data-full-questions";
          if (id.includes("/src/data/extractedPaperQuestions")) return "data-paper-questions";
          if (id.includes("/src/data/extractedUnifiedExams")) return "data-exams";
          if (id.includes("/src/data/unifiedExamData")) return "data-exams";
          if (id.includes("/src/data/past-papers/")) return "data-past-papers";
          if (id.includes("/src/data/")) return "data";
        },
      },
    },
  },
  optimizeDeps: {
    // Include lodash for pre-bundling so it is converted to ESM correctly
    include: ['lodash', 'lodash-es'],
    exclude: ['ketcher-react', 'ketcher-core'],
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
