import * as React from "react";
import { CAPABILITIES } from "@/data";
import { useGSAP, prefersReducedMotion, revealOnScroll, fillCapBars } from "@/lib/gsap";

const PROCESS_LOG = [
  { k: "Brief", v: "Understand the goal" },
  { k: "Cut", v: "Pace, hooks, rhythm" },
  { k: "Polish", v: "Motion & sound" },
  { k: "Deliver", v: "On time", accent: true },
];

export function Skills() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealOnScroll(root.current!);
      fillCapBars(root.current!);
    },
    { scope: root }
  );

  return (
    <section id="skills" ref={root} className="section-line" data-clip="07 / SKILLS">
      <div className="wrap grid gap-[46px] md:grid-cols-2 md:items-start md:gap-[72px]">
        <div>
          <div className="mb-9" data-reveal>
            <h2 className="max-w-[18ch] text-[clamp(2rem,5vw,3.4rem)] text-text">
              The toolkit.
            </h2>
            <p className="mt-[18px] max-w-[56ch] text-dim">
              Where the hours went, honestly rated.
            </p>
          </div>

          <div>
            {CAPABILITIES.map((c) => (
              <div key={c.label} data-reveal className="mb-[30px] last:mb-0">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-[1.05rem] font-semibold text-text">
                    {c.label}
                  </span>
                  <span className="font-mono text-[13px] tabular-nums text-accent">
                    {c.value}
                  </span>
                </div>
                <div className="h-0.5 overflow-hidden rounded-full bg-[color:var(--line-2)]">
                  <div
                    className="cap-fill h-full rounded-full bg-accent"
                    style={
                      {
                        width: `${c.value}%`,
                        "--val": `${c.value}%`,
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          data-reveal
          className="mt-2 rounded-[4px] border border-[color:var(--line)] bg-panel"
        >
          <div className="flex items-center justify-between border-b border-[color:var(--line)] px-5 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
            <span>process.log</span>
            <span>//</span>
          </div>
          {PROCESS_LOG.map((row) => (
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
      </div>
    </section>
  );
}
