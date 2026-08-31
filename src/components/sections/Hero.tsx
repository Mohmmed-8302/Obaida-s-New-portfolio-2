import * as React from "react";
import { Button } from "@/components/ui/button";
import { HERO_STATS } from "@/data";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Hero load-in sequence: eyebrow -> headline -> sub -> CTAs -> stats stagger
 * in on mount (no scroll trigger -- this is above-the-fold on load).
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
      <div className="wrap">
        <div className="mb-[30px] flex items-center gap-3.5" data-reveal>
          <span className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
          <span className="mono">Video Editor &amp; Motion Designer</span>
        </div>

        <h1
          data-reveal
          className="max-w-[15ch] text-[clamp(2.6rem,8.5vw,6.6rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-text"
        >
          I cut short-form that people actually{" "}
          <em className="italic leading-[1.1] text-accent">finish.</em>
        </h1>

        <p
          data-reveal
          className="mt-[30px] max-w-[52ch] text-[clamp(1rem,1.7vw,1.22rem)] leading-[1.55] text-dim"
        >
          Gaming edits, motion graphics, and awareness content built to stop
          the scroll and keep it. Under three minutes, every time.
        </p>

        <div data-reveal className="mt-10 flex flex-wrap gap-3.5">
          <Button asChild variant="primary" size="lg">
            <a href="#contact">Start a project</a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href="#videos">
              <span
                aria-hidden
                className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-current"
              />
              Watch the reel
            </a>
          </Button>
        </div>
      </div>

      <div className="wrap mt-12 md:mt-[90px]" data-reveal>
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
