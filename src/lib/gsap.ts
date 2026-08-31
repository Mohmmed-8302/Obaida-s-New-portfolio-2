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

export { gsap, ScrollTrigger, useGSAP };
