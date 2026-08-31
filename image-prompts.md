# Nanobanana Pro — Image Prompts

Optional art for the Cinematic Editorial redesign. The site works without these (CSS gradients/vignettes cover the background), but each one would upgrade a specific spot. Generate at the noted aspect ratio, export as JPG/WebP, and drop into `public/assets/`.

---

## 1. Hero backdrop texture (optional, subtle)
**File:** `public/assets/hero-grain.jpg` — used as a low-opacity background layer behind the hero copy.
**Aspect ratio:** 16:9, 2400×1350px

**Prompt:**
> Extreme close-up macro photograph of exposed 35mm cinema film negative, warm dusty-rose and near-black tones, soft out-of-focus sprocket holes and light leaks along the edges, fine visible film grain, cinematic and moody, very dark overall exposure with only faint rose-pink highlights catching the light, no text, no logos, shot on film, editorial photography style.

---

## 2. Work section — placeholder case-study cover
**File:** `public/assets/work-cover-placeholder.jpg` — used only if a second portfolio entry is added before a real screenshot exists.
**Aspect ratio:** 4:3, 1600×1200px

**Prompt:**
> Minimalist website mockup on a dark near-black desk surface, laptop screen showing a clean corporate homepage with generous whitespace and a dusty-rose accent color, soft directional studio lighting from the left, shallow depth of field, professional product photography, no visible brand names or logos, subtle warm highlights, high-end editorial tech photography.

---

## 3. Contact section ambient backdrop (optional)
**File:** `public/assets/contact-glow.jpg` — faint, blended at low opacity behind the contact form.
**Aspect ratio:** 1:1, 1800×1800px

**Prompt:**
> Abstract soft-focus bokeh of warm rose-pink and near-black light orbs, cinematic lens flare, very dark background, gentle gradient glow concentrated in one lower corner, minimal and elegant, no text, no objects, atmospheric lighting study, shot on a full-frame camera at f/1.4.

---

## Not needed
- **Logo** — already exists (`assets/logos/logo-glow.png`, glass Arabic wordmark). Do not regenerate.
- **Video thumbnails** — the 4 video cards use live `<video>` elements (frame captured client-side at 1s), no static art needed.
- **Icons** — sourced from `lucide-react`, no image generation needed.
