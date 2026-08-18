"use client";

import { education } from "@/data/education";
import { Kicker, Reveal, WordsIn } from "./motion";

export default function Education() {
  return (
    <section id="education" className="section-y scroll-mt-20 bg-surface sm:scroll-mt-24">
      <div className="shell grid gap-10 sm:gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <Kicker index="02" label="Education" />
          <h2 className="mt-5 font-display text-[clamp(2rem,9vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:mt-6">
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
          <div className="rounded-2xl border border-line bg-paper p-6 sm:rounded-3xl sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {education.school}
              </h3>
              <span className="meta text-muted">
                {education.period}
              </span>
            </div>
            <p className="mt-2 text-body">
              {education.degree} —{" "}
              <em className="font-serif italic text-ink">{education.detail}</em>
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6">
              <div>
                <p className="font-display text-[1.65rem] font-semibold tracking-tight text-ink sm:text-3xl">
                  {education.gpa.split(" ")[0]}
                  <span className="text-base text-faint sm:text-lg"> / 5.0</span>
                </p>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                  GPA
                </p>
              </div>
              <div>
                <p className="font-display text-[1.65rem] font-semibold tracking-tight text-ink sm:text-3xl">
                  10<span className="text-base text-faint sm:text-lg">th</span>
                </p>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                  Semester
                </p>
              </div>
              <div>
                <p className="font-display text-[1.65rem] font-semibold tracking-tight text-ink sm:text-3xl">
                  English <span className="text-base text-faint sm:text-lg">C1</span>
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
              <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                {education.coursework.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-surface px-2.5 py-1 text-[12.5px] text-body sm:px-3 sm:text-[13px]"
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
