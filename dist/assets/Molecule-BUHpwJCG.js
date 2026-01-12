import { r as reactExports, j as jsxRuntimeExports, cb as Download, cc as Editor } from './vendor-react-BeQHm2Hb.js';
import { o as useToast, B as Button } from './index-C9tyh6tO.js';
import { C as Card } from './card-BTaNjRSt.js';
import { h as html2canvas } from './vendor-export-COR0N_gy.js';
import { u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
import './vendor-react-dom-b1tP6waW.js';
import './vendor-misc-CQ2gQV2M.js';
import './vendor-utils-B8uxCDj6.js';
import './vendor-radix-BjF_gpzx.js';
import './vendor-i18n-BRT6rIp6.js';
import './vendor-blocknote-BAmltmDn.js';
import './vendor-prosemirror-l_ukq4jw.js';
import './vendor-yjs-BarRwqAh.js';
import './vendor-tiptap-tuOT8GNt.js';
import './vendor-mantine-CpjnkULY.js';
import './vendor-datefns-Cgc6WLhj.js';
import './vendor-syncfusion-B9hbBizT.js';
import './vendor-ketcher-B9jnF8te.js';
import './vendor-supabase-B1aOSilF.js';

function Molecule() {
  useNavigate();
  const { toast } = useToast();
  const [ketcherInstance, setKetcherInstance] = reactExports.useState(null);
  const handleKetcherInit = (ketcher) => {
    setKetcherInstance(ketcher);
  };
  const handleExport = async () => {
    try {
      const ketcherCanvas = document.querySelector(".ketcher-root svg") || document.querySelector('[class*="canvas"]') || document.querySelector(".ketcher-root");
      if (!ketcherCanvas) {
        toast({ title: "Could not find molecule canvas", variant: "destructive" });
        return;
      }
      const canvas = await html2canvas(ketcherCanvas, {
        backgroundColor: "#ffffff",
        scale: 2
        // Higher resolution
      });
      const link = document.createElement("a");
      link.download = `molecule-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast({ title: "Molecule exported as PNG" });
    } catch (error) {
      console.error("Export failed:", error);
      toast({ title: "Export failed", variant: "destructive" });
    }
  };
  const handleInsertToEditor = async () => {
    try {
      const ketcherCanvas = document.querySelector(".ketcher-root svg") || document.querySelector('[class*="canvas"]') || document.querySelector(".ketcher-root");
      if (!ketcherCanvas) {
        toast({ title: "Could not find molecule canvas", variant: "destructive" });
        return;
      }
      const canvas = await html2canvas(ketcherCanvas, {
        backgroundColor: "#ffffff",
        scale: 2
      });
      const imageData = canvas.toDataURL("image/png");
      window.parent.postMessage(
        {
          type: "molecule-insert",
          imageData
        },
        "*"
      );
      toast({ title: "Molecule sent to editor" });
    } catch (error) {
      console.error("Insert failed:", error);
      toast({ title: "Insert failed", variant: "destructive" });
    }
  };
  const handleClear = async () => {
    if (!ketcherInstance) return;
    try {
      await ketcherInstance.editor.clear();
      toast({ title: "Canvas cleared" });
    } catch (error) {
      console.error("Clear failed:", error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-6 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Molecule Editor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Professional 2D chemical structure drawing" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: handleClear, children: "Clear" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleExport, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 mr-2" }),
          "Export PNG"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", size: "sm", onClick: handleInsertToEditor, children: "Insert to Editor" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "calc(100vh - 200px)", minHeight: "600px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Editor,
      {
        staticResourcesUrl: "",
        structServiceProvider: {
          mode: "standalone",
          createStructService: () => {
            return {
              info: async () => ({
                version: "1.0",
                indigoVersion: "1.0",
                imagoVersions: {},
                isAvailable: true
              }),
              convert: async () => ({ data: "" }),
              layout: async () => ({ data: "" }),
              clean: async () => ({ data: "" }),
              aromatize: async () => ({ data: "" }),
              dearomatize: async () => ({ data: "" }),
              calculateCip: async () => ({ data: "" }),
              automap: async () => ({ data: "" }),
              check: async () => ({ data: null }),
              calculate: async () => ({ data: "" }),
              recognize: async () => ({ data: "" }),
              generateImageAsBase64: async () => ({ data: "" }),
              getInChIKey: async () => ({ data: "" }),
              toggleExplicitHydrogens: async () => ({ data: "" }),
              calculateMacromoleculeProperties: async () => ({ data: "" }),
              addKetcherId: (struct) => struct
            };
          }
        },
        errorHandler: (error) => {
          console.error("Ketcher error:", error);
        },
        onInit: handleKetcherInit
      }
    ) }) })
  ] }) });
}

export { Molecule as default };
