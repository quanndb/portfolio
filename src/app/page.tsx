import About from "@/components/layout/about";
import Banner from "@/components/layout/banner";
import Contact from "@/components/layout/contact";
import Projects from "@/components/layout/projects";
import { Spotlight } from "@/components/ui/spotlight";

export default function Home() {
  return (
    <div>
      <Spotlight className="fixed top-0 left-0 z-50 w-full h-full" />
      <Banner />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}
