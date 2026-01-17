import { j as jsxRuntimeExports, ai as Users, cQ as Target, d1 as Mail, cv as TrendingUp } from './vendor-react-BeQHm2Hb.js';
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

function Us() {
  const navigate = useNavigate();
  const sections = [
    {
      title: "About",
      description: "Learn about our mission and vision",
      icon: Users,
      path: "/homepage/us/about"
    },
    {
      title: "Plan",
      description: "Our roadmap and future plans",
      icon: Target,
      path: "/homepage/us/plan"
    },
    {
      title: "Contact",
      description: "Get in touch with us",
      icon: Mail,
      path: "/homepage/us/contact"
    },
    {
      title: "Improvements",
      description: "Suggest features and improvements",
      icon: TrendingUp,
      path: "/homepage/us/improvements"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-background to-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, { fallbackPath: "/homepage" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent", children: "About Us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Learn more about TooEssay and how we can help you" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-6", children: sections.map((section) => {
      const Icon = section.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "cursor-pointer hover:shadow-lg transition-all hover:scale-105",
          onClick: () => navigate(section.path),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: section.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: section.description })
            ] })
          ] }) })
        },
        section.path
      );
    }) })
  ] }) }) });
}

export { Us as default };
