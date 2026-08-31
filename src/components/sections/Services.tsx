import { SERVICES } from "@/data";

export function Services() {
  return (
    <section id="services" className="section-line" data-clip="03 / SERVICES">
      <div className="wrap">
        <div className="mb-[54px]" data-reveal>
          <h2 className="max-w-[18ch] text-[clamp(2rem,5vw,3.4rem)] text-text">
            What you can hire me for.
          </h2>
          <p className="mt-[18px] max-w-[56ch] text-dim">
            Four things I do well, end to end. Pick one or stack them into a
            full content pipeline.
          </p>
        </div>

        <div
          data-reveal
          className="grid gap-px overflow-hidden rounded-[4px] border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2"
        >
          {SERVICES.map((s) => (
            <div
              key={s.n}
              className="group relative bg-canvas px-[34px] py-10 transition-colors duration-[400ms] hover:bg-panel"
            >
              <div className="font-mono text-xs tracking-[0.1em] text-dim-2">
                {s.n}
              </div>
              <span className="absolute right-[34px] top-10 text-dim-2 transition-all duration-300 ease-[var(--ease)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent">
                ↗
              </span>
              <h3 className="mt-4 text-2xl text-text transition-colors duration-300 group-hover:text-accent">
                {s.label}
              </h3>
              <p className="mt-2.5 font-mono text-xs uppercase tracking-[0.06em] text-dim">
                {s.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
