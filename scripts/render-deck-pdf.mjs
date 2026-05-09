import puppeteer from "puppeteer-core";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const HTML = resolve("deck/index.html");
const OUT = "deliverables/agentpass-guard-frontier-deck.pdf";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new"
});
const page = await browser.newPage();
await page.goto(pathToFileURL(HTML).href, { waitUntil: "networkidle0", timeout: 30000 });
await page.evaluate(() => document.fonts.ready);
// small settle
await new Promise((r) => setTimeout(r, 400));

await page.pdf({
  path: OUT,
  width: "13.333in",
  height: "7.5in",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 }
});

await browser.close();
console.log(`Wrote ${OUT}`);
