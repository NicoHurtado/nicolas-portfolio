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
  createdAt: string;
  pushedAt: string;
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
  created_at: string;
  pushed_at: string;
};

/**
 * Fetches public repos for the profile user, drops forks/archived and any repo
 * listed in `excludedRepos`, and returns a lightweight view sorted newest-first
 * by repository creation date — so a project pushed to GitHub shows up at the
 * top of the feed on its own, with no edit to this site.
 * Pass a `limit` to cap the result; omit it to return every matching repo.
 * Cached at the framework layer; degrades to an empty list on any error.
 */
export async function fetchGithubRepos(limit?: number): Promise<GithubRepo[]> {
  const excluded = new Set(excludedRepos.map((r) => r.toLowerCase()));

  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=created&direction=desc`,
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
        createdAt: r.created_at,
        pushedAt: r.pushed_at,
      }))
      // Newest repository first. Swap `createdAt` for `pushedAt` here to order
      // by most recent activity instead of by when the project was started.
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
      .slice(0, limit ?? undefined);
  } catch {
    return [];
  }
}
