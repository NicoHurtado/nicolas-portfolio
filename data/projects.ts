export type Project = {
  name: string;
  description: string;
  technologies: string[];
  code: string;
  live?: string;
};

export const highlightedProjects: Project[] = [
  {
    name: "Medellín Travel Transportes",
    description:
      "The full digital operation of a high-volume transport & tourism agency: public booking platform with secure payments, real-time updates, and an admin dashboard running the day-to-day business.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    code: "https://github.com/NicoHurtado/MedellinTravelTransportes",
    live: "https://www.medellintransportes.com/",
  },
  {
    name: "Cursia Enterprise",
    description:
      "B2B corporate training platform with AI-assisted course creation, admin panel, client dashboard, and an employee view with quizzes and certificates.",
    technologies: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "AI"],
    code: "https://github.com/saldaf10/cursia-enterprise",
    live: "https://cursia-enterprise.vercel.app",
  },
  {
    name: "Fleet Compliance App",
    description:
      "Internal web app that keeps a transport fleet legally compliant: issues and tracks regulatory contracts (FUEC), manages driver and vehicle records, with access-code authentication and an admin panel. In daily use, 100% adherence to standards.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Koyeb"],
    code: "https://github.com/NicoHurtado/FUEC_TMT",
    live: "https://fuec-tmt.onrender.com/auth/login",
  },
  {
    name: "Finance Manager",
    description:
      "Full-stack financial analytics PWA to track expenses, income, and accounts — with savings goals, net-worth tracking, and visual analytics.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "PWA"],
    code: "https://github.com/NicoHurtado/coffee",
  },
];

// Local description overrides for live GitHub repos. Keyed by repo name
// (case-insensitive). Used to fill in or improve missing/weak GitHub
// descriptions so the projects feed reads clearly for recruiters.
export const repoDescriptions: Record<string, string> = {
  "proyecto-etl-bigdata":
    "Big data ETL pipeline that ingests, cleans, and transforms large datasets for downstream analytics.",
  grpc_gateway_client:
    "gRPC gateway and client demonstrating service-to-service communication with Protocol Buffers.",
  "satellite-tracker":
    "Real-time satellite tracking service that computes orbital positions and passes, built in Go.",
  data_sandbox:
    "Collection of data analysis and exploration experiments in Python.",
  route_optimizer:
    "Route optimization tool that computes efficient delivery and travel paths over a set of stops.",
  "spotify-analysis":
    "Data analysis of personal Spotify listening history, surfacing trends in artists, genres, and habits.",
  nlp_api:
    "REST API exposing natural language processing tasks such as text classification and analysis.",
  ds_salary_prediction:
    "Machine learning model that predicts data science salaries from role and experience features.",
  deep_reinforcement_learning:
    "Deep reinforcement learning agents trained to solve control and game environments.",
  ai_chatbot:
    "Conversational AI chatbot built in Python with natural language understanding.",
  knn_from_scratch:
    "K-Nearest Neighbors classifier implemented from scratch to illustrate the algorithm's internals.",
  live_face_recognition:
    "Real-time face recognition from a live webcam feed using computer vision.",
  ai_text_generation:
    "Neural text generation model that produces coherent text from a trained language model.",
  ai_car_simulation:
    "Self-driving car simulation where an AI agent learns to navigate a track.",
  fake_news_classification:
    "NLP classifier that labels news articles as real or fake using machine learning.",
  object_localization_tf:
    "TensorFlow model that detects and localizes objects within images via bounding boxes.",
  nn_from_scratch:
    "Neural network built from scratch in NumPy to demonstrate forward and backpropagation.",
  brain_tumor_detector:
    "Deep learning app that classifies brain X-ray images as healthy or tumorous via a neural network.",
};

// Repos excluded from the live GitHub feed (already highlighted or hidden)
export const excludedRepos: string[] = [
  "wisemotors",
  "NicoHurtado",
  "Portfolio",
  "portfolio-v2",
  "Concurrency",
  "price-byte",
  "MedellinTravelTransportes",
  "FUEC_TMT",
  "cursia-enterprise",
  "coffee",
];
