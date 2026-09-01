import * as React from "react";
import { Button } from "@/components/ui/button";
import { HERO_STATS, STUDIO_INFO } from "@/data";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, prefersReducedMotion, revealHeroMark } from "@/lib/gsap";

const NAME = STUDIO_INFO.find((r) => r.k === "Name")?.v ?? "Obaida";
const ROLE = STUDIO_INFO.find((r) => r.k === "Role")?.v ?? "Video Editor";
const ERA = `${HERO_STATS[0]?.value ?? ""}—${HERO_STATS[1]?.value ?? ""}`;

/**
 * Hero load-in sequence: corner meta + name wordmark + orbit/sparkle
 * signature cascade via `revealHeroMark` (src/lib/gsap.ts), while the
 * eyebrow/subtitle/CTAs/stats use the shared `[data-reveal]` stagger --
 * both run on mount (no scroll trigger, this is above-the-fold on load).
 * Section is a scoped Slate & Rose light canvas (see #hero in index.css),
 * distinct from the dark Cutting Room shell around it.
 */
export function Hero() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const targets = gsap.utils.toArray<HTMLElement>(
        "[data-reveal]",
        root.current
      );
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.15,
      });
      revealHeroMark(root.current!);
    },
    { scope: root }
  );

  return (
    <section
      id="hero"
      ref={root}
      data-clip="01 / HERO"
      className="flex min-h-[100dvh] flex-col justify-center pb-10 pt-[92px]"
    >
      <span aria-hidden className="hero-orb" />

      <div className="wrap relative">
        {/* corner meta: era range + role tag */}
        <div className="mb-10 flex items-start justify-between gap-6 sm:mb-14">
          <div className="hero-era" data-hero-meta>
            <span className="mono">{ERA}</span>
          </div>
          <span className="hero-tag" data-hero-meta>
            {"{ " + ROLE.toUpperCase() + " }"}
          </span>
        </div>

        <div className="mb-[26px] flex items-center gap-3.5" data-reveal>
          <span className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
          <span className="mono">Video Editor &amp; Motion Designer</span>
        </div>

        <h1 className="text-[clamp(3.4rem,15vw,10.5rem)] font-extrabold leading-[0.94] tracking-[-0.03em] text-text">
          <span className="sr-only">{NAME}</span>
          <span aria-hidden="true" className="hero-mark">
            <span className="hero-name">
              {Array.from(NAME).map((ch, i) => (
                <span className="hero-letter" key={`${ch}-${i}`}>
                  {ch}
                </span>
              ))}
            </span>
            <svg
              className="hero-orbit"
              viewBox="0 0 600 260"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <ellipse
                cx="300"
                cy="130"
                rx="286"
                ry="66"
                transform="rotate(-9 300 130)"
              />
            </svg>
            <svg
              className="hero-spark hero-spark--a"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0c.6 4.8 2 8.2 4.2 10.4C18.4 12.6 21.4 14 24 14.6c-4.8.6-8.2 2-10.4 4.2C11.4 21 10 24 9.4 24.6c-.6-4.8-2-8.2-4.2-10.4C3 12 0 10.6-.6 10c4.8-.6 8.2-2 10.4-4.2C11.8 3.6 13.2.6 12 0z" />
            </svg>
            <svg
              className="hero-spark hero-spark--b"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0c.6 4.8 2 8.2 4.2 10.4C18.4 12.6 21.4 14 24 14.6c-4.8.6-8.2 2-10.4 4.2C11.4 21 10 24 9.4 24.6c-.6-4.8-2-8.2-4.2-10.4C3 12 0 10.6-.6 10c4.8-.6 8.2-2 10.4-4.2C11.8 3.6 13.2.6 12 0z" />
            </svg>
          </span>
        </h1>

        <p
          data-reveal
          className="mt-8 max-w-[52ch] text-[clamp(1rem,1.7vw,1.22rem)] leading-[1.55] text-dim sm:mt-10"
        >
          I cut short-form that people actually{" "}
          <strong className="font-semibold text-[color:var(--accent-deep)]">
            finish.
          </strong>{" "}
          Gaming edits, motion graphics, and awareness content built to stop
          the scroll and keep it. Under three minutes, every time.
        </p>

        <div data-reveal className="mt-10 flex flex-wrap gap-3.5">
          <Button asChild variant="primary" size="lg">
            <a href="#contact">Start a project</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#videos">
              <span
                aria-hidden
                className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current"
              />
              Watch the reel
            </a>
          </Button>
        </div>

        <div
          data-reveal
          className="mt-14 flex items-end justify-between gap-6 border-t border-[color:var(--line)] pt-6 sm:mt-16"
        >
          <p className="hero-copyright">
            {"© " + NAME}
            <br />
            {ROLE}
          </p>
          <a href="#work" className="hero-scroll-cue">
            See the work
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 6L8 11L13 6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="wrap mt-12 md:mt-[70px]" data-reveal>
        <div className="grid grid-cols-2 border-t border-[color:var(--line)] sm:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "border-b border-[color:var(--line)] py-[26px] pr-2 sm:border-b-0 sm:border-l sm:border-[color:var(--line)] sm:pl-[22px]",
                i === 0 && "sm:border-l-0 sm:pl-0"
              )}
            >
              <b className="block font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold tracking-[-0.02em] text-text">
                {s.value}
              </b>
              <span className="mono">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
