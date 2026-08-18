"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { EventWithImages } from "@/data/events";
import type { EventImage } from "@/lib/eventImages";
import { EASE, Kicker, Reveal, WordsIn } from "./motion";

/**
 * Collage layouts by photo count. Every event fills the same frame, so the
 * preview never resizes as you move down the list: one photo fills it, several
 * split it. Odd counts give the first photo a full-width band on top.
 */
const LAYOUTS: Record<number, { grid: string; spans: string[] }> = {
  1: { grid: "grid-cols-1 grid-rows-1", spans: [""] },
  2: { grid: "grid-cols-1 grid-rows-2", spans: ["", ""] },
  3: { grid: "grid-cols-2 grid-rows-2", spans: ["col-span-2", "", ""] },
  4: { grid: "grid-cols-2 grid-rows-2", spans: ["", "", "", ""] },
  5: { grid: "grid-cols-2 grid-rows-3", spans: ["col-span-2", "", "", "", ""] },
  6: { grid: "grid-cols-2 grid-rows-3", spans: ["", "", "", "", "", ""] },
};

const MAX = 6;

function Collage({
  images,
  sizes,
}: {
  images: EventImage[];
  sizes: string;
}) {
  const shown = images.slice(0, MAX);
  const layout = LAYOUTS[shown.length] ?? LAYOUTS[MAX];

  if (shown.length === 0) {
    return <div className="h-full w-full rounded-xl bg-surface" />;
  }

  return (
    <div className={`grid h-full w-full gap-1.5 ${layout.grid}`}>
      {shown.map((image, i) => (
        <div
          key={image.src}
          className={`relative overflow-hidden rounded-xl bg-surface ${
            layout.spans[i] ?? ""
          }`}
        >
          <Image
            src={image.src}
            alt=""
            fill
            sizes={sizes}
            unoptimized={image.raw}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default function Events({ events }: { events: EventWithImages[] }) {
  const [active, setActive] = useState(0);
  const current = events[active];

  return (
    <section id="events" className="section-y scroll-mt-20 sm:scroll-mt-24">
      <div className="shell">
        <Kicker index="06" label="Events & community" />
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 sm:mt-6 sm:gap-6">
          <h2 className="max-w-3xl font-display text-[clamp(2rem,9vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            <WordsIn text="Out in" />{" "}
            <WordsIn
              text="the ecosystem."
              delay={0.15}
              className="font-serif font-normal italic tracking-normal"
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="meta text-muted">
              {events.length} events & visits
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-10 sm:mt-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          {/* the list: every row the same size */}
          <div>
            {events.map((event, i) => {
              const isActive = i === active;
              return (
                <Reveal key={event.title} delay={i * 0.04} y={18}>
                  <div
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group border-t border-line py-5 transition-colors duration-300 last:border-b sm:py-6"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3
                        className={`font-display text-[17px] font-semibold tracking-tight transition-all duration-500 ease-soft sm:text-xl ${
                          isActive ? "translate-x-1.5 text-ink" : "text-body"
                        }`}
                      >
                        {event.title}
                      </h3>
                      <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                        {event.date}
                      </span>
                    </div>

                    <p
                      className={`mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors duration-500 ${
                        isActive ? "text-accent" : "text-muted"
                      }`}
                    >
                      {event.organizer}
                      {event.images.length > 1 ? (
                        <span className="ml-2 text-faint">
                          {event.images.length} photos
                        </span>
                      ) : null}
                    </p>

                    <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted">
                      {event.description}
                    </p>

                    {/* on touch / small screens the collage lives in the row */}
                    <div className="mt-4 aspect-[4/3] sm:aspect-[16/10] lg:hidden">
                      <Collage images={event.images} sizes="(min-width: 640px) 90vw, 100vw" />
                    </div>

                    {event.certificate ? (
                      <a
                        href={event.certificate}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent"
                      >
                        Certificate ↗
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* the preview: follows whichever row is hovered */}
          <Reveal delay={0.1} className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.title}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Collage images={current.images} sizes="40vw" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                {current.organizer} · {current.date}
              </p>
              <p className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
                {current.title}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
