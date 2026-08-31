import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)] pb-10 pt-[54px]">
      <div className="wrap flex flex-col items-center gap-[26px] sm:flex-row sm:justify-between">
        <div className="font-display text-2xl font-extrabold text-text">
          OBAIDA
        </div>
        <Button asChild variant="ghost" size="sm">
          <a href="#hero">Back to top ↑</a>
        </Button>
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-dim-2">
          Short-form video editor · 2026
        </div>
      </div>
    </footer>
  );
}
