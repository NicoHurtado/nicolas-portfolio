"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { EASE } from "./motion";
import GridRise from "./GridRise";

export default function Hero() {
  const reduce = useReducedMotion();

  /* The tile field is framed differently on each layout — a right-hand panel
     beside the headline on desktop, a full-bleed backdrop behind it on phones —
     so the breakpoint is read in JS rather than with CSS classes. Mobile is the
     pre-hydration default: it is the framing that has to be right on the first
     paint, and the cheaper one to render. */
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 34 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, ease: EASE, delay },
        };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-24"
    >
      {/* The animation IS the background — white on white, no edges. */}
      {wide ? (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[48%] xl:w-[56%]"
          style={{
            // dissolve the canvas into the page instead of ending on a hard edge
            maskImage:
              "linear-gradient(to right, transparent 0%, #000 34%), linear-gradient(to bottom, transparent 0%, #000 22%, #000 68%, transparent 96%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, #000 34%), linear-gradient(to bottom, transparent 0%, #000 22%, #000 68%, transparent 96%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <GridRise className="h-full w-full" />
        </div>
      ) : (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 14%, #000 60%, transparent 94%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 14%, #000 60%, transparent 94%)",
          }}
        >
          {/* A phone frames a tall, narrow slice of the grid, so the camera
              pulls back and sits higher and the cells grow. Nothing here waits
              for a cursor: the pointer is switched off (a touch-scroll would
              otherwise pin the swell wherever the finger landed and kill the
              idle motion for good), so the sweep is what carries the section:
              a diagonal from the upper left to the lower right, crossing the
              middle of the frame where it actually reads, at the full frame
              rate. The pixel ratio stays capped, which is what keeps the cost
              down on a phone. */}
          <GridRise
            className="h-full w-full"
            cellSize={0.034}
            gap={0.17}
            zoom={3.4}
            orbit={42}
            distance={2.3}
            altitude={1.35}
            lift={0.05}
            liftRadius={0.3}
            amplitude={0.028}
            haze={0.5}
            dpr={1.5}
            maxFps={60}
            speed={0.95}
            origin={[-0.086, -0.113]}
            driftAxis={[0.4, 0.062]}
            driftSpeed={1.6}
            ease={0.2}
            interactive={false}
          />
        </div>
      )}

      {/* soft veils so the name stays readable without hiding the motion.
          On phones the veil runs bottom-up (text sits at the bottom); from sm
          it also fades left-to-right, where the copy sits beside the motion. */}
      <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/60 to-transparent sm:bg-gradient-to-r sm:from-paper sm:via-paper/35" />
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-paper via-paper/75 to-transparent sm:h-64 sm:via-paper/55" />

      <div className="shell relative w-full pb-12 sm:pb-20">
        <motion.div {...enter(0.15)} className="flex items-center gap-2.5">
          <span className="kicker-dot" />
          <span className="kicker text-ink/60">
            Data · AI · Intelligent Systems
          </span>
        </motion.div>

        <motion.h1
          {...enter(0.28)}
          className="mt-4 font-display text-[clamp(2.75rem,13vw,8.5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-ink sm:mt-5"
        >
          Nicolas
          <br />
          Hurtado A<span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          {...enter(0.42)}
          className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-body sm:mt-7 sm:text-lg"
        >
          {profile.role} —{" "}
          <em className="font-serif text-[1.18em] italic text-ink">
            building intelligence that feels effortless.
          </em>
        </motion.p>

        <motion.div
          {...enter(0.56)}
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-10 sm:gap-x-8 sm:gap-y-4"
        >
          <a
            href="#experience"
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper transition-transform duration-500 ease-soft hover:scale-[1.03] sm:px-6 sm:text-[11px]"
          >
            Explore
            <span className="transition-transform duration-500 ease-soft group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
          <span className="meta text-muted">{profile.location}</span>
          <span className="meta inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 px-3 py-1.5 text-ink sm:px-3.5">
            English
            <span className="text-accent">{profile.english}</span>
          </span>
          <span className="meta hidden text-faint lg:inline">
            Currently @ BTG Pactual
          </span>
        </motion.div>
      </div>
    </section>
  );
}
