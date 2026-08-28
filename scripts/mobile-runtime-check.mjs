import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await page.goto("https://3000-iik73jvwkj71aab584u6n-f03ed490.us3.manus.computer/", { waitUntil: "networkidle" });
const result = await page.evaluate(async () => {
  const images = Array.from(document.images);
  await Promise.all(images.map((img) => img.decode?.().catch(() => undefined)));
  const slab = document.querySelector(".hero-slab");
  const slabContent = document.querySelector(".hero-slab__content");
  const firstChar = document.querySelector(".service .motion-char");
  return {
    viewport: { width: window.innerWidth, height: window.innerHeight, touch: "ontouchstart" in window },
    images: images.map((img) => ({ file: img.src.split("/").pop(), complete: img.complete, width: img.naturalWidth, height: img.naturalHeight })),
    slabTransform: slab ? getComputedStyle(slab).transform : null,
    slabWillChange: slab ? getComputedStyle(slab).willChange : null,
    textAnimation: firstChar ? getComputedStyle(firstChar).animationName : null,
    textTransform: firstChar ? getComputedStyle(firstChar).transform : null,
    contentOpacity: slabContent ? getComputedStyle(slabContent).opacity : null,
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
