"use client";

import { skillGroups, personGroups, aiTools } from "@/data/skills";
import { Kicker, Reveal, WordsIn } from "./motion";
import TechIcon from "./TechIcon";

/** Chip with an optional minimal glyph for the technologies that have one. */
function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-[12.5px] text-body transition-colors duration-300 hover:border-ink sm:px-3.5 sm:text-[13px]">
      <TechIcon name={label} className="h-3.5 w-3.5 shrink-0 text-muted" />
      {label}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-y scroll-mt-20 bg-surface sm:scroll-mt-24">
      <div className="shell">
        <Kicker index="04" label="Capabilities" />
        <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,9vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:mt-6">
          <WordsIn text="AI and data, put to work on" />{" "}
          <WordsIn
            text="everyday problems."
            delay={0.15}
            className="font-serif font-normal italic tracking-normal"
          />
        </h2>

        <div className="mt-10 sm:mt-16">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.04}>
              <div className="grid gap-3 border-t border-line/90 py-7 sm:gap-4 sm:py-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12">
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {group.items.map((item) => (
                    <Chip key={item} label={item} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {/* AI-native tooling — the differentiator */}
          <Reveal>
            <div className="grid gap-3 border-t border-line/90 py-7 sm:gap-4 sm:py-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12">
              <div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
                  Agentic AI{" "}
                  <span className="font-serif font-normal italic">
                    & AI-native engineering
                  </span>
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                  Building and orchestrating AI agents for coding, design, and
                  automation.
                </p>
              </div>
              <div className="flex flex-wrap content-start gap-1.5 sm:gap-2">
                {aiTools.map((tool) => (
                  <Chip key={tool} label={tool} />
                ))}
              </div>
            </div>
          </Reveal>

          {personGroups.map((group) => (
            <Reveal key={group.title}>
              <div className="grid gap-3 border-t border-line/90 py-7 sm:gap-4 sm:py-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12">
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full px-2.5 py-1.5 text-[12.5px] text-muted sm:px-3.5 sm:text-[13px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
