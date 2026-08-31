import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Pill button system — The Cutting Room.
 * All variants are fully rounded (border-radius: 999px) per the design plan.
 * Primary: ember fill, lift + ember glow on hover, settle+scale on press.
 * Ghost: hairline border, ember border/text on hover.
 */
const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-mono text-[12.5px] uppercase tracking-[0.08em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 will-change-transform",
  {
    variants: {
      variant: {
        // ember fill, dark ink text — primary CTA
        primary:
          "bg-accent text-[#1a0d07] font-semibold hover:-translate-y-0.5 hover:bg-[color:var(--accent-soft)] hover:shadow-[0_10px_30px_var(--accent-glow)] active:translate-y-0 active:scale-[0.98]",
        // hairline outline — fills to ember on hover
        ghost:
          "border border-[color:var(--line-2)] bg-transparent text-text hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0 active:scale-[0.98]",
        // neutral hairline — tertiary
        outline:
          "border border-[color:var(--line)] bg-transparent text-dim hover:-translate-y-0.5 hover:border-[color:var(--line-2)] hover:text-text active:translate-y-0",
        // bare link-ish
        link: "text-accent underline-offset-4 hover:underline rounded-none px-0 tracking-normal normal-case",
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
