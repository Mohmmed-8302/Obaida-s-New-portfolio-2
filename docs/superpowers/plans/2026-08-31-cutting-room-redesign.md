# The Cutting Room Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This is a visual redesign of a static React portfolio with NO test framework — each task's gate is `npx tsc --noEmit` passing + visual match against the approved prototype, not unit tests.

**Goal:** Redesign the existing working React portfolio from the old "Cinematic Editorial" (rose/serif) direction into "The Cutting Room" (ember/grotesque/NLE-timeline) direction, built to convert visitors into paying clients.

**Architecture:** Reskin + light restructure of working code. Swap the design-token layer (colors/fonts/radii/shadows), restyle shadcn primitives, restructure section components to match the approved prototype (add a fixed timecode Rail and a dedicated Services section), then rebuild the GSAP motion layer. Sequential execution — each stage depends on the prior; verify `tsc` between stages.

**Tech Stack:** React 18, Vite 5, TypeScript, Tailwind 3, shadcn/ui, GSAP 3 (`@gsap/react`), Google Fonts.

**Spec:** `docs/superpowers/specs/2026-08-31-cutting-room-redesign-design.md`
**Visual source of truth:** `docs/design/cutting-room-prototype.html` (approved). Open it and match it.

## Global Constraints

- **Single accent:** ember `#ff6a3d` is the ONLY accent color, page-wide. Remove every rose (`#c97a8a`) usage. No second accent anywhere.
- **Dark-committed:** one theme, locked. No light mode, no theme toggle.
- **Fonts:** Bricolage Grotesque (display), Hanken Grotesk (body), JetBrains Mono (mono). Drop Cambria, Courier New, Pixelify, Inter.
- **Shape lock:** buttons = full pill; cards/panels/media = 4–6px radius; form inputs = underline only.
- **Motion:** every GSAP/CSS animation gated behind `prefersReducedMotion()` / `@media (prefers-reduced-motion: reduce)`; page must be fully static and readable when reduced.
- **No em-dashes** (`—` / `–`) anywhere in visible copy. Use hyphens.
- **Keep:** all section IDs, `src/data.ts` content, video controls behavior, `mailto:` contact behavior, the `useGSAP(() => {}, { scope: root })` + `lib/gsap.ts` pattern.
- **CTA intent lock:** contact intent = "Start a project" (nav/hero) and "Send the brief" (form submit only); view-work intent = "Watch the reel". No duplicate-intent CTAs.
- **Gate between every task:** `npx tsc --noEmit` must exit 0.

---

### Task 1: Design system — tokens, fonts, global CSS (Agent: UI/UX design)

**Files:**
- Modify: `src/index.css` (replace `@font-face` block + `:root` tokens + base/global styles)
- Modify: `tailwind.config.js` (colors, fontFamily, keyframes/animation, radius)
- Modify: `index.html` (add Google Fonts `<link>` in `<head>`)

**Interfaces:**
- Produces (Tailwind color aliases later tasks consume): `bg`/`canvas` `#0b0c0e`, `panel` `#101216`, `elev` `#16191f`, `text`/`ink` `#f3efe8`, `dim` `#8a8f97`, `dim-2` `#5c616a`, `accent` `#ff6a3d`, `accent-soft` `#ff8a63`, `accent-deep` `#c8431f`, hairline via `--line`/`--line-2`.
- Produces font families: `font-display` (Bricolage Grotesque), `font-sans` (Hanken Grotesk), `font-mono` (JetBrains Mono).
- Produces CSS custom props on `:root`: `--rail: 68px`, `--maxw: 1240px`, `--ease: cubic-bezier(0.16,1,0.3,1)`, and all color tokens as raw values (dark-committed, not HSL-triplet-behind-theme).

