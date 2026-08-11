"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { EASE } from "./motion";

export default function Hero() {
  const reduce = useReducedMotion();

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 34 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, ease: EASE, delay },
        };

  return (
    <section id="top" className="relative h-[100svh] min-h-[620px] overflow-hidden">
      {/* The animation IS the background — white on white, no edges. */}
      <video
        className="absolute inset-0 h-full w-full -translate-y-[4%] object-cover object-center md:object-right"
        src="/hero-flow.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      {/* soft veils so the name stays readable without hiding the motion */}
      <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-paper via-paper/55 to-transparent" />

      <div className="shell relative flex h-full flex-col justify-end pb-16 sm:pb-20">
        <motion.div {...enter(0.15)} className="flex items-center gap-2.5">
          <span className="kicker-dot" />
          <span className="kicker text-ink/60">
            Data · AI · Intelligent Systems
          </span>
        </motion.div>

        <motion.h1
          {...enter(0.28)}
          className="mt-5 font-display text-[clamp(3.2rem,9vw,8.5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-ink"
        >
          Nicolas
          <br />
          Hurtado A<span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          {...enter(0.42)}
          className="mt-7 max-w-xl text-[17px] leading-relaxed text-body sm:text-lg"
        >
          {profile.role} —{" "}
          <em className="font-serif text-[1.18em] italic text-ink">
            building intelligence that feels effortless.
          </em>
        </motion.p>

        <motion.div
          {...enter(0.56)}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <a
            href="#experience"
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition-transform duration-500 ease-soft hover:scale-[1.03]"
          >
            Explore
            <span className="transition-transform duration-500 ease-soft group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {profile.location}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
            English
            <span className="text-accent">{profile.english}</span>
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:inline">
            Currently @ BTG Pactual
          </span>
        </motion.div>
      </div>
    </section>
  );
}
