import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Studio } from "@/components/sections/Studio";
import { Journey } from "@/components/sections/Journey";
import { Work } from "@/components/sections/Work";
import { Videos } from "@/components/sections/Videos";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-canvas">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Studio />
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
