import * as React from "react";
import { JOURNEY } from "@/data";
import { useGSAP, prefersReducedMotion, revealOnScroll } from "@/lib/gsap";

export function Journey() {
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
      id="journey"
      ref={root}
      className="section-line"
      data-clip="04 / JOURNEY"
    >
      <div className="wrap">
        <div className="mb-[54px]" data-reveal>
          <h2 className="max-w-[18ch] text-[clamp(2rem,5vw,3.4rem)] text-text">
            From first cut to went viral.
          </h2>
        </div>

        <div className="relative pl-[34px] before:absolute before:bottom-2 before:left-1 before:top-2 before:w-px before:bg-[color:var(--line-2)] before:content-['']">
          {JOURNEY.map((entry) => (
            <div
              key={entry.year}
              data-reveal
              className="relative pb-[54px] before:absolute before:-left-[34px] before:top-1.5 before:h-[9px] before:w-[9px] before:rounded-full before:bg-accent before:shadow-[0_0_0_4px_var(--accent-glow)] before:content-[''] last:pb-0"
            >
              <div className="font-mono text-[13px] tracking-[0.1em] text-accent">
                {entry.year}
              </div>
              <h3 className="mt-2 text-[1.7rem] text-text">{entry.title}</h3>
              <p className="mt-2.5 max-w-[48ch] text-dim">{entry.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