- [ ] **Step 1:** In `index.html` `<head>`, add: `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap">`. Update `<title>` to `Obaida — Video Editor`.
- [ ] **Step 2:** In `src/index.css`, delete the Cambria / Courier New / Pixelify `@font-face` rules. Replace the `:root` token block with the ember dark-committed tokens from the prototype (`--bg`, `--panel`, `--elev`, `--line`, `--line-2`, `--text`, `--dim`, `--dim-2`, `--accent`, `--accent-soft`, `--accent-deep`, `--accent-glow`, `--rail`, `--maxw`, `--ease`). Keep the `@tailwind base/components/utilities` directives. Set `body` background `var(--bg)`, color `var(--text)`, `font-family` Hanken stack. Remove old grain/CRT/vignette/rose-pulse helper classes; port the prototype's grain+vignette `body::before` and the `.rail`, `.marquee`, reveal (`html.anim [data-reveal]{opacity:0;transform:translateY(26px)}`) base styles as global CSS (component-specific styles can also live in Tailwind classes in Task 3).
- [ ] **Step 3:** In `tailwind.config.js`: replace `colors` with the new token aliases (map to the CSS vars or use raw hex; keep shadcn semantic aliases `border`/`input`/`ring`/`background`/`foreground`/`primary`/`muted`/`card` pointed at the new tokens — `primary` = accent ember, `primary-foreground` = `#1a0d07`). Replace `fontFamily` with `display: ["Bricolage Grotesque", ...]`, `sans: ["Hanken Grotesk", "system-ui", ...]`, `mono: ["JetBrains Mono", "ui-monospace", ...]`. Remove `grain-shift` and `rose-pulse` keyframes/animation (a subtle accent pulse may be re-added by Task 4 if needed). Set container `screens` `2xl: 1240px`.
- [ ] **Step 4:** Run `npx tsc --noEmit` (expect exit 0) and `npm run build` (expect success). Note: existing section components still reference old classes (`slate`, `display-em`, `rose`, etc.) — Tailwind won't error on unknown utility classes, and Task 3 replaces them. Confirm build passes.
- [ ] **Step 5:** Verify against prototype: near-black canvas, ember accent, correct fonts loading (Bricolage headings render, not a serif fallback).

**Done when:** tokens + fonts swapped, `tsc` + `vite build` pass, page ground/type visibly match the prototype's foundation.

---

### Task 2: Primitives — buttons, shapes, shadows, spacing (Agent: buttons/shapes/shadows/spacing)

**Files:**
- Modify: `src/components/ui/button.tsx` (recolor variants to ember; keep pill + cva API)
- Modify: `src/components/ui/card.tsx`, `input.tsx`, `textarea.tsx`, `badge.tsx`, `separator.tsx`, `select.tsx` (retoken to ember/dark; inputs → underline style)

**Interfaces:**
- Consumes: Task 1 Tailwind aliases (`bg-accent`, `text-dim`, `border-line`, `font-mono`, etc.).
- Produces: `Button` with variants `primary` (ember fill, `#1a0d07` text), `ghost` (hairline border, ember on hover), `outline` (neutral), `link`; sizes `lg`/`md`/`sm`/`icon`. Same `ButtonProps`/`buttonVariants` export names as today (do not rename — Task 3 imports them).

- [ ] **Step 1:** In `button.tsx`, keep the `cva` structure and export names. Recolor: `primary` = `bg-accent text-[#1a0d07] font-semibold` + `hover:-translate-y-0.5 hover:bg-[color:var(--accent-soft)] hover:shadow-[0_10px_30px_var(--accent-glow)] active:translate-y-0 active:scale-[0.98]`. `ghost` = `border border-[color:var(--line-2)] text-text hover:-translate-y-0.5 hover:border-accent hover:text-accent`. `outline` = neutral hairline. Radius stays `rounded-full`. Font `font-mono text-[12.5px] uppercase tracking-[0.08em]`. Remove all rose classes/shadows.
- [ ] **Step 2:** `input.tsx` + `textarea.tsx`: convert to underline style — `bg-transparent border-0 border-b border-[color:var(--line-2)] rounded-none px-0 py-2.5 text-text placeholder:text-[color:var(--dim-2)] focus:outline-none focus:border-accent`. `card.tsx`: `bg-panel border border-[color:var(--line)] rounded-[6px]`. `badge.tsx`: ember mono pill. `separator.tsx`: hairline `var(--line)`. `select.tsx`: dark/ember tokens. Ensure form contrast passes WCAG AA (placeholder `--dim-2` on `--panel`/`--bg`).
- [ ] **Step 3:** Run `npx tsc --noEmit` (exit 0) and `npm run build`.
- [ ] **Step 4:** Verify a primary + ghost button and an input render in ember/underline style matching the prototype (buttons pill, lift + ember glow on hover; input underline turns ember on focus).

**Done when:** primitives are ember-tokened, inputs are underline, `tsc` + build pass.

---

### Task 3: Frontend — sections, Rail, Services, App structure (Agent: frontend design)

