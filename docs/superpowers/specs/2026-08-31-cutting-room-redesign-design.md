# Portfolio Redesign — "The Cutting Room"

**Status:** Design approved (visual prototype signed off by client). Ready for implementation planning.
**Date:** 2026-08-31
**Client:** Obaida — short-form video editor & portfolio designer.
**Primary goal:** Land paying clients (conversion-focused portfolio).
**Visual source of truth:** `docs/design/cutting-room-prototype.html` (approved clickable prototype).

## 1. What this is

A full visual redesign of the existing, working React portfolio from the old "Cinematic
Editorial" direction (dusty rose + Cambria serif + Inter, CRT/grain/rose-pulse motifs) into
**"The Cutting Room"** — a cinematic, NLE/timeline-inspired direction built to convert visitors
into paid inquiries.

This is a **reskin + light restructure of working code**, not a from-scratch build. The current
app compiles cleanly (`tsc --noEmit` passes), all 10 section components exist, data wiring works,
GSAP is centralized in `src/lib/gsap.ts`, and real assets are in place.

## 2. Current state (verified)

- **Stack:** React 18 + Vite 5 + TypeScript + Tailwind 3 + shadcn/ui + GSAP 3 (`@gsap/react`).
- **Sections (exist, old direction):** Nav, Hero, Marquee, Studio, Journey, Work, Videos, Skills, Contact, Footer.
- **UI primitives (shadcn):** `button`, `badge`, `card`, `input`, `select`, `separator`, `textarea`.
- **GSAP pattern:** each section uses `useGSAP(() => {...}, { scope: root })` with a `prefersReducedMotion()` guard; `lib/gsap.ts` registers ScrollTrigger + useGSAP.
- **Design tokens:** old rose/serif tokens in `src/index.css` (`@layer base :root`) and `tailwind.config.js`.
- **Assets:** `public/assets/videos/*.mp4` (4 real videos, correctly served), `public/assets/logos/*`, fonts. **Bug:** `data.ts` references `/assets/screenshots/ies-bim.jpg` but `public/assets/screenshots/` contains only `download*.jpg` — screenshot path is broken and must be fixed.
- **Content:** `src/data.ts` holds all real content (contact, nav, stats, marquee, portfolios, videos, capabilities, services, journey, studio). Content stays; only Nav labels and one new Services section header change.

## 3. Design system — "The Cutting Room"

**Theme:** dark-committed (like a color-grading suite). One theme, locked. No light mode.

### Color tokens (single ember accent)
```
--bg:          #0b0c0e   near-black canvas
--panel:       #101216   cards / info panels
--elev:        #16191f   elevated surfaces
--line:        rgba(255,255,255,0.08)   hairline
--line-2:      rgba(255,255,255,0.15)   stronger hairline
--text:        #f3efe8   warm off-white
--dim:         #8a8f97   secondary text
--dim-2:       #5c616a   tertiary / captions
--accent:      #ff6a3d   ember / render-orange (THE single accent)
--accent-soft: #ff8a63   accent hover
--accent-deep: #c8431f   accent pressed
--accent-glow: rgba(255,106,61,0.18)   glow/shadow
```
- **Color Consistency Lock:** ember `#ff6a3d` is the only accent, page-wide. No second accent color anywhere. Replaces all rose usage.

### Typography (Google Fonts, self-hostable later)
- **Display:** `Bricolage Grotesque` (600/700/800) — characterful grotesque. Replaces Cambria serif.
- **Body:** `Hanken Grotesk` (400/500/600, + italic). Replaces Inter.
- **Mono (timecodes/labels/meta):** `JetBrains Mono` (400/500/600). Replaces Courier New.
- **Emphasis rule:** in-family italic in the ember accent color for one emphasized word (e.g. "finish."). No mixed-family emphasis.
- **Dropped:** Cambria, Courier New, Pixelify Sans, Inter. Remove their `@font-face`/config references.

### Shape / shadow / spacing
- **Shape Consistency Lock:** buttons = full pill (`rounded-full`); cards/panels/media = 4–6px radius; inputs = underline (no box). One documented system, applied everywhere.
- **Shadows:** tinted to ember glow on hover only (`box-shadow` with `--accent-glow`). No pure-black drop shadows, no neon glows as default.
- **Spacing:** section padding `clamp(84px, 12vw, 150px)`; container max-width 1240px; on desktop the content column is inset by the timecode rail width (`--rail: 68px`). VISUAL_DENSITY 3 (airy).

