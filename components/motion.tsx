"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Soft fade-up reveal when the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Heading that reveals word by word, each word sliding up from a mask. */
export function WordsIn({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");
  const shown = reduce || inView;
  return (
    <Tag ref={ref as any} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: "110%" }}
            animate={shown ? { y: 0 } : undefined}
            transition={{
              duration: 0.85,
              ease: EASE,
              delay: delay + i * 0.045,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Section kicker: orange dot + numbered mono label. */
export function Kicker({ index, label }: { index?: string; label: string }) {
  return (
    <Reveal y={14}>
      <div className="flex items-center gap-2.5">
        <span className="kicker-dot" />
        <span className="kicker">
          {index ? `${index} — ` : ""}
          {label}
        </span>
      </div>
    </Reveal>
  );
}
