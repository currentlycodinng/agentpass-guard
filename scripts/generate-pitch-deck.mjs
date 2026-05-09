import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "AgentPass Guard";
pptx.company = "AgentPass Guard";
pptx.subject = "Colosseum Frontier Hackathon Pitch";
pptx.title = "AgentPass Guard";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Inter",
  bodyFontFace: "Inter",
  lang: "en-US"
};

// Palette aligned with the website (src/styles.css)
const C = {
  ink: "0B1020",
  inkSoft: "2B3556",
  muted: "6B7393",
  line: "E6E8F0",
  lineStrong: "D2D7E3",
  bg: "FFFFFF",
  bgSoft: "F6F7FB",
  brand: "14F195",
  brand2: "9945FF",
  brand3: "00D1FF",
  green: "047857",
  greenSoft: "ECFDF5",
  red: "B42318",
  redSoft: "FEE2E2",
  amber: "B45309",
  amberSoft: "FEF3C7",
  dark: "0B1020",
  darkPanel: "131A36"
};

const W = 13.333;
const H = 7.5;
const MONO = "JetBrains Mono";

function bg(slide, color = C.bg) { slide.background = { color }; }
function darkBg(slide) { slide.background = { color: C.dark }; }

function brandMark(slide, x, y, dark = false) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w: 0.42, h: 0.42, rectRadius: 0.08,
    fill: { color: C.brand }, line: { color: C.brand }
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.08, y: y + 0.08, w: 0.32, h: 0.32, rectRadius: 0.06,
    fill: { color: C.brand3 }, line: { color: C.brand3 }
  });
  slide.addText("AP", {
    x, y, w: 0.42, h: 0.42, fontSize: 11, bold: true,
    color: dark ? "FFFFFF" : "06140F", align: "center", valign: "middle",
    fontFace: "Inter", margin: 0
  });
}

