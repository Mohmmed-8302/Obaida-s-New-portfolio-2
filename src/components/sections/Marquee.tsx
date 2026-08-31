import * as React from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { MARQUEE_ITEMS } from "@/data";

export function Marquee() {
  const root = React.useRef<HTMLDivElement>(null);
  const track = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !track.current) return;
      // track holds two identical sequences; scroll one full width then loop
      gsap.to(track.current, {
        xPercent: -50,
        ease: "none",
        duration: 26,
        repeat: -1,
      });
    },
    { scope: root }
  );

  const Seq = ({ hidden }: { hidden?: boolean }) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-8 font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-dim">
            {item}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-rose/70" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      className="overflow-hidden border-y border-ink/[0.08] bg-panel/40 py-4"
    >
      <div ref={track} className="flex w-max flex-nowrap will-change-transform">
        <Seq />
        <Seq hidden />
      </div>
    </div>
  );
}
