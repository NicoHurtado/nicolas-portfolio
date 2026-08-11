import { BRAND_LOGOS } from "./brandLogos";

/**
 * The issuer's mark next to each certificate, in three tiers:
 *
 *  1. Official wordmarks kept in `public/logos` (IBM, AWS, Duke, UC Irvine,
 *     BBVA) — public-domain SVGs in each brand's own colours.
 *  2. Brand glyphs from the openly licensed Simple Icons set (MongoDB, Meta,
 *     DataCamp, Packt, Codio).
 *  3. A coloured monogram for issuers with no freely licensed mark, so the
 *     column still reads consistently instead of inventing a logo.
 *
 * Every tier renders inside the same tinted tile, so mixed wordmarks and
 * square glyphs keep the same optical weight down the list.
 */
type FileLogo = { src: string; tint: string };

const FILE_LOGOS: Record<string, FileLogo> = {
  ibm: { src: "/logos/ibm.svg", tint: "#1F70C1" },
  aws: { src: "/logos/aws.svg", tint: "#FF9900" },
  "duke university": { src: "/logos/duke.svg", tint: "#012169" },
  "uc irvine": { src: "/logos/uci.svg", tint: "#0064A4" },
  "campus bbva": { src: "/logos/bbva.svg", tint: "#004481" },
};

const LOGO_KEYS: Record<string, keyof typeof BRAND_LOGOS> = {
  mongodb: "mongodb",
  meta: "meta",
  datacamp: "datacamp",
  packt: "packt",
  codio: "codio",
};

const MONOGRAMS: Record<string, { short: string; color: string }> = {
  "university of michigan": { short: "UM", color: "#00274C" },
  hkust: { short: "HK", color: "#003366" },
  learnkarts: { short: "LK", color: "#5B5BD6" },
};

export default function ProviderMark({
  provider,
  size = "sm",
}: {
  provider: string;
  size?: "sm" | "md";
}) {
  const key = provider.toLowerCase();
  const md = size === "md";
  const tile = md ? "h-10 w-16" : "h-8 w-12";

  const file = FILE_LOGOS[key];
  if (file) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-lg ${tile}`}
        style={{ backgroundColor: `${file.tint}14` }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={file.src}
          alt=""
          className={md ? "max-h-5 max-w-[52px]" : "max-h-4 max-w-[38px]"}
        />
      </span>
    );
  }

  const logoKey = LOGO_KEYS[key];
  if (logoKey) {
    const logo = BRAND_LOGOS[logoKey];
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-lg ${tile}`}
        style={{ backgroundColor: `${logo.hex}14` }}
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          className={md ? "h-5 w-5" : "h-4 w-4"}
          fill={logo.hex}
        >
          <path d={logo.path} />
        </svg>
      </span>
    );
  }

  const mark = MONOGRAMS[key] ?? {
    short: provider.slice(0, 2).toUpperCase(),
    color: "#6E6E6E",
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-lg font-mono font-medium tracking-tight ${tile} ${
        md ? "text-[11px]" : "text-[10px]"
      }`}
      style={{ backgroundColor: `${mark.color}14`, color: mark.color }}
      aria-hidden
    >
      {mark.short}
    </span>
  );
}
