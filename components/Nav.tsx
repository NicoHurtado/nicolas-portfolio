"use client";

import { useEffect, useState } from "react";
import { profile, navSections } from "@/data/profile";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-soft ${
        scrolled
          ? "border-b border-line bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between">
        <a
          href="#top"
          className="font-display text-[15px] font-semibold tracking-tight text-ink"
        >
          Nicolas Hurtado A<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navSections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
            >
              <span className="mr-1.5 text-faint group-hover:text-accent">
                0{i + 1}
              </span>
              {s.label}
            </a>
          ))}
        </nav>

        <a
          href={profile.cv}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line bg-paper/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-ink"
        >
          CV ↗
        </a>
      </div>
    </header>
  );
}
