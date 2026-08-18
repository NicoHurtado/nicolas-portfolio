"use client";

import { useState } from "react";
import {
  certifications,
  certCategories,
  type CertCategory,
} from "@/data/certifications";
import { featuredGroups, specializations } from "@/data/specializations";
import { Kicker, Reveal, WordsIn } from "./motion";
import ProviderMark from "./ProviderMark";

export default function Certifications() {
  const [active, setActive] = useState<CertCategory | "All">("All");

  const shown =
    active === "All"
      ? certifications
      : certifications.filter((c) => c.category === active);

  return (
    <section id="certifications" className="section-y shell scroll-mt-20 sm:scroll-mt-24">
      <Kicker index="05" label="Certifications" />
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 sm:mt-6 sm:gap-6">
        <h2 className="max-w-2xl font-display text-[clamp(2rem,9vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
          <WordsIn text="Proof of" />{" "}
          <WordsIn
            text="continuous learning."
            delay={0.15}
            className="font-serif font-normal italic tracking-normal"
          />
        </h2>
        <Reveal delay={0.2}>
          <p className="meta text-muted">
            {certifications.length} certificates · {specializations.length}{" "}
            specializations
          </p>
        </Reveal>
      </div>

      {/* ── Featured ─────────────────────────────────────────────────────── */}
      <Reveal className="mt-10 sm:mt-14">
        <div className="flex items-center gap-4">
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
            Featured
          </h3>
          <span className="h-px flex-1 bg-line" />
        </div>
      </Reveal>

      {featuredGroups.map((group, g) => (
        <div key={group.title} className={g === 0 ? "mt-8" : "mt-10"}>
          <Reveal y={12}>
            <p className="kicker">{group.title}</p>
          </Reveal>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <a
                  href={item.certificate}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full items-start gap-3.5 rounded-2xl border border-line bg-surface/60 p-4 sm:gap-4 sm:p-5 transition-all duration-500 ease-soft hover:-translate-y-0.5 hover:border-ink hover:bg-paper"
                >
                  <ProviderMark provider={item.provider} size="md" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-display text-[15.5px] font-semibold leading-snug tracking-tight text-ink sm:text-[17px]">
                        {item.title}
                      </span>
                      <span className="shrink-0 text-faint transition-all duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                        ↗
                      </span>
                    </span>
                    <span className="mt-1.5 block font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                      {item.provider} · {item.year} · {group.kind}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      ))}

      {/* ── Everything else, as a peer block rather than an afterthought ─── */}
      <Reveal className="mt-12 sm:mt-16">
        <div className="flex items-center gap-4">
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
            All certificates
          </h3>
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
            {shown.length} shown
          </span>
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <div className="flex items-center gap-x-3 gap-y-3 overflow-x-auto rounded-2xl border border-line bg-surface/60 p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:px-4">
          <span className="shrink-0 pl-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
            Filter
          </span>
          {(["All", ...certCategories] as const).map((cat) => {
            const count =
              cat === "All"
                ? certifications.length
                : certifications.filter((c) => c.category === cat).length;
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.1em] transition-all duration-300 sm:px-4 sm:text-[11px] ${
                  isActive
                    ? "border-ink bg-ink text-paper shadow-[0_8px_18px_-10px_rgba(16,16,16,0.6)]"
                    : "border-line bg-paper text-ink hover:-translate-y-px hover:border-ink"
                }`}
              >
                {cat}{" "}
                <span className={isActive ? "opacity-60" : "text-faint"}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-8">
        {shown.map((cert, i) => (
          <Reveal key={cert.title} y={16} delay={Math.min(i * 0.02, 0.2)}>
            <a
              href={cert.certificate}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3.5 gap-y-1.5 border-t border-line py-4 transition-colors duration-300 hover:bg-surface/60 sm:grid-cols-[auto_minmax(0,6fr)_minmax(0,3.6fr)_minmax(0,3.4fr)] sm:gap-x-5 sm:py-5 sm:px-3"
            >
              <ProviderMark provider={cert.provider} />
              <h4 className="font-display text-[14.5px] font-medium leading-snug tracking-tight text-ink transition-transform duration-500 ease-soft group-hover:translate-x-1 sm:text-[15.5px]">
                {cert.title}
              </h4>
              <p className="hidden truncate text-sm text-muted md:block">
                {cert.topics}
              </p>
              <p className="col-start-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-body sm:col-start-auto sm:justify-end sm:text-[11px] sm:tracking-[0.12em]">
                <span className="truncate">{cert.provider}</span>
                <span className="shrink-0 text-faint">· {cert.year}</span>
                <span className="shrink-0 text-faint transition-all duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                  ↗
                </span>
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
