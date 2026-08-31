import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-ink/[0.08]">
      <div className="container py-14">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="font-serif text-3xl text-ink md:text-4xl">
            Obaida<span className="text-rose">.</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp className="h-4 w-4" /> Back to top
          </Button>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
            © 2024–2026 Obaida — Video / Design
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim/70">
            Crafted frame by frame
          </span>
        </div>
      </div>
    </footer>
  );
}
