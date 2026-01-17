import { j as jsxRuntimeExports } from './vendor-react-BeQHm2Hb.js';
import { B as Button } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from './card-BTaNjRSt.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-CP2-oe9M.js';
import { u as useNavigate } from './vendor-react-router-D-UwvF_4.js';

function GradeBoundaryTemplate({
  title,
  subtitle,
  headers,
  slData,
  hlData,
  slOnly,
  slComponents,
  hlComponents,
  tips,
  relatedSubjects,
  ctaText = "Need help with your coursework?"
}) {
  const navigate = useNavigate();
  const renderTable = (data, level, components) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "bg-muted/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg", children: [
        level,
        " Grade Boundaries"
      ] }),
      components && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: components })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: headers.map((header, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: i === 0 ? "w-16" : "", children: header }, i)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: data.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: headers.map((header, i) => {
        header.toLowerCase().replace(/[^a-z0-9]/g, "");
        const value = i === 0 ? row.grade : row[Object.keys(row)[i]];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            className: i === 0 || i === headers.length - 1 ? "font-bold" : "",
            children: value
          },
          i
        );
      }) }, row.grade)) })
    ] }) }) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sr-only", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
      title,
      " - Complete Guide for SL and HL"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-6 py-16 space-y-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BackButton,
          {
            fallbackPath: "/homepage/grade-boundaries",
            size: "icon",
            tooltip: "Back to Grade Boundaries"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: subtitle })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-medium border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Understanding the Grade Boundaries" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The grade boundaries below show the approximate marks needed for each grade (1-7). These boundaries are based on recent IB examination sessions and serve as a planning guide." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Remember that boundaries can vary slightly between examination sessions depending on overall difficulty and student performance." })
        ] })
      ] }) }) }),
      slOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Grade Boundaries" }),
        renderTable(slOnly, "Standard Level", slComponents)
      ] }),
      slData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Standard Level (SL) Grade Boundaries" }),
        renderTable(slData, "SL", slComponents)
      ] }),
      hlData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Higher Level (HL) Grade Boundaries" }),
        renderTable(hlData, "HL", hlComponents)
      ] }),
      tips && tips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Study Tips" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: tips.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: tip.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-muted-foreground text-sm", children: tip.content })
        ] }, i)) })
      ] }),
      relatedSubjects && relatedSubjects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Related Grade Boundaries" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          relatedSubjects.map((subject, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => navigate(subject.path),
              children: subject.name
            },
            i
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => navigate("/homepage/grade-boundaries"),
              children: "All Subjects"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: ctaText }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Use our AI-powered writing tools to improve your essays and IAs." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", onClick: () => navigate("/work"), children: "Start Writing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", onClick: () => navigate("/homepage/grade-boundaries"), children: "View All Subjects" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "secondary", onClick: () => navigate("/homepage/ia-guides"), children: "IA Writing Guides" }),
          window.location.pathname.includes("/homepage/grade-boundaries/") && !window.location.pathname.includes("/criteria") && window.location.pathname !== "/homepage/grade-boundaries/" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              variant: "secondary",
              onClick: () => {
                const subject = window.location.pathname.replace("/homepage/grade-boundaries/", "");
                navigate(`/homepage/grade-boundaries/${subject}/criteria`);
              },
              children: "View Assessment Criteria"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Grade boundaries are based on recent IB examination sessions and may vary. This content is not endorsed by the International Baccalaureate Organization. IB is a registered trademark of the IBO." })
    ] })
  ] });
}

export { GradeBoundaryTemplate as G };
