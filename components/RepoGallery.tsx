"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";

export type GalleryItem = {
  name: string;
  description: string | null;
  url: string;
  liveUrl?: string;
  language: string | null;
  stars: number;
  featured: boolean;
};

const INITIAL = 9;

// Turn "AI_text_generation" / "live-face-recognition" into "AI text generation".
function humanize(name: string) {
  return name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

export default function RepoGallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<string>("All");
  const [expanded, setExpanded] = useState(false);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of items) {
      const lang = r.language ?? "Other";
      counts.set(lang, (counts.get(lang) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [items]);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? items
        : items.filter((r) => (r.language ?? "Other") === filter),
    [items, filter]
  );

  const visible = expanded ? filtered : filtered.slice(0, INITIAL);
  const hiddenCount = filtered.length - visible.length;

  return (
    <div>
      <Reveal className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-4">
        <span className="mr-1 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
          </span>
          <span className="text-[13px] uppercase tracking-[0.14em] text-clay2">
            Live from GitHub
          </span>
        </span>

        {/* language filters */}
        <div className="flex flex-wrap gap-1.5">
          <FilterChip
            label="All"
            count={items.length}
            active={filter === "All"}
            onClick={() => {
              setFilter("All");
              setExpanded(false);
            }}
          />
          {languages.map(([lang, count]) => (
            <FilterChip
              key={lang}
              label={lang}
              count={count}
              active={filter === lang}
              onClick={() => {
                setFilter(lang);
                setExpanded(false);
              }}
            />
          ))}
        </div>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/40 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <ProjectCard key={item.name} item={item} />
        ))}
      </div>

      {filtered.length > INITIAL ? (
        <div className="mt-7 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="rounded-lg border border-line px-4 py-2 text-[13px] text-cream transition-colors hover:border-clay hover:text-clay"
          >
            {expanded ? "Show less" : `Show all ${filtered.length} projects`}
            {!expanded && hiddenCount > 0 ? (
              <span className="text-muted"> (+{hiddenCount})</span>
            ) : null}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ProjectCard({ item }: { item: GalleryItem }) {
  // Featured cards get a faint clay wash + ring so they read as a notch above
  // the rest, while staying inline with every other project in the grid.
  const base = "group relative flex h-full flex-col p-6 transition-colors";
  const tone = item.featured
    ? "bg-clay/[0.06] ring-1 ring-inset ring-clay/20 hover:bg-clay/[0.1]"
    : "bg-ink2/70 hover:bg-ink2";

  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="truncate font-mono text-[13px] text-cream transition-colors group-hover:text-clay2">
          {item.name}
        </span>
        {item.featured && item.liveUrl ? (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-clay/30 bg-clay/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-clay2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay" />
            </span>
            Live
          </span>
        ) : item.stars > 0 ? (
          <span className="flex shrink-0 items-center gap-1 text-[12px] text-muted">
            <span aria-hidden>★</span>
            {item.stars}
          </span>
        ) : null}
      </div>
      <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted">
        {item.description ?? humanize(item.name)}
      </p>
      <div className="mt-4 flex items-center gap-4">
        {item.language ? (
          <span className="text-[11px] uppercase tracking-[0.1em] text-clay2">
            {item.language}
          </span>
        ) : null}
        {item.featured && item.liveUrl ? (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center gap-1 text-[12px] font-medium text-clay transition-colors hover:text-clay2"
          >
            Visit live
            <span aria-hidden>→</span>
          </a>
        ) : null}
      </div>
    </>
  );

  // Featured cards have an inner "Visit live" link, so the card is a div with
  // the title linking out; plain repos keep the whole card as one link.
  if (item.featured) {
    return (
      <div className={`${base} ${tone}`}>
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0"
          aria-label={`${item.name} code`}
        />
        <div className="pointer-events-none relative [&_a]:pointer-events-auto">
          {body}
        </div>
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${tone}`}
    >
      {body}
    </a>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-[12px] transition-colors ${
        active
          ? "border-clay bg-clay/10 text-clay"
          : "border-line bg-ink/40 text-sand hover:border-clay/50"
      }`}
    >
      {label}
      <span className={active ? "text-clay/70" : "text-muted"}> {count}</span>
    </button>
  );
}
