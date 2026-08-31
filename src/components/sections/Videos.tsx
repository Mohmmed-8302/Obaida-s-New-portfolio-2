import * as React from "react";
import { Volume2, VolumeX, Maximize } from "lucide-react";
import { VIDEOS, type VideoItem } from "@/data";
import { useGSAP, prefersReducedMotion, revealOnScroll } from "@/lib/gsap";

function VideoCard({ video }: { video: VideoItem }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(true);

  const onLoaded = () => {
    if (ref.current) ref.current.currentTime = 1;
  };

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.muted = true;
      setMuted(true);
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const fullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    ref.current?.requestFullscreen?.();
  };

  return (
    <div
      data-reveal
      onClick={toggle}
      className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-[6px] border border-[color:var(--line)]"
    >
      <video
        ref={ref}
        src={video.src}
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={onLoaded}
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full bg-black object-cover transition-transform duration-[600ms] ease-[var(--ease)] group-hover:scale-[1.06]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-40% to-canvas/85" />

      {!playing && (
        <div className="absolute left-1/2 top-1/2 flex h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--line-2)] bg-canvas/55 backdrop-blur-[4px] transition-all duration-300 ease-[var(--ease)] group-hover:scale-110 group-hover:bg-accent">
          <span className="ml-[3px] h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-text transition-colors group-hover:border-l-[#1a0d07]" />
        </div>
      )}

      {playing && (
        <div className="absolute bottom-3 right-3 z-10 flex gap-2">
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line-2)] bg-canvas/70 text-text backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            {muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={fullscreen}
            aria-label="Fullscreen"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line-2)] bg-canvas/70 text-text backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            <Maximize className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          {video.tag}
        </div>
        <div
          dir="rtl"
          className="mt-1.5 font-display text-[1.05rem] font-bold leading-[1.2] text-text"
        >
          {video.title}
        </div>
      </div>
    </div>
  );
}

export function Videos() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealOnScroll(root.current!);
    },
    { scope: root }
  );

  return (
    <section id="videos" ref={root} className="section-line" data-clip="06 / REEL">
      <div className="wrap">
        <div className="mb-[54px]" data-reveal>
          <h2 className="max-w-[18ch] text-[clamp(2rem,5vw,3.4rem)] text-text">
            The reel.
          </h2>
          <p className="mt-[18px] max-w-[56ch] text-dim">
            Short-form edits across awareness, education, and entertainment.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-4 sm:gap-[22px]">
          {VIDEOS.map((v) => (
            <VideoCard key={v.src} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