**Files:**
- Create: `src/components/sections/Rail.tsx` (fixed left timecode rail; static markup + refs, GSAP wired in Task 4)
- Create: `src/components/sections/Services.tsx` (new conversion section from `SERVICES` data)
- Modify: all `src/components/sections/*.tsx` (Nav, Hero, Marquee, Studio, Journey, Work, Videos, Skills, Contact, Footer) to match the prototype's markup/classes using new tokens
- Modify: `src/App.tsx` (add `Rail`, add `Services` between Studio and Journey; keep `grain` wrapper only if reimplemented)
- Modify: `src/data.ts` (fix Work screenshot path only — see Step 6)
- Modify: `public/assets/screenshots/` (provide `ies-bim.jpg` — copy/rename an existing `download*.jpg` or the real screenshot)

**Interfaces:**
- Consumes: Task 1 tokens/fonts, Task 2 `Button`. Data from `src/data.ts` (`NAV_LINKS`, `HERO_STATS`, `MARQUEE_ITEMS`, `PORTFOLIOS`, `VIDEOS`, `CAPABILITIES`, `SERVICES`, `JOURNEY`, `STUDIO_INFO`, `CONTACT`).
- Produces for Task 4 (animation hooks): each section root has `ref`; reveal targets marked `data-reveal`; sections carry `data-clip="NN / LABEL"`; rail exposes elements `#railTc`, `#railHead`, `#railClip`, `.rail-track`; nav links resolve to section ids; capability fills use `.cap-fill` with `style="--val:NN%"`.