function topbar(slide, { dark = false, kicker = null, slideNumber = null, total = 8 } = {}) {
  brandMark(slide, 0.6, 0.32, dark);
  slide.addText("AgentPass Guard", {
    x: 1.15, y: 0.32, w: 4, h: 0.42,
    fontSize: 11, bold: true, fontFace: "Inter",
    color: dark ? "FFFFFF" : C.ink, valign: "middle", margin: 0
  });
  if (kicker) {
    slide.addText(kicker.toUpperCase(), {
      x: 5.2, y: 0.32, w: 6, h: 0.42,
      fontSize: 8.5, bold: true, fontFace: MONO, charSpacing: 1.5,
      color: dark ? "98A3C7" : C.muted, valign: "middle", margin: 0
    });
  }
  if (slideNumber) {
    slide.addText(`${String(slideNumber).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, {
      x: W - 1.6, y: 0.32, w: 1, h: 0.42,
      fontSize: 9, fontFace: MONO,
      color: dark ? "98A3C7" : C.muted, align: "right", valign: "middle", margin: 0
    });
  }
}

function footer(slide, { dark = false } = {}) {
  slide.addText("agentpass-guard · github.com/currentlycodinng/agentpass-guard", {
    x: 0.6, y: 7.05, w: 8, h: 0.25,
    fontSize: 8, fontFace: MONO,
    color: dark ? "5B6594" : C.muted, valign: "middle", margin: 0
  });
  slide.addText("Colosseum Frontier · 2026", {
    x: W - 5, y: 7.05, w: 4.4, h: 0.25,
    fontSize: 8, fontFace: MONO,
    color: dark ? "5B6594" : C.muted, align: "right", valign: "middle", margin: 0
  });
}

function bigTitle(slide, text, { x = 0.6, y = 1.8, w = 12.1, color = C.ink, size = 40 } = {}) {
  slide.addText(text, {
    x, y, w, h: 1.6,
    fontSize: size, bold: true, fontFace: "Inter",
    color, fit: "shrink", margin: 0, paraSpaceAfter: 0
  });
}

function lead(slide, text, { x = 0.6, y = 3.2, w = 11, color = C.inkSoft, size = 16 } = {}) {
  slide.addText(text, {
    x, y, w, h: 1.0, fontSize: size, fontFace: "Inter",
    color, fit: "shrink", margin: 0
  });
}

function gradientBand(slide, y) {
  const segW = 4.0;
  slide.addShape(pptx.ShapeType.rect, { x: 0.6, y, w: segW, h: 0.06, fill: { color: C.brand }, line: { color: C.brand } });
  slide.addShape(pptx.ShapeType.rect, { x: 0.6 + segW, y, w: segW, h: 0.06, fill: { color: C.brand3 }, line: { color: C.brand3 } });
  slide.addShape(pptx.ShapeType.rect, { x: 0.6 + segW * 2, y, w: segW, h: 0.06, fill: { color: C.brand2 }, line: { color: C.brand2 } });
}

function card(slide, { x, y, w, h, kicker, title, body, accent = C.ink, fill = C.bg, kickerFont = MONO, titleColor = C.ink, bodyColor = C.inkSoft }) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: fill }, line: { color: C.line, width: 0.75 }
  });
  if (kicker) {
    slide.addText(kicker.toUpperCase(), {
      x: x + 0.32, y: y + 0.28, w: w - 0.6, h: 0.28,
      fontSize: 8.5, bold: true, fontFace: kickerFont, charSpacing: 2,
      color: accent, margin: 0
    });
  }
  slide.addText(title, {
    x: x + 0.32, y: y + (kicker ? 0.62 : 0.32), w: w - 0.6, h: 0.6,
    fontSize: 18, bold: true, fontFace: "Inter",
    color: titleColor, fit: "shrink", margin: 0
  });
  slide.addText(body, {
    x: x + 0.32, y: y + (kicker ? 1.25 : 0.95), w: w - 0.6, h: h - (kicker ? 1.45 : 1.15),
    fontSize: 12, fontFace: "Inter", color: bodyColor,
    valign: "top", margin: 0, paraSpaceAfter: 4
  });
}

function bullets(slide, items, { x, y, w, size = 14, color = C.ink, accent = C.brand2 } = {}) {
  const lineH = 0.45;
  items.forEach((text, i) => {
    const iy = y + i * lineH;
    slide.addShape(pptx.ShapeType.ellipse, {
      x, y: iy + 0.16, w: 0.14, h: 0.14,
      fill: { color: accent }, line: { color: accent }
    });
    slide.addText(text, {
      x: x + 0.32, y: iy, w: w - 0.32, h: lineH,
      fontSize: size, fontFace: "Inter", color, valign: "top", margin: 0
    });
  });
}

function s1_cover() {
  const slide = pptx.addSlide();
  darkBg(slide);
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.dark }, line: { color: C.dark } });
  slide.addShape(pptx.ShapeType.ellipse, { x: -2, y: -2, w: 8, h: 8, fill: { color: "1A2244", transparency: 50 }, line: { color: "1A2244" } });
  slide.addShape(pptx.ShapeType.ellipse, { x: 7, y: 3, w: 8, h: 8, fill: { color: "20184D", transparency: 60 }, line: { color: "20184D" } });

  brandMark(slide, 0.6, 0.55, true);
  slide.addText("AgentPass Guard", {
    x: 1.2, y: 0.55, w: 6, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Inter", color: "FFFFFF", valign: "middle", margin: 0
  });
  slide.addText("COLOSSEUM FRONTIER · AI × SOLANA", {
    x: W - 5.5, y: 0.55, w: 4.9, h: 0.5,
    fontSize: 9, bold: true, fontFace: MONO, charSpacing: 2,
    color: "98A3C7", align: "right", valign: "middle", margin: 0
  });

  slide.addText("Agents can now pay.", {
    x: 0.7, y: 2.4, w: 12, h: 1.3,
    fontSize: 56, bold: true, fontFace: "Inter", color: "FFFFFF", margin: 0
  });
  slide.addText([
    { text: "You decide ", options: { color: "E6E8F5", fontFace: "Inter", bold: true } },
    { text: "what", options: { color: "FFFFFF", fontFace: "Instrument Serif", italic: true, bold: false } },
    { text: " they're allowed to buy.", options: { color: "E6E8F5", fontFace: "Inter", bold: true } }
  ], { x: 0.7, y: 3.5, w: 12, h: 1.3, fontSize: 56, margin: 0 });

  slide.addText(
    "Policy simulator and guard layer for AI agents using pay.sh / x402-style payments on Solana.",
    { x: 0.7, y: 5.05, w: 9.5, h: 0.7, fontSize: 17, fontFace: "Inter", color: "CBD1EA", margin: 0 }
  );

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.7, y: 5.95, w: 2.6, h: 0.55, rectRadius: 0.27,
    fill: { color: C.brand }, line: { color: C.brand }
  });
  slide.addText("Run the demo →", {
    x: 0.7, y: 5.95, w: 2.6, h: 0.55,
    fontSize: 13, bold: true, fontFace: "Inter",
    color: "06140F", align: "center", valign: "middle", margin: 0
  });

  slide.addText("github.com/currentlycodinng/agentpass-guard", {
    x: 3.5, y: 5.95, w: 6, h: 0.55,
    fontSize: 11, fontFace: MONO, color: "98A3C7", valign: "middle", margin: 0
  });

  slide.addShape(pptx.ShapeType.rect, { x: 0.7, y: 6.95, w: 1.2, h: 0.05, fill: { color: C.brand }, line: { color: C.brand } });
  slide.addShape(pptx.ShapeType.rect, { x: 1.9, y: 6.95, w: 1.2, h: 0.05, fill: { color: C.brand3 }, line: { color: C.brand3 } });
  slide.addShape(pptx.ShapeType.rect, { x: 3.1, y: 6.95, w: 1.2, h: 0.05, fill: { color: C.brand2 }, line: { color: C.brand2 } });
}

function s2_problem() {
  const slide = pptx.addSlide();
  bg(slide);
  topbar(slide, { kicker: "The new problem", slideNumber: 2 });
  bigTitle(slide, "Agents can pay. Now humans need controls.", { y: 1.4, size: 40 });
  lead(slide,
    "AI agents are moving from chat to execution — they search, write code, call tools, and now pay for APIs. The unsolved problem is the next one.",
    { y: 3.0, size: 16 }
  );
  bullets(slide, [
    "Pay.sh and x402 unlock agent-paid APIs on Solana.",
    "Unrestricted agent wallets are unsafe.",
    "Manual approval for every micro-payment kills autonomy.",
    "Builders need to test budget, allowlist, threshold, and revocation before live spend."
  ], { x: 0.65, y: 4.15, w: 7.4, size: 13.5 });
  card(slide, {
    x: 8.45, y: 4.0, w: 4.3, h: 2.6,
    kicker: "The missing layer",
    title: "Trust, before settlement.",
    body: "The payment rail is arriving. The control plane on top of it is still thin. AgentPass Guard is that control plane.",
    accent: C.brand2, fill: C.bgSoft
  });
  footer(slide);
}

function s3_whyNow() {
  const slide = pptx.addSlide();
  bg(slide);
  topbar(slide, { kicker: "Why now", slideNumber: 3 });
  bigTitle(slide, "Agent-paid APIs are becoming real.", { y: 1.4, size: 40 });
  slide.addText("The next layer is policy:  what is this agent allowed to buy?", {
    x: 0.6, y: 2.55, w: 12.1, h: 0.6,
    fontSize: 18, bold: true, fontFace: "Inter", color: C.inkSoft, margin: 0
  });
  card(slide, { x: 0.6, y: 3.4, w: 4.0, h: 3.0, kicker: "Pay-per-use APIs", title: "pay.sh", body: "Catalogs APIs that agents can call without accounts, keys, or subscriptions.", accent: C.brand3 });
  card(slide, { x: 4.75, y: 3.4, w: 4.0, h: 3.0, kicker: "HTTP 402 primitive", title: "x402", body: "Native machine-to-machine payment flow. Agents see a price, pay, and proceed.", accent: C.brand2 });
  card(slide, { x: 8.9, y: 3.4, w: 3.8, h: 3.0, kicker: "Settlement", title: "Solana", body: "Low fees and fast confirmation make tiny, frequent agent payments practical.", accent: C.green });
  footer(slide);
}

function s4_product() {
  const slide = pptx.addSlide();
  bg(slide);
  topbar(slide, { kicker: "The product", slideNumber: 4 });
  bigTitle(slide, "A guardrail check before every paid action.", { y: 1.4, size: 36 });

  const steps = [
    { n: "01", t: "Agent proposes paid call", c: C.brand3 },
    { n: "02", t: "Policy evaluates & explains", c: C.brand2 },
    { n: "03", t: "Solana payment settles", c: C.brand },
    { n: "04", t: "Receipt logs decision", c: C.amber }
  ];
  const stepW = 2.85;
  const gap = 0.2;
  const totalW = stepW * 4 + gap * 3;
  const startX = (W - totalW) / 2;
  const sy = 3.1;

  steps.forEach((step, i) => {
    const sx = startX + i * (stepW + gap);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: sx, y: sy, w: stepW, h: 1.6, rectRadius: 0.08,
      fill: { color: C.bg }, line: { color: C.line, width: 0.75 }
    });
    slide.addText(step.n, {
      x: sx + 0.3, y: sy + 0.3, w: 1.2, h: 0.3,
      fontSize: 9.5, bold: true, fontFace: MONO, charSpacing: 1.5,
      color: step.c, margin: 0
    });
    slide.addText(step.t, {
      x: sx + 0.3, y: sy + 0.7, w: stepW - 0.5, h: 0.7,
      fontSize: 13, bold: true, fontFace: "Inter",
      color: C.ink, fit: "shrink", margin: 0
    });
    if (i < 3) {
      slide.addShape(pptx.ShapeType.line, {
        x: sx + stepW, y: sy + 0.8, w: gap, h: 0,
        line: { color: C.lineStrong, width: 1.2, endArrowType: "triangle" }
      });
    }
  });

  slide.addText("Inside policy: auto-pay.   Outside policy: block, or pause for a human.", {
    x: 0.6, y: 5.1, w: 12.1, h: 0.6,
    fontSize: 17, bold: true, fontFace: "Inter",
    color: C.inkSoft, align: "center", margin: 0
  });
  gradientBand(slide, 6.05);
  footer(slide);
}

function s5_demo() {
  const slide = pptx.addSlide();
  bg(slide);
  topbar(slide, { kicker: "Live demo", slideNumber: 5 });
  bigTitle(slide, "Three decisions judges can inspect.", { y: 1.4, size: 36 });
  lead(slide,
    "One scripted research agent. One human policy. Three actions, three different outcomes — each with the exact guardrail trace.",
    { y: 2.85, size: 14 }
  );
  card(slide, { x: 0.6, y: 4.0, w: 4.0, h: 2.7, kicker: "Should approve", title: "0.008 USDC research call", body: "Allowlisted, under threshold, inside budget. Auto-approves and writes a receipt.", accent: C.green, fill: C.greenSoft });
  card(slide, { x: 4.75, y: 4.0, w: 4.0, h: 2.7, kicker: "Should block", title: "Unapproved scraping vendor", body: "Allowlist check fails. Blocked before settlement. Zero lamports leave the wallet.", accent: C.red, fill: C.redSoft });
  card(slide, { x: 8.9, y: 4.0, w: 3.8, h: 2.7, kicker: "Needs approval", title: "0.075 USDC BigQuery call", body: "Allowlisted but above the 0.02 USDC threshold. Pauses for human approval.", accent: C.amber, fill: C.amberSoft });
  footer(slide);
}

function s6_solana() {
  const slide = pptx.addSlide();
  darkBg(slide);
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.dark }, line: { color: C.dark } });
  slide.addShape(pptx.ShapeType.ellipse, { x: 8, y: -2, w: 8, h: 8, fill: { color: "1A2244", transparency: 50 }, line: { color: "1A2244" } });
  topbar(slide, { dark: true, kicker: "Why Solana", slideNumber: 6 });
  bigTitle(slide, "Small, frequent, programmatic — with receipts.", { y: 1.4, size: 36, color: "FFFFFF" });
  bullets(slide, [
    "Fast confirmation keeps agent workflows interactive.",
    "Low fees make sub-cent API payments economically viable.",
    "Wallet-native identities map cleanly to autonomous agents.",
    "Memo program turns each settlement into an inspectable receipt."
  ], { x: 0.65, y: 3.0, w: 7.0, size: 14, color: "E6E8F5", accent: C.brand });
  card(slide, {
    x: 8.0, y: 2.85, w: 4.7, h: 3.7,
    kicker: "Devnet proof",
    title: "$ npm run devnet:demo",
    body: "Creates a temp wallet, sends a tiny payment, attaches a Memo-program receipt, prints an explorer link. Falls back to a simulated receipt if the public faucet is rate-limited.",
    accent: C.brand, fill: C.darkPanel,
    titleColor: C.brand, bodyColor: "CBD1EA", kickerFont: MONO
  });
  footer(slide, { dark: true });
}

function s7_built() {
  const slide = pptx.addSlide();
  bg(slide);
  topbar(slide, { kicker: "Built so far", slideNumber: 7 });
  bigTitle(slide, "Narrow enough to ship. Clear enough to judge.", { y: 1.4, size: 36 });
  const items = [
    { k: "01", t: "Policy editor", b: "Budget, allowlist, threshold, expiry, revocation." },
    { k: "02", t: "Agent runner", b: "Three scripted paid actions: approve / block / pause." },
    { k: "03", t: "Receipts log", b: "Every decision, every amount, every status, exportable JSON." },
    { k: "04", t: "Devnet path", b: "Optional Solana settlement with Memo-program receipts." }
  ];
  const cardW = 2.95;
  const gap = 0.18;
  const startX = 0.6;
  items.forEach((it, i) => {
    card(slide, {
      x: startX + i * (cardW + gap), y: 3.1, w: cardW, h: 3.2,
      kicker: it.k, title: it.t, body: it.b,
      accent: i === 1 ? C.brand2 : i === 0 ? C.brand3 : i === 2 ? C.amber : C.green,
      fill: C.bgSoft
    });
  });
  slide.addText("Static web app. No backend. Judges can run it in 30 seconds.", {
    x: 0.6, y: 6.45, w: 12.1, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Inter",
    color: C.inkSoft, align: "center", margin: 0
  });
  footer(slide);
}

function s8_path() {
  const slide = pptx.addSlide();
  bg(slide);
  topbar(slide, { kicker: "Path after Frontier", slideNumber: 8 });
  bigTitle(slide, "From local simulator to production guardrail.", { y: 1.4, size: 36 });
  bullets(slide, [
    "Land with AI builders and student teams using paid APIs.",
    "Add SPL USDC settlement and pay.sh / x402 request parsing.",
    "Add team approval workflows, anomaly alerts, and spend analytics.",
    "Move policy checks into wallet middleware and server-side authorization."
  ], { x: 0.65, y: 3.0, w: 7.2, size: 14, accent: C.brand2 });
  card(slide, {
    x: 8.0, y: 2.85, w: 4.7, h: 3.7,
    kicker: "Why this can win",
    title: "Completes the rail.",
    body: "The problem is current. The demo is concrete. The Solana integration is real. The wedge does not fight the ecosystem — it completes it.",
    accent: C.brand2, fill: C.bgSoft
  });
  gradientBand(slide, 6.6);
  slide.addText("AgentPass Guard", {
    x: 0.6, y: 6.05, w: 6, h: 0.45,
    fontSize: 16, bold: true, fontFace: "Inter",
    color: C.ink, valign: "middle", margin: 0
  });
  slide.addText("github.com/currentlycodinng/agentpass-guard", {
    x: W - 7, y: 6.05, w: 6.4, h: 0.45,
    fontSize: 11, fontFace: MONO, color: C.muted,
    align: "right", valign: "middle", margin: 0
  });
  footer(slide);
}

[s1_cover, s2_problem, s3_whyNow, s4_product, s5_demo, s6_solana, s7_built, s8_path].forEach((fn) => fn());

const out = "deliverables/agentpass-guard-frontier-deck.pptx";
await pptx.writeFile({ fileName: out });
console.log(`Wrote ${out}`);
