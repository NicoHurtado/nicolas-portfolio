import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import { fetchGithubRepos } from "@/lib/github";
import { eventImages } from "@/lib/eventImages";
import { events } from "@/data/events";

export default async function Home() {
  const repos = await fetchGithubRepos();

  // Photos are read from disk here (server side) so the Events client
  // component stays free of filesystem access.
  const eventsWithImages = events.map((event) => ({
    ...event,
    images: eventImages(event.slug),
  }));

  return (
    <main className="bg-paper">
      <Nav />
      <Hero />
      <Statement />
      <Experience />
      <Education />
      <Projects repos={repos} />
      <Skills />
      <Certifications />
      <Events events={eventsWithImages} />
      <Footer />
    </main>
  );
}
