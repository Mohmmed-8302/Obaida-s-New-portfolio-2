import * as React from "react";

/**
 * Fixed left timecode rail (desktop >=900px only, hidden via .rail CSS in index.css).
 * Static markup + refs only — GSAP (playhead position, timecode tick, active clip
 * label) is wired up in Task 4 via the ids below.
 */
export function Rail() {
  const root = React.useRef<HTMLDivElement>(null);

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
