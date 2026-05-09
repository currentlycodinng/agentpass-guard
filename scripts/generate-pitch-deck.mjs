import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "AgentPass Guard";
pptx.company = "AgentPass Guard";
pptx.subject = "Colosseum Frontier Hackathon Pitch";
pptx.title = "AgentPass Guard";
pptx.lang = "en-US";
pptx.theme = { headFontFace: "Inter", bodyFontFace: "Inter", lang: "en-US" };

const C = {
  ink: "0B1020", inkSoft: "2B3556", muted: "6B7393",
  line: "E6E8F0", lineStrong: "D2D7E3",
  bg: "FFFFFF", bgSoft: "F6F7FB",
  brand: "14F195", brand2: "9945FF", brand3: "00D1FF",
  green: "047857", greenSoft: "ECFDF5",
  red: "B42318", redSoft: "FEE2E2",
  amber: "B45309", amberSoft: "FEF3C7",
  dark: "0B1020", darkPanel: "131A36"
};

const W = 13.333;
const H = 7.5;
const MONO = "JetBrains Mono";

const SHOTS = {
  hero: "assets/screenshots/01-hero.png",
  how: "assets/screenshots/02-how.png",
  demo: "assets/screenshots/03-demo.png",
  receipts: "assets/screenshots/04-receipts.png",
  proof: "assets/screenshots/05-proof.png",
  submission: "assets/screenshots/06-submission.png",
  approved: "assets/screenshots/07-decision-approved.png",
  blocked: "assets/screenshots/08-decision-blocked.png",
  approval: "assets/screenshots/09-decision-approval.png"
};

function bg(slide, color = C.bg) { slide.background = { color }; }
function darkBg(slide) { slide.background = { color: C.dark }; }

function brandMark(slide, x, y, dark = false) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 0.42, h: 0.42, rectRadius: 0.08, fill: { color: C.brand }, line: { color: C.brand } });
  slide.addShape(pptx.ShapeType.roundRect, { x: x + 0.08, y: y + 0.08, w: 0.32, h: 0.32, rectRadius: 0.06, fill: { color: C.brand3 }, line: { color: C.brand3 } });
  slide.addText("AP", { x, y, w: 0.42, h: 0.42, fontSize: 11, bold: true, color: dark ? "FFFFFF" : "06140F", align: "center", valign: "middle", fontFace: "Inter", margin: 0 });
}

