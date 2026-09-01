import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Arms the `html.anim [data-reveal] { opacity:0; transform:translateY(26px) }`
 * rule in src/index.css so reveal targets start hidden before GSAP animates
 * them in. Call ONLY when motion is not reduced -- with reduced motion the
 * class must never be added, so [data-reveal] content stays visible and the
 * page is fully static and readable.
 */
export function enableAnimClass() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.add("anim");
}

/**
 * Reveal every `[data-reveal]` element inside `scope` as it scrolls into
 * view (matches the prototype's `start: "top 88%"` reveal loop). Each
 * element animates once and is not re-hidden on scroll-back.
 */
export function revealOnScroll(scope: Element) {
  const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
  targets.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

/**
 * Animate `.cap-fill` bars inside `scope` from 0 to their `--val` width as
 * they scroll into view (matches the prototype's capability-bar fill).
 */
export function fillCapBars(scope: Element) {
  const bars = gsap.utils.toArray<HTMLElement>(".cap-fill", scope);
  bars.forEach((bar) => {
    const val = bar.style.getPropertyValue("--val");
    if (!val) return;
    gsap.fromTo(
      bar,
      { width: 0 },
      {
        width: val,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: { trigger: bar, start: "top 92%", once: true },
      }
    );
  });
}

/**
 * Hero-only load-in: fades the corner meta labels down into place, cascades
 * each letter of the oversized name wordmark up with a slight rotation, then
 * draws the orbit ellipse in with a stroke reveal before the two sparkle
 * marks pop in. Runs once on mount alongside the generic `[data-reveal]`
 * stagger that handles the eyebrow/subtitle/CTAs/stats in Hero.tsx.
 *
 * Caller must gate this behind `prefersReducedMotion()` -- every element it
 * touches renders fully visible/static without it (no CSS pre-hides them),
 * so skipping the call is a complete and correct reduced-motion fallback.
 */
export function revealHeroMark(scope: Element) {
  const meta = gsap.utils.toArray<HTMLElement>("[data-hero-meta]", scope);
  const letters = gsap.utils.toArray<HTMLElement>(".hero-letter", scope);
  const orbitEllipse = scope.querySelector<SVGEllipseElement>(
    ".hero-orbit ellipse"
  );
  const orb = scope.querySelector<HTMLElement>(".hero-orb");
  const sparks = gsap.utils.toArray<HTMLElement>(".hero-spark", scope);

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (orb) {
    tl.fromTo(orb, { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0);
  }
  if (meta.length) {
    tl.fromTo(
      meta,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
      0.05
    );
  }
  if (letters.length) {
    tl.fromTo(
      letters,
      { opacity: 0, y: 46, rotate: 6 },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 0.85,
        stagger: 0.035,
        ease: "power4.out",
      },
      0.15
    );
  }
  if (orbitEllipse) {
    const len = orbitEllipse.getTotalLength();
    gsap.set(orbitEllipse, { strokeDasharray: len, strokeDashoffset: len });
    tl.to(
      orbitEllipse,
      { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
      0.35
    );
  }
  if (sparks.length) {
    tl.fromTo(
      sparks,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(3)" },
      0.95
    );
  }

  return tl;
}

export { gsap, ScrollTrigger, useGSAP };
