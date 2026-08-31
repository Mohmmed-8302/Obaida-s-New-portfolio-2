# Portfolio Redesign — Cinematic Editorial

**Status:** Design approved, ready for implementation planning
**Date:** 2026-08-31
**Scope:** Full visual reskin of the existing single-page portfolio (`index.html`, `styles.css`, `script.js`) for Obaida — video editor & portfolio designer.

## 1. Why

The current site uses a retro terminal/CRT aesthetic (pixel font, scanline overlay, phosphor-green terminal boxes, dusty-rose/slate-blue palette). The goal is to replace this with a more premium, editorial "director's reel" feel, while keeping the site's content, structure, and functionality unchanged.

Three directions were compared visually (Cinematic Editorial / Terminal Evolved / Bold Kinetic); **Cinematic Editorial** was chosen decisively and without hesitation.

## 2. Decisions made during brainstorming

| Decision | Choice |
|---|---|
| Visual direction | Cinematic Editorial — near-black canvas, serif headline type, warm rose accent used sparingly, generous whitespace, film-studio restraint |
| Scope | Reskin only — keep the existing 7 sections, their order, and their content data. No restructuring. |
| Accent color | Keep dusty rose (`#C97A8A`), for continuity with the existing logo/brand mark |
| Motion level | Restrained — subtle fades/rises on scroll, smooth transitions. No parallax, no video-background hero. |
| Buttons | Pill-shaped (fully rounded), staying within plain HTML/CSS/JS (explicitly rejected a React/Tailwind/shadcn component suggestion as out of scope and stylistically mismatched) |
| Design system (colors/type/components) | Approved as presented (see §4) |

## 3. Out of scope

- No framework migration (no React, Tailwind, shadcn, TypeScript). The site stays plain HTML/CSS/JS.
- No section restructuring, reordering, or content changes.
- No new pages/routes.
- No backend/form-submission changes (contact form keeps its `mailto:` behavior).

## 4. Design system

### Color tokens
```
--bg:            #0b0b0d   /* near-black canvas, not pure black */
--bg-panel:      #141416   /* cards, info panels */
--line:          rgba(255,255,255,0.08)  /* hairline borders/dividers */
--text:          #f5f1ee   /* warm off-white */
--text-dim:      #9a948f   /* warm gray, secondary text */
--accent:        #c97a8a   /* dusty rose — unchanged from current brand */
--accent-deep:   #8a3e51   /* rose hover/pressed state */
--accent-glow:   rgba(201,122,138,.35)  /* glow/shadow use */
```

### Typography
- **Display/headings:** `Cambria Custom` (serif) — already an asset (`assets/fonts/Cambria-Regular.ttf`). Normal weight; italic used for a single emphasized word in the hero headline (e.g. "stop scrolling." in rose italic).
- **Body:** Arial/Helvetica system sans stack (unchanged from current).
- **Eyebrows, labels, meta, nav links, stats:** `Courier New Custom` (mono) — already an asset. Small, uppercase, letter-spaced. This is a deliberate callback to the current terminal identity, recast as film-slate/timecode styling rather than hacker UI.
- **Dropped:** `Pixelify Sans` (pixel font) — no longer used anywhere; remove its `@font-face` rule from `styles.css`. The font file itself can stay in `assets/fonts/` (removing an asset is optional cleanup, not required).

### Core components
- **Buttons:** pill-shaped (`border-radius: 999px`). Primary = ghost (1px rose border, transparent fill, fills faintly on hover). Secondary/submit = rose-filled with dark text. Subtle lift (`translateY(-2px)`) + soft shadow on hover.
- **Nav:** fixed top, transparent over the hero. On scroll (`[data-scrolled]`, already wired in `script.js`), gains a hairline bottom border and slightly darker/blurred background. Links: mono, uppercase, letter-spaced; active section link gets a small rose dot indicator (state already computed by the existing `IntersectionObserver` in `initNav()`).
- **Cards** (work + video grids share one shell): image area with a subtle gradient overlay and a mono bracket tag (e.g. `[CORPORATE]`) top-left; on hover, image scales ~1.03 with a 400ms ease. Body below: serif title, sans description, mono meta line.
- **Info panel** (evolves the current `.retro-terminal-box` / `system_info.exe` motif): thin hairline border, small mono header line, mono `key: value` rows with a rose `>` prefix. Kept as an intentional continuity callback, restyled to the neutral/rose palette — used in both the Studio and Contact sections.
- **Timeline node:** thin 1px vertical line down the left edge; small glowing rose dot per node (replaces the diamond marker); year in mono rose, title in serif, description in sans-dim.
- **Capability bars:** thin (2px) hairline track filled with solid rose (replaces the segmented pixel-block bars); label in sans, percentage in mono.
- **Marquee:** thin hairline-bordered strip, mono uppercase text, slow scroll, small rose dot separators — understated, not neon.
- **Form fields:** underline-style (bottom border only, no boxed input), mono uppercase label above each field, rose underline on focus.

