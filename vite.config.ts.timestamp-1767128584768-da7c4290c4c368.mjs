// vite.config.ts
import { defineConfig } from "file:///Users/tjarkschool/Desktop/for%20drafts/ibdp-guide/node_modules/vite/dist/node/index.js";
import react from "file:///Users/tjarkschool/Desktop/for%20drafts/ibdp-guide/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///Users/tjarkschool/Desktop/for%20drafts/ibdp-guide/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "/Users/tjarkschool/Desktop/for drafts/ibdp-guide";
var vite_config_default = defineConfig(({ command, mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080
  },
  plugins: [react(), mode === "development" && command === "serve" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  define: {
    "process.env": {},
    "process.version": JSON.stringify(""),
    "process.browser": true,
    "global": "globalThis"
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: false,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom")) return "vendor-react-dom";
            if (id.includes("react-router")) return "vendor-react-router";
            if (id.includes("react")) return "vendor-react";
            if (id.includes("@radix-ui")) return "vendor-radix";
            if (id.includes("@blocknote")) return "vendor-blocknote";
            if (id.includes("@supabase")) return "vendor-supabase";
            if (id.includes("@tiptap")) return "vendor-tiptap";
            if (id.includes("@mantine")) return "vendor-mantine";
            if (id.includes("prosemirror")) return "vendor-prosemirror";
            if (id.includes("yjs") || id.includes("y-protocols")) return "vendor-yjs";
            if (id.includes("date-fns")) return "vendor-datefns";
            if (id.includes("recharts")) return "vendor-recharts";
            if (id.includes("lucide")) return "vendor-lucide";
            if (id.includes("i18next")) return "vendor-i18n";
            if (id.includes("katex")) return "vendor-katex";
            if (id.includes("html2pdf") || id.includes("html2canvas") || id.includes("jspdf") || id.includes("docx") || id.includes("mammoth") || id.includes("jszip")) {
              return "vendor-export";
            }
            if (id.includes("ketcher")) return "vendor-ketcher";
            if (id.includes("zod") || id.includes("clsx") || id.includes("tailwind-merge")) {
              return "vendor-utils";
            }
            if (id.includes("@syncfusion")) return "vendor-syncfusion";
            if (id.includes("fuse.js")) return "vendor-fuse";
            return "vendor-misc";
          }
          if (id.includes("/src/data/")) {
            if (id.includes("extractedFullQuestionsWithMarkScheme")) return "data-full-questions";
            if (id.includes("extractedUnifiedExams")) return "data-unified-exams";
            if (id.includes("unifiedExamData")) return "data-unified-exam-data";
            if (id.includes("extractedPaperQuestions")) return "data-paper-questions";
            if (id.includes("extractedLongAnswerQuestions")) return "data-long-answer";
            if (id.includes("biologyQuestions_extracted")) return "data-biology";
            if (id.includes("chemistryQuestions_extracted")) return "data-chemistry";
            if (id.includes("physicsQuestions_extracted")) return "data-physics";
            if (id.includes("iaGuidanceData")) return "data-ia-guidance";
            if (id.includes("iaEssayStructureData")) return "data-ia-essay";
            if (id.includes("iaStructureData")) return "data-ia-structure";
            if (id.includes("additionalIAGuidanceData")) return "data-ia-additional";
            if (id.includes("iaCriteriaData")) return "data-ia-criteria";
            if (id.includes("ee_tok_data")) return "data-ee-tok";
            if (id.includes("ibSubjectData")) return "data-ib-subjects";
            if (id.includes("outlineTemplates")) return "data-outline-templates";
            if (id.includes("/past-papers/")) return "data-past-papers";
            return "data-misc";
          }
        }
      }
    },
    chunkSizeWarningLimit: 4e3,
    target: "esnext"
  },
  optimizeDeps: {
    exclude: ["ketcher-react", "ketcher-core"],
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGphcmtzY2hvb2wvRGVza3RvcC9mb3IgZHJhZnRzL2liZHAtZ3VpZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy90amFya3NjaG9vbC9EZXNrdG9wL2ZvciBkcmFmdHMvaWJkcC1ndWlkZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGphcmtzY2hvb2wvRGVza3RvcC9mb3IlMjBkcmFmdHMvaWJkcC1ndWlkZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGNvbXBvbmVudFRhZ2dlciB9IGZyb20gXCJsb3ZhYmxlLXRhZ2dlclwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4gKHtcbiAgYmFzZTogXCIvXCIsXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKSwgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiICYmIGNvbW1hbmQgPT09IFwic2VydmVcIiAmJiBjb21wb25lbnRUYWdnZXIoKV0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgICdwcm9jZXNzLmVudic6IHt9LFxuICAgICdwcm9jZXNzLnZlcnNpb24nOiBKU09OLnN0cmluZ2lmeSgnJyksXG4gICAgJ3Byb2Nlc3MuYnJvd3Nlcic6IHRydWUsXG4gICAgJ2dsb2JhbCc6ICdnbG9iYWxUaGlzJyxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiZGlzdFwiLFxuICAgIGFzc2V0c0RpcjogXCJhc3NldHNcIixcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgIG1pbmlmeTogZmFsc2UsXG4gICAgY29tbW9uanNPcHRpb25zOiB7XG4gICAgICB0cmFuc2Zvcm1NaXhlZEVzTW9kdWxlczogdHJ1ZSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xuICAgICAgICAgIC8vIFZlbmRvciBzcGxpdHRpbmdcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInJlYWN0LWRvbVwiKSkgcmV0dXJuIFwidmVuZG9yLXJlYWN0LWRvbVwiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicmVhY3Qtcm91dGVyXCIpKSByZXR1cm4gXCJ2ZW5kb3ItcmVhY3Qtcm91dGVyXCI7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJyZWFjdFwiKSkgcmV0dXJuIFwidmVuZG9yLXJlYWN0XCI7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJAcmFkaXgtdWlcIikpIHJldHVybiBcInZlbmRvci1yYWRpeFwiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQGJsb2Nrbm90ZVwiKSkgcmV0dXJuIFwidmVuZG9yLWJsb2Nrbm90ZVwiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQHN1cGFiYXNlXCIpKSByZXR1cm4gXCJ2ZW5kb3Itc3VwYWJhc2VcIjtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkB0aXB0YXBcIikpIHJldHVybiBcInZlbmRvci10aXB0YXBcIjtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkBtYW50aW5lXCIpKSByZXR1cm4gXCJ2ZW5kb3ItbWFudGluZVwiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicHJvc2VtaXJyb3JcIikpIHJldHVybiBcInZlbmRvci1wcm9zZW1pcnJvclwiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwieWpzXCIpIHx8IGlkLmluY2x1ZGVzKFwieS1wcm90b2NvbHNcIikpIHJldHVybiBcInZlbmRvci15anNcIjtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImRhdGUtZm5zXCIpKSByZXR1cm4gXCJ2ZW5kb3ItZGF0ZWZuc1wiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicmVjaGFydHNcIikpIHJldHVybiBcInZlbmRvci1yZWNoYXJ0c1wiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibHVjaWRlXCIpKSByZXR1cm4gXCJ2ZW5kb3ItbHVjaWRlXCI7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJpMThuZXh0XCIpKSByZXR1cm4gXCJ2ZW5kb3ItaTE4blwiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwia2F0ZXhcIikpIHJldHVybiBcInZlbmRvci1rYXRleFwiO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhcImh0bWwycGRmXCIpIHx8XG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwiaHRtbDJjYW52YXNcIikgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCJqc3BkZlwiKSB8fFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhcImRvY3hcIikgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCJtYW1tb3RoXCIpIHx8XG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwianN6aXBcIilcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3ItZXhwb3J0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJrZXRjaGVyXCIpKSByZXR1cm4gXCJ2ZW5kb3Ita2V0Y2hlclwiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiem9kXCIpIHx8IGlkLmluY2x1ZGVzKFwiY2xzeFwiKSB8fCBpZC5pbmNsdWRlcyhcInRhaWx3aW5kLW1lcmdlXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcInZlbmRvci11dGlsc1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQHN5bmNmdXNpb25cIikpIHJldHVybiBcInZlbmRvci1zeW5jZnVzaW9uXCI7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJmdXNlLmpzXCIpKSByZXR1cm4gXCJ2ZW5kb3ItZnVzZVwiO1xuICAgICAgICAgICAgcmV0dXJuIFwidmVuZG9yLW1pc2NcIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBMYXJnZSBkYXRhc2V0cyAtIHNwbGl0IGluZGl2aWR1YWxseSB0byBwcmV2ZW50IE9PTVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIi9zcmMvZGF0YS9cIikpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImV4dHJhY3RlZEZ1bGxRdWVzdGlvbnNXaXRoTWFya1NjaGVtZVwiKSkgcmV0dXJuIFwiZGF0YS1mdWxsLXF1ZXN0aW9uc1wiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiZXh0cmFjdGVkVW5pZmllZEV4YW1zXCIpKSByZXR1cm4gXCJkYXRhLXVuaWZpZWQtZXhhbXNcIjtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInVuaWZpZWRFeGFtRGF0YVwiKSkgcmV0dXJuIFwiZGF0YS11bmlmaWVkLWV4YW0tZGF0YVwiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiZXh0cmFjdGVkUGFwZXJRdWVzdGlvbnNcIikpIHJldHVybiBcImRhdGEtcGFwZXItcXVlc3Rpb25zXCI7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJleHRyYWN0ZWRMb25nQW5zd2VyUXVlc3Rpb25zXCIpKSByZXR1cm4gXCJkYXRhLWxvbmctYW5zd2VyXCI7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJiaW9sb2d5UXVlc3Rpb25zX2V4dHJhY3RlZFwiKSkgcmV0dXJuIFwiZGF0YS1iaW9sb2d5XCI7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJjaGVtaXN0cnlRdWVzdGlvbnNfZXh0cmFjdGVkXCIpKSByZXR1cm4gXCJkYXRhLWNoZW1pc3RyeVwiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicGh5c2ljc1F1ZXN0aW9uc19leHRyYWN0ZWRcIikpIHJldHVybiBcImRhdGEtcGh5c2ljc1wiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiaWFHdWlkYW5jZURhdGFcIikpIHJldHVybiBcImRhdGEtaWEtZ3VpZGFuY2VcIjtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImlhRXNzYXlTdHJ1Y3R1cmVEYXRhXCIpKSByZXR1cm4gXCJkYXRhLWlhLWVzc2F5XCI7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJpYVN0cnVjdHVyZURhdGFcIikpIHJldHVybiBcImRhdGEtaWEtc3RydWN0dXJlXCI7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJhZGRpdGlvbmFsSUFHdWlkYW5jZURhdGFcIikpIHJldHVybiBcImRhdGEtaWEtYWRkaXRpb25hbFwiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiaWFDcml0ZXJpYURhdGFcIikpIHJldHVybiBcImRhdGEtaWEtY3JpdGVyaWFcIjtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImVlX3Rva19kYXRhXCIpKSByZXR1cm4gXCJkYXRhLWVlLXRva1wiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiaWJTdWJqZWN0RGF0YVwiKSkgcmV0dXJuIFwiZGF0YS1pYi1zdWJqZWN0c1wiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwib3V0bGluZVRlbXBsYXRlc1wiKSkgcmV0dXJuIFwiZGF0YS1vdXRsaW5lLXRlbXBsYXRlc1wiO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiL3Bhc3QtcGFwZXJzL1wiKSkgcmV0dXJuIFwiZGF0YS1wYXN0LXBhcGVyc1wiO1xuICAgICAgICAgICAgLy8gQ2F0Y2gtYWxsIGZvciBvdGhlciBkYXRhIGZpbGVzXG4gICAgICAgICAgICByZXR1cm4gXCJkYXRhLW1pc2NcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA0MDAwLFxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsna2V0Y2hlci1yZWFjdCcsICdrZXRjaGVyLWNvcmUnXSxcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgZGVmaW5lOiB7XG4gICAgICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvVSxTQUFTLG9CQUFvQjtBQUNqVyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBSGhDLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE9BQU87QUFBQSxFQUNsRCxNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixN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
