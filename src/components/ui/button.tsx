import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Pill button system — Cinematic Editorial.
 * All variants are fully rounded (border-radius: 999px) per the design plan.
 * Subtle lift + soft rose shadow on hover; press settles back down.
 */
const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-mono text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 will-change-transform",
  {
    variants: {
      variant: {
        // rose-filled, dark ink — primary CTA
        primary:
          "bg-rose text-[hsl(var(--accent-foreground))] shadow-[0_1px_0_hsl(var(--ink)/0.25)_inset,0_10px_30px_-12px_hsl(var(--accent)/0.7)] hover:-translate-y-0.5 hover:bg-[hsl(var(--accent))] hover:shadow-[0_1px_0_hsl(var(--ink)/0.3)_inset,0_16px_40px_-14px_hsl(var(--accent)/0.85)] active:translate-y-0",
        // ghost outline — fills faintly on hover
        ghost:
          "border border-rose/55 bg-transparent text-ink hover:-translate-y-0.5 hover:border-rose hover:bg-rose/10 hover:shadow-[0_12px_34px_-18px_hsl(var(--accent)/0.6)] active:translate-y-0",
        // neutral hairline — tertiary
        outline:
          "border border-ink/15 bg-transparent text-dim hover:-translate-y-0.5 hover:border-ink/30 hover:text-ink active:translate-y-0",
        // bare link-ish
        link: "text-rose underline-offset-4 hover:underline rounded-none px-0 tracking-normal normal-case",
      },
      size: {
        lg: "h-[54px] px-9 text-[13px]",
        md: "h-[46px] px-7",
        sm: "h-[38px] px-5 text-[11px]",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
