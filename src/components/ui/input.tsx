import * as React from "react";
import { cn } from "@/lib/utils";

/** Underline-style field (Cinematic Editorial): no box, rose underline on focus. */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full border-0 border-b border-ink/15 bg-transparent px-0 py-2.5 font-sans text-[15px] text-ink transition-colors placeholder:text-dim/60 focus-visible:border-rose focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
