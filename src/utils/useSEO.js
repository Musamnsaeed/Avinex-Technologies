import { useEffect } from 'react';

/**
 * Custom SEO hook to set page title, meta description, canonical URL,
 * OpenGraph, Twitter Card, and Schema.org structured data.
 */
export function useSEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = '/images/hero/hero-cinematic-beacon.jpg',
  schema = null,
}) {
  useEffect(() => {
    // 1. Title with official brand consistency (Starts with AVINEX Technologies)
    const baseTitle = 'AVINEX Technologies';
    if (!title || title === 'AVINEX Technologies') {
      document.title = 'AVINEX Technologies';
    } else {
      document.title = `${title} | ${baseTitle}`;
    }

    // 2. Helper to set or create meta tags
    const setMetaTag = (attrName, attrVal, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 3. Standard Description
    if (description) {
      setMetaTag('name', 'description', description);
    }

    // 4. OpenGraph
    setMetaTag('property', 'og:site_name', baseTitle);
    setMetaTag('property', 'og:title', title ? `${title} | ${baseTitle}` : `${baseTitle} | Official Website`);
    if (description) setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    const domain = 'https://avinextechnologies.com';
    const fullCanonical = canonical ? `${domain}${canonical}` : `${domain}${window.location.pathname}`;
    setMetaTag('property', 'og:url', fullCanonical);
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${domain}${ogImage}`);

    // 5. Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title ? `${title} | ${baseTitle}` : `${baseTitle} | Official Website`);
    if (description) setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${domain}${ogImage}`);

    // 6. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonical);

    // 7. Schema.org JSON-LD
    let scriptSchema = document.getElementById('page-json-ld');
    if (schema) {
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.id = 'page-json-ld';
        scriptSchema.type = 'application/ld+json';
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = JSON.stringify(schema);
    } else if (scriptSchema) {
      scriptSchema.remove();
    }

    return () => {
      // Optional cleanup if needed
    };
  }, [title, description, canonical, ogType, ogImage, schema]);
}

