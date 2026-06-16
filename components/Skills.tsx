import Section from "./Section";
import Reveal from "./Reveal";
import { skillGroups, personGroups, aiTools } from "@/data/skills";

// Simple Icons slugs for items that have a brand icon (others render text-only).
const iconSlugs: Record<string, string> = {
  // Languages
  Python: "python",
  R: "r",
  TypeScript: "typescript",
  Bash: "gnubash",
  // AI & Machine Learning
  TensorFlow: "tensorflow",
  PyTorch: "pytorch",
  "scikit-learn": "scikitlearn",
  Polars: "polars",
  NumPy: "numpy",
  // Data & Databases
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  MySQL: "mysql",
  Snowflake: "snowflake",
  // Platforms
  FastAPI: "fastapi",
  Git: "git",
  Docker: "docker",
  Terraform: "terraform",
  "Node.js": "nodedotjs",
  Django: "django",
  Flask: "flask",
  GraphQL: "graphql",
  Postman: "postman",
  Vercel: "vercel",
  Neon: "neon",
  // AI Tools
  "Claude Code": "claude",
  "Claude Cowork": "claude",
  "Claude Design": "claude",
  Gemini: "googlegemini",
  Cursor: "cursor",
  n8n: "n8n",
};

// AWS services share one generic AWS logo (Simple Icons dropped AWS brand marks).
const awsItems = new Set([
  "Redshift",
  "DynamoDB",
  "S3",
  "Lambda",
  "EC2",
  "AWS Data & Analytics Tools",
]);
const AWS_LOGO =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg";

function SkillIcon({ name, tint = "E8E2D4" }: { name: string; tint?: string }) {
  if (awsItems.has(name)) {
    // tinted via CSS mask to stay monochrome with the theme
    return (
      <span
        aria-hidden
        className="inline-block h-3.5 w-5 shrink-0 opacity-90"
        style={{
          backgroundColor: `#${tint}`,
          maskImage: `url(${AWS_LOGO})`,
          WebkitMaskImage: `url(${AWS_LOGO})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
    );
  }
  const slug = iconSlugs[name];
  if (!slug) return null;
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${tint}`}
      alt=""
      width={14}
      height={14}
      className="h-3.5 w-3.5 opacity-90"
    />
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      index="01"
      eyebrow="Toolkit"
      title={
        <>
          The stack I reach for to{" "}
          <span className="italic text-clay">ship</span>.
        </>
      }
      intro="Languages, frameworks, and platforms I use day to day across data engineering, machine learning, and backend work."
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/40 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.title}
            delay={i * 80}
            className="group bg-ink2/70 p-7 transition-colors hover:bg-ink2"
          >
            <h3 className="text-[13px] uppercase tracking-[0.14em] text-clay2">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 rounded-full border border-line bg-ink/40 px-3 py-1 text-[13px] text-sand transition-colors group-hover:border-line"
                >
                  <SkillIcon name={item} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* Skills as a person — analytical + soft skills */}
      <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/40 sm:grid-cols-2">
        {personGroups.map((group, i) => (
          <Reveal
            key={group.title}
            delay={i * 80}
            className="group bg-ink2/70 p-7 transition-colors hover:bg-ink2"
          >
            <h3 className="text-[13px] uppercase tracking-[0.14em] text-clay2">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 rounded-full border border-line bg-ink/40 px-3 py-1 text-[13px] text-sand transition-colors group-hover:border-line"
                >
                  <SkillIcon name={item} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal
        delay={120}
        className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-clay/25 bg-clay/[0.06] p-7 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h3 className="text-[13px] uppercase tracking-[0.14em] text-clay2">
            AI Tools I build with
          </h3>
          <p className="mt-2 text-sm text-muted">
            Production work grounded in frontier AI tooling.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {aiTools.map((tool) => (
            <span
              key={tool}
              className="flex items-center gap-1.5 rounded-full bg-clay px-3.5 py-1.5 text-[13px] font-medium text-ink"
            >
              <SkillIcon name={tool} tint="16140F" />
              {tool}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
