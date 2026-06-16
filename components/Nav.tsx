"use client";

import { profile, navSections } from "@/data/profile";

export default function Nav() {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      className="absolute inset-x-0 top-7 z-10 flex items-center justify-between pr-6 text-[13px] text-muted sm:pr-12"
      style={{ paddingLeft: "max(1.5rem, calc(12.4vw - 69px))" }}
    >
      <div className="hidden gap-7 md:flex">
        {navSections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => handleNav(e, s.id)}
            className="transition-colors hover:text-cream"
          >
            {s.label}
          </a>
        ))}
      </div>
      <a
        href={profile.cv}
        className="rounded-lg border border-line px-3 py-1.5 text-cream transition-colors hover:border-clay hover:text-clay md:hidden"
      >
        CV
      </a>
    </nav>
  );
}
