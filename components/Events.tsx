import Section from "./Section";
import Reveal from "./Reveal";
import { events } from "@/data/events";

export default function Events() {
  return (
    <Section
      id="events"
      index="04"
      eyebrow="Events"
      title={
        <>
          Events I&apos;ve{" "}
          <span className="italic text-clay">attended</span>.
        </>
      }
      intro="Conferences, competitions, and visits that shaped how I think about building."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event, i) => (
          <Reveal
            key={event.title}
            as="article"
            delay={i * 80}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line/70 bg-ink2/60 transition-all hover:border-clay/40 hover:bg-ink2"
          >
            {event.images.length > 0 ? (
              <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.images[0]}
                  alt={event.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink2 via-ink2/10 to-transparent" />
                {event.images.length > 1 ? (
                  <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2 py-0.5 text-[11px] text-cream backdrop-blur">
                    +{event.images.length - 1}
                  </span>
                ) : null}
              </div>
            ) : null}

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-[0.12em] text-clay2">
                  {event.organizer}
                </span>
                <span className="font-mono text-[11px] text-muted">
                  {event.date}
                </span>
              </div>
              <h3 className="mt-3 font-serif text-xl font-normal leading-tight text-cream">
                {event.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-muted">
                {event.description}
              </p>
              {event.certificate ? (
                <a
                  href={event.certificate}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-clay transition-colors hover:text-clay2"
                >
                  Certificate
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