function topbar(slide, { dark = false, kicker = null, slideNumber = null, total = 8 } = {}) {
  brandMark(slide, 0.6, 0.32, dark);
  slide.addText("AgentPass Guard", { x: 1.15, y: 0.32, w: 4, h: 0.42, fontSize: 11, bold: true, fontFace: "Inter", color: dark ? "FFFFFF" : C.ink, valign: "middle", margin: 0 });
  if (kicker) {
    slide.addText(kicker.toUpperCase(), { x: 5.2, y: 0.32, w: 6, h: 0.42, fontSize: 8.5, bold: true, fontFace: MONO, charSpacing: 1.5, color: dark ? "98A3C7" : C.muted, valign: "middle", margin: 0 });
  }
  if (slideNumber) {
    slide.addText(`${String(slideNumber).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, { x: W - 1.6, y: 0.32, w: 1, h: 0.42, fontSize: 9, fontFace: MONO, color: dark ? "98A3C7" : C.muted, align: "right", valign: "middle", margin: 0 });
  }
}

function footer(slide, { dark = false } = {}) {
  slide.addText("github.com/currentlycodinng/agentpass-guard", { x: 0.6, y: 7.05, w: 8, h: 0.25, fontSize: 8, fontFace: MONO, color: dark ? "5B6594" : C.muted, valign: "middle", margin: 0 });
  slide.addText("Colosseum Frontier · 2026", { x: W - 5, y: 7.05, w: 4.4, h: 0.25, fontSize: 8, fontFace: MONO, color: dark ? "5B6594" : C.muted, align: "right", valign: "middle", margin: 0 });
}

function bigTitle(slide, text, { x = 0.6, y = 1.4, w = 12.1, color = C.ink, size = 40 } = {}) {
  slide.addText(text, { x, y, w, h: 1.6, fontSize: size, bold: true, fontFace: "Inter", color, fit: "shrink", margin: 0 });
}

function lead(slide, text, { x = 0.6, y = 3.0, w = 11, color = C.inkSoft, size = 16 } = {}) {
  slide.addText(text, { x, y, w, h: 1.0, fontSize: size, fontFace: "Inter", color, fit: "shrink", margin: 0 });
}

function gradientBand(slide, y, x = 0.6, totalW = 12) {
  const segW = totalW / 3;
  slide.addShape(pptx.ShapeType.rect, { x, y, w: segW, h: 0.06, fill: { color: C.brand }, line: { color: C.brand } });
  slide.addShape(pptx.ShapeType.rect, { x: x + segW, y, w: segW, h: 0.06, fill: { color: C.brand3 }, line: { color: C.brand3 } });
  slide.addShape(pptx.ShapeType.rect, { x: x + segW * 2, y, w: segW, h: 0.06, fill: { color: C.brand2 }, line: { color: C.brand2 } });
}

function bullets(slide, items, { x, y, w, size = 14, color = C.ink, accent = C.brand2 } = {}) {
  const lineH = 0.5;
  items.forEach((text, i) => {
    const iy = y + i * lineH;
    slide.addShape(pptx.ShapeType.ellipse, { x, y: iy + 0.18, w: 0.14, h: 0.14, fill: { color: accent }, line: { color: accent } });
    slide.addText(text, { x: x + 0.32, y: iy, w: w - 0.32, h: lineH, fontSize: size, fontFace: "Inter", color, valign: "top", margin: 0 });
  });
}

function imageFrame(slide, path, { x, y, w, h, sizing = "contain" }) {
  // Soft drop shadow effect via offset darker rect + thin border rect
  slide.addShape(pptx.ShapeType.roundRect, { x: x + 0.05, y: y + 0.08, w, h, rectRadius: 0.08, fill: { color: "0B1020", transparency: 92 }, line: { color: "0B1020", transparency: 92 } });
  slide.addImage({ path, x, y, w, h, sizing: { type: sizing === "cover" ? "cover" : "contain", w, h } });
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.line, width: 0.75 } });
}

function captionRow(slide, kicker, title, y) {
  slide.addText(kicker.toUpperCase(), { x: 0.6, y, w: 12, h: 0.3, fontSize: 9, bold: true, fontFace: MONO, charSpacing: 2, color: C.muted, margin: 0 });
  slide.addText(title, { x: 0.6, y: y + 0.32, w: 12.1, h: 0.7, fontSize: 26, bold: true, fontFace: "Inter", color: C.ink, fit: "shrink", margin: 0 });
}

// ---------- slides ----------

function s1_cover() {
  const slide = pptx.addSlide();
  darkBg(slide);
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.dark }, line: { color: C.dark } });
  slide.addShape(pptx.ShapeType.ellipse, { x: -2, y: -2, w: 8, h: 8, fill: { color: "1A2244", transparency: 50 }, line: { color: "1A2244" } });
  slide.addShape(pptx.ShapeType.ellipse, { x: 7, y: 3, w: 8, h: 8, fill: { color: "20184D", transparency: 60 }, line: { color: "20184D" } });

  brandMark(slide, 0.6, 0.55, true);
  slide.addText("AgentPass Guard", { x: 1.2, y: 0.55, w: 6, h: 0.5, fontSize: 14, bold: true, fontFace: "Inter", color: "FFFFFF", valign: "middle", margin: 0 });
  slide.addText("COLOSSEUM FRONTIER · AI × SOLANA", { x: W - 5.5, y: 0.55, w: 4.9, h: 0.5, fontSize: 9, bold: true, fontFace: MONO, charSpacing: 2, color: "98A3C7", align: "right", valign: "middle", margin: 0 });

  slide.addText("Agents can now pay.", { x: 0.7, y: 2.4, w: 12, h: 1.3, fontSize: 56, bold: true, fontFace: "Inter", color: "FFFFFF", margin: 0 });
  slide.addText([
    { text: "You decide ", options: { color: "E6E8F5", fontFace: "Inter", bold: true } },
    { text: "what", options: { color: "FFFFFF", fontFace: "Instrument Serif", italic: true, bold: false } },
    { text: " they're allowed to buy.", options: { color: "E6E8F5", fontFace: "Inter", bold: true } }
  ], { x: 0.7, y: 3.5, w: 12, h: 1.3, fontSize: 56, margin: 0 });

  slide.addText("Policy simulator and guard layer for AI agents using pay.sh / x402-style payments on Solana.", { x: 0.7, y: 5.05, w: 9.5, h: 0.7, fontSize: 17, fontFace: "Inter", color: "CBD1EA", margin: 0 });

  slide.addShape(pptx.ShapeType.roundRect, { x: 0.7, y: 5.95, w: 2.6, h: 0.55, rectRadius: 0.27, fill: { color: C.brand }, line: { color: C.brand } });
  slide.addText("Run the demo →", { x: 0.7, y: 5.95, w: 2.6, h: 0.55, fontSize: 13, bold: true, fontFace: "Inter", color: "06140F", align: "center", valign: "middle", margin: 0 });
  slide.addText("currentlycodinng.github.io/agentpass-guard", { x: 3.5, y: 5.95, w: 6, h: 0.55, fontSize: 11, fontFace: MONO, color: "98A3C7", valign: "middle", margin: 0 });

  gradientBand(slide, 6.95);
}

function s2_problem() {
  const slide = pptx.addSlide();
  bg(slide);
  topbar(slide, { kicker: "The new problem", slideNumber: 2 });
  bigTitle(slide, "Agents can pay. Now humans need controls.", { y: 1.4, size: 40 });
  lead(slide, "Builders without a policy layer have two bad choices: approve every micro-payment by hand, or hand the agent unlimited credentials. Neither scales.", { y: 3.0, size: 16 });
  bullets(slide, [
    "pay.sh and x402 unlock agent-paid APIs on Solana.",
    "Unrestricted agent wallets are unsafe.",
    "Manual approval for every micro-payment kills autonomy.",
    "Builders need to test budget, allowlist, threshold, and revocation before live spend."
  ], { x: 0.65, y: 4.2, w: 12, size: 14 });
  footer(slide);
}

function s3_product() {
  // Screenshot-led: show the wedge section UI
  const slide = pptx.addSlide();
  bg(slide);
  topbar(slide, { kicker: "The product", slideNumber: 3 });
  captionRow(slide, "The wedge", "Pay.sh and x402 give agents a checkout. We give builders the brakes.", 1.3);
  imageFrame(slide, SHOTS.how, { x: 0.6, y: 2.65, w: 12.1, h: 4.05 });
  footer(slide);
}

function s4_demo_overview() {
  const slide = pptx.addSlide();
  bg(slide);
  topbar(slide, { kicker: "Live demo", slideNumber: 4 });
  captionRow(slide, "How it runs", "Set a policy. Watch the agent get checked. Three actions, three traces.", 1.3);
  imageFrame(slide, SHOTS.demo, { x: 0.6, y: 2.65, w: 12.1, h: 4.05 });
  footer(slide);
}

function s5_three_decisions() {
  const slide = pptx.addSlide();
  bg(slide);
  topbar(slide, { kicker: "Three decisions", slideNumber: 5 });
  bigTitle(slide, "Approved. Blocked. Paused for human.", { y: 1.4, size: 32 });
  // 3 columns
  const colW = 4.0;
  const gap = 0.18;
  const startX = (W - (colW * 3 + gap * 2)) / 2;
  const imgY = 2.5;
  const imgH = 3.4;
  const labelY = imgY + imgH + 0.15;

  imageFrame(slide, SHOTS.approved, { x: startX, y: imgY, w: colW, h: imgH, sizing: "cover" });
  imageFrame(slide, SHOTS.blocked, { x: startX + colW + gap, y: imgY, w: colW, h: imgH, sizing: "cover" });
  imageFrame(slide, SHOTS.approval, { x: startX + (colW + gap) * 2, y: imgY, w: colW, h: imgH, sizing: "cover" });

  const captions = [
    { kicker: "0.008 USDC", title: "Auto-approved", c: C.green },
    { kicker: "Allowlist fail", title: "Blocked", c: C.red },
    { kicker: "0.075 USDC", title: "Needs human", c: C.amber }
  ];
  captions.forEach((cap, i) => {
    const cx = startX + i * (colW + gap);
    slide.addText(cap.kicker.toUpperCase(), { x: cx, y: labelY, w: colW, h: 0.25, fontSize: 8.5, bold: true, fontFace: MONO, charSpacing: 1.5, color: cap.c, margin: 0 });
    slide.addText(cap.title, { x: cx, y: labelY + 0.25, w: colW, h: 0.4, fontSize: 16, bold: true, fontFace: "Inter", color: C.ink, margin: 0 });
  });

  footer(slide);
}

function s6_why_solana() {
  const slide = pptx.addSlide();
  darkBg(slide);
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.dark }, line: { color: C.dark } });
  slide.addShape(pptx.ShapeType.ellipse, { x: 8, y: -2, w: 8, h: 8, fill: { color: "1A2244", transparency: 50 }, line: { color: "1A2244" } });
  topbar(slide, { dark: true, kicker: "Why Solana", slideNumber: 6 });
  bigTitle(slide, "Small, frequent, programmatic — with receipts.", { y: 1.4, size: 34, color: "FFFFFF" });

  bullets(slide, [
    "Fast confirmation keeps agent workflows interactive.",
    "Low fees make sub-cent API payments economically viable.",
    "Wallet-native identities map cleanly to autonomous agents.",
    "Memo program turns each settlement into an inspectable receipt."
  ], { x: 0.65, y: 3.0, w: 6.5, size: 14, color: "E6E8F5", accent: C.brand });

  // dark code card
  const cx = 7.6, cy = 2.85, cw = 5.1, ch = 3.7;
  slide.addShape(pptx.ShapeType.roundRect, { x: cx, y: cy, w: cw, h: ch, rectRadius: 0.08, fill: { color: C.darkPanel }, line: { color: "1A2244", width: 0.75 } });
  slide.addText("DEVNET PROOF", { x: cx + 0.3, y: cy + 0.3, w: cw - 0.6, h: 0.3, fontSize: 9, bold: true, fontFace: MONO, charSpacing: 1.5, color: "98A3C7", margin: 0 });
  slide.addText("$ npm run devnet:demo", { x: cx + 0.3, y: cy + 0.6, w: cw - 0.6, h: 0.5, fontSize: 18, bold: true, fontFace: MONO, color: C.brand, margin: 0 });
  slide.addText(
    "Creates a temp wallet, sends a tiny payment, attaches a Memo-program receipt, prints the explorer link. Falls back to a simulated receipt if the public faucet is rate-limited.",
    { x: cx + 0.3, y: cy + 1.4, w: cw - 0.6, h: 2.2, fontSize: 12, fontFace: "Inter", color: "CBD1EA", valign: "top", margin: 0 }
  );

  footer(slide, { dark: true });
}

function s7_built() {
  const slide = pptx.addSlide();
  bg(slide);
  topbar(slide, { kicker: "Built so far", slideNumber: 7 });
  captionRow(slide, "What's shipping", "Static app. No backend. Judges run it in 30 seconds.", 1.3);
  imageFrame(slide, SHOTS.receipts, { x: 0.6, y: 2.65, w: 12.1, h: 4.05 });
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

  const cx = 8.0, cy = 2.85, cw = 4.7, ch = 3.7;
  slide.addShape(pptx.ShapeType.roundRect, { x: cx, y: cy, w: cw, h: ch, rectRadius: 0.08, fill: { color: C.bgSoft }, line: { color: C.line, width: 0.75 } });
  slide.addText("WHY THIS CAN WIN", { x: cx + 0.3, y: cy + 0.3, w: cw - 0.6, h: 0.3, fontSize: 9, bold: true, fontFace: MONO, charSpacing: 1.5, color: C.brand2, margin: 0 });
  slide.addText("Completes the rail.", { x: cx + 0.3, y: cy + 0.6, w: cw - 0.6, h: 0.6, fontSize: 22, bold: true, fontFace: "Inter", color: C.ink, margin: 0 });
  slide.addText("The problem is current. The demo is concrete. The Solana integration is real. The wedge does not fight the ecosystem — it completes it.", { x: cx + 0.3, y: cy + 1.4, w: cw - 0.6, h: 2.2, fontSize: 13, fontFace: "Inter", color: C.inkSoft, valign: "top", margin: 0 });

  gradientBand(slide, 6.6);
  slide.addText("AgentPass Guard", { x: 0.6, y: 6.05, w: 6, h: 0.45, fontSize: 16, bold: true, fontFace: "Inter", color: C.ink, valign: "middle", margin: 0 });
  slide.addText("currentlycodinng.github.io/agentpass-guard", { x: W - 7, y: 6.05, w: 6.4, h: 0.45, fontSize: 11, fontFace: MONO, color: C.muted, align: "right", valign: "middle", margin: 0 });

  footer(slide);
}

[s1_cover, s2_problem, s3_product, s4_demo_overview, s5_three_decisions, s6_why_solana, s7_built, s8_path].forEach((fn) => fn());

const out = "deliverables/agentpass-guard-frontier-deck.pptx";
await pptx.writeFile({ fileName: out });
console.log(`Wrote ${out}`);
