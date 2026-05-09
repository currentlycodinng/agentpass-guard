import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "AgentPass Guard";
pptx.company = "AgentPass Guard";
pptx.subject = "Colosseum Frontier Hackathon Pitch";
pptx.title = "AgentPass Guard";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US"
};

const C = {
  ink: "152033",
  muted: "667085",
  line: "D9E0EA",
  bg: "F5F7FB",
  panel: "FFFFFF",
  teal: "0F766E",
  tealLight: "CCFBF1",
  blue: "2563EB",
  blueLight: "DBEAFE",
  amber: "B45309",
  amberLight: "FEF3C7",
  red: "B42318",
  redLight: "FEE2E2",
  green: "047857",
  dark: "101828"
};

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

function addBg(slide) {
  slide.background = { color: C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: SLIDE_W,
    h: SLIDE_H,
    fill: { color: C.bg },
    line: { color: C.bg }
  });
}

function addKicker(slide, text) {
  slide.addText(text.toUpperCase(), {
    x: 0.65,
    y: 0.45,
    w: 4.5,
    h: 0.25,
    fontSize: 8.5,
    bold: true,
    color: C.teal,
    margin: 0
  });
}

function addTitle(slide, text, y = 0.78, size = 34) {
  slide.addText(text, {
    x: 0.65,
    y,
    w: 7.6,
    h: 0.75,
    fontSize: size,
    bold: true,
    color: C.ink,
    fit: "shrink",
    margin: 0
  });
}

function addFooter(slide) {
  slide.addText("AgentPass Guard | Colosseum Frontier", {
    x: 0.65,
    y: 7.05,
    w: 4.5,
    h: 0.2,
    fontSize: 7.5,
    color: "8A94A6",
    margin: 0
  });
}

function addCard(slide, { x, y, w, h, title, body, color = C.teal, fill = C.panel }) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: C.line, width: 1 }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w: 0.09,
    h,
    fill: { color },
    line: { color }
  });
  slide.addText(title, {
    x: x + 0.22,
    y: y + 0.18,
    w: w - 0.42,
    h: 0.3,
    fontSize: 14,
    bold: true,
    color: C.ink,
    margin: 0
  });
  slide.addText(body, {
    x: x + 0.22,
    y: y + 0.58,
    w: w - 0.42,
    h: h - 0.75,
    fontSize: 10.5,
    color: C.muted,
    breakLine: false,
    fit: "shrink",
    valign: "top",
    margin: 0
  });
}

function addBullets(slide, items, x, y, w, h, fontSize = 16) {
  slide.addText(
    items.map((item) => ({ text: item, options: { bullet: { indent: 12 }, hanging: 4 } })),
    {
      x,
      y,
      w,
      h,
      fontSize,
      color: C.ink,
      breakLine: false,
      fit: "shrink",
      margin: 0
    }
  );
}

function addFlowStep(slide, index, label, x, y, color = C.teal) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w: 2.25,
    h: 1.0,
    rectRadius: 0.08,
    fill: { color: "FFFFFF" },
    line: { color: C.line }
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.18,
    y: y + 0.25,
    w: 0.5,
    h: 0.5,
    fill: { color },
    line: { color }
  });
  slide.addText(String(index), {
    x: x + 0.18,
    y: y + 0.34,
    w: 0.5,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: "FFFFFF",
    align: "center",
    margin: 0
  });
  slide.addText(label, {
    x: x + 0.82,
    y: y + 0.22,
    w: 1.15,
    h: 0.55,
    fontSize: 12,
    bold: true,
    color: C.ink,
    fit: "shrink",
    margin: 0
  });
}

function addArrow(slide, x, y) {
  slide.addShape(pptx.ShapeType.line, {
    x,
    y,
    w: 0.55,
    h: 0,
    line: { color: "94A3B8", width: 1.3, beginArrowType: "none", endArrowType: "triangle" }
  });
}

