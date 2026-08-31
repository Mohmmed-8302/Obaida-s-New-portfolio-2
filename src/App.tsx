import * as React from "react";
import { Nav } from "@/components/sections/Nav";
import { Rail } from "@/components/sections/Rail";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Studio } from "@/components/sections/Studio";
import { Services } from "@/components/sections/Services";
import { Journey } from "@/components/sections/Journey";
import { Work } from "@/components/sections/Work";
import { Videos } from "@/components/sections/Videos";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { useGSAP, prefersReducedMotion, enableAnimClass } from "@/lib/gsap";

export default function App() {
  const root = React.useRef<HTMLDivElement>(null);

  // Arms the `html.anim [data-reveal]` CSS rule (src/index.css) so reveal
  // targets across every section start hidden before their own useGSAP
  // wires up the scroll-triggered/load-in tween that brings them in. Skipped
  // entirely under reduced motion so [data-reveal] content stays visible.
  useGSAP(
    () => {
      if (!prefersReducedMotion()) enableAnimClass();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative min-h-screen bg-canvas">
      <Nav />
      <Rail />
      <main>
        <Hero />
        <Marquee />
        <Studio />
        <Services />
        <Journey />
        <Work />
        <Videos />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
