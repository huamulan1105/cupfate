---
name: cupfate-web-builder
description: Create, adapt, review, or publish CUPFATE-style lightweight bilingual tarot entertainment websites. Use when Codex is asked to build a warm low-saturation tarot web app, work on the 纸杯命运/CUPFATE project, add one-card or three-card draws, implement 今日运势 or 心中一问 modes, improve sharing/PWA behavior, or preserve objective entertainment-only tarot language.
---

# CUPFATE Web Builder

Build or adapt a concise, warm, mobile-first tarot entertainment website while preserving neutral language, bilingual usability, and the CUPFATE visual character.

## Choose the workflow

1. Inspect the target workspace before changing files.
2. For a new project, copy the contents of `assets/cupfate-starter/` into the user-approved destination. Do not copy the enclosing `cupfate-starter` directory unless requested.
3. For an existing project, preserve its framework and unrelated user changes. Reuse only the relevant patterns or assets from the starter.
4. Read `references/product-guidelines.md` before changing tarot content, interaction modes, branding, sharing, or visual styling.
5. If the project contains `.openai/hosting.json`, use the available Sites building and hosting skills for site work and publishing.

## Preserve the product core

- Keep the experience lightweight and recreational.
- Default to the 22 Major Arcana unless the user explicitly requests a larger deck.
- Support two reading contexts: daily reflection and a privately held question.
- Support one-card and three-card draws. Explain three cards as perspectives, not fixed past/present/future predictions, unless the user explicitly chooses a spread.
- Keep Simplified Chinese and English complete and meaningfully equivalent.
- Use calm, probabilistic language. Never present a card as proof, diagnosis, command, or guaranteed forecast.
- Keep the disclaimer visible: tarot is for entertainment and self-reflection and does not replace professional advice.

## Design and interaction

- Use low-saturation Morandi pale yellow, pale blue, warm cream, muted sage, or dusty rose.
- Prefer generous spacing, restrained decoration, readable contrast, soft shadows, and subtle cupcake or paper-cup motifs.
- Keep the interface calm and premium rather than mystical, ominous, or visually crowded.
- Make primary actions obvious on a phone viewport and retain keyboard focus states.
- Provide native sharing when available and a copy-link fallback. Include useful title, description, icon, and Open Graph metadata.
- Keep PWA and offline behavior only when it remains simple and reliable.

## Implementation rules

- Keep card data and bilingual copy structured rather than scattered through UI markup.
- Preserve the existing dependency stack unless changing it has a clear user benefit.
- Avoid accounts, payments, personal-data collection, analytics, or server storage unless explicitly requested.
- Never add secrets or bind a copied project to the original CUPFATE hosting project.
- Treat randomized draws as an entertainment mechanic; do not claim spiritual, scientific, or cryptographic certainty.
- Keep third-party dependencies and assets under their own licenses. Preserve the repository license and attribution where applicable.

## Verify before handoff

1. Run the project's existing tests and production build.
2. Check Chinese and English paths, both reading contexts, and one-card and three-card draws.
3. Check a narrow mobile viewport and a desktop viewport.
4. Confirm sharing has a fallback and the entertainment disclaimer remains visible.
5. Scan tracked files for secrets before publishing.
6. Report the public application URL separately from the source or Skill URL.

