import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function SectionHead({
  reel,
  label,
  title,
}: {
  reel: string;
  label: string;
  title: ReactNode;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="reel-cue mb-5">
        <span className="slate-rose">Reel {reel}</span>
        <span className="reel-cue-line" />
        <span className="slate">{label}</span>
      </div>
      <h2 className="h2 max-w-[22ch] text-balance">{title}</h2>
    </Reveal>
  );
}