function slide1() {
  const slide = pptx.addSlide();
  addBg(slide);
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 4.25,
    h: SLIDE_H,
    fill: { color: C.dark },
    line: { color: C.dark }
  });
  slide.addText("AP", {
    x: 0.72,
    y: 0.78,
    w: 0.85,
    h: 0.6,
    fontSize: 22,
    bold: true,
    color: "CCFBF1",
    margin: 0
  });
  slide.addText("AgentPass Guard", {
    x: 0.72,
    y: 2.15,
    w: 3.05,
    h: 0.9,
    fontSize: 27,
    bold: true,
    color: "FFFFFF",
    fit: "shrink",
    margin: 0
  });
  slide.addText("Policy simulator and guard layer for AI agents that pay for APIs on Solana.", {
    x: 0.72,
    y: 3.18,
    w: 2.9,
    h: 0.85,
    fontSize: 17,
    color: "D0D5DD",
    fit: "shrink",
    margin: 0
  });
  slide.addText("Test agent payment policies before real spend.", {
    x: 5.1,
    y: 2.1,
    w: 6.9,
    h: 1.35,
    fontSize: 30,
    bold: true,
    color: C.ink,
    fit: "shrink",
    margin: 0
  });
  addCard(slide, {
    x: 5.1,
    y: 4.1,
    w: 2.2,
    h: 1.1,
    title: "Budget",
    body: "0.25 USDC daily cap",
    color: C.teal,
    fill: C.tealLight
  });
  addCard(slide, {
    x: 7.65,
    y: 4.1,
    w: 2.2,
    h: 1.1,
    title: "Allowlist",
    body: "Approved APIs only",
    color: C.blue,
    fill: C.blueLight
  });
  addCard(slide, {
    x: 10.2,
    y: 4.1,
    w: 2.2,
    h: 1.1,
    title: "Receipts",
    body: "Solana audit trail",
    color: C.amber,
    fill: C.amberLight
  });
  addFooter(slide);
}

function slide2() {
  const slide = pptx.addSlide();
  addBg(slide);
  addKicker(slide, "The new problem");
  addTitle(slide, "Agents can pay. Now humans need controls.");
  addBullets(
    slide,
    [
      "Agents can discover and pay for APIs through pay.sh/x402-style flows.",
      "Unrestricted agent wallets are unsafe.",
      "Manual approval for every tiny action breaks autonomy.",
      "Builders need to test budget, allowlist, threshold, revocation, and receipts."
    ],
    0.8,
    2.0,
    5.5,
    3.5,
    17
  );
  addCard(slide, {
    x: 7.15,
    y: 1.8,
    w: 4.7,
    h: 3.7,
    title: "The missing layer",
    body:
      "The payment rail is arriving. The trust layer is still missing. Before teams let agents spend real money, they need explicit spending rules and a clean audit trail.",
    color: C.teal,
    fill: "FFFFFF"
  });
  addFooter(slide);
}

function slide3() {
  const slide = pptx.addSlide();
  addBg(slide);
  addKicker(slide, "Why now");
  addTitle(slide, "Agent-paid APIs are becoming real.");
  addCard(slide, {
    x: 0.75,
    y: 1.85,
    w: 3.5,
    h: 2.8,
    title: "Pay-per-use APIs",
    body: "pay.sh catalogs APIs that agents can call without accounts, keys, or subscriptions.",
    color: C.blue,
    fill: C.blueLight
  });
  addCard(slide, {
    x: 4.9,
    y: 1.85,
    w: 3.5,
    h: 2.8,
    title: "x402 primitives",
    body: "HTTP 402 payment flows make machine-to-machine API payments natural.",
    color: C.teal,
    fill: C.tealLight
  });
  addCard(slide, {
    x: 9.05,
    y: 1.85,
    w: 3.5,
    h: 2.8,
    title: "Solana settlement",
    body: "Low fees and fast confirmation make tiny agent payments practical.",
    color: C.amber,
    fill: C.amberLight
  });
  slide.addText("The next layer is policy: what is this agent allowed to buy?", {
    x: 1.2,
    y: 5.55,
    w: 10.9,
    h: 0.5,
    fontSize: 23,
    bold: true,
    color: C.ink,
    align: "center",
    margin: 0
  });
  addFooter(slide);
}

function slide4() {
  const slide = pptx.addSlide();
  addBg(slide);
  addKicker(slide, "The product");
  addTitle(slide, "A guardrail check before every paid action.");
  addFlowStep(slide, 1, "Agent proposes paid API call", 0.8, 2.25, C.blue);
  addArrow(slide, 3.13, 2.75);
  addFlowStep(slide, 2, "AgentPass explains checks", 3.8, 2.25, C.teal);
  addArrow(slide, 6.13, 2.75);
  addFlowStep(slide, 3, "Solana payment settles", 6.8, 2.25, C.amber);
  addArrow(slide, 9.13, 2.75);
  addFlowStep(slide, 4, "Receipt logs decision", 9.8, 2.25, C.teal);
  addCard(slide, {
    x: 1.35,
    y: 4.55,
    w: 10.6,
    h: 1.1,
    title: "Inside policy: auto-pay. Outside policy: block or ask.",
    body: "AgentPass Guard lets builders simulate and enforce the policy around pay.sh/x402-style payments.",
    color: C.dark,
    fill: "FFFFFF"
  });
  addFooter(slide);
}