### Motion (MOTION_INTENSITY 7, all reduced-motion gated)
- **Left timecode rail** (new, desktop ≥900px): fixed rail with a scroll-linked playhead, running timecode (HH:MM:SS:FF), and an active-clip label. This carries the NLE identity so sections stay clean.
- **Hero:** staggered load sequence (eyebrow → headline → sub → CTAs → stats).
- **Scroll reveals:** fade + 26px rise on `[data-reveal]` elements via ScrollTrigger `start: "top 88%"`.
- **Capability bars:** width fill on scroll.
- **Active-section tracking:** drives nav active state + rail clip label (ScrollTrigger `onToggle`).
- **Marquee:** one CSS marquee (pauses on hover; static under reduced motion).
- All motion behind `prefersReducedMotion()`; page fully static and readable when reduced.

## 4. Structural changes vs. current sections

Keep all section IDs and content. Changes:
1. **New `Rail` component** — the fixed left timecode rail + playhead (desktop only).
2. **New `Services` section** (`#services`) — "What you can hire me for" using existing `SERVICES` data (4 items, 2-col asymmetric grid, hover ember). Currently `SERVICES` renders inside Skills; promote to its own conversion-focused section between Studio and Journey.
3. **Nav links** update to: Work, Reel (`#videos`), Services, Journey, Contact. Primary CTA "Start a project" (`#contact`). Mobile hamburger menu.
4. **Hero** — grotesque headline with one ember italic word; eyebrow "Video Editor & Motion Designer"; CTAs "Start a project" (primary) + "Watch the reel" (ghost, → `#videos`); stat strip below.
5. **Work** — fix screenshot asset path; single card constrained to max-width; ember bracket tag.
6. **Videos** — vertical 9:16 reel cards; keep existing play/pause/mute/fullscreen behavior, restyle controls to ember.
7. **Contact** — info-panel motif + email/phone/YouTube hairline links + underline-field form; keep `mailto:` behavior.
8. **App order:** Nav, Rail, Hero, Marquee, Studio, Services, Journey, Work, Videos, Skills, Contact, Footer.

### CTA intent discipline (taste rule)
One label per intent, page-wide: contact = "Start a project" (nav, hero, footer/contact all use this or "Send the brief" only inside the form). View-work = "Watch the reel". No duplicate-intent CTAs.

## 5. Execution model (subagent pipeline)

Because all agents touch a shared component tree and token layer, they run **sequentially** with
clean file ownership (parallel would clobber shared files). Each agent reads this spec + the
approved prototype.

| # | Agent | Owns / touches | Model |
|---|-------|----------------|-------|
| 1 | **Design system (UI/UX)** | `src/index.css` tokens, `tailwind.config.js`, Google Fonts, global layout/type scale | Sonnet |
| 2 | **Primitives (buttons/shapes/shadows/spacing)** | `src/components/ui/*` restyled to new tokens | Sonnet |
| 3 | **Frontend (components)** | all `src/components/sections/*`, new `Rail`, new `Services`, `App.tsx`, asset/path fixes | Sonnet |
| 4 | **Animation (GSAP)** | GSAP layer across components + `lib/gsap.ts` helpers (rail playhead, reveals, active-section) | Sonnet |

Order: 1 → 2 → 3 → 4 (each depends on the prior). Between stages, verify `tsc --noEmit` passes.

## 6. Review model (after build)

| Agent | Job | Model |
|-------|-----|-------|
| **Taste reviewer** | Judge realism vs. AI-slop against taste-skill Pre-Flight; flag/fix generic patterns | Opus |
| **Tester A** | Build + typecheck + responsive (375/768/1440) + reduced-motion + broken assets/links | Sonnet |
| **Tester B** | Interaction QA: nav/scroll/active-state, mobile menu, video controls, form, back-to-top | Sonnet |
| **Expert fixer** | Receives problems from the three reviewers and resolves them | Opus |

## 7. Verification plan

- `npm run build` (`tsc --noEmit && vite build`) passes at the end of each build stage.
- Visual QA at 375 / 768 / 1440.
- `prefers-reduced-motion: reduce` → page static and fully readable.
- Contrast: ember `#ff6a3d` + off-white on `#0b0c0e` meet WCAG AA for their text roles.
- Click-through: nav active state, mobile menu, video play/mute/fullscreen, contact `mailto:`, back-to-top, rail playhead tracks scroll.
- Custom fonts load with sane fallbacks.

## 8. Out of scope

- No framework migration (stays React/Vite/Tailwind/shadcn/GSAP).
- No content rewrites beyond section headers and CTA labels.
- No new routes/pages. No backend. Contact stays `mailto:`.
- No light mode (dark-committed by design).
