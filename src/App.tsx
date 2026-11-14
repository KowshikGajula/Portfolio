import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Expertise } from "@/components/sections/Expertise";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-canvas text-ink antialiased">
        <Navbar />

        <main id="main">
          <Hero />
          <About />
          <Journey />
          <Projects />
          <Expertise />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
