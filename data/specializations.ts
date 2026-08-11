export type Specialization = {
  title: string;
  provider: string;
  year: number;
  description: string;
  certificate: string;
};

export const specializations: Specialization[] = [
  {
    title: "IBM Data Science",
    provider: "IBM",
    year: 2024,
    description:
      "Professional Data Science specialization covering the full analytics lifecycle.",
    certificate: "https://coursera.org/share/2c523c89c4087dff932fe60970a7e990",
  },
  {
    title: "Applied Data Science",
    provider: "IBM",
    year: 2024,
    description:
      "Applied specialization focused on turning data into deployable insight.",
    certificate: "https://coursera.org/share/76f2714cebfd413ce67604c8e4f4f805",
  },
];

/**
 * The "Featured" block is a list of named groups, so a future AWS certification
 * or a Claude credential is added by appending a group here — no layout work.
 * Each group renders under its own title, with the same card treatment.
 */
export type FeaturedGroup = {
  title: string;
  /** Short label shown on each card, e.g. "Specialization". */
  kind: string;
  items: Specialization[];
};

export const featuredGroups: FeaturedGroup[] = [
  {
    title: "Specializations",
    kind: "Specialization",
    items: specializations,
  },
  // Example of what comes next — delete this comment and add a real group:
  // { title: "AWS Certifications", kind: "AWS Certification", items: [...] },
];
