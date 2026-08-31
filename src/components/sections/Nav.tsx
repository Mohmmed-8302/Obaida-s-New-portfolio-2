import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/data";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Fixed top nav. `.scrolled` toggling and `.active` link tracking are wired
 * up here via ScrollTrigger (DOM classList, no React state, no window
 * scroll listener) against the `[&.scrolled]` / `[&.active]` style variants
 * below.
 */
export function Nav() {
  const [open, setOpen] = React.useState(false);
  const root = React.useRef<HTMLElement>(null);
  const closeMenu = () => setOpen(false);

  useGSAP(
    () => {
      const navEl = root.current;
      if (!navEl) return;

      // Scrolled background state: a legibility toggle (opaque header once
      // content scrolls under it), not decorative motion, so it stays on
      // even under reduced motion -- matches the approved prototype, which
      // creates this ScrollTrigger before its reduced-motion early return.
      ScrollTrigger.create({
        start: "top -60",
        end: 99999,
        onUpdate: (self) => {
          navEl.classList.toggle("scrolled", self.scroll() > 60);
        },
      });

      if (prefersReducedMotion()) return;

      const links = gsap.utils.toArray<HTMLAnchorElement>(".nav-link", navEl);
      const sections = gsap.utils.toArray<HTMLElement>("section[data-clip]");

      sections.forEach((sec) => {
        const link = links.find(
          (a) => a.getAttribute("href") === `#${sec.id}`
        );
        if (!link) return;
        ScrollTrigger.create({
          trigger: sec,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (!self.isActive) return;
            links.forEach((a) => a.classList.remove("active"));
            link.classList.add("active");
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <header
      id="nav"
      ref={root}
      className="fixed inset-x-0 top-0 z-[80] flex h-[68px] items-center border-b border-transparent bg-transparent transition-[background-color,border-color] duration-[400ms] ease-[var(--ease)] [&.scrolled]:border-[color:var(--line)] [&.scrolled]:bg-canvas/[0.72] [&.scrolled]:backdrop-blur-[14px]"
    >
      <div className="wrap flex w-full items-center justify-between gap-4">
        <a
          href="#hero"
          className="flex items-baseline gap-2.5 font-display text-[19px] font-extrabold tracking-[-0.01em] text-text"
        >
          OBAIDA
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
            EST. 2024
          </span>
        </a>

        <div className="hidden items-center gap-[30px] min-[900px]:flex" id="navLinks">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="nav-link group relative py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-dim transition-colors duration-200 hover:text-text [&.active]:text-text"
            >
              {l.label}
              <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px w-0 bg-accent transition-all duration-300 ease-[var(--ease)] group-hover:w-full group-[.active]:w-full" />
            </a>
          ))}
        </div>

        <Button
          asChild
          variant="primary"
          size="sm"
          className="hidden min-[900px]:inline-flex"
        >
          <a href="#contact">Start a project</a>
        </Button>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="inline-flex flex-col gap-[5px] border-0 bg-transparent p-2 min-[900px]:hidden"
        >
          <span
            className={cn(
              "h-0.5 w-6 bg-text transition-transform duration-300 ease-[var(--ease)]",
              open && "translate-y-[7px] rotate-45"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-text transition-opacity duration-200",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-text transition-transform duration-300 ease-[var(--ease)]",
              open && "-translate-y-[7px] -rotate-45"
            )}
          />
        </button>
      </div>

      <div
        id="mobileMenu"
        className={cn(
          "fixed inset-x-0 top-[68px] z-[79] flex flex-col gap-1 border-b border-[color:var(--line)] bg-canvas/[0.97] px-7 pb-7 pt-4 backdrop-blur-[16px] transition-all duration-300 ease-[var(--ease)] min-[900px]:hidden",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        )}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={closeMenu}
            className="border-b border-[color:var(--line)] py-3.5 font-mono text-sm uppercase tracking-[0.08em] text-dim"
          >
            {l.label}
          </a>
        ))}
        <Button
          asChild
          variant="primary"
          size="md"
          className="mt-[18px] justify-center"
        >
          <a href="#contact" onClick={closeMenu}>
            Start a project
          </a>
        </Button>
      </div>
    </header>
  );
}
