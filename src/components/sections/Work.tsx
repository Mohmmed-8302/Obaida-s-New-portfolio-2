import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PORTFOLIOS } from "@/data";

export function Work() {
  return (
    <section id="work" className="border-b border-ink/[0.08]">
      <div className="container py-20 md:py-28">
        <SectionHead reel="03" label="Portfolios" title="Sites built to convert" />

        <Reveal
          stagger
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PORTFOLIOS.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block max-w-[560px]"
            >
              <Card className="h-full hover:border-rose/40 hover:shadow-[0_28px_70px_-40px_hsl(var(--accent)/0.5)]">
                <div className="relative aspect-[4/3] overflow-hidden border-b border-ink/[0.08]">
                  <Badge className="absolute left-3 top-3 z-10">
                    {item.tag}
                  </Badge>
                  <img
                    src={item.screenshot}
                    alt={`${item.title} website preview`}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center bg-canvas/40 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full border border-rose/50 bg-canvas/70 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-rose">
                      Visit site <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-2xl text-ink">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-dim transition-colors group-hover:text-rose" />
                  </div>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-dim">
                    {item.desc}
                  </p>
                  <div className="slate mt-5 text-dim">{item.meta}</div>
                </div>
              </Card>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
