# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router pages, layouts, and route handlers.
- `components/`: Reusable UI components.
- `content/`: MDX content for posts and docs.
- `lib/`: Shared utilities and config helpers.
- `mdx-components.tsx`: Custom MDX component mappings.
- `source.config.ts`: Fumadocs/content configuration.
- `.source/`: Generated source artifacts; avoid manual edits.

## Build, Test, and Development Commands
- `pnpm dev`: Run the Next.js dev server with Turbo.
- `pnpm build`: Production build (`next build`).
- `pnpm start`: Start the production server.
- `pnpm lint`: Run Biome checks (lint + type-aware rules).
- `pnpm lint:fix`: Auto-fix Biome issues where possible.
- `pnpm format`: Format code with Biome.

Use `pnpm` (workspace-aware). Avoid `npm`/`yarn` to prevent lockfile churn.

## Coding Style & Naming Conventions
- Language: TypeScript, React 19, Next.js App Router.
- Formatting/Linting: Biome (see `biome.json`). Run before pushing.
- Indentation: 2 spaces; prefer named exports; avoid default unless conventional.
- Filenames: kebab-case for files/dirs (`blog-card.tsx`), PascalCase for components, camelCase for variables/functions.
- Tailwind v4 via PostCSS; keep class lists readable and co-locate minimal styles.

## Testing Guidelines
- No test framework is configured yet. Prefer Vitest for unit tests and Playwright for E2E if added.
- Naming: `*.test.ts` / `*.test.tsx` adjacent to source.
- Aim for critical-path coverage (parsers, content transforms, and UI rendering states).

## Commit & Pull Request Guidelines
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore(deps):`), present tense, concise scope.
- PRs: Provide a summary, motivation, screenshots for UI, and link issues. Ensure `pnpm lint` and `pnpm build` pass.
- Keep changes scoped; avoid drive-by refactors.

## Security & Configuration Tips
- Use `.env.local` for secrets; client-exposed vars must start with `NEXT_PUBLIC_`.
- Do not commit generated files in `.next/` or credentials.

## Agent-Specific Instructions
- Scope: These rules apply repo-wide. Prefer minimal, surgical patches.
- Follow Biome output; do not add new dependencies without justification.
- Use `content/` for posts; avoid editing `.source/` outputs directly.
