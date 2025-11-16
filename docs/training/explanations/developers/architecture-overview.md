# Architecture Overview

**Type:** Explanation  
**Audience:** Developers

## High-Level Architecture

This is a **static site** built with **Astro**, deployed to **GitHub Pages**.

## Key Technologies

- **Astro** - Web framework (static site generation)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Playwright** - Testing
- **GitHub Pages** - Hosting

## Architecture Decisions

### Static Site Generation

**Why:** Fast, secure, cost-effective for content-heavy sites.

**How:** All pages pre-rendered at build time, served as static HTML.

### Astro Framework

**Why:** Perfect for content sites, component-based, fast by default.

**How:** File-based routing, component islands, content collections.

### Content Collections

**Why:** Type-safe, organized content management.

**How:** Zod schemas validate content, TypeScript provides autocomplete.

### Tailwind CSS

**Why:** Rapid development, consistent design, small bundle size.

**How:** Utility-first CSS, custom JPMC brand colors.

## Project Structure

See [Project Structure Reference](../../reference/developers/project-structure.md)

## Data Flow

1. **Content** → Markdown files in `src/pages/`
2. **Collections** → Validated by schemas in `src/content/config.ts`
3. **Pages** → Query collections, render with components
4. **Build** → Static HTML generated
5. **Deploy** → Served from GitHub Pages

## Component Architecture

- **Layouts** - Page wrappers (header, footer, sidebar)
- **Components** - Reusable UI pieces
- **Pages** - Route handlers
- **Content** - Markdown files

## Related Documentation

- [Why Astro?](./why-astro.md)
- [Content Collections Explained](./content-collections-explained.md)
- [Component Patterns](./component-patterns.md)

