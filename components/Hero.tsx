import HeroCanvas from "./HeroCanvas";
import Nav from "./Nav";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-ink">
      <div className="relative h-[88vh] min-h-[560px] w-full">
        <HeroCanvas />

        {/* top nav */}
        <Nav />

        {/* hero content — left margin tracks the network's right margin for symmetry */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center pr-6 sm:pr-12"
          style={{ paddingLeft: "max(1.5rem, calc(12.4vw - 69px))" }}
        >
          <p className="mb-5 text-xs uppercase tracking-[0.16em] text-clay">
            {profile.role}
          </p>
          <h1 className="font-serif text-[40px] font-normal leading-[1.05] text-cream sm:text-6xl sm:leading-[1.0] lg:text-7xl">
            Nicolas <span className="italic text-clay">Hurtado A.</span>
          </h1>
          <p className="mt-5 text-[15px] text-muted">{profile.tagline}</p>
          <p className="mt-1.5 max-w-[440px] text-[15px] leading-relaxed text-sand">
            Transforming complexity into clear, scalable systems that deliver
            impact.
          </p>
          <div className="pointer-events-auto mt-7 flex flex-wrap gap-3.5">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-lg bg-clay px-[18px] py-[9px] text-[13px] font-medium text-ink transition-opacity hover:opacity-90"
            >
              Get in touch
            </a>
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-line px-[18px] py-[9px] text-[13px] text-cream transition-colors hover:border-clay"
            >
              Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-line px-[18px] py-[9px] text-[13px] text-cream transition-colors hover:border-clay"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-line px-[18px] py-[9px] text-[13px] text-cream transition-colors hover:border-clay"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
