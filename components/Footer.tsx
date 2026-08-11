"use client";

import { profile } from "@/data/profile";
import { Kicker, Reveal, WordsIn } from "./motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line">
      <div className="shell pb-10 pt-24 sm:pt-32">
        <Kicker index="07" label="Contact" />
        <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[1.0] tracking-[-0.035em] text-ink">
          <WordsIn text="Let's build something" />
          <br />
          <WordsIn
            text="intelligent together."
            delay={0.2}
            className="font-serif font-normal italic tracking-normal"
          />
        </h2>

        <Reveal delay={0.25}>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-10 inline-flex items-center gap-3 text-lg text-body transition-colors hover:text-ink sm:text-xl"
          >
            <span className="kicker-dot" />
            {profile.email}
            <span className="text-faint transition-all duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
              ↗
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.14em]">
            {[
              ["GitHub", profile.github],
              ["LinkedIn", profile.linkedin],
              ["Résumé", profile.cv],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-muted transition-colors hover:text-ink"
              >
                {label} ↗
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
          <span>
            © {year} {profile.shortName} · {profile.location}
          </span>
          <span>Designed & built with AI-native tools</span>
        </div>
      </div>

      {/* ghost name — quiet, oversized, cropped at the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[17.5vw] font-bold leading-[0.72] tracking-[-0.04em] text-ink/[0.04]"
      >
        NICOLAS
      </div>
    </footer>
  );
}
