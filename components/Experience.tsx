"use client";

import { experience } from "@/data/experience";
import { Kicker, Reveal, WordsIn } from "./motion";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((h, k) => (
        <li key={k} className="flex gap-3 leading-relaxed text-body">
          <span className="mt-[0.72em] h-px w-5 shrink-0 bg-faint" />
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* sticky intro column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Kicker index="01" label="Experience" />
          <h2 className="mt-6 font-display text-[clamp(2.4rem,4.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            <WordsIn text="Where I've" />
            <br />
            <WordsIn
              text="built things."
              delay={0.15}
              className="font-serif font-normal italic tracking-normal"
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              From Latin America&apos;s largest investment bank to products I
              co-founded — always at the intersection of data, AI, and
              software that ships.
            </p>
          </Reveal>
        </div>

        {/* timeline — a hairline rail with a node per company */}
        <div>
          {experience.map((job, i) => {
            const last = i === experience.length - 1;
            return (
              <Reveal key={job.company} delay={i * 0.05}>
                <article
                  className={`group relative pl-8 sm:pl-10 ${
                    last ? "pb-0" : "pb-12"
                  } ${
                    last
                      ? ""
                      : "before:absolute before:left-[5.5px] before:top-6 before:bottom-0 before:w-px before:bg-faint/60"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-[5px] h-3 w-3 rounded-full border-2 ${
                      job.current
                        ? "border-accent bg-accent"
                        : "border-faint bg-paper"
                    }`}
                  />

                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {job.period}
                      {job.current ? (
                        <span className="ml-3 inline-flex items-center gap-1.5 text-accent">
                          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                          Now
                        </span>
                      ) : null}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                      {job.location}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
                    {job.company}
                    {job.note ? (
                      <span className="ml-2.5 align-middle font-sans text-[13px] font-normal text-faint">
                        {job.note}
                      </span>
                    ) : null}
                  </h3>

                  {job.role ? (
                    <p className="mt-1 font-serif text-lg italic text-body">
                      {job.role}
                    </p>
                  ) : null}

                  <p className="mt-2 leading-relaxed text-muted">
                    {job.summary}
                  </p>

                  {/* one position */}
                  {job.highlights ? <Bullets items={job.highlights} /> : null}

                  {/* several positions in the same company */}
                  {job.roles ? (
                    <div className="mt-6 space-y-7">
                      {job.roles.map((role, k) => (
                        <div
                          key={role.title}
                          className={`relative pl-6 ${
                            k < job.roles!.length - 1
                              ? "before:absolute before:left-[3px] before:top-4 before:bottom-[-1.1rem] before:w-px before:bg-line"
                              : ""
                          }`}
                        >
                          <span
                            aria-hidden
                            className="absolute left-0 top-[7px] h-[7px] w-[7px] rounded-full border border-faint bg-paper"
                          />
                          <p className="font-serif text-lg italic text-ink">
                            {role.title}
                          </p>
                          <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                            {role.period}
                          </p>
                          <Bullets items={role.highlights} />
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
