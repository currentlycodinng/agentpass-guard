import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const URL = process.env.SITE_URL || "https://currentlycodinng.github.io/agentpass-guard/";
const OUT = "assets/screenshots";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: { width: 1920, height: 1200, deviceScaleFactor: 2 }
});

const shots = [
  { name: "01-hero", scroll: 0, height: 1200 },
  { name: "02-how", anchor: "#how", offset: -40, height: 900 },
  { name: "03-demo", anchor: "#demo", offset: -40, height: 1500 },
  { name: "04-receipts", anchor: "#receipts", offset: -40, height: 700 },
  { name: "05-proof", anchor: "#proof", offset: -40, height: 800 },
  { name: "06-submission", anchor: "#submission", offset: -40, height: 800 }
];

const page = await browser.newPage();
await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });
// Disable animations and the marquee scroll for clean stills
await page.addStyleTag({
  content: `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
    }
  `
});
// Wait for fonts
await page.evaluate(() => document.fonts.ready);

for (const s of shots) {
  let scrollY = s.scroll || 0;
  if (s.anchor) {
    scrollY = await page.evaluate((sel, off) => {
      const el = document.querySelector(sel);
      const y = el ? el.getBoundingClientRect().top + window.scrollY : 0;
      return y + off;
    }, s.anchor, s.offset || 0);
  }
  await page.setViewport({ width: 1920, height: s.height, deviceScaleFactor: 2 });
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await new Promise(r => setTimeout(r, 250));
  await page.screenshot({ path: `${OUT}/${s.name}.png`, type: "png" });
  console.log(`Wrote ${OUT}/${s.name}.png`);
}

// Also a "decision approved" shot — click Allowed action and capture
await page.setViewport({ width: 1920, height: 1500, deviceScaleFactor: 2 });
await page.evaluate(() => {
  const el = document.querySelector("#demo");
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 40);
});
await page.evaluate(() => document.querySelector('[data-action="allowed"]').click());
await new Promise(r => setTimeout(r, 200));
await page.screenshot({ path: `${OUT}/07-decision-approved.png`, type: "png" });
console.log(`Wrote ${OUT}/07-decision-approved.png`);

await page.evaluate(() => document.querySelector('[data-action="blocked"]').click());
await new Promise(r => setTimeout(r, 200));
await page.screenshot({ path: `${OUT}/08-decision-blocked.png`, type: "png" });
console.log(`Wrote ${OUT}/08-decision-blocked.png`);

await page.evaluate(() => document.querySelector('[data-action="approval"]').click());
await new Promise(r => setTimeout(r, 200));
await page.screenshot({ path: `${OUT}/09-decision-approval.png`, type: "png" });
console.log(`Wrote ${OUT}/09-decision-approval.png`);

await browser.close();
console.log("\nAll screenshots written.");
