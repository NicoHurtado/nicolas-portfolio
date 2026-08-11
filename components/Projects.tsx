"use client";

import { highlightedProjects } from "@/data/projects";
import type { GithubRepo } from "@/lib/github";
import RepoGallery from "./RepoGallery";
import { Kicker, Reveal, WordsIn } from "./motion";

export default function Projects({ repos }: { repos: GithubRepo[] }) {
  return (
    <section id="projects" className="shell scroll-mt-24 py-24 sm:py-32">
      <Kicker index="03" label="Selected work" />
      <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,4.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
        <WordsIn text="Products that are" />{" "}
        <WordsIn
          text="alive in production."
          delay={0.15}
          className="font-serif font-normal italic tracking-normal"
        />
      </h2>

      {/* featured projects — quiet editorial rows */}
      <div className="mt-16">
        {highlightedProjects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.04}>
            <article className="group grid gap-5 border-t border-line py-10 transition-colors duration-500 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-12">
              <div>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-faint">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight text-ink transition-transform duration-500 ease-soft group-hover:translate-x-1.5">
                    {p.name}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 md:pl-10">
                  {p.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-surface px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-5 md:pt-1.5">
                <p className="leading-relaxed text-body">{p.description}</p>
                <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.14em]">
                  {p.live ? (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-1.5 text-ink transition-colors hover:text-accent"
                    >
                      Live
                      <span className="transition-transform duration-300 ease-soft group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                        ↗
                      </span>
                    </a>
                  ) : null}
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
                  >
                    Code
                    <span className="transition-transform duration-300 ease-soft group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* live GitHub feed */}
      {repos.length > 0 ? (
        <div className="mt-20">
          <RepoGallery repos={repos} />
        </div>
      ) : null}
    </section>
  );
}
