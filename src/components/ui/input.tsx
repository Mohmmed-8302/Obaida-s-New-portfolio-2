import * as React from "react";
import { cn } from "@/lib/utils";

/** Underline-style field (The Cutting Room): no box, ember underline on focus. */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full rounded-none border-0 border-b border-[color:var(--line-2)] bg-transparent px-0 py-2.5 font-sans text-base text-text transition-colors placeholder:text-[color:var(--dim-2)] focus-visible:border-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
