# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` - Start development server with Turbo mode
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm postinstall` - Runs `fumadocs-mdx` after dependencies installation

## Architecture

This is a Next.js 15 blog/documentation site using Fumadocs as the documentation framework.

### Key Dependencies
- **Next.js 15.3.1** - React framework with App Router
- **Fumadocs** - Documentation framework (ui, core, mdx packages)
- **Tailwind CSS v4** - Styling with PostCSS
- **TypeScript** - Type safety

### Project Structure
- **`/app`** - Next.js App Router pages and layouts
  - `(home)` - Home page group route
  - `docs/[[...slug]]` - Dynamic documentation pages
  - `api/search` - Search API endpoint
  - `layout.config.tsx` - Shared layout configuration
- **`/content/docs`** - MDX documentation files
- **`/lib/source.ts`** - Fumadocs source loader configuration
- **`/.source`** - Generated source files from fumadocs-mdx

### Content Management
Content is managed through MDX files in `/content/docs`. The Fumadocs loader in `/lib/source.ts` processes these files and makes them available at `/docs/*` routes. The source configuration in `source.config.ts` defines schemas for frontmatter and metadata.

### Routing
- Home page at `/`
- Documentation pages at `/docs/*`
- Dynamic catch-all route handles nested documentation paths