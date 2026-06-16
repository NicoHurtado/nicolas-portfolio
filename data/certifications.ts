export type Certification = {
  title: string;
  provider: string;
  year: number;
  topics: string;
  certificate: string;
  category: CertCategory;
};

export type CertCategory =
  | "AI & ML"
  | "Data Science"
  | "Backend & Cloud"
  | "Computer Science";

export const certCategories: CertCategory[] = [
  "AI & ML",
  "Data Science",
  "Backend & Cloud",
  "Computer Science",
];

export const certifications: Certification[] = [
  {
    title: "Generative AI Language Modeling with Transformers",
    provider: "IBM",
    year: 2025,
    topics: "PyTorch, positional encoding, GPT, BERT",
    certificate: "https://coursera.org/share/e2c2bd4538b8f145a05a5bda27b7ae44",
    category: "AI & ML",
  },
  {
    title: "Applied Machine Learning in Python",
    provider: "University of Michigan",
    year: 2025,
    topics: "Scikit-Learn, regression, ML algorithms",
    certificate: "https://coursera.org/share/7b8c12957f493b9e02a50c8ada32f9b8",
    category: "AI & ML",
  },
  {
    title: "AI Workflow: Enterprise Model Deployment",
    provider: "IBM",
    year: 2025,
    topics: "AI, machine learning, Python, information engineering",
    certificate: "https://coursera.org/share/5398863c15cb7b710b22581b38aebeae",
    category: "AI & ML",
  },
  {
    title: "Predictive Modeling & Regression Analysis",
    provider: "UC Irvine",
    year: 2025,
    topics: "Decision trees, random forests, SVMs",
    certificate: "https://coursera.org/share/65f980f95671f0b277f5268a68ba08be",
    category: "AI & ML",
  },
  {
    title: "Machine Learning with Python",
    provider: "IBM",
    year: 2024,
    topics: "Regression, clustering, classification, scikit-learn",
    certificate: "https://coursera.org/share/86f6b72e9481c60d6ea413374c234156",
    category: "AI & ML",
  },
  {
    title: "Data Scientist with Python",
    provider: "Datacamp",
    year: 2024,
    topics: "Comprehensive data science career track",
    certificate:
      "https://www.datacamp.com/completed/statement-of-accomplishment/track/1f0f37ce99a5f1aa509209dab06758920a5d578a",
    category: "Data Science",
  },
  {
    title: "Data Science for Agile Decision-Making",
    provider: "Duke University",
    year: 2025,
    topics: "Turning data into insights, decision-making with AI",
    certificate: "https://coursera.org/share/afb415199338d5afdca91137db5e4231",
    category: "Data Science",
  },
  {
    title: "Python & Statistics for Financial Analysis",
    provider: "HKUST",
    year: 2025,
    topics: "Financial analysis, data visualization, statistics",
    certificate: "https://coursera.org/share/a59bb3001a8cc7cd0451ae03dfef9a8b",
    category: "Data Science",
  },
  {
    title: "Data Visualization with Python",
    provider: "IBM",
    year: 2024,
    topics: "Matplotlib, Dash, dashboards and charts",
    certificate: "https://coursera.org/share/a9f14de86b5d9c5fa60af33e0c4757b0",
    category: "Data Science",
  },
  {
    title: "Business Analytics",
    provider: "Campus BBVA",
    year: 2025,
    topics: "Data-driven project phases and job profiles",
    certificate: "https://coursera.org/share/32471d9bfc6428968d07bc8439d4a32e",
    category: "Data Science",
  },
  {
    title: "Architecting Solutions on AWS",
    provider: "AWS",
    year: 2025,
    topics: "Software architecture, data management, cloud computing",
    certificate: "https://coursera.org/share/e7203379e21e65576ba987e2cad35cc3",
    category: "Backend & Cloud",
  },
  {
    title: "Cloud Data Engineering",
    provider: "Duke University",
    year: 2025,
    topics: "Data management, DevOps, AWS, big data",
    certificate: "https://coursera.org/share/d790b3546ac9b46cd9e1bb9dff033aaa",
    category: "Backend & Cloud",
  },
  {
    title: "Serverless Architectures on AWS",
    provider: "AWS",
    year: 2025,
    topics: "EventBridge, SNS, event-driven architectures, CloudFormation",
    certificate: "https://coursera.org/share/a3787115f66d8d60a0fe0f82ca6e8267",
    category: "Backend & Cloud",
  },
  {
    title: "Mastering REST APIs with FastAPI",
    provider: "Packt",
    year: 2025,
    topics: "FastAPI, deployment, CI, authentication, logging",
    certificate: "https://coursera.org/share/2d9bbf21e48a3e6bed518b3a327469f4",
    category: "Backend & Cloud",
  },
  {
    title: "APIs",
    provider: "Meta",
    year: 2025,
    topics: "REST APIs, filtering, authentication, serializers",
    certificate: "https://coursera.org/share/4169660d9e1e20d0e4074d70af428464",
    category: "Backend & Cloud",
  },
  {
    title: "MongoDB Schema Design Patterns",
    provider: "MongoDB",
    year: 2025,
    topics: "Schema design patterns, antipatterns, performance optimization",
    certificate:
      "https://www.credly.com/badges/fc8db647-d1ae-4eff-9016-17458d4b1f46/linked_in_profile",
    category: "Backend & Cloud",
  },
  {
    title: "Docker Fundamentals",
    provider: "LearnKartS",
    year: 2025,
    topics: "Containerization, Docker, Mirantis, microservices",
    certificate: "https://coursera.org/share/897a1f168e7544bc706194a0f845f287",
    category: "Backend & Cloud",
  },
  {
    title: "MongoDB Data Modeling Path",
    provider: "MongoDB",
    year: 2024,
    topics: "MongoDB data modeling best practices",
    certificate: "https://learn.mongodb.com/c/bF4yYciaTwWXOufuA-fvZg",
    category: "Backend & Cloud",
  },
  {
    title: "Databases & SQL for Data Science",
    provider: "IBM",
    year: 2024,
    topics: "RDBMS, cloud databases, Jupyter, SQL",
    certificate: "https://coursera.org/share/2521be15e1f3be2bbcde1519d4ba742b",
    category: "Backend & Cloud",
  },
  {
    title: "Java: Algorithms",
    provider: "Codio",
    year: 2025,
    topics: "Searching, sorting, recursion, dynamic programming",
    certificate: "https://coursera.org/share/42d73c6157472f1bb52d61697236644d",
    category: "Computer Science",
  },
  {
    title: "Java: Linear Data Structures and Trees",
    provider: "Codio",
    year: 2025,
    topics: "Binary trees, linked lists, priority queues",
    certificate: "https://coursera.org/share/cfe5e1db2f660b8feecc608c2671351d",
    category: "Computer Science",
  },
];
