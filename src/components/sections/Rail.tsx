import * as React from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Fixed left timecode rail (desktop >=900px only, hidden via .rail CSS in
 * index.css). Wires up: the scroll-linked playhead position + timecode
 * text, and the active-clip label that tracks whichever section is
 * currently in view.
 */
export function Rail() {
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const railHead = root.current?.querySelector<HTMLElement>(".rail-head");
      const railTc = root.current?.querySelector<HTMLElement>(".rail-tc");
      const railClip = root.current?.querySelector<HTMLElement>("#railClip");
      const track = root.current?.querySelector<HTMLElement>(".rail-track");
      if (!railHead || !railTc || !railClip || !track) return;

      const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
      const FAKE_DURATION = 254; // seconds of "reel" mapped across full scroll

      // Playhead position + running timecode, driven by total document scroll.
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const progress = self.progress;
          const trackHeight = track.offsetHeight;
          gsap.set(railHead, { y: progress * trackHeight });

          const total = progress * FAKE_DURATION;
          const mm = Math.floor(total / 60);
          const ss = Math.floor(total % 60);
          const ff = Math.floor((total % 1) * 24);
          railTc.textContent = `00:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
        },
      });

      // Active-clip label: whichever section is centered updates #railClip.
      // Pass `document` explicitly: inside a scoped useGSAP context, a bare
      // selector is auto-scoped to `root` (the .rail div), which contains no
      // sections. Scope to the document so the sections under <main> resolve.
      const sections = gsap.utils.toArray<HTMLElement>(
        "section[data-clip]",
        document
      );
      sections.forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (!self.isActive) return;
            railClip.textContent = sec.dataset.clip ?? "";
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="rail" aria-hidden="true">
      <div className="rail-tc" id="railTc">
        00:00:00:00
      </div>
      <div className="rail-track" />
      <div className="rail-head" id="railHead" />
      <div className="rail-clip">
        CLIP <b id="railClip">01 / HERO</b>
      </div>
    </div>
  );
}
