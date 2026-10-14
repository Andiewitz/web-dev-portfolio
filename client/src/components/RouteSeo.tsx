import { useEffect } from "react";
import { useLocation } from "wouter";
import { articleDates, routeSeo } from "../data/seo";

export default function RouteSeo() {
  const [location] = useLocation();
  useEffect(() => {
    const seo = routeSeo(location);
    document.title = seo.title;
    const setMeta = (attribute: "name" | "property", key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.append(element); }
      element.content = content;
    };
    setMeta("name", "description", seo.description);
    setMeta("name", "robots", seo.isMissing ? "noindex, follow" : "index, follow, max-image-preview:large");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", seo.image);
    setMeta("name", "twitter:card", "summary_large_image");
    for (const [key, value] of Object.entries({ "og:title": seo.title, "og:description": seo.description, "og:url": seo.canonical, "og:type": seo.type, "og:image": seo.image, "og:image:alt": "Andrei — practical web development notes and project case studies" })) setMeta("property", key, value);
    document.head.querySelectorAll('meta[property^="article:"]').forEach(element => element.remove());
    for (const [key, value] of Object.entries(articleDates(seo.post))) setMeta("property", key, value);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.append(canonical); }
    canonical.href = seo.canonical;
    document.head.querySelectorAll('script[type="application/ld+json"]').forEach(element => element.remove());
    const schema = document.createElement("script"); schema.type = "application/ld+json"; schema.textContent = JSON.stringify(seo.schema); document.head.append(schema);
  }, [location]);
  return null;
}
