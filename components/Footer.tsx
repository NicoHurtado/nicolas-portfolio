import { profile } from "@/data/profile";

export default function Footer() {
  const links = [
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
  ];

  return (
    <footer className="border-t border-line/60 px-6 py-16 sm:px-12">
      <div className="mx-auto flex max-w-content flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-clay">
            Let&apos;s build something
          </p>
          <h2 className="mt-4 max-w-md font-serif text-3xl font-normal leading-[1.1] text-cream sm:text-4xl">
            Open to <span className="italic text-clay">data &amp; AI</span> and
            good problems.
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="mt-7 inline-block rounded-lg bg-clay px-5 py-2.5 text-[13px] font-medium text-ink transition-opacity hover:opacity-90"
          >
            {profile.email}
          </a>
        </div>

        <div className="flex flex-col gap-4 text-[13px]">
          <div className="flex gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="text-muted transition-colors hover:text-cream"
              >
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-muted/70">
            © {new Date().getFullYear()} {profile.fullName}. Built with Next.js
            &amp; Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}
