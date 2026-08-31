import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors",
  {
    variants: {
      variant: {
        default: "border border-rose/25 bg-rose/[0.06] px-3.5 py-1.5 text-rose",
        slate: "border border-ink/10 bg-panel px-3 py-1 text-dim",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
