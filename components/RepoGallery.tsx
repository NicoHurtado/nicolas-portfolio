"use client";

import { useMemo, useState } from "react";
import type { GithubRepo } from "@/lib/github";
import { profile } from "@/data/profile";
import { Reveal } from "./motion";

const INITIAL = 9;

// "AI_text_generation" → "AI text generation"
function humanize(name: string) {
  return name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

export default function RepoGallery({ repos }: { repos: GithubRepo[] }) {
  const [filter, setFilter] = useState<string>("All");
  const [expanded, setExpanded] = useState(false);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of repos) {
      const lang = r.language ?? "Other";
      counts.set(lang, (counts.get(lang) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [repos]);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? repos
        : repos.filter((r) => (r.language ?? "Other") === filter),
    [repos, filter]
  );

  const visible = expanded ? filtered : filtered.slice(0, INITIAL);

  return (
    <div className="rounded-[28px] border border-line bg-surface/70 p-6 sm:p-10">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div>
            <span className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="kicker text-accent">Live from GitHub</span>
            </span>
            <h3 className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-tight text-ink">
              Everything else I&apos;m building
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              {repos.length} public repositories pulled straight from my GitHub
              — this list updates itself.
            </p>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group/gh inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-ink"
          >
            View profile
            <span className="transition-transform duration-300 ease-soft group-hover/gh:-translate-y-0.5 group-hover/gh:translate-x-0.5">
              ↗
            </span>
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
          <div className="flex flex-wrap gap-1.5">
            {[["All", repos.length] as const, ...languages].map(([lang, count]) => (
              <button
                key={lang}
                onClick={() => {
                  setFilter(lang);
                  setExpanded(false);
                }}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] transition-colors duration-300 ${
                  filter === lang
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-muted hover:border-muted hover:text-ink"
                }`}
              >
                {lang} <span className="opacity-50">{count}</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((repo, i) => (
          <Reveal key={repo.name} delay={(i % 3) * 0.06} y={20}>
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-paper p-6 transition-all duration-500 ease-soft hover:-translate-y-1 hover:border-faint hover:shadow-[0_18px_40px_-24px_rgba(16,16,16,0.18)]"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display text-[17px] font-semibold capitalize tracking-tight text-ink">
                    {humanize(repo.name)}
                  </h4>
                  <span className="text-faint transition-all duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                    ↗
                  </span>
                </div>
                {repo.description ? (
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {repo.description}
                  </p>
                ) : null}
              </div>
              <div className="mt-5 flex items-center gap-4 font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
                {repo.language ? (
                  <span className="text-muted">{repo.language}</span>
                ) : null}
                {repo.stars > 0 ? <span>★ {repo.stars}</span> : null}
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {filtered.length > INITIAL ? (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="rounded-full border border-line px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-ink"
          >
            {expanded ? "Show less" : `All ${filtered.length} projects`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
