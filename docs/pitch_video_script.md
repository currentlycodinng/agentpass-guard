# Pitch Video Script — AgentPass Guard

**Target:** ≤2:00 · **Format:** Camera on. You. Talking. Looking at the lens.
**Colosseum prompt:** "Introduce yourselves, tell us what you're building, and tell us why you're the people to build it. Nothing fancy required. We're interested in how you think and communicate."
**Tool:** QuickTime → File → New Movie Recording. Built-in MacBook camera is fine. Good lighting (daylight near a window) > expensive gear.

## Pre-flight

- Sit facing a window or a soft lamp. No backlight.
- Tidy whatever's behind you. Don't worry about a "studio" — clean wall is fine.
- Test audio. MacBook mic is acceptable; AirPods or any USB mic is better.
- Don't read off-screen. Look at the camera lens, not the preview.
- Practice the script twice out loud before recording.

---

## 0:00 — 0:20 · Who you are

> "Hi, I'm Amina Akhmedova. I'm a builder based in the Netherlands working on AI tooling, and AgentPass Guard is my submission to Colosseum Frontier. This is my first Solana project — I built it specifically for this hackathon because the problem felt timely and the wedge felt right."

*(Adjust details if you want to mention background, what you're studying / working on, what got you into AI agents.)*

## 0:20 — 1:00 · What you're building

> "AgentPass Guard is a policy simulator and guard layer for AI agents that pay for APIs on Solana. With pay.sh and x402-style flows, agents can now discover services, see a price, and pay autonomously. That unlocks a lot — but it creates a control problem. Builders today either approve every micro-payment by hand, which breaks autonomy, or hand the agent unlimited credentials, which is unsafe. AgentPass sits between the agent and the payment rail. A human writes a pass — budget, allowlist, threshold, expiry, revocation — and every paid call gets evaluated and explained before settlement. Inside policy: it can settle on Solana with a Memo-program receipt. Outside policy: blocked or paused for a human."

## 1:00 — 1:40 · Why you're the right person to build it

> "I'm building this because I'm the user. I work with agents that call paid APIs every day, and I have felt the choice between giving the agent too much access or babysitting every action. I'm comfortable shipping fast — for this hackathon I designed the policy model, built the static demo, wired the Solana devnet path, and made the visual system end-to-end in a few days. I think the agentic-payments space is going to need a builder-facing control plane the same way the cloud needed IAM, and I want to be the person building the simplest possible version of that on Solana."

*(Adjust this paragraph to reflect what you've actually shipped before, why you care, what you'd keep building if you got the time and the prize.)*

## 1:40 — 2:00 · The close

> "The product is live, the code is open, the deck and demo video are linked in the submission. Whether or not this wins, I'm going to keep building it. Thanks for watching."

---

## What this video is NOT

- Not a product demo. **No screen sharing.** Save that for the demo video.
- Not a deep dive. Two minutes total. Be concrete and confident.
- Not scripted-sounding. Read the script three times, then talk like a person.

## What judges actually want from this video

> "How do you think and communicate?"

That's the prompt. They want to see whether they'd want to back you. Calm beats hyped. Specific beats abstract. Honest about being early beats overclaiming. If you ship a clear, calm 90-second video, you've already done better than most submissions.

## If you go over 2:00

Cut the second sentence of the "what you're building" paragraph (the one about pay.sh / x402). The previous sentence already implies it.

---

# Alternative: pitch video without your face

Colosseum allows it ("nothing fancy required"), but you should know the trade-off: the prompt asks you to *introduce yourselves* and they want to judge *how you communicate*. With no face, all the weight goes to your voice. That's fine — many strong pitches are voice-over — as long as the audio is clear and confident.

## Setup

- **Visuals:** screen recording of the live site, slowly scrolling top to bottom OR holding still on the hero. Do NOT walk through the product (that's the demo video's job). Or use the static brand banner as a backdrop:
  `https://currentlycodinng.github.io/agentpass-guard/assets/logo/logo-banner-dark-1600.png`
- **Audio:** AirPods or any USB mic > built-in MacBook mic. Record in a quiet room, no echo.
- **Tool:** QuickTime → Cmd+Shift+5 → Record Selected Portion (with mic enabled), OR Loom screen-only with mic on.

## Visual options, ranked

1. **Hero of the live site, full screen, no mouse movement.** Most professional. Same brand language as everything else.
2. **The dark logo banner held for the full 2 minutes.** Cleanest, most graphic-design-y. Lets your voice carry the whole video.
3. **Slow vertical scroll through the live site.** Natural rhythm but slightly distracting.

Pick #1 or #2. Don't pick a still photo of yourself — that's worse than your real face on camera.

## Script (use the same words as the on-camera version)

The exact lines above (0:00–2:00) work word-for-word. The audio carries the meaning; the visuals are wallpaper.

## Why audio matters more here

Without your face, judges form their impression entirely from how you sound. Three things to nail:

- **Pace.** Slow enough to follow, fast enough to feel awake. ~150 words/min.
- **Energy delta.** Slightly higher on the opener and the closer, calmer in the middle.
- **Clean takes.** Re-record in full rather than splicing. Splices in voice-only video are obvious and hurt credibility more than imperfect pacing.

## Final note

If you can do an on-camera version, do it. Two minutes of you talking honestly beats two minutes of polished voice-over for this prompt specifically. But if camera-on isn't going to happen, the voice-over option is fine — just make the audio count.
