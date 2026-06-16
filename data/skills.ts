export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["Python", "SQL", "R", "TypeScript", "Bash"],
  },
  {
    title: "AI & Machine Learning",
    items: [
      "Machine Learning",
      "LLMs",
      "Fine-tuning",
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "Polars",
      "NumPy",
    ],
  },
  {
    title: "Data & Databases",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Redshift",
      "DynamoDB",
      "S3",
      "Iceberg",
      "DataLakes",
      "Snowflake",
    ],
  },
  {
    title: "Platforms (Backend & DevOps)",
    items: [
      "FastAPI",
      "Git",
      "Docker",
      "Terraform",
      "Node.js",
      "Django",
      "Flask",
      "GraphQL",
      "REST APIs",
      "Postman",
      "Vercel",
      "Neon",
      "CI/CD",
      "Microservices",
      "Lambda",
      "EC2",
      "AWS Data & Analytics Tools",
      "Azure",
    ],
  },
];

export const personGroups: SkillGroup[] = [
  {
    title: "Analytical",
    items: [
      "Data Analysis",
      "Data Visualization",
      "Statistical Analysis",
      "Data Modeling",
      "Business Intelligence",
    ],
  },
  {
    title: "Soft Skills",
    items: [
      "Problem Solving",
      "Communication",
      "Teamwork",
      "Adaptability",
      "Critical Thinking",
      "Leadership",
      "Ownership",
      "Curiosity",
      "Time Management",
      "Continuous Learning",
      "Bilingual (ES/EN)",
    ],
  },
];

export const aiTools: string[] = [
  "Claude Code",
  "Claude Cowork",
  "Claude Design",
  "Opencode",
  "Gemini",
  "Cursor",
  "n8n",
];
