import type { EventImage } from "@/lib/eventImages";

export type EventItem = {
  title: string;
  organizer: string;
  date: string;
  description: string;
  certificate?: string;
  /** Filename prefix in `public/events`; every image starting with it is
   *  collected automatically, so adding photos never touches this file. */
  slug: string;
};

/** An event with its photos resolved from disk (see `lib/eventImages`). */
export type EventWithImages = EventItem & { images: EventImage[] };

export const events: EventItem[] = [
  {
    title: "MongoDB Office",
    organizer: "MongoDB",
    date: "2025",
    description: "Invited to visit the MongoDB headquarters in Austin, Texas.",
    slug: "mongodb",
  },
  {
    title: "EXPOgerenciar",
    organizer: "EAFIT",
    date: "2024 & 2025",
    description:
      "Innovation and entrepreneurship talks and workshops with major companies and CEOs.",
    certificate:
      "https://wallet.xertify.co/certificates/9770B48DA004?viewMode=regular",
    slug: "expogerenciar",
  },
  {
    title: "Racing to the Cloud",
    organizer: "Oracle & EAFIT",
    date: "2023",
    description:
      "Cloud development competition focused on data and innovative solutions.",
    certificate:
      "https://www.linkedin.com/in/nicohurtado/details/certifications/1722389216242/single-media-viewer/?profileId=ACoAAESVOFIBY09FpZc8zyLTHOV4bqIfJUBfCNc",
    slug: "racing-cloud",
  },
  {
    title: "BancoLab 2025",
    organizer: "Bancolombia",
    date: "2025",
    description:
      "Fintech and banking innovation event exploring digital transformation.",
    slug: "bancolab",
  },
  {
    title: "Bintec",
    organizer: "Bintec",
    date: "2025",
    description:
      "Technology and innovation conference featuring robotics, AI demos, and networking.",
    slug: "bintec",
  },
];
