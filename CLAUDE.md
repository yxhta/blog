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

This is a Next.js 15 blog and documentation platform powered by Fumadocs, featuring both a technical blog and documentation system.

### Key Dependencies
- **Next.js 15.3.1** - React framework with App Router
- **React 19.1.0** - Latest stable React version
- **Fumadocs** - Documentation framework (ui, core, mdx packages)
- **Tailwind CSS v4** - Styling with PostCSS
- **TypeScript** - Type safety
- **Biome** - Fast linter and formatter
- **Shiki** - Syntax highlighting with GitHub light/dark themes
- **lucide-react** - Icon library
- **Zod** - Schema validation for frontmatter

### Project Structure
- **`/app`** - Next.js App Router pages and layouts
  - `(home)` - Home page group route
  - `blog/` - Blog system routes
    - `[[...slug]]` - Individual blog posts
    - `list` - Blog listing page
    - `authors/[author]` - Author profile pages
    - `tags/[tag]` - Tag archive pages
  - `docs/[[...slug]]` - Dynamic documentation pages
  - `api/search` - Search API endpoint
  - `rss.xml` - RSS feed generation
  - `sitemap.ts` - Sitemap generation
  - `robots.ts` - Robots.txt configuration
  - `layout.config.tsx` - Shared layout configuration
- **`/content`** - Content storage
  - `blog/` - Blog posts in MDX format
  - `docs/` - Documentation in MDX format
- **`/lib`** - Core utilities
  - `source.ts` - Documentation source loader
  - `blog-source.ts` - Blog source loader
  - `authors.ts` - Author profiles and metadata
- **`/components`** - Reusable components
  - `social-share.tsx` - Social sharing (Twitter, LinkedIn, Web Share API)
- **`/.source`** - Generated source files from fumadocs-mdx

### Content Management

#### Blog System
Blog posts in `/content/blog/` use MDX with the following frontmatter schema:
- `title` (string, required)
- `description` (string, required)
- `author` (string, required) - Must match an author ID in `/lib/authors.ts`
- `date` (string or Date, required)
- `tags` (string array, optional)
- `category` (string, optional)
- `image` (string, optional) - Cover image URL
- `excerpt` (string, optional)

The blog includes automatic reading time calculation, author profiles with social links, and tag-based categorization.

#### Documentation System
Documentation files in `/content/docs/` use MDX with simpler frontmatter requirements. The Fumadocs loader processes these files and makes them available at `/docs/*` routes.

### Routing Structure
- `/` - Home page
- `/blog/list` - Blog listing
- `/blog/[slug]` - Individual blog posts
- `/blog/authors/[author]` - Author archives
- `/blog/tags` - All tags listing
- `/blog/tags/[tag]` - Posts by tag
- `/docs/*` - Documentation pages (nested structure supported)

### SEO and Web Standards
- **Sitemap Generation** - Automatic sitemap.xml for all pages
- **RSS Feed** - Blog RSS feed at `/rss.xml`
- **Robots.txt** - Crawler configuration
- **Open Graph Meta Tags** - Social media preview optimization
- **Structured Data** - Schema.org markup for blog posts

### Environment Variables
- `NEXT_PUBLIC_BASE_URL` - Required for absolute URLs in RSS feeds, sitemaps, and social sharing

### Code Quality

The project uses Biome for linting and formatting with the following configuration:

#### Biome Configuration (`biome.json`)
- **Formatting**: Tab indentation, 100-character line width, double quotes
- **Linting**: Recommended rules with React/Next.js optimizations
- **Import Sorting**: Automatic import organization
- **Git Integration**: Uses `.gitignore` patterns automatically

#### Development Workflow
1. Code changes are automatically formatted on save (if editor extension is installed)
2. Run `pnpm lint` to check for issues
3. Run `pnpm lint:fix` to auto-fix formatting and safe linting issues
4. Run `pnpm tsc --noEmit` to verify TypeScript compilation
5. Commit only after all checks pass