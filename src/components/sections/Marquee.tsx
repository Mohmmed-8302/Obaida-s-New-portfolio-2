import * as React from "react";
import { MARQUEE_ITEMS } from "@/data";

/**
 * Pure-CSS marquee: `.marquee` / `.marquee-track` / `.marquee-item` are
 * defined globally in index.css (ported in Task 1), including the
 * `prefers-reduced-motion` fallback. No JS/GSAP needed here.
 */
function MarqueeSequence({ hidden }: { hidden?: boolean }) {
  return (
    <div className="marquee-item" aria-hidden={hidden || undefined}>
      {MARQUEE_ITEMS.map((item) => (
        <React.Fragment key={item}>
          {item}
          <span />
        </React.Fragment>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <MarqueeSequence />
        <MarqueeSequence hidden />
      </div>
    </div>
  );
}
