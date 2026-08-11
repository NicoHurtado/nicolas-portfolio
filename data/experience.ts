export type Role = {
  title: string;
  period: string;
  highlights: string[];
};

export type Experience = {
  company: string;
  /** Short note about the company itself, e.g. what kind of business it is. */
  note?: string;
  period: string;
  location: string;
  summary: string;
  /** Single-role positions. */
  role?: string;
  highlights?: string[];
  /** Multi-role positions (a promotion inside the same company). */
  roles?: Role[];
  tags: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    company: "BTG Pactual",
    note: "Latin American investment bank",
    period: "Jan 2026 — Present",
    location: "Medellín, Colombia",
    summary:
      "Promoted from intern after six months; now building the platform the firm's trading areas open the day with.",
    roles: [
      {
        title: "Data Analyst & Software Developer",
        period: "Jul 2026 — Present",
        highlights: [
          "Built from scratch the platform that consolidates the firm's proprietary trading position — the system 10 internal areas, including trading desks, rely on each morning for an accurate view of exposure.",
          "Designed the architecture and implemented a Python microservices backend, unifying 7+ heterogeneous sources (market and internal APIs, databases, stored procedures) into a single normalized source of truth.",
          "Delivered the platform end to end, from backend services to the React frontend surfacing consolidated positions and analytics — replacing slow external applications with one focused workflow for daily decision-making.",
          "Containerized and deployed on AWS ECS, defining the deployment standards, CI/CD, and documentation the platform now runs on.",
        ],
      },
      {
        title: "IT Intern — Data Engineer & Developer",
        period: "Jan 2026 — Jul 2026",
        highlights: [
          "Built an end-to-end data pipeline automating financial reporting, cutting report time from 2 hours to under 10 minutes and freeing recurring hours for higher-value analysis.",
          "Engineered ETL centralizing large-scale financial records into a Data Lake on Amazon S3 with Apache Iceberg, processed with AWS Glue, Spark, and Athena — ensuring integrity and auditability for regulatory reporting.",
          "Introduced agentic AI coding tools into the team's development and code-review workflow, and built CI/CD pipelines that standardized and shortened deployments.",
        ],
      },
    ],
    tags: [
      "Python",
      "Microservices",
      "AWS ECS",
      "Iceberg",
      "Spark",
      "React",
      "CI/CD",
    ],
    current: true,
  },
  {
    company: "Medellín Travel Transportes",
    note: "Transport & tourism agency",
    role: "Freelance Full-Stack Developer",
    period: "Jan 2025 — Jan 2026",
    location: "Medellín, Colombia",
    summary:
      "Sole developer of the full digital operation of an agency handling up to 1,000 bookings a month.",
    highlights: [
      "Built the public booking platform with secure payments and real-time updates — live at medellintransportes.com.",
      "Built a CRM (Next.js, PostgreSQL) covering the full client, reservation, driver, and partner lifecycle, with a public API for third-party integrations and an AI chatbot resolving 80% of support requests without human intervention.",
      "Automated scheduling and notifications across a four-role architecture, cutting manual admin work by 40%; built FUEC, an internal app for regulatory compliance reaching 100% adherence to transport standards.",
    ],
    tags: ["Next.js", "PostgreSQL", "CRM", "Public API", "AI Chatbot"],
  },
  {
    company: "Cursia for Enterprise",
    note: "AI training platform",
    role: "Co-Founder & AI Engineer",
    period: "Jun 2024 — Feb 2025",
    location: "Medellín, Colombia",
    summary:
      "Co-founded an AI-powered corporate training platform, still running in production.",
    highlights: [
      "Built a platform that generates custom courses, evaluates employees through open-ended questions, and detects AI-assisted fraud.",
      "Architected the LLM pipeline for personalized content and a 24/7 AI assistant per learner.",
      "Scaled to 10+ enterprise clients and 100+ active users.",
    ],
    tags: ["LLMs", "AI Products", "SaaS", "Entrepreneurship"],
  },
  {
    company: "EAFIT University",
    role: "Data Engineering Assistant",
    period: "Sep 2022 — Feb 2023",
    location: "Medellín, Colombia",
    summary: "Database performance and data migration for university systems.",
    highlights: [
      "Improved database performance — 5s query time for 1,130+ users.",
      "Migrated 20K+ records to a scalable architecture, eliminating recurring data inconsistencies.",
    ],
    tags: ["Databases", "Migrations", "Performance"],
  },
];
