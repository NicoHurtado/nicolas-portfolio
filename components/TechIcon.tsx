import type { ReactNode } from "react";

/**
 * Original minimal marks — geometric glyphs drawn to evoke each technology
 * (a cylinder for a database, layers for tensors, a rail of containers for
 * Docker). They are not reproductions of brand logos, so they stay consistent
 * with the rest of the page's hairline aesthetic.
 *
 * All glyphs live in a 16×16 box, stroke-based, and inherit the current color.
 */
const GLYPHS: Record<string, ReactNode> = {
  // ── Languages ────────────────────────────────────────────────────────────
  python: (
    <>
      <path d="M8 2.4h-.9A2.1 2.1 0 0 0 5 4.5v1.6h5.6a2.1 2.1 0 0 1 2.1 2.1v1.3" />
      <path d="M8 13.6h.9A2.1 2.1 0 0 0 11 11.5V9.9H5.4a2.1 2.1 0 0 1-2.1-2.1V6.5" />
    </>
  ),
  sql: (
    <>
      <ellipse cx="8" cy="4.3" rx="4.8" ry="2.1" />
      <path d="M3.2 4.3v7.4c0 1.2 2.1 2.1 4.8 2.1s4.8-.9 4.8-2.1V4.3" />
      <path d="M3.2 8c0 1.2 2.1 2.1 4.8 2.1s4.8-.9 4.8-2.1" />
    </>
  ),
  r: (
    <>
      <path d="M5.4 13.2V3.2h3.4a2.9 2.9 0 0 1 0 5.9H5.4" />
      <path d="M8.7 9.1l2.9 4.1" />
    </>
  ),
  typescript: (
    <>
      <rect x="2.4" y="2.4" width="11.2" height="11.2" rx="2.6" />
      <path d="M5.3 6.3h5.4M8 6.3v5.1" />
    </>
  ),
  bash: (
    <>
      <rect x="1.9" y="3.1" width="12.2" height="9.8" rx="2.2" />
      <path d="M4.7 6.5 6.7 8.5l-2 2M9 10.6h2.6" />
    </>
  ),
  java: (
    <>
      <path d="M3.4 7.2h7.2v3.1a2.5 2.5 0 0 1-2.5 2.5H5.9a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M10.6 8.2h.9a1.6 1.6 0 0 1 0 3.1h-.9" />
      <path d="M6.1 3.2c0 .9.9.9.9 1.8M8.7 3.2c0 .9.9.9.9 1.8" />
    </>
  ),

  // ── AI & Machine Learning ────────────────────────────────────────────────
  machinelearning: (
    <>
      <circle cx="4.1" cy="4.4" r="1.6" />
      <circle cx="11.9" cy="4.4" r="1.6" />
      <circle cx="8" cy="11.6" r="1.6" />
      <path d="M5.7 4.4h4.6M5.2 5.8l2 4.4M10.8 5.8l-2 4.4" />
    </>
  ),
  llms: (
    <>
      <path d="M13.4 7.6c0 2.5-2.4 4.5-5.4 4.5a6.7 6.7 0 0 1-1.6-.2l-3 1.4.9-2.4a4.2 4.2 0 0 1-1.7-3.3c0-2.5 2.4-4.5 5.4-4.5s5.4 2 5.4 4.5Z" />
      <path d="M6 7.5h4" />
    </>
  ),
  finetuning: (
    <>
      <path d="M2.8 4.4h10.4M2.8 8h10.4M2.8 11.6h10.4" />
      <circle cx="6" cy="4.4" r="1.4" />
      <circle cx="10.4" cy="8" r="1.4" />
      <circle cx="5" cy="11.6" r="1.4" />
    </>
  ),
  rag: (
    <>
      <path d="M4.4 13.4V2.6h4l3 3v2" />
      <path d="M8.4 2.6v3h3" />
      <circle cx="10.4" cy="10.4" r="2.5" />
      <path d="M12.3 12.3 14 14" />
    </>
  ),
  aiagents: (
    <>
      <path d="M8 2.3 13.2 5v6L8 13.7 2.8 11V5Z" />
      <circle cx="8" cy="8" r="1.7" />
    </>
  ),
  tensorflow: (
    <>
      <path d="M8 2.4 13.4 5.3 8 8.2 2.6 5.3Z" />
      <path d="M2.6 8.2 8 11.1l5.4-2.9" />
      <path d="M2.6 11 8 13.9l5.4-2.9" />
    </>
  ),
  pytorch: (
    <>
      <path d="M8.7 2.6 5.1 6.2a4.1 4.1 0 1 0 5.8 0" />
      <circle cx="10.3" cy="4.9" r=".95" fill="currentColor" stroke="none" />
    </>
  ),
  scikitlearn: (
    <>
      <circle cx="4.3" cy="11.2" r="1.4" />
      <circle cx="8" cy="6.3" r="1.4" />
      <circle cx="11.8" cy="9.6" r="1.4" />
      <path d="M5.4 10.2 6.9 7.4M9.2 7.2l1.5 1.3" />
    </>
  ),
  polars: (
    <>
      <path d="M8 2.2v11.6M3 5.1l10 5.8M13 5.1 3 10.9" />
    </>
  ),
  numpy: (
    <>
      <rect x="2.6" y="2.6" width="10.8" height="10.8" rx="1.8" />
      <path d="M6.2 2.6v10.8M9.8 2.6v10.8M2.6 6.2h10.8M2.6 9.8h10.8" />
    </>
  ),

  // ── Data & Databases ─────────────────────────────────────────────────────
  postgresql: (
    <>
      <ellipse cx="8" cy="4.3" rx="4.8" ry="2.1" />
      <path d="M3.2 4.3v7.4c0 1.2 2.1 2.1 4.8 2.1s4.8-.9 4.8-2.1V4.3" />
      <path d="M5.6 8.8v3.4M8 8.6v3.6M10.4 8.8v3.4" />
    </>
  ),
  mongodb: (
    <>
      <path d="M8 2.3c2.5 2.4 3.7 4.3 3.7 6.3A3.7 3.7 0 0 1 8 12.2a3.7 3.7 0 0 1-3.7-3.6c0-2 1.2-3.9 3.7-6.3Z" />
      <path d="M8 5.4v8.3" />
    </>
  ),
  mysql: (
    <>
      <ellipse cx="8" cy="4.3" rx="4.8" ry="2.1" />
      <path d="M3.2 4.3v7.4c0 1.2 2.1 2.1 4.8 2.1s4.8-.9 4.8-2.1V4.3" />
      <path d="M4.8 9.3c1.1-1 2.1.9 3.2 0s2.1.9 3.2 0" />
    </>
  ),
  snowflake: (
    <>
      <path d="M8 2.2v11.6M3 5.1l10 5.8M13 5.1 3 10.9" />
      <path d="M6.5 3.4 8 4.6l1.5-1.2M6.5 12.6 8 11.4l1.5 1.2" />
    </>
  ),
  redshift: (
    <>
      <ellipse cx="8" cy="4.3" rx="4.8" ry="2.1" />
      <path d="M3.2 4.3v7.4c0 1.2 2.1 2.1 4.8 2.1s4.8-.9 4.8-2.1V4.3" />
      <path d="M5.9 10.7 8 8.6l2.1 2.1" />
    </>
  ),
  dynamodb: (
    <>
      <ellipse cx="8" cy="4.3" rx="4.8" ry="2.1" />
      <path d="M3.2 4.3v7.4c0 1.2 2.1 2.1 4.8 2.1s4.8-.9 4.8-2.1V4.3" />
      <path d="M8.9 7.4 6.8 10.2h2.4l-.9 2.4" />
    </>
  ),
  s3: (
    <>
      <path d="M3.1 4.4h9.8l-1.1 8.1a1.5 1.5 0 0 1-1.5 1.3H5.7a1.5 1.5 0 0 1-1.5-1.3Z" />
      <path d="M2.3 4.4h11.4" />
      <path d="M6.4 4.4V2.9h3.2v1.5" />
    </>
  ),
  iceberg: (
    <>
      <path d="M8 2.6 3.4 9.4h9.2Z" />
      <path d="M1.9 9.4h12.2" />
      <path d="M3 12.4c1.2-.9 2.2.7 3.4 0s2.2-1 3.4 0 2 .7 2.6 0" />
    </>
  ),
  datalakes: (
    <>
      <path d="M2.4 5.2c1.2-1 2.2.8 3.4 0s2.2-1 3.4 0 2.2.8 3.4 0" />
      <path d="M2.4 8.6c1.2-1 2.2.8 3.4 0s2.2-1 3.4 0 2.2.8 3.4 0" />
      <path d="M2.4 12c1.2-1 2.2.8 3.4 0s2.2-1 3.4 0 2.2.8 3.4 0" />
    </>
  ),
  apachespark: (
    <>
      <path d="M8 1.9v3.3M8 10.8v3.3M1.9 8h3.3M10.8 8h3.3" />
      <path d="M3.7 3.7 6 6M10 10l2.3 2.3M12.3 3.7 10 6M6 10l-2.3 2.3" />
    </>
  ),

  // ── Platforms (Backend & DevOps) ─────────────────────────────────────────
  fastapi: (
    <>
      <path d="M9.3 1.9 4.2 8.7h3.4l-.9 5.4L12 7.3H8.6Z" />
    </>
  ),
  django: (
    <>
      <path d="M6.2 2.6v10.8" />
      <path d="M6.2 5.1h1.5a3.3 3.3 0 0 1 0 6.6H6.2" />
      <path d="M10.9 2.6v1.6" />
    </>
  ),
  flask: (
    <>
      <path d="M6.5 2.6v3.7L3.4 11.6a1.4 1.4 0 0 0 1.2 2.1h6.8a1.4 1.4 0 0 0 1.2-2.1L9.5 6.3V2.6" />
      <path d="M5.5 2.6h5" />
      <path d="M4.7 9.9h6.6" />
    </>
  ),
  nodejs: (
    <>
      <path d="M8 2.2 13.2 5.1v5.8L8 13.8 2.8 10.9V5.1Z" />
      <path d="M6.2 6.4v3.2M6.2 6.4l3.6 3.2V6.4" />
    </>
  ),
  git: (
    <>
      <circle cx="4.4" cy="4.1" r="1.6" />
      <circle cx="4.4" cy="11.9" r="1.6" />
      <circle cx="11.6" cy="7.4" r="1.6" />
      <path d="M4.4 5.7v4.6M4.4 8h3.4a3.4 3.4 0 0 0 2.4-.6" />
    </>
  ),
  docker: (
    <>
      <rect x="2.4" y="7.9" width="3.1" height="3.1" rx=".7" />
      <rect x="6.4" y="7.9" width="3.1" height="3.1" rx=".7" />
      <rect x="10.4" y="7.9" width="3.1" height="3.1" rx=".7" />
      <rect x="6.4" y="4.3" width="3.1" height="3.1" rx=".7" />
      <path d="M1.9 12.8c3 1.5 9.2 1.5 12.2-.6" />
    </>
  ),
  terraform: (
    <>
      <path d="M7.7 2.9 12.1 5.4v4.3L7.7 7.2Z" />
      <path d="M3.3 5.4 7.7 7.9v4.3L3.3 9.7Z" />
    </>
  ),
  graphql: (
    <>
      <path d="M8 3.4 12.6 11H3.4Z" />
      <circle cx="8" cy="2.6" r="1.2" />
      <circle cx="13.2" cy="11.6" r="1.2" />
      <circle cx="2.8" cy="11.6" r="1.2" />
    </>
  ),
  restapis: (
    <>
      <path d="M2.9 6h9.3M9.8 3.6 12.2 6 9.8 8.4" />
      <path d="M13.1 10.8H3.8M6.2 8.4 3.8 10.8l2.4 2.4" />
    </>
  ),
  postman: (
    <>
      <path d="M13.9 2.4 2.3 7.1l4.5 1.8 1.7 4.6Z" />
      <path d="M6.8 8.9 13.9 2.4" />
    </>
  ),
  vercel: (
    <>
      <path d="M8 3.1 13.9 12.7H2.1Z" />
    </>
  ),
  neon: (
    <>
      <rect x="2.6" y="2.9" width="10.8" height="10.2" rx="2.4" />
      <path d="M6 10.4V5.9l4 4.2V5.7" />
    </>
  ),
  cicd: (
    <>
      <path d="M13 8.6a5 5 0 0 1-8.4 3.1" />
      <path d="M3 7.4a5 5 0 0 1 8.4-3.1" />
      <path d="M6.1 11.1H4v2.1M9.9 4.9H12V2.8" />
    </>
  ),
  microservices: (
    <>
      <rect x="2.4" y="2.4" width="4" height="4" rx="1.1" />
      <rect x="9.6" y="2.4" width="4" height="4" rx="1.1" />
      <rect x="2.4" y="9.6" width="4" height="4" rx="1.1" />
      <rect x="9.6" y="9.6" width="4" height="4" rx="1.1" />
      <path d="M6.4 4.4h3.2M4.4 6.4v3.2M11.6 6.4v3.2M6.4 11.6h3.2" />
    </>
  ),
  lambda: (
    <>
      <path d="M3.6 13.2 8.4 3.1" />
      <path d="M6.3 6.6l4.9 6.6" />
      <path d="M6.2 3.1h2.2" />
    </>
  ),
  ec2: (
    <>
      <rect x="2.6" y="3" width="10.8" height="4.1" rx="1.3" />
      <rect x="2.6" y="8.9" width="10.8" height="4.1" rx="1.3" />
      <circle cx="5.2" cy="5.05" r=".7" fill="currentColor" stroke="none" />
      <circle cx="5.2" cy="10.95" r=".7" fill="currentColor" stroke="none" />
    </>
  ),
  awsservicesdataanalyticstools: (
    <>
      <path d="M8 2.3 13.4 5.2 8 8.1 2.6 5.2Z" />
      <path d="M2.6 5.2v5.6L8 13.7l5.4-2.9V5.2" />
      <path d="M8 8.1v5.6" />
    </>
  ),
  awsdataanalyticstools: (
    <>
      <path d="M8 2.3 13.4 5.2 8 8.1 2.6 5.2Z" />
      <path d="M2.6 5.2v5.6L8 13.7l5.4-2.9V5.2" />
      <path d="M8 8.1v5.6" />
    </>
  ),
  azure: (
    <>
      <path d="M6.9 2.6 2.2 12.4h3.6l5.1-9.8Z" />
      <path d="M8.4 7.1 13.8 13.4H6.1" />
    </>
  ),

  // ── Agentic AI & AI-native engineering ───────────────────────────────────
  claude: (
    <>
      <path d="M8 2.6v10.8M3.3 5.3l9.4 5.4M12.7 5.3l-9.4 5.4" />
    </>
  ),
  openai: (
    <>
      <path d="M8 2.4 12.9 5.2v5.6L8 13.6 3.1 10.8V5.2Z" />
      <path d="M8 5.6 10.9 7.3v3.4L8 12.4 5.1 10.7V7.3Z" />
    </>
  ),
  mcp: (
    <>
      <path d="M4.2 8.6 8 4.8a2.7 2.7 0 0 1 3.8 3.8L8 12.4" />
      <path d="M6.6 11 10.4 7.2" />
      <path d="M2.4 13.6 4.9 11.1" />
    </>
  ),
  claudecode: (
    <>
      <path d="M8 2.6v10.8M3.3 5.3l9.4 5.4M12.7 5.3l-9.4 5.4" />
    </>
  ),
  claudecowork: (
    <>
      <path d="M6 3.4v5.2M3.7 4.7l4.6 2.6M8.3 4.7 3.7 7.3" />
      <path d="M11 8.4v4.2M9.2 9.5l3.6 2M12.8 9.5l-3.6 2" />
    </>
  ),
  claudedesign: (
    <>
      <path d="M5.6 3v5.4M3.3 4.3l4.6 2.7M7.9 4.3 3.3 7" />
      <path d="M13 8.2 8.6 12.6l-2.3.6.6-2.3 4.4-4.4Z" />
    </>
  ),
  opencode: (
    <>
      <circle cx="8" cy="8" r="5.4" />
      <path d="M6.9 5.9 4.8 8l2.1 2.1M9.1 5.9 11.2 8l-2.1 2.1" />
    </>
  ),
  gemini: (
    <>
      <path d="M8 2.2c0 3.2 2.6 5.8 5.8 5.8-3.2 0-5.8 2.6-5.8 5.8 0-3.2-2.6-5.8-5.8-5.8 3.2 0 5.8-2.6 5.8-5.8Z" />
    </>
  ),
  cursor: (
    <>
      <path d="M4 2.6 12.4 8l-3.8.9-1.7 3.6Z" />
      <path d="M9.4 9.7 12.6 13.4" />
    </>
  ),
  n8n: (
    <>
      <circle cx="3.4" cy="8" r="1.5" />
      <circle cx="8" cy="4.6" r="1.5" />
      <circle cx="8" cy="11.4" r="1.5" />
      <circle cx="12.6" cy="8" r="1.5" />
      <path d="M4.7 7.2 6.7 5.4M4.7 8.8l2 1.8M9.3 5.4l2 1.8M9.3 10.6l2-1.8" />
    </>
  ),
};

const key = (name: string) => name.toLowerCase().replace(/[\s._&/,-]+/g, "");

export default function TechIcon({
  name,
  className = "h-3.5 w-3.5",
}: {
  name: string;
  className?: string;
}) {
  const glyph = GLYPHS[key(name)];
  if (!glyph) return null;

  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {glyph}
    </svg>
  );
}
