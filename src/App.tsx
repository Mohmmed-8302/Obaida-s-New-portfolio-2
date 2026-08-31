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

export default function App() {
  return (
    <div className="relative min-h-screen bg-canvas">
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
