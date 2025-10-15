# blog.yxhta.com

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Architecture

This codebase adopts [Feature-Sliced Design](https://feature-sliced.github.io/documentation/)
to keep UI and domain layers modular:

- `app/` – Next.js App Router entrypoints and route handlers.
- `src/shared/` – reusable primitives (`lib`, `layout`, `ui`) that have no domain coupling.
- `src/entities/` – domain models and UI tied to core data (e.g. blog posts).
- `src/features/` – user-facing interactions composed from entities and shared pieces.
- `src/widgets/` – page-level, reusable compositions wiring multiple features together.
- `content/` – MDX content sourced by Fumadocs.

The root `tsconfig.json` exposes an alias so imports use `@/...` for `src/**` modules
and `@app/...` (or relative paths) for files that stay in `app/`. When adding new
code, prefer placing it in the appropriate `src/{shared,entities,features,widgets}`
slice and re-export via a local `index.ts`.
