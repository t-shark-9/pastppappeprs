import { j as jsxRuntimeExports, dD as Helmet } from './vendor-react-BeQHm2Hb.js';

function ArticleWrapper({
  title,
  description,
  author = "TooEssay Team",
  datePublished,
  dateModified,
  category = "Education",
  keywords = [],
  imageUrl = "https://lovable.dev/opengraph-image-p98pqg.png",
  children
}) {
  const canonicalUrl = typeof window !== "undefined" ? window.location.href : "";
  const siteName = "TooEssay - IBDP Guide";
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://tooessay.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": imageUrl
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "image": imageUrl,
    "articleSection": category,
    "keywords": keywords.join(", "),
    "inLanguage": "en-US"
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tooessay.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://tooessay.com/homepage/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": canonicalUrl
      }
    ]
  };
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": siteName,
    "description": "AI-powered essay writing platform for IB Diploma Programme students",
    "url": "https://tooessay.com",
    "logo": imageUrl,
    "sameAs": []
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
        title,
        " | ",
        siteName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "keywords", content: keywords.join(", ") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "author", content: author }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: canonicalUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "article" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: canonicalUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: imageUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:site_name", content: siteName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "article:published_time", content: datePublished }),
      dateModified && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "article:modified_time", content: dateModified }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "article:author", content: author }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "article:section", content: category }),
      keywords.map((keyword, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "article:tag", content: keyword }, index)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:url", content: canonicalUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:image", content: imageUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", children: JSON.stringify(articleStructuredData) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbStructuredData) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", children: JSON.stringify(organizationData) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-4xl mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg dark:prose-invert max-w-none", children }) }) })
  ] });
}

export { ArticleWrapper as A };
