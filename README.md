# Nicolas Hurtado — Portfolio

Personal portfolio of **Nicolas Hurtado A.** — Data Engineer · Data Science · AI · Backend.

A single-page site that presents my skills, certifications, projects, and events. The
projects section pulls my public repositories **live from the GitHub API**, so it stays
up to date on its own, with a few deployed builds highlighted inline.

## Highlights

- **Live GitHub feed** — projects are fetched at request time and revalidated hourly; the
  deployed/production apps are flagged with a `Live` badge in the same grid.
- **Interactive hero** — a small feed-forward neural network animated on canvas as a live
  inference + training loop.
- **Single source of truth** — profile, projects, events, skills, and certifications all
  live in typed data files under `data/`.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- Deployed on [Vercel](https://vercel.com/)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/         Next.js App Router entry (layout, page)
components/   UI components (Hero, Projects, Events, Nav, …)
data/         Typed content (profile, projects, events, skills, certifications)
lib/          GitHub API client for the live projects feed
public/       Static assets (event photos, etc.)
```

## Configuration

All personal content is edited in one place — the files under `data/`:

- `data/profile.ts` — name, role, links, CV URL, GitHub username
- `data/projects.ts` — highlighted builds, repo description overrides, excluded repos
- `data/events.ts`, `data/skills.ts`, `data/certifications.ts`

---

© 2026 Nicolas Hurtado A.