### Motion
- Reveal-on-scroll: fade + 16px rise, ~650ms ease-out — reuses the existing `.reveal` / `IntersectionObserver` mechanism in `script.js` unchanged; only the CSS transition timing/easing changes.
- Hover states: card image scale, link underline-slide, button lift.
- `prefers-reduced-motion` fallback already exists in `script.js` (`initReveal()`) and continues to apply.
- **Dropped entirely:** CRT scanline animation, pixel-block bar-fill animation, retro pulse/glow keyframes tied to the old aesthetic. The existing slow `logoGlow` breathing animation on the hero logo may be kept (retuned to the new accent glow) since it's subtle and on-brand.
- **Optional, flagged as cuttable:** a very faint (~3% opacity) film-grain texture overlay for filmic feel. Not required — include only if it doesn't hurt performance or text legibility; drop without discussion if it looks off.

## 5. Section-by-section notes

All 7 sections keep their current IDs, order, and JS-driven content (`buildMarquee`, `buildTimeline`, `buildWork`, `buildVideos`, `buildSkills` in `script.js` are unchanged).

1. **Hero (`#hero`)** — soft radial vignette (dark corners) replaces the CRT grid background. Mono eyebrow line. Serif H1 with italic rose emphasis word. Sans lead paragraph. Pill CTA row. Stat grid (`retro-stat-grid`) restyled as thin hairline-divided cells instead of boxed cells. Status badge restyled as a small pill with a rose dot.
2. **Marquee** — restyled per §4, content unchanged (`MARQUEE_ITEMS`).
3. **Studio (`#studio`)** — left column: info-panel motif (was `system_info.exe`). Right column: serif/sans lead paragraph, closing line kept as a small mono rose accent line.
4. **Journey (`#journey`)** — timeline restyled per §4; `JOURNEY` data and `buildTimeline()` logic unchanged.
5. **Work (`#work`)** — card shell per §4; `PORTFOLIOS` data and `buildWork()` logic unchanged. Grid should look intentional even with a single card (constrain max-width rather than stretching full-bleed).
6. **Videos (`#videos`)** — same card shell as Work, video media instead of image; existing play/pause/mute/fullscreen behavior in `buildVideos()` is unchanged, only the control buttons' visual style (icon buttons, no bracket chrome) changes.
7. **Skills (`#skills`)** — capability bars and services list restyled per §4; `CAPABILITIES`/`SERVICES` data and `buildSkills()` logic unchanged.
8. **Contact (`#contact`)** — info-panel motif reused for the contact block; contact grid (email/phone/YouTube) as mono label+link columns with hairline dividers; form restyled per §4; final CTA button stays pill-ghost, consistent with the hero.
9. **Footer** — same structure, restyled to match (serif brand mark, pill ghost "back to top", hairline divider, mono copyright/tagline).

## 6. Technical approach

- **CSS-only rewrite.** All new design tokens and component rules go into `styles.css`. Every existing class name, element ID, and data hook (`#hero`, `#nav`, `#workGrid`, `#videoGrid`, `#timeline`, `#capList`, `#serviceList`, `#marqueeTrack`, `.reveal`, `.retro-*` class names, etc.) stays exactly as-is, so `script.js` and `index.html`'s structure/data-binding require no changes.
- **One HTML edit:** remove the now-unused `.retro-crt-overlay` element from `index.html` (it has no JS dependency — confirmed `script.js` never references it).
- **No JS logic changes.** `script.js`'s builders, IntersectionObserver reveal system, nav active-state tracking, video controls, and contact-form `mailto:` handler all continue to work unmodified — they operate on IDs/classes, not on visual styling.
- **Fonts:** keep `Cambria Custom` and `Courier New Custom` `@font-face` declarations; drop the `Pixelify Sans` one.

## 7. Verification plan

No test framework exists (static site) — verification is manual:
- Visual QA at mobile (375px), tablet (768px), and desktop (1440px) widths.
- `prefers-reduced-motion: reduce` check (already has a code path in `script.js`).
- Contrast check: rose (`#c97a8a`) and off-white (`#f5f1ee`) text against the `#0b0b0d` background, targeting WCAG AA for body text.
- Click-through: nav scroll/active-state, mobile nav toggle, video card play/mute/fullscreen, contact form `mailto:` submission, back-to-top button.
- Confirm custom fonts (Cambria, Courier New) load correctly with sane fallbacks if a font fails to load.

## 8. Next step

Hand off to the `writing-plans` skill to produce the concrete, ordered implementation plan (file-by-file edits, in what order, with checkpoints) based on this design.