- [ ] **Step 1:** Build `Rail.tsx` matching the prototype `.rail` (desktop `≥900px` only): `#railTc` (vertical timecode), `.rail-track`, `#railHead` (playhead dot), `.rail-clip` with `#railClip`. Static markup + `aria-hidden`; no GSAP yet.
- [ ] **Step 2:** Rewrite `Nav.tsx`: brand "OBAIDA" + mono "EST. 2024"; desktop links Work / Reel(`#videos`) / Services / Journey / Contact; primary `Button` "Start a project" → `#contact`; mobile hamburger + slide-down menu; `scrolled` state class (Task 4 toggles it, but keep the CSS). Active-link `.active` class styling present.
- [ ] **Step 3:** Rewrite `Hero.tsx`: eyebrow dot + mono "Video Editor & Motion Designer"; `<h1>` display grotesque with one ember italic word ("finish."); `hero-sub` ≤20 words; CTA row "Start a project" (primary) + "Watch the reel" (ghost, → `#videos`); stat strip from `HERO_STATS` (hairline cells). Mark load-sequence targets `data-reveal`. Drop the old logo-glow top row + rose availability pill (or restyle availability to a single ember dot line, keeping hero ≤4 text elements).
- [ ] **Step 4:** Rewrite `Marquee.tsx` (one CSS marquee from `MARQUEE_ITEMS`, ember dot separators), `Studio.tsx` (info-panel `system_info` + lead), `Journey.tsx` (timeline nodes + ember dots), `Skills.tsx` (capability bars `.cap-fill style="--val"` + a `process.log` info panel; REMOVE the services list from here — it moves to `Services.tsx`), `Footer.tsx` (brand + ghost back-to-top + mono meta). Use prototype markup/classes.
- [ ] **Step 5:** Build `Services.tsx` (`id="services"`, `data-clip="03 / SERVICES"`): header "What you can hire me for."; 2-col asymmetric grid from `SERVICES` (n, label, note) with hover ember + `↗`. Match prototype `.svc-grid`.
- [ ] **Step 6:** Fix Work asset: copy the real IES-BIM screenshot to `public/assets/screenshots/ies-bim.jpg` (if only `download*.jpg` exist, rename the correct one; verify it's actually the IES-BIM site). Confirm `PORTFOLIOS[0].screenshot` path resolves. Rewrite `Work.tsx` (single constrained card, ember bracket tag, hover image scale, "Visit site ↗" link).
- [ ] **Step 7:** Rewrite `Videos.tsx`: vertical 9:16 reel grid from `VIDEOS`; KEEP existing play/pause/mute/fullscreen logic and refs; restyle controls to ember; Arabic titles `dir="rtl"`; tags ember mono. Rewrite `Contact.tsx`: contact-cta with ember italic word + `contact-links` (email/phone/YouTube hairline rows from `CONTACT`) + underline-field form (Name/Email/Project) with "Send the brief"; keep `mailto:` submit behavior.
- [ ] **Step 8:** Update `App.tsx`: render order Nav, Rail, main{ Hero, Marquee, Studio, Services, Journey, Work, Videos, Skills, Contact }, Footer. Ensure grain/vignette overlay present (from Task 1 `body::before` or a wrapper).
- [ ] **Step 9:** Run `npx tsc --noEmit` (exit 0) and `npm run build`. Fix any references to removed old classes/components.
- [ ] **Step 10:** Verify each section visually matches the prototype at desktop + mobile widths (structure, spacing, tokens). Motion not required yet.

**Done when:** all sections + Rail + Services render matching the prototype, assets resolve, `tsc` + build pass. (Page may be static/unanimated — that's Task 4.)

---

### Task 4: Animation — GSAP motion layer (Agent: animations / GSAP skill)

**Files:**
- Modify: `src/lib/gsap.ts` (add small shared helper if useful; keep exports)
- Modify: `src/components/sections/Rail.tsx` (playhead + timecode + active-clip via ScrollTrigger)
- Modify: `Nav.tsx` (scrolled toggle + active-link via ScrollTrigger), `Hero.tsx` (load sequence), and any section needing scroll reveals / cap-bar fills

**Interfaces:**
- Consumes: Task 3 DOM hooks (`data-reveal`, `data-clip`, `#railTc/#railHead/#railClip`, `.rail-track`, `.cap-fill` `--val`, nav link hrefs).
- Produces: no new exports; behavior only. All wrapped in `useGSAP(() => {...}, { scope })` and gated by `prefersReducedMotion()`.

- [ ] **Step 1:** Load the GSAP skill guidance: invoke `gsap-skills:gsap-react` and `gsap-skills:gsap-scrolltrigger` before writing. Follow `useGSAP` + cleanup + reduced-motion patterns.
- [ ] **Step 2:** Reveals: in each section (or a shared `useReveals(scope)` helper), animate `[data-reveal]` from `{opacity:0,y:26}` to visible via ScrollTrigger `start:"top 88%"`. Add `html.anim` class only when NOT reduced-motion so CSS hides pre-animation (matches prototype). Under reduced motion, elements stay visible (no `anim` class).
- [ ] **Step 3:** Hero load sequence: stagger eyebrow → headline → sub → CTAs → stats (`power3.out`, ~0.9s, small stagger), delay 0.15. Reduced-motion: skip, show static.
- [ ] **Step 4:** Rail: one ScrollTrigger over the document (`start:0, end:"max", onUpdate`) → set `#railHead` top within `.rail-track` height, update `#railTc` timecode `00:MM:SS:FF` (map progress to ~254s). Per-section ScrollTrigger (`start:"top 55%"`, `onToggle`) sets `#railClip` = `data-clip` and toggles nav `.active`. Nav `scrolled` via ScrollTrigger (no `window` scroll listener).
- [ ] **Step 5:** Capability bars: animate `.cap-fill` width to `--val` on scroll (`start:"top 92%"`).
- [ ] **Step 6:** Confirm NO `window.addEventListener("scroll")` anywhere (use ScrollTrigger). Confirm every `useGSAP` has scope + reverts cleanly. Test `prefers-reduced-motion: reduce` → page fully static and readable.
- [ ] **Step 7:** Run `npx tsc --noEmit` (exit 0) and `npm run build`. Manual: scroll the page — playhead moves, timecode ticks, reveals fire once, nav active tracks, cap bars fill.

**Done when:** motion matches the prototype, reduced-motion is clean, no scroll listeners, `tsc` + build pass.

---

## Review Phase (after Tasks 1-4)

Run after the build is complete. See spec §6.

- **Taste reviewer (Opus):** audit the running site against the taste-skill Pre-Flight Check. Flag/fix AI-slop tells (generic patterns, eyebrow spam, fake precision, duplicate CTAs, em-dashes, serif slips, weak hero). Judge: does it look like a real premium video-editor site?
- **Tester A (Sonnet):** `npm run build` clean; responsive at 375/768/1440; reduced-motion; no broken assets/links/console errors.
- **Tester B (Sonnet):** interaction QA — nav scroll+active, mobile menu, video play/pause/mute/fullscreen, contact `mailto:`, back-to-top, rail playhead.
- **Expert fixer (Opus):** receive the three reports, resolve every issue, re-verify `tsc` + build + the specific broken behaviors.

---

## Self-Review (author check)

- **Spec coverage:** tokens+fonts (T1), primitives (T2), sections/Rail/Services/assets (T3), motion (T4), review (Review Phase). All spec §3–6 mapped. ✓
- **No placeholders:** exact hex/font/class values inline; asset fix explicit; each task has a build/visual gate. ✓
- **Type consistency:** `Button`/`buttonVariants` names preserved (T2→T3); DOM hook names (`data-reveal`, `data-clip`, `#railTc/#railHead/#railClip`, `.cap-fill`/`--val`) consistent across T3→T4. ✓
