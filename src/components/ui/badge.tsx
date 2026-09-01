import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors",
  {
    variants: {
      variant: {
        // solid Dusty Rose fill + Blue Slate text keeps badge copy AAA-legible
        // (rose text on a rose-tinted background falls well short of AAA).
        default:
          "border border-[color:var(--accent-deep)] bg-accent px-3.5 py-1.5 text-accent-foreground",
        slate: "border border-[color:var(--line)] bg-panel px-3 py-1 text-dim",
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
