import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Events from "@/components/Events";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-ink">
      <Hero />
      <Skills />
      <Certifications />
      <Projects />
      <Events />
      <Footer />
    </main>
  );
}
