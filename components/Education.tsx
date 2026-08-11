"use client";

import { education } from "@/data/education";
import { Kicker, Reveal, WordsIn } from "./motion";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 bg-surface py-24 sm:py-32">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <Kicker index="02" label="Education" />
          <h2 className="mt-6 font-display text-[clamp(2.4rem,4.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            <WordsIn text="Grounded in" />
            <br />
            <WordsIn
              text="computer science."
              delay={0.15}
              className="font-serif font-normal italic tracking-normal"
            />
          </h2>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-line bg-paper p-8 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                {education.school}
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {education.period}
              </span>
            </div>
            <p className="mt-2 text-body">
              {education.degree} —{" "}
              <em className="font-serif italic text-ink">{education.detail}</em>
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <p className="font-display text-3xl font-semibold tracking-tight text-ink">
                  {education.gpa.split(" ")[0]}
                  <span className="text-lg text-faint"> / 5.0</span>
                </p>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                  GPA
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold tracking-tight text-ink">
                  10<span className="text-lg text-faint">th</span>
                </p>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                  Semester
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold tracking-tight text-ink">
                  English <span className="text-lg text-faint">C1</span>
                </p>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                  Bilingual Spanish / English
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                Relevant coursework
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {education.coursework.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-surface px-3 py-1 text-[13px] text-body"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
