"use client";

import { useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import {
  certifications,
  certCategories,
  type CertCategory,
} from "@/data/certifications";
import { specializations } from "@/data/specializations";

export default function Certifications() {
  const [open, setOpen] = useState<CertCategory>(certCategories[0]);

  const byCategory = (cat: CertCategory) =>
    certifications.filter((c) => c.category === cat);

  return (
    <Section
      id="certifications"
      index="02"
      eyebrow="Learning"
      title={
        <>
          Specializations &{" "}
          <span className="italic text-clay">{certifications.length}</span>{" "}
          certifications.
        </>
      }
      intro="Continuous, hands-on learning across AI, data science, cloud, and computer science — from full multi-course specializations down to focused certificates."
    >
      {/* Specializations — featured, multi-course tracks */}
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-[11px] uppercase tracking-[0.16em] text-clay">
          Specializations
        </span>
        <span className="text-xs text-muted">
          Multi-course tracks, completed end to end
        </span>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {specializations.map((spec, i) => (
          <Reveal
            key={spec.title}
            as="article"
            delay={i * 100}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-clay/40 bg-clay/[0.06] p-8 transition-all hover:border-clay/60 hover:bg-clay/[0.1]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-clay/10 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-clay px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ink">
                {spec.provider} · Specialization
              </span>
              <span className="font-mono text-xs text-muted">{spec.year}</span>
            </div>
            <h3 className="mt-6 font-serif text-2xl font-normal leading-tight text-cream">
              {spec.title}
            </h3>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
              {spec.description}
            </p>
            <a
              href={spec.certificate}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium text-clay transition-colors hover:text-clay2"
            >
              View certificate
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Courses & certifications — by craft, collapsible */}
      <div className="mb-4 mt-12 flex items-baseline gap-3">
        <span className="text-[11px] uppercase tracking-[0.16em] text-clay">
          Courses &amp; certificates
        </span>
        <span className="text-xs text-muted">
          Organized by craft — tap a category to expand
        </span>
      </div>
      <div className="overflow-hidden rounded-2xl border border-line/70">
        {certCategories.map((cat, i) => {
          const items = byCategory(cat);
          const isOpen = open === cat;
          return (
            <div
              key={cat}
              className={i > 0 ? "border-t border-line/70" : undefined}
            >
              <button
                onClick={() => setOpen(isOpen ? ("" as CertCategory) : cat)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 bg-ink2/40 px-6 py-5 text-left transition-colors hover:bg-ink2/80"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-serif text-lg text-cream sm:text-xl">
                    {cat}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-clay transition-transform duration-300 ${
                    isOpen ? "rotate-45 border-clay" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-px bg-line/40 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((cert) => (
                      <a
                        key={cert.title}
                        href={cert.certificate}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col bg-ink px-6 py-5 transition-colors hover:bg-ink2"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[11px] uppercase tracking-[0.12em] text-clay2">
                            {cert.provider}
                          </span>
                          <span className="font-mono text-[11px] text-muted">
                            {cert.year}
                          </span>
                        </div>
                        <h4 className="mt-2 text-[15px] font-medium leading-snug text-cream transition-colors group-hover:text-clay2">
                          {cert.title}
                        </h4>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                          {cert.topics}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
