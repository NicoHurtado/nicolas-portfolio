"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { Reveal, WordsIn } from "./motion";

/** One paragraph word: fades from ghost-gray to ink as the section scrolls. */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="text-ink">
      {children}{" "}
    </motion.span>
  );
}

export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });

  const words = profile.bio.split(" ");

  return (
    <section className="shell py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:items-start lg:gap-16">
        <div>
          <Reveal y={12}>
            <div className="flex items-center gap-2.5">
              <span className="kicker-dot" />
              <span className="kicker">The approach</span>
            </div>
          </Reveal>

          <h2 className="mt-4 font-display text-[clamp(1.7rem,7vw,2.8rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            <WordsIn text="Complexity in." />
            <br />
            <WordsIn
              text="Clarity out."
              delay={0.15}
              className="font-serif font-normal italic tracking-normal"
            />
          </h2>

          {/* Tech communication — the CV's other half, linked to the channel */}
          <Reveal delay={0.15}>
            <a
              href={profile.tiktok}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 flex w-full max-w-xs items-center gap-4 rounded-2xl border border-line bg-paper p-4 transition-all duration-500 ease-soft hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_18px_40px_-28px_rgba(16,16,16,0.3)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-ink transition-colors duration-500 group-hover:bg-accent group-hover:text-paper">
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M9.4 2v7.9a2.9 2.9 0 1 1-2.9-2.9" />
                  <path d="M9.4 2c.4 1.8 1.7 2.9 3.5 3.1" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block font-display text-sm font-semibold tracking-tight text-ink">
                  {profile.tiktokFollowers} on TikTok
                </span>
                <span className="block truncate font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                  {profile.tiktokHandle} ↗
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        <div>
          <p
            ref={ref}
            className="max-w-2xl text-[17px] leading-relaxed sm:text-xl sm:leading-relaxed"
          >
            {words.map((word, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i / words.length, Math.min(1, (i + 6) / words.length)]}
              >
                {word}
              </Word>
            ))}
          </p>

          <Reveal delay={0.08} className="mt-7">
            <p className="max-w-2xl leading-relaxed text-muted">
              I&apos;m also a{" "}
              <span className="text-ink">technology communicator</span>:{" "}
              {profile.tiktokFollowers} people follow along on TikTok, where I
              make AI, data, and software engineering easy to understand for a
              general audience.
            </p>
          </Reveal>

          {/* Interests — a quiet coda, not a section of its own */}
          <Reveal delay={0.12} className="mt-8">
            <div className="max-w-2xl border-t border-line pt-6">
              <p className="kicker">What pulls me in</p>
              <p className="mt-3 leading-relaxed text-body">
                {profile.interests}
              </p>
              {/* The one that's personal, given room to read as such. */}
              <div className="mt-6 flex items-start gap-3.5 rounded-2xl border border-accent/25 bg-accent-soft p-4 sm:gap-4 sm:p-5">
                <span className="mt-0.5 text-accent" aria-hidden>
                  <svg
                    viewBox="0 0 16 16"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1.6 8.4h2.8l1.3-3.1 2.2 6 1.5-3.6 1 1.9h4" />
                  </svg>
                </span>
                <span>
                  <span className="block font-display text-[17px] font-semibold tracking-tight text-ink sm:text-lg">
                    Wellness &amp; health
                  </span>
                  <span className="mt-1 block leading-relaxed text-body">
                    The idea of contributing to people&apos;s health from
                    technology — prevention above all — genuinely excites me.
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