function slide5() {
  const slide = pptx.addSlide();
  addBg(slide);
  addKicker(slide, "Demo");
  addTitle(slide, "Three decisions judges can inspect.");
  addCard(slide, {
    x: 0.8,
    y: 1.85,
    w: 3.65,
    h: 3.4,
    title: "Approved",
    body: "Research API call costs 0.008 USDC. Guardrail checks pass, the service is allowlisted, and a receipt is logged.",
    color: C.green,
    fill: "ECFDF5"
  });
  addCard(slide, {
    x: 4.85,
    y: 1.85,
    w: 3.65,
    h: 3.4,
    title: "Blocked",
    body: "Unapproved scraping API fails the allowlist check. AgentPass blocks before settlement.",
    color: C.red,
    fill: C.redLight
  });
  addCard(slide, {
    x: 8.9,
    y: 1.85,
    w: 3.65,
    h: 3.4,
    title: "Needs approval",
    body: "BigQuery call is allowed, but 0.075 USDC fails the auto-approval threshold and pauses.",
    color: C.amber,
    fill: C.amberLight
  });
  addFooter(slide);
}

function slide6() {
  const slide = pptx.addSlide();
  addBg(slide);
  addKicker(slide, "Why Solana");
  addTitle(slide, "Agent payments are small, frequent, and need receipts.");
  addBullets(
    slide,
    [
      "Fast settlement keeps agent workflows interactive.",
      "Low fees make tiny API payments economically viable.",
      "Wallet-native identities map cleanly to agents.",
      "Transactions and memos create an inspectable receipt path."
    ],
    0.85,
    1.8,
    5.7,
    3.3,
    17
  );
  addCard(slide, {
    x: 7.15,
    y: 1.75,
    w: 4.7,
    h: 3.4,
    title: "Devnet proof path",
    body:
      "The repo includes an optional script that creates a temporary devnet wallet, sends a tiny payment, attaches memo receipt metadata, and prints an explorer link.",
    color: C.teal,
    fill: "FFFFFF"
  });
  addFooter(slide);
}

function slide7() {
  const slide = pptx.addSlide();
  addBg(slide);
  addKicker(slide, "MVP built");
  addTitle(slide, "Narrow enough to ship. Clear enough to judge.");
  addCard(slide, {
    x: 0.8,
    y: 1.8,
    w: 2.9,
    h: 2.6,
    title: "Policy editor",
    body: "Budget, allowlist, threshold, expiry, revocation.",
    color: C.teal,
    fill: C.tealLight
  });
  addCard(slide, {
    x: 4.0,
    y: 1.8,
    w: 2.9,
    h: 2.6,
    title: "Agent runner",
    body: "Scripted paid actions for approved, blocked, and approval-needed cases.",
    color: C.blue,
    fill: C.blueLight
  });
  addCard(slide, {
    x: 7.2,
    y: 1.8,
    w: 2.9,
    h: 2.6,
    title: "Receipts",
    body: "Decision log with amount, service, status, receipt hash, and JSON export.",
    color: C.amber,
    fill: C.amberLight
  });
  addCard(slide, {
    x: 10.4,
    y: 1.8,
    w: 2.1,
    h: 2.6,
    title: "Policy export",
    body: "JSON policy and receipt exports for builder testing.",
    color: C.dark,
    fill: "FFFFFF"
  });
  slide.addText("Built as a static app so judges can run it quickly and inspect the code.", {
    x: 1.1,
    y: 5.55,
    w: 11.0,
    h: 0.45,
    fontSize: 20,
    bold: true,
    color: C.ink,
    align: "center",
    margin: 0
  });
  addFooter(slide);
}

function slide8() {
  const slide = pptx.addSlide();
  addBg(slide);
  addKicker(slide, "Path after Frontier");
  addTitle(slide, "From local simulator to production guardrail.");
  addBullets(
    slide,
    [
      "Start with AI builders and student teams using pay-per-use APIs.",
      "Add SPL USDC settlement and pay.sh/x402 request parsing.",
      "Add team approval workflows, alerts, and spend analytics.",
      "Move policy checks into wallet middleware or server-side authorization."
    ],
    0.85,
    1.75,
    6.0,
    3.65,
    17
  );
  addCard(slide, {
    x: 7.45,
    y: 1.75,
    w: 4.6,
    h: 3.65,
    title: "Why this can win",
    body:
      "The problem is current, the demo is concrete, the Solana integration is real, and the wedge does not fight the ecosystem. It completes it.",
    color: C.teal,
    fill: "FFFFFF"
  });
  slide.addText("AgentPass Guard", {
    x: 0.85,
    y: 6.15,
    w: 4.0,
    h: 0.35,
    fontSize: 20,
    bold: true,
    color: C.teal,
    margin: 0
  });
  addFooter(slide);
}

[
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  slide7,
  slide8
].forEach((makeSlide) => makeSlide());

const out = "deliverables/agentpass-guard-frontier-deck.pptx";
await pptx.writeFile({ fileName: out });
console.log(`Wrote ${out}`);
