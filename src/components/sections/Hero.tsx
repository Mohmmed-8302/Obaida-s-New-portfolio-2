import * as React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { HERO_STATS } from "@/data";

export function Hero() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.9 },
        delay: 0.15,
      });
      tl.from(".hero-top", { opacity: 0, y: -12, duration: 0.7 })
        .from(".hero-eyebrow", { opacity: 0, y: 16 }, "-=0.35")
        .from(
          ".hero-line",
          { opacity: 0, yPercent: 110, stagger: 0.12, duration: 1 },
          "-=0.5"
        )
        .from(".hero-lead", { opacity: 0, y: 18 }, "-=0.6")
        .from(".hero-cta", { opacity: 0, y: 18 }, "-=0.6")
        .from(
          ".hero-stat",
          { opacity: 0, y: 20, stagger: 0.08 },
          "-=0.55"
        );
    },
    { scope: root }
  );

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={root}
      className="vignette relative flex min-h-svh items-center overflow-hidden pt-24"
    >
      {/* faint frame corners — film gate */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-6 hidden border border-ink/[0.05] md:block"
      />

      <div className="container relative py-16">
        {/* top row: logo + availability */}
        <div className="hero-top mb-12 flex items-center justify-between md:mb-16">
          <img
            src="/assets/logos/logo-glow.png"
            alt="Obaida"
            className="h-10 w-auto drop-shadow-[0_0_18px_hsl(var(--accent)/0.4)] md:h-12"
          />
          <div className="flex items-center gap-2.5 rounded-full border border-rose/25 bg-rose/[0.06] px-4 py-2">
            <span className="h-1.5 w-1.5 animate-rose-pulse rounded-full bg-rose" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-rose">
              Available · 2026
            </span>
          </div>
        </div>

        <div className="hero-eyebrow reel-cue mb-6">
          <span className="slate-rose">Video Editor</span>
          <span className="reel-cue-line" />
          <span className="slate">Portfolio Designer</span>
        </div>

        {/* headline — clipped line reveal */}
        <h1 className="display max-w-[15ch] text-balance">
          <span className="block overflow-hidden">
            <span className="hero-line block">Short-form video</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block">that makes people</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block">
              <span className="display-em">stop scrolling.</span>
            </span>
          </span>
        </h1>

        <p className="hero-lead lead mt-8 max-w-[52ch]">
          Obaida crafts viral gaming edits, education content, and awareness
          clips — every frame engineered to hold attention. No templates. No
          filler.
        </p>

        <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
          <Button size="lg" variant="primary" onClick={() => go("work")}>
            <Play className="fill-current" /> View selected work
          </Button>
          <Button size="lg" variant="ghost" onClick={() => go("contact")}>
            Get in touch <ArrowUpRight />
          </Button>
        </div>

        {/* stats — hairline-divided cells */}
        <div className="mt-16 grid grid-cols-2 border-t border-ink/[0.08] md:mt-24 md:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <div
              key={s.label}
              className={`hero-stat border-b border-ink/[0.08] py-6 pr-6 md:border-b-0 ${
                i !== 0 ? "md:border-l md:border-ink/[0.08] md:pl-6" : ""
              } ${i % 2 !== 0 ? "border-l border-ink/[0.08] pl-6 md:pl-6" : ""}`}
            >
              <div className="font-mono text-3xl font-bold text-rose [text-shadow:0_0_20px_hsl(var(--accent)/0.3)] md:text-4xl">
                {s.value}
              </div>
              <div className="slate mt-2 text-dim">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
