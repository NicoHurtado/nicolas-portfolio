import { profile } from "@/data/profile";
import { excludedRepos, repoDescriptions } from "@/data/projects";

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  updatedAt: string;
};

type GithubApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
};

/**
 * Fetches public repos for the profile user, drops forks/archived and any repo
 * listed in `excludedRepos`, and returns a lightweight, sorted view.
 * Pass a `limit` to cap the result; omit it to return every matching repo.
 * Cached at the framework layer; degrades to an empty list on any error.
 */
export async function fetchGithubRepos(limit?: number): Promise<GithubRepo[]> {
  const excluded = new Set(excludedRepos.map((r) => r.toLowerCase()));

  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const data = (await res.json()) as GithubApiRepo[];

    return data
      .filter(
        (r) =>
          !r.fork && !r.archived && !excluded.has(r.name.toLowerCase())
      )
      .map((r) => ({
        name: r.name,
        description: repoDescriptions[r.name.toLowerCase()] ?? r.description,
        url: r.html_url,
        homepage: r.homepage,
        language: r.language,
        stars: r.stargazers_count,
        topics: r.topics ?? [],
        updatedAt: r.updated_at,
      }))
      .sort((a, b) => {
        if (b.stars !== a.stars) return b.stars - a.stars;
        return +new Date(b.updatedAt) - +new Date(a.updatedAt);
      })
      .slice(0, limit ?? undefined);
  } catch {
    return [];
  }
}
