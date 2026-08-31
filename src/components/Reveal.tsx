import * as React from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** stagger children instead of animating the wrapper as one unit */
  stagger?: boolean;
  delay?: number;
  y?: number;
  as?: React.ElementType;
};

/**
 * Restrained reveal-on-scroll: fade + 16px rise, ~0.7s ease-out.
 * Uses ScrollTrigger via useGSAP (auto-cleanup). Honors reduced-motion.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  y = 16,
  as: Tag = "div",
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const targets = stagger
        ? (ref.current.children as unknown as Element[])
        : ref.current;

      gsap.from(targets as gsap.TweenTarget, {
        opacity: 0,
        y,
        duration: 0.7,
        delay,
        ease: "power2.out",
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
