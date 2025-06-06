# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server with Turbo mode
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm postinstall` - Runs `fumadocs-mdx` after dependencies installation

### Code Quality
- `pnpm lint` - Check for linting and formatting issues with Biome
- `pnpm lint:fix` - Automatically fix linting and formatting issues
- `pnpm format` - Format code with Biome
- `pnpm tsc --noEmit` - Type check TypeScript without emitting files

**Important:** Always run `pnpm lint` and `pnpm tsc --noEmit` before committing changes to ensure code quality.

## Architecture

This is a Next.js 15 blog/documentation site using Fumadocs as the documentation framework.

### Key Dependencies
- **Next.js 15.3.1** - React framework with App Router
- **Fumadocs** - Documentation framework (ui, core, mdx packages)
- **Tailwind CSS v4** - Styling with PostCSS
- **TypeScript** - Type safety
- **Biome** - Fast linter and formatter for JavaScript/TypeScript

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

## Code Quality

The project uses Biome for linting and formatting with the following configuration:

### Biome Configuration (`biome.json`)
- **Formatting**: Tab indentation, 100-character line width, double quotes
- **Linting**: Recommended rules with React/Next.js optimizations
- **Import Sorting**: Automatic import organization
- **Git Integration**: Uses `.gitignore` patterns automatically

### Development Workflow
1. Code changes are automatically formatted on save (if editor extension is installed)
2. Run `pnpm lint` to check for issues
3. Run `pnpm lint:fix` to auto-fix formatting and safe linting issues
4. Run `pnpm tsc --noEmit` to verify TypeScript compilation
5. Commit only after all checks pass