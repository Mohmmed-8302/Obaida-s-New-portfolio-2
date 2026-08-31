import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { JOURNEY } from "@/data";

export function Journey() {
  return (
    <section id="journey" className="border-b border-ink/[0.08]">
      <div className="container py-20 md:py-28">
        <SectionHead reel="02" label="Journey" title="Obaida's story" />

        <div className="relative">
          {/* vertical rail */}
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-rose/60 via-ink/15 to-transparent" />
          <div className="flex flex-col">
            {JOURNEY.map((entry) => (
              <Reveal key={entry.year} className="relative pl-8 pb-12 last:pb-0">
                {/* node */}
                <span className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full bg-rose shadow-[0_0_10px_hsl(var(--accent)/0.6)] ring-4 ring-canvas" />
                <div className="font-mono text-4xl font-bold text-rose [text-shadow:0_0_18px_hsl(var(--accent)/0.3)] md:text-5xl">
                  {entry.year}
                </div>
                <h3 className="mt-3 font-serif text-xl text-ink">
                  {entry.title}
                </h3>
                <p className="mt-2 max-w-[48ch] text-[14px] leading-relaxed text-dim">
                  {entry.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
