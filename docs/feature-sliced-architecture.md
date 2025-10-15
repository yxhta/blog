# Feature-Sliced Design Overview

This project follows [Feature-Sliced Design (FSD)](https://feature-sliced.github.io/documentation/) to keep UI, domain, and infrastructure concerns modular. The structure is mapped onto Next.js App Router conventions as follows:

| Layer        | Purpose                                                                    | Project mapping |
| ------------ | -------------------------------------------------------------------------- | --------------- |
| `app/`       | Route entries, layouts, and API handlers tied to Next.js routing.          | `/app`          |
| `shared/`    | Cross-cutting primitives that are framework-agnostic.                      | `src/shared`    |
| `entities/`  | Domain-level models and UI tied to core data structures.                   | `src/entities`  |
| `features/`  | User interactions composed from entities and shared primitives.            | `src/features`  |
| `widgets/`   | Page-ready building blocks that orchestrate multiple features/entities.    | `src/widgets`   |
| `content/`   | Author-written MDX content surfaced via Fumadocs.                          | `/content`      |

## Slice Guidelines

- **Shared** (`src/shared`): keep utilities (`lib`), base layout contracts, and UI primitives that can be reused anywhere. These modules must not depend on `entities`, `features`, or `widgets`.
- **Entities** (`src/entities`): model blog-specific data and expose focused UI such as `BlogPostCard` and `blogSource`. Each entity folder combines `model/`, `ui/`, and an optional `index.ts` barrel.
- **Features** (`src/features`): implement interactive behaviour like theme switching, language switching, search toggles, or social sharing. A feature can import from `entities` and `shared`, but not from `widgets`.
- **Widgets** (`src/widgets`): compose features and entities into layout-ready sections. For example, `home-layout` coordinates navigation, search, and theme toggles.
- **App layer**: keeps only Next.js routing logic; it consumes widgets/features through the `@/` alias.

## Import Conventions

- `@/*` resolves to `src/*`. Use these aliases inside App Router modules to depend on entities, features, widgets, or shared utilities.
- `@app/*` resolves to `app/*` for the rare cases where modules inside `src` must call into route-specific helpers.
- Each slice should expose a top-level `index.ts` that re-exports the slice’s public API.

## Adding New Functionality

1. **Identify the layer** needed. For instance, a new comment form belongs to `features/comments`.
2. **Create co-located folders** (`model`, `ui`, etc.) under the chosen slice.
3. **Re-export** new entries from the slice’s `index.ts` to keep import paths short (`import { CommentForm } from "@/features/comments"`).
4. **Consume** new slices from `widgets` or route modules (`app/**`) without bypassing layer boundaries.

Following these steps keeps the codebase aligned with FSD while remaining compatible with Next.js automatic routing and bundling.
