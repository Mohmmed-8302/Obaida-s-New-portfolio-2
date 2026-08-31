import * as React from "react";
import { Play, Volume2, VolumeX, Maximize } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VIDEOS, type VideoItem } from "@/data";

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
    <Card className="overflow-hidden hover:border-rose/40">
      <div className="relative cursor-pointer" onClick={toggle}>
        <video
          ref={ref}
          src={video.src}
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={onLoaded}
          onEnded={() => setPlaying(false)}
          className="aspect-[9/16] w-full bg-black object-cover"
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-canvas/40 transition-colors">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-rose bg-canvas/60 text-rose shadow-[0_0_20px_hsl(var(--accent)/0.4)]">
              <Play className="h-5 w-5 translate-x-0.5 fill-current" />
            </span>
          </div>
        )}
        {playing && (
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-canvas/70 text-ink backdrop-blur-sm transition-colors hover:border-rose hover:text-rose"
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-canvas/70 text-ink backdrop-blur-sm transition-colors hover:border-rose hover:text-rose"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <Badge className="mb-2.5">{video.tag}</Badge>
        <div dir="rtl" className="font-serif text-lg text-ink">
          {video.title}
        </div>
      </div>
    </Card>
  );
}

export function Videos() {
  return (
    <section id="videos" className="border-b border-ink/[0.08]">
      <div className="container py-20 md:py-28">
        <SectionHead reel="04" label="Videos" title="Selected edits" />
        <Reveal
          stagger
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {VIDEOS.map((v) => (
            <VideoCard key={v.src} video={v} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
