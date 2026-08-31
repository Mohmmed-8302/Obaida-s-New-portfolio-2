import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { STUDIO_INFO } from "@/data";

export function Studio() {
  return (
    <section id="studio" className="border-b border-ink/[0.08]">
      <div className="container py-20 md:py-28">
        <SectionHead reel="01" label="Studio" title="Who we are" />

        <div className="grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          {/* Info panel */}
          <Reveal>
            <Card className="p-0">
              <div className="flex items-center gap-2.5 border-b border-ink/[0.08] px-5 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-dim">
                  profile.card
                </span>
              </div>
              <dl className="divide-y divide-ink/[0.06]">
                {STUDIO_INFO.map((row) => (
                  <div
                    key={row.k}
                    className="flex items-center gap-3 px-5 py-3.5 font-mono text-[13px]"
                  >
                    <span className="text-rose">&gt;</span>
                    <dt className="w-20 text-dim">{row.k}</dt>
                    <dd
                      className={
                        row.accent ? "font-bold text-rose" : "text-ink"
                      }
                    >
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>

          {/* Narrative */}
          <div>
            <Reveal>
              <p className="font-serif text-2xl leading-[1.4] text-ink md:text-[28px]">
                Self-taught since 2024, Obaida mastered the one thing most
                creators ignore:{" "}
                <span className="italic text-rose">
                  why people stop scrolling.
                </span>{" "}
                The work lives under three minutes — tight, intentional, and made
                to perform.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 font-mono text-[13px] font-bold leading-relaxed text-rose">
                &gt; No templates. No filler. Just work that gets seen._
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
