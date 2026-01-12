import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";

interface ArticleWrapperProps {
  title: string;
  description: string;
  author?: string;
  datePublished: string;
  dateModified?: string;
  category?: string;
  keywords?: string[];
  imageUrl?: string;
  children: ReactNode;
}

/**
 * ArticleWrapper component that wraps article content with proper SEO structured data.
 * Uses Schema.org Article markup for better search engine visibility.
 */
export function ArticleWrapper({
  title,
  description,
  author = "TooEssay Team",
  datePublished,
  dateModified,
  category = "Education",
  keywords = [],
  imageUrl = "https://lovable.dev/opengraph-image-p98pqg.png",
  children,
}: ArticleWrapperProps) {
  const canonicalUrl = typeof window !== "undefined" ? window.location.href : "";
  const siteName = "TooEssay - IBDP Guide";
  
  // Schema.org Article structured data
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

  // BreadcrumbList structured data
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

  // Educational Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": siteName,
    "description": "AI-powered essay writing platform for IB Diploma Programme students",
    "url": "https://tooessay.com",
    "logo": imageUrl,
    "sameAs": []
  };

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title} | {siteName}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(", ")} />
        <meta name="author" content={author} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta property="article:published_time" content={datePublished} />
        {dateModified && <meta property="article:modified_time" content={dateModified} />}
        <meta property="article:author" content={author} />
        <meta property="article:section" content={category} />
        {keywords.map((keyword, index) => (
          <meta key={index} property="article:tag" content={keyword} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
      </Helmet>
      
      <article className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </article>
    </>
  );
}
