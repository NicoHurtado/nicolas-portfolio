import Section from "./Section";
import Reveal from "./Reveal";
import RepoGallery, { type GalleryItem } from "./RepoGallery";
import { highlightedProjects } from "@/data/projects";
import { profile } from "@/data/profile";
import { fetchGithubRepos } from "@/lib/github";

function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group/link inline-flex items-center gap-1.5 text-[13px] font-medium text-clay transition-colors hover:text-clay2"
    >
      {children}
      <span
        aria-hidden
        className="transition-transform group-hover/link:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}

export default async function Projects() {
  const repos = await fetchGithubRepos();

  // Merge the deployed/highlighted builds into the same feed as every other
  // repo, flagged `featured` so the gallery can give them a modest accent
  // without walling them off into a separate section.
  const featured: GalleryItem[] = highlightedProjects.map((p) => ({
    name: p.name,
    description: p.description,
    url: p.code,
    liveUrl: p.live,
    language: p.technologies[0] ?? null,
    stars: 0,
    featured: true,
  }));

  const fromRepos: GalleryItem[] = repos.map((r) => ({
    name: r.name,
    description: r.description,
    url: r.url,
    liveUrl: r.homepage ?? undefined,
    language: r.language,
    stars: r.stars,
    featured: false,
  }));

  const items = [...featured, ...fromRepos];

  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Projects"
      title={
        <>
          Things I&apos;ve built and{" "}
          <span className="italic text-clay">shipped</span>.
        </>
      }
      intro="Every public project pulled live from GitHub — filter by language or expand to browse them all. A few are deployed and running in production, marked with a Live badge."
    >
      {items.length > 0 ? <RepoGallery items={items} /> : null}

      <Reveal className="mt-10">
        <ArrowLink href={profile.github}>See everything on GitHub</ArrowLink>
      </Reveal>
    </Section>
  );
}
