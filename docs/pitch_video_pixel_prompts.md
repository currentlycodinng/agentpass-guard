# Pixel-Art Pitch Video — Prompts and Pipeline

> ⚠️ **Tonal warning:** This style is fun but is a risky choice for a B2B AI-infra hackathon submission. The pitch-video prompt asks judges to evaluate how you think and communicate — stylization hides that. If you go this route, treat the pitch video as the secondary deliverable and lean hard on the live demo and deck for credibility.

This doc gives you everything needed to build a 2-minute Terraria-style animated pitch starring Amina and Artem.

## Pipeline overview

| Step | Tool | Output |
|---|---|---|
| 1. Generate two avatars | Midjourney / GPT-image-1 / Stable Diffusion | 2 PNGs of pixel-art characters |
| 2. Generate voice-over | ElevenLabs / OpenAI TTS | 2 audio files (Amina's lines + Artem's lines) |
| 3. Generate video clips | Sora / Veo / Runway / Pika | 8–12 short clips (each 5–15s) |
| 4. Optional lip-sync overlay | Wav2Lip / HeyGen | Mouth-animated clips |
| 5. Edit + caption | DaVinci Resolve / CapCut / iMovie | Final 2-min video |

---

## Prompt 1 — Avatars (image generator)

Use this in **Midjourney**, **GPT image generation**, or **Stable Diffusion**. Run it twice with the character variations swapped.

```
Pixel-art character sprite in the style of Terraria — 16-bit, 64x64
canvas, side-view, full-body standing pose, transparent background,
crisp pixel edges, no anti-aliasing.

Character: a young woman builder, mid-twenties, dark hair tied back,
wearing a dark hoodie with a small mint-green logo patch over the
chest, blue jeans, sneakers, holding a small holographic policy
panel made of cyan light. Confident calm posture. Solana-themed
accent palette (mint green #14F195, cyan #00D1FF, purple #9945FF)
on the holographic panel.

Background: transparent. No background scenery.
Lighting: flat 2D, slight rim light from upper-right.
Style references: Terraria, Stardew Valley, Hyper Light Drifter
sprites. NOT Minecraft (no voxels/3D).
```

For **Artem**, swap the character description:

```
Character: a young man builder, mid-twenties, short dark hair, slight
beard, wearing a dark hoodie with a small mint-green logo patch over
the chest, dark trousers, sneakers, holding a small holographic
terminal window made of cyan light with green text. Calm focused
posture.
```

> Replace the character details with what Amina and Artem actually look like. Pixel art forgives a lot, so vibe over precision.

## Prompt 2 — Background scene (image generator)

If your video tool wants a scene to set the avatars in:

```
Pixel-art Terraria-style indoor scene, 16-bit, side-view 2D platformer
perspective, low-saturation dark mode palette. A cozy hacker workshop:
wooden floor, a workbench in the foreground with two glowing monitors
showing pixelated UI dashboards, a window in the back showing a starry
night sky with a faint Solana logo constellation in mint green and
purple. Soft warm lamp light from the left. Empty floor space in the
center wide enough for two character sprites to stand and face each
other. Transparent zone for character placement.
```

## Prompt 3 — Voice-over scripts

Generate audio with **ElevenLabs**, **OpenAI TTS** (alloy or shimmer voices), or **PlayHT**. Two voices, alternating lines.

Save the existing pitch script (`docs/pitch_video_script.md`) and split it between Amina and Artem. Suggested split:

**Amina (0:00–0:20 · who we are)**
> "Hi, I'm Amina. This is Artem. We're builders working on AI tooling, and AgentPass Guard is our submission to Colosseum Frontier."

**Artem (0:20–0:50 · the problem)**
> "AI agents can now pay for APIs on Solana through pay.sh and x402. That unlocks a lot — but it creates a control problem. Builders today either approve every micro-payment by hand, which breaks autonomy, or hand the agent unlimited credentials, which is unsafe."

**Amina (0:50–1:20 · the product)**
> "AgentPass Guard sits between the agent and the payment rail. A human writes a pass — budget, allowlist, threshold, expiry, revocation — and every paid call gets evaluated and explained before settlement."

**Artem (1:20–1:40 · why us)**
> "We're building this because we're the users. We work with agents that call paid APIs every day. We've felt the choice between giving the agent too much access or babysitting every action."

**Amina (1:40–2:00 · the close)**
> "The product is live, the code is open, the deck is linked in the submission. Whether or not this wins, we're going to keep building it. Thanks for watching."

## Prompt 4 — Video clip generator (Sora / Veo / Runway / Pika)

You'll generate one clip per beat. Here's a template — adapt for each beat.

```
2D side-scrolling pixel-art animation, Terraria visual style, 16-bit
sprites, ~12fps stop-motion feel. Camera fixed wide on a cozy hacker
workshop interior with wooden floor, a workbench with two glowing
monitors showing pixel dashboards, and a starry night window in the
back.

Two pixel-art characters (Amina on the left, Artem on the right)
stand facing the camera. They take turns speaking. When Amina speaks,
small mouth pixels animate on her sprite and a tiny chat bubble with
her line appears above her head. Same for Artem when he speaks.

Audio: voice-over plays the line shown below.
Subtle ambient: soft synth pad, faint typing keys.

Beat 1 (5s): Amina says "Hi, I'm Amina. This is Artem."
[continue with subsequent beats]

NO 3D, NO Minecraft, NO realistic faces, NO live action. Strict
pixel-art Terraria aesthetic. Crisp 1px outlines. Limited palette
(mint #14F195, cyan #00D1FF, purple #9945FF, dark slate #0B1020,
warm wood browns).
```

> Generate clips one at a time, then string them together.

## Realistic time estimate

| Task | Time |
|---|---|
| Avatar generation + iteration | 30 min |
| Voice-over generation + cleanup | 20 min |
| Background scene generation | 15 min |
| 8 video clips × ~5 min each (with retries) | 60–90 min |
| Editing, syncing audio, captions | 45 min |
| **Total** | **~3 hours** |

## When to abandon and ship voice-over instead

If after 60 minutes you don't have:
- Two avatars you're happy with, AND
- Two clean voice-over tracks, AND
- One video clip that actually animates them speaking

→ stop. Record the voice-over pitch from `pitch_video_script.md` (no-face variant) instead. Voice over the live-site hero takes 5 minutes and judges will take the substance more seriously than half-finished pixel art.

## Tools quick-reference

- **GPT image generation** — fast, good with text-style prompts. Built into ChatGPT/Claude.
- **Midjourney** — best aesthetic, requires Discord. Use `--ar 1:1 --style raw` and reference Terraria sprites.
- **ElevenLabs** — best TTS quality. Free tier covers a 2-min script.
- **OpenAI TTS** — cheaper, decent quality. `tts-1-hd` voice "alloy" or "nova" works for narration.
- **Sora** — best for short clips, character consistency is the weak point.
- **Runway Gen-3** — solid for 5–10s clips. Image-to-video keeps avatars consistent.
- **Pika 1.5** — cheapest, decent for 3–5s clips.
- **HeyGen** — if you want clean lip-sync but accept non-pixel-art avatars instead.
- **DaVinci Resolve** (free) — pro-grade editor. Overkill but free.
- **CapCut** — fastest learning curve for assembling clips with audio.
