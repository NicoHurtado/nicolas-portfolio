"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, navSections } from "@/data/profile";
import { EASE } from "./motion";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile sheet, and close it if the viewport
  // grows into the desktop nav.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      mq.removeEventListener("change", onChange);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-soft ${
        scrolled || open
          ? "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-14 items-center justify-between sm:h-16">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="shrink-0 whitespace-nowrap font-display text-[14px] font-semibold tracking-tight text-ink sm:text-[15px]"
        >
          Nicolas Hurtado A<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-7">
          {navSections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink xl:text-[11px]"
            >
              <span className="mr-1.5 text-faint group-hover:text-accent">
                0{i + 1}
              </span>
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line bg-paper/60 px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-ink sm:px-4 sm:text-[11px]"
          >
            CV ↗
          </a>

          {/* mobile menu trigger — the desktop nav is hidden below md */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-1.5 flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ease-soft ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ease-soft ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            {/* scrim: dims the page under the sheet and closes it on tap */}
            <motion.button
              key="scrim"
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="fixed inset-0 -z-10 h-[100svh] w-full cursor-default bg-paper/85 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="relative max-h-[calc(100svh-3.5rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
          >
            <div className="shell py-2">
              {navSections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 border-b border-line/70 py-4 font-display text-lg font-semibold tracking-tight text-ink last:border-b-0"
                >
                  <span className="font-mono text-[11px] font-normal text-faint">
                    0{i + 1}
                  </span>
                  {s.label}
                </a>
              ))}
              <div className="flex flex-wrap gap-x-6 gap-y-2 py-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
                <a href="#contact" onClick={() => setOpen(false)}>
                  Contact
                </a>
              </div>
            </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
