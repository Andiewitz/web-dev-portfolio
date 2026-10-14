import { posts, postPath, type Post } from "./writing";

// The production URL is the homepage declared by the GitHub repository.
export const siteOrigin = "https://web-dev-portfolio-swart.vercel.app";
const person = { "@type": "Person", "@id": `${siteOrigin}/#andrei`, name: "Andrei", url: `${siteOrigin}/`, jobTitle: "Web Developer" };
const image = `${siteOrigin}/writing-cover.png`;

export function routeSeo(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const post = posts.find(item => postPath(item) === path);
  const isIndex = path === "/writing";
  const isMissing = path !== "/" && !isIndex && !post;
  const canonical = `${siteOrigin}${path === "/" ? "/" : path}`;
  const title = post ? `${post.seoTitle} | Andrei` : isIndex ? "Web development articles & project case studies | Andrei" : isMissing ? "Page not found | Andrei" : "Andrei — Web Developer & UI Engineer";
  const description = post?.excerpt ?? (isIndex ? "Practical web development guides on React, TypeScript, PostgreSQL, accessibility, and deployment, with Comfort Pro and Elevate Health project case studies." : "Andrei builds responsive, accessible web applications with React, TypeScript, and modern web architecture. Explore projects and practical development articles.");
  const graph: Record<string, unknown>[] = [person, { "@type": "WebSite", "@id": `${siteOrigin}/#website`, name: "Andrei", url: `${siteOrigin}/`, inLanguage: "en", publisher: { "@id": person["@id"] } }];
  if (post) {
    graph.push({ "@type": "BlogPosting", "@id": `${canonical}#article`, headline: post.title, description, url: canonical, mainEntityOfPage: canonical, datePublished: post.published, dateModified: post.updated, author: { "@id": person["@id"] }, publisher: { "@id": person["@id"] }, image, inLanguage: "en", articleSection: post.category, wordCount: post.wordCount });
    graph.push({ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteOrigin}/` }, { "@type": "ListItem", position: 2, name: "Writing", item: `${siteOrigin}/writing` }, { "@type": "ListItem", position: 3, name: post.title, item: canonical }] });
  } else if (isIndex) {
    graph.push({ "@type": "CollectionPage", name: title, description, url: canonical, mainEntity: { "@type": "ItemList", itemListElement: posts.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: `${siteOrigin}${postPath(item)}` })) } });
  }
  return { title, description, canonical, image, isMissing, type: post ? "article" : "website", post, schema: { "@context": "https://schema.org", "@graph": graph } };
}

export function articleDates(post?: Post) {
  return post ? { "article:published_time": post.published, "article:modified_time": post.updated, "article:author": `${siteOrigin}/#andrei` } : {};
}
