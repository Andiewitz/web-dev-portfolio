import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { WritingArticlePage, WritingIndexPage } from "../client/src/components/WritingPages";
import { posts, postPath } from "../client/src/data/writing";
import { articleDates, routeSeo, siteOrigin } from "../client/src/data/seo";

const output = path.resolve("dist/public");
const template = await readFile(path.join(output, "index.html"), "utf8");
const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[character]!));
function htmlFor(route: string, body?: string) {
  const seo = routeSeo(route);
  // Keep Vite's generated CSS and module scripts; replace route-specific metadata.
  let html = template.replace(/<title>[\s\S]*?<\/title>/g, "")
    .replace(/<meta\s+[^>]*(?:name|property)=["'](?:description|robots|keywords|twitter:[^"']+|og:[^"']+|article:[^"']+)["'][^>]*>/g, "")
    .replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/g, "")
    .replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/g, "");
  const meta = [
    `<title>${escape(seo.title)}</title>`,
    `<meta name="description" content="${escape(seo.description)}">`,
    `<meta name="robots" content="${seo.isMissing ? "noindex, follow" : "index, follow, max-image-preview:large"}">`,
    `<link rel="canonical" href="${seo.canonical}">`,
    `<link rel="alternate" type="application/rss+xml" title="Andrei — Writing" href="${siteOrigin}/rss.xml">`,
    ...Object.entries({ "og:title": seo.title, "og:description": seo.description, "og:url": seo.canonical, "og:type": seo.type, "og:site_name": "Andrei", "og:locale": "en_US", "og:image": seo.image, "og:image:alt": "Andrei — practical web development notes and project case studies", ...articleDates(seo.post) }).map(([key, value]) => `<meta property="${key}" content="${escape(value)}">`),
    ...Object.entries({ "twitter:card": "summary_large_image", "twitter:title": seo.title, "twitter:description": seo.description, "twitter:image": seo.image }).map(([key, value]) => `<meta name="${key}" content="${escape(value)}">`),
    `<script type="application/ld+json">${JSON.stringify(seo.schema).replace(/</g, "\\u003c")}</script>`,
  ].join("\n");
  html = html.replace("</head>", `${meta}\n</head>`);
  if (body) html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return html;
}
await writeFile(path.join(output, "index.html"), htmlFor("/"));
await writeFile(path.join(output, "404.html"), htmlFor("/404", '<main id="main" class="blog-post__body" style="padding-top:140px"><h1>Page not found</h1><p>This article does not exist. <a href="/writing">Browse all writing</a>.</p></main>'));
const pages = [{ route: "/writing", markup: renderToStaticMarkup(<WritingIndexPage />) }, ...posts.map(post => ({ route: postPath(post), markup: renderToStaticMarkup(<WritingArticlePage post={post} />) }))];
for (const page of pages) {
  const destination = path.join(output, page.route.slice(1));
  await mkdir(destination, { recursive: true });
  await writeFile(path.join(destination, "index.html"), htmlFor(page.route, page.markup));
}
await writeFile(path.join(output, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteOrigin}/sitemap.xml\n`);
await writeFile(path.join(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteOrigin}/</loc></url><url><loc>${siteOrigin}/writing</loc><lastmod>2026-10-14</lastmod></url>${posts.map(post => `<url><loc>${siteOrigin}${postPath(post)}</loc><lastmod>${post.updated}</lastmod></url>`).join("")}</urlset>`);
await writeFile(path.join(output, "rss.xml"), `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Andrei — Writing</title><link>${siteOrigin}/writing</link><description>Practical web development guides and project case studies.</description><language>en-us</language>${posts.map(post => `<item><title>${escape(post.title)}</title><link>${siteOrigin}${postPath(post)}</link><guid isPermaLink="true">${siteOrigin}${postPath(post)}</guid><pubDate>${new Date(`${post.published}T12:00:00Z`).toUTCString()}</pubDate><description>${escape(post.excerpt)}</description></item>`).join("")}</channel></rss>`);
console.log(`Prerendered writing index and ${posts.length} complete articles; generated sitemap and RSS.`);
