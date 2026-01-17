import { j as jsxRuntimeExports, dH as Shield, ax as FileText, dI as Building } from './vendor-react-BeQHm2Hb.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription } from './card-BTaNjRSt.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
import './vendor-react-dom-b1tP6waW.js';
import './vendor-misc-CQ2gQV2M.js';
import './vendor-utils-B8uxCDj6.js';
import './vendor-export-COR0N_gy.js';
import './vendor-blocknote-BAmltmDn.js';
import './vendor-prosemirror-l_ukq4jw.js';
import './vendor-yjs-BarRwqAh.js';
import './vendor-tiptap-tuOT8GNt.js';
import './vendor-mantine-CpjnkULY.js';
import './vendor-radix-BjF_gpzx.js';
import './vendor-i18n-BRT6rIp6.js';
import './vendor-datefns-Cgc6WLhj.js';
import './vendor-syncfusion-B9hbBizT.js';
import './vendor-ketcher-B9jnF8te.js';
import './index-C9tyh6tO.js';
import './vendor-supabase-B1aOSilF.js';

function Legal() {
  const navigate = useNavigate();
  const sections = [
    {
      title: "Privacy Policy",
      description: "How we handle your data",
      icon: Shield,
      path: "/homepage/legal/privacy"
    },
    {
      title: "Terms of Service",
      description: "Terms and conditions of use",
      icon: FileText,
      path: "/homepage/legal/terms"
    },
    {
      title: "Imprint",
      description: "Legal information and contact",
      icon: Building,
      path: "/homepage/legal/imprint"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-background to-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/homepage" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent", children: "Legal Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Our policies and legal information" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: sections.map((section) => {
      const Icon = section.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "cursor-pointer hover:shadow-lg transition-all hover:scale-105",
          onClick: () => navigate(section.path),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: section.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "mt-2", children: section.description })
            ] })
          ] }) })
        },
        section.path
      );
    }) })
  ] }) }) });
}

export { Legal as default };
