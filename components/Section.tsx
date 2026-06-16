import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
};

export default function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-line/60 px-6 py-24 sm:px-12 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-content">
        <Reveal className="mb-12 lg:mb-16">
          <div className="flex items-baseline gap-3 text-clay">
            <span className="font-mono text-xs tracking-[0.2em]">{index}</span>
            <span className="text-xs uppercase tracking-[0.18em]">{eyebrow}</span>
          </div>
          <h2 className="mt-4 max-w-3xl font-serif text-3xl font-normal leading-[1.1] text-cream sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {intro ? (
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
              {intro}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
