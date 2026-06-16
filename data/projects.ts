export type Project = {
  name: string;
  description: string;
  technologies: string[];
  code: string;
  live?: string;
};

export const highlightedProjects: Project[] = [
  {
    name: "Cursia Enterprise",
    description:
      "B2B corporate training platform with AI-assisted course creation, admin panel, client dashboard, and an employee view with quizzes and certificates.",
    technologies: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "AI"],
    code: "https://github.com/saldaf10/cursia-enterprise",
    live: "https://cursia-enterprise.vercel.app",
  },
  {
    name: "MedellinTravelTransportes",
    description:
      "Transport and tour booking platform for Medellín. Service catalog, booking system, real-time updates, and an admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    code: "https://github.com/NicoHurtado/MedellinTravelTransportes",
    live: "https://www.medellintransportes.com/",
  },
  {
    name: "FUEC_TMT",
    description:
      "Driver and vehicle management system for transport and tourism agencies. Access-code authentication, admin panel, and fleet tracking.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Koyeb"],
    code: "https://github.com/NicoHurtado/FUEC_TMT",
    live: "https://fuec-tmt.onrender.com/auth/login",
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
];
