export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["Python", "SQL", "TypeScript", "Java", "Bash"],
  },
  {
    title: "AI & Machine Learning",
    items: [
      "Machine Learning",
      "LLMs",
      "Fine-tuning",
      "RAG",
      "AI Agents",
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
      "Iceberg",
      "Data Lakes",
      "Apache Spark",
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
      "GraphQL",
      "REST APIs",
      "Postman",
      "Vercel",
      "Microservices",
      "AWS Services, Data & Analytics Tools",
      "Azure",
    ],
  },
];

export const personGroups: SkillGroup[] = [
  {
    title: "Analytical",
    items: [
      "Data Science",
      "Statistics",
      "Predictive Modeling",
      "Data Modeling",
      "Data Visualization & BI",
      "System Design",
      "Monitoring & Maintenance",
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

export const aiTools: string[] = ["Claude", "OpenAI", "MCP", "n8n"];
