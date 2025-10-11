# Repository Guidelines

## Project Structure & Module Organization
The app follows Next.js App Router conventions. UI routes, layouts, and handlers live in `app/`, while reusable components sit in `components/`. Content authors should place MDX entries in `content/`; any generated artifacts appear under `.source/` and should never be edited manually. Shared configuration and helpers belong in `lib/`, with MDX overrides declared in `mdx-components.tsx` and global content settings in `source.config.ts`. Keep assets close to their consuming modules to limit cross-folder churn.

## Build, Test, and Development Commands
Use `pnpm dev` for an iterative dev server and `pnpm build` followed by `pnpm start` to mimic production. `pnpm lint` runs Biome’s lint plus type-aware rules; add `:fix` when safe automation helps. `pnpm format` enforces formatting only. Stick with `pnpm` to respect the workspace lockfile and avoid dependency drift.

## Coding Style & Naming Conventions
TypeScript, React 19, and the App Router power the stack. Indent with two spaces and prefer named exports. Filenames and directories use kebab-case (`blog-card.tsx`), React components stay PascalCase, and variables default to camelCase. Tailwind v4 is configured through PostCSS; keep class lists readable and colocate tiny style tweaks with their components. Always resolve lint feedback before submitting work.

## Testing Guidelines
No harness ships today, but prefer Vitest for units and Playwright for E2E when coverage is required. Co-locate tests beside source using the `*.test.ts[x]` pattern and focus on critical paths such as MDX parsing and layout rendering. Add scripts or documentation updates when you introduce a new testing tool so others can reproduce results.

## Commit & Pull Request Guidelines
Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore(deps):`) in present tense with concise scope. Pull requests should explain motivation, outline key changes, include UI screenshots when altering visuals, and link issues when relevant. Always run `pnpm lint` and, for significant changes, `pnpm build` before requesting review.

## Security & Configuration Tips
Secrets belong in `.env.local`; expose values to the client only with the `NEXT_PUBLIC_` prefix. Never commit `.next/`, credentials, or other generated artifacts. When touching configuration, document required environment variables and keep defaults safe for local development.

## Agent-Specific Instructions
Favor minimal, surgical patches that respect existing work. Avoid adding dependencies without justification, and prefer editing MDX through `content/` rather than manipulating `.source/`. Consult `biome.jsonc` for lint rules before deviating from the established style.
