import puppeteer from "puppeteer-core";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { mkdir } from "node:fs/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const HTML = resolve("assets/logo-source.html");
const OUT = "assets/logo";

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: { width: 2000, height: 2000, deviceScaleFactor: 1 }
});
const page = await browser.newPage();
await page.setViewport({ width: 2000, height: 1200, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(HTML).href, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 300));

async function shotElement(selector, file, opts = {}) {
  const el = await page.$(selector);
  if (!el) throw new Error(`Missing ${selector}`);
  await el.screenshot({
    path: `${OUT}/${file}`,
    omitBackground: opts.transparent || false,
    type: file.endsWith(".jpg") ? "jpeg" : "png",
    quality: file.endsWith(".jpg") ? 95 : undefined
  });
  console.log(`Wrote ${OUT}/${file}`);
}

// 1. Square gradient mark — primary logo, transparent + filled
await shotElement("#mark-light", "logo-square-1024.png", { transparent: true });
// 2. Dark variant
await shotElement("#mark-dark", "logo-square-dark-1024.png", { transparent: true });
// 3. Wide dark banner
await shotElement("#banner-dark", "logo-banner-dark-1600.png");
// 4. Wide light banner
await shotElement("#banner-light", "logo-banner-light-1600.png");

// Resize the primary logo to 512 and 256 versions for forms with smaller limits.
// Use a simple canvas-based resize via the same browser.
async function downscale(srcPath, outPath, size) {
  const buf = await page.evaluate(async (path, sz) => {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = path; });
    const c = document.createElement("canvas");
    c.width = sz; c.height = sz;
    const ctx = c.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, sz, sz);
    return c.toDataURL("image/png");
  }, pathToFileURL(srcPath).href, size);
  const data = buf.split(",")[1];
  const { writeFile } = await import("node:fs/promises");
  await writeFile(outPath, Buffer.from(data, "base64"));
  console.log(`Wrote ${outPath}`);
}

await downscale(`${OUT}/logo-square-1024.png`, `${OUT}/logo-square-512.png`, 512);
await downscale(`${OUT}/logo-square-1024.png`, `${OUT}/logo-square-256.png`, 256);
await downscale(`${OUT}/logo-square-dark-1024.png`, `${OUT}/logo-square-dark-512.png`, 512);

await browser.close();
console.log("\nAll logos written.");
