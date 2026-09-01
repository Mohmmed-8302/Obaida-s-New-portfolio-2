import { Button } from "@/components/ui/button";

/**
 * Footer is the one deliberate "dark container" on the light Slate & Rose
 * page (Storm background, per brand doc). Text/border colors are set
 * explicitly here rather than via the shared text/dim/line tokens, since
 * those tokens are tuned for dark content on the light canvas.
 */
export function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--dim)] pb-10 pt-[54px]">
      <div className="wrap flex flex-col items-center gap-[26px] sm:flex-row sm:justify-between">
        <div className="font-display text-2xl font-extrabold text-[color:var(--bg)]">
          OBAIDA
        </div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="border-[color:var(--bg)]/25 text-[color:var(--bg)] hover:border-accent hover:text-accent"
        >
          <a href="#hero">Back to top ↑</a>
        </Button>
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--bg)]/75">
          Short-form video editor · 2026
        </div>
      </div>
    </footer>
  );
}
