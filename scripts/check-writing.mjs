import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { posts, postPath } from '../client/src/data/writing.ts';
import { siteOrigin } from '../client/src/data/seo.ts';

const root = new URL('../dist/public/', import.meta.url);
const documents = ['/writing', ...posts.map(postPath)];
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
for (const route of documents) {
  const html = await readFile(new URL(`${route.slice(1)}/index.html`, root), 'utf8');
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: one visible H1`);
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, `${route}: one canonical`);
  assert.ok(html.includes(`href="${siteOrigin}${route}"`), `${route}: correct production canonical`);
  assert.ok(!html.includes('visionfx.studio/og.png'), `${route}: no broken social image`);
  assert.ok(!html.includes('%VITE_ANALYTICS'), `${route}: no unresolved tracking configuration`);
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1, `${route}: one structured-data graph`);
  const schema = JSON.parse(scripts[0][1]);
  const post = posts.find(item => postPath(item) === route);
  if (post) {
    assert.ok(html.includes(escape(post.title)), `${route}: complete title in initial HTML`);
    for (const section of post.sections) assert.ok(html.includes(`id="${section.id}"`), `${route}: section ${section.id} rendered`);
    assert.ok(html.includes(escape(post.sections.at(-1).paragraphs.at(-1))), `${route}: full article rendered`);
    const article = schema['@graph'].find(item => item['@type'] === 'BlogPosting');
    assert.equal(article.headline, post.title);
    assert.equal(article.dateModified, post.updated);
    assert.equal(article.wordCount, post.wordCount);
    assert.equal(article.url, `${siteOrigin}${route}`);
  }
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(match[1]), `${route}: anchor ${match[1]} exists`);
}
const sitemap = await readFile(new URL('sitemap.xml', root), 'utf8');
const rss = await readFile(new URL('rss.xml', root), 'utf8');
const robots = await readFile(new URL('robots.txt', root), 'utf8');
for (const post of posts) { assert.ok(sitemap.includes(`${siteOrigin}${postPath(post)}`)); assert.ok(rss.includes(`${siteOrigin}${postPath(post)}`)); }
assert.ok(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`));
await access(new URL('writing-cover.png', root));
console.log(`Verified ${documents.length} writing pages, initial HTML, anchors, schema, sitemap, RSS, and social image.`);
