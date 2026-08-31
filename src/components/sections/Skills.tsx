import * as React from "react";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CAPABILITIES, SERVICES } from "@/data";

function CapabilityBars() {
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const fills = gsap.utils.toArray<HTMLElement>(".cap-fill");
      if (prefersReducedMotion()) {
        fills.forEach((f) => (f.style.width = `${f.dataset.value}%`));
        return;
      }
      fills.forEach((f) =>
        gsap.to(f, {
          width: `${f.dataset.value}%`,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: f, start: "top 90%", once: true },
        })
      );
    },
    { scope: root }
  );

  return (
    <div ref={root} className="space-y-7">
      {CAPABILITIES.map((c) => (
        <div key={c.label}>
          <div className="mb-2.5 flex items-baseline justify-between">
            <span className="text-[14px] text-ink">{c.label}</span>
            <span className="font-mono text-[12px] text-rose">{c.value}%</span>
          </div>
          <div className="h-0.5 w-full bg-ink/10">
            <div
              className="cap-fill h-full w-0 bg-rose shadow-[0_0_8px_hsl(var(--accent)/0.5)]"
              data-value={c.value}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="border-b border-ink/[0.08]">
      <div className="container py-20 md:py-28">
        <SectionHead reel="05" label="Capabilities" title="Experience & skills" />

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <CapabilityBars />
          </Reveal>

          <Reveal stagger>
            {SERVICES.map((s) => (
              <div
                key={s.n}
                className="flex items-baseline gap-4 border-t border-ink/[0.08] py-5 last:border-b"
              >
                <span className="font-mono text-[12px] font-bold text-rose">
                  {s.n}
                </span>
                <div>
                  <div className="font-serif text-xl text-ink">{s.label}</div>
                  <div className="slate mt-1.5 text-dim">{s.note}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
