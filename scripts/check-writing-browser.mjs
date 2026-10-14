import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { posts, postPath } from '../client/src/data/writing.ts';
import { siteOrigin } from '../client/src/data/seo.ts';

const baseUrl = process.env.WRITING_PREVIEW_URL ?? 'http://localhost:5180';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 960 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto(`${baseUrl}/writing`, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200);
  assert.equal(await page.locator('.blog-card').count(), 7);
  await page.getByRole('button', { name: 'Case Studies', exact: true }).click();
  assert.equal(await page.locator('.blog-card').count(), 2);
  await page.getByRole('button', { name: 'All', exact: true }).click();
  await page.screenshot({ path: 'writing-preview.jpg', type: 'jpeg', quality: 90 });
  for (const post of posts) {
    await page.goto(`${baseUrl}${postPath(post)}`, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('h1').innerText(), post.title);
    assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `${siteOrigin}${postPath(post)}`);
    assert.equal(await page.locator('.writing-toc a').count(), post.sections.length);
    await page.setViewportSize({ width: 390, height: 844 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${post.slug}: no mobile overflow`);
    await page.setViewportSize({ width: 1280, height: 960 });
  }
  await page.goto(`${baseUrl}/writing/why-react-feels-slow`, { waitUntil: 'networkidle' });
  await page.locator('.writing-toc a[href="#defer"]').click();
  await page.screenshot({ path: 'writing-article-preview.jpg', type: 'jpeg', quality: 90 });
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const staticPage = await noJs.newPage();
  await staticPage.goto(`${baseUrl}/writing/comfort-pro-service-website`, { waitUntil: 'load' });
  assert.equal(await staticPage.locator('h1').innerText(), posts[0].title);
  assert.equal(await staticPage.locator('#launch-checks').count(), 1);
  await staticPage.screenshot({ path: 'writing-mobile-preview.jpg', type: 'jpeg', quality: 90 });
  assert.deepEqual(errors, [], 'no client rendering errors');
  console.log('Verified category filters, all seven routes, mobile overflow, section links, and complete article HTML without JavaScript.');
} finally { await browser.close(); }
