import * as React from "react";
import { STUDIO_INFO } from "@/data";
import { useGSAP, prefersReducedMotion, revealOnScroll } from "@/lib/gsap";

export function Studio() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealOnScroll(root.current!);
    },
    { scope: root }
  );

  return (
    <section
      id="studio"
      ref={root}
      className="section-line"
      data-clip="02 / STUDIO"
    >
      <div className="wrap grid gap-10 md:grid-cols-[320px_1fr] md:items-start md:gap-[72px]">
        <div
          data-reveal
          className="rounded-[4px] border border-[color:var(--line)] bg-panel"
        >
          <div className="flex items-center justify-between border-b border-[color:var(--line)] px-5 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
            <span>system_info</span>
            <span>//</span>
          </div>
          {STUDIO_INFO.map((row) => (
            <div
              key={row.k}
              className="flex items-center justify-between border-b border-[color:var(--line)] px-5 py-[15px] font-mono text-[13px] last:border-b-0"
            >
              <span className="text-dim before:mr-1.5 before:text-accent before:content-['>_']">
                {row.k}
              </span>
              <span className={row.accent ? "text-accent" : "text-text"}>
                {row.v}
              </span>
            </div>
          ))}
        </div>

        <div>
          <p
            data-reveal
            className="font-display text-[clamp(1.25rem,2.6vw,1.9rem)] font-semibold leading-[1.28] tracking-[-0.01em] text-text"
          >
            I treat every clip like it is the one that has to{" "}
            <span className="italic text-accent">land the client.</span>{" "}
            Tight pacing, clean motion, and hooks that earn the next three
            seconds.
          </p>
          <p data-reveal className="mt-6 max-w-[54ch] text-dim">
            Self-taught, then obsessed. I work across gaming, education, and
            awareness content, and I design the portfolio pages that make the
            work sell. If it does not hold attention, it does not ship.
          </p>
        </div>
      </div>
    </section>
  );
}
