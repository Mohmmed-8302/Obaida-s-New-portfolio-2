import { PORTFOLIOS } from "@/data";

export function Work() {
  const item = PORTFOLIOS[0];

  return (
    <section id="work" className="section-line" data-clip="05 / WORK">
      <div className="wrap">
        <div className="mb-[54px]" data-reveal>
          <h2 className="max-w-[18ch] text-[clamp(2rem,5vw,3.4rem)] text-text">
            Selected work.
          </h2>
          <p className="mt-[18px] max-w-[56ch] text-dim">
            Client sites and brand pages, designed and built to convert.
          </p>
        </div>

        <div
          data-reveal
          className="group max-w-[940px] overflow-hidden rounded-[6px] border border-[color:var(--line)] bg-panel transition-colors duration-[400ms] hover:border-[color:var(--line-2)]"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <span className="absolute left-[18px] top-[18px] z-10 rounded-full border border-[color:var(--line-2)] bg-canvas/70 px-3 py-[7px] font-mono text-[11px] uppercase tracking-[0.14em] text-text backdrop-blur-[6px]">
              {item.tag}
            </span>
            <img
              src={item.screenshot}
              alt={`${item.title} website preview`}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[600ms] ease-[var(--ease)] group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
          <div className="px-[34px] pb-[34px] pt-[30px]">
            <h3 className="text-[2rem] text-text">{item.title}</h3>
            <div className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-dim">
              {item.meta}
            </div>
            {/* single-accent rule: no em-dashes in visible copy */}
            <p className="mt-4 max-w-[58ch] text-dim">
              {item.desc.replace(/\s*—\s*/g, ", ")}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[22px] inline-flex items-center gap-2 font-mono text-[12.5px] uppercase tracking-[0.08em] text-accent transition-[gap] duration-200 hover:gap-3.5"
            >
              Visit site ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
