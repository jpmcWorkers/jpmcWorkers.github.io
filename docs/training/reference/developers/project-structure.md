# Project Structure Reference

**Type:** Reference  
**Audience:** Developers

## Directory Structure

```
workers.github.io/
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Website pages (file-based routing)
│   │   ├── content/        # Resource pages (Markdown)
│   │   ├── newsletters/    # Newsletter files (Markdown)
│   │   └── api/            # API endpoints (if any)
│   ├── content/            # Content collection configs
│   ├── config/             # Configuration files
│   ├── data/               # Data files
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   └── img/                # Source images
├── public/                 # Static assets (served as-is)
│   ├── images/             # Media library images
│   ├── booklets/           # Booklet PDFs/images
│   └── img/                # Static images
├── docs/                   # Documentation
├── tests/                  # Test files
├── scripts/                # Build scripts
├── astro.config.mjs        # Astro configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Key Directories

### `src/components/`

Reusable Astro components:
- `Button.astro` - Button component
- `Card.astro` - Card component
- `Layout.astro` - Main layout wrapper
- etc.

### `src/pages/`

File-based routing:
- `index.astro` → `/`
- `about.astro` → `/about`
- `blog/index.astro` → `/blog`
- `blog/[slug].astro` → `/blog/any-slug`

### `src/pages/content/`

Resource pages (Markdown):
- `qa.md` → `/content/qa`
- `mission.md` → `/content/mission`

### `src/pages/newsletters/`

Newsletter files (Markdown):
- `2025-05.md` → `/newsletters/2025-05`

### `public/`

Static assets served directly:
- Files in `public/` are accessible at root
- `public/images/logo.png` → `/images/logo.png`

## File Types

### `.astro` Files

Astro component/page files:
- Frontmatter (JavaScript/TypeScript)
- Template (HTML/JSX)

### `.md` Files

Markdown content files:
- Frontmatter (YAML)
- Markdown content

### `.ts` / `.tsx` Files

TypeScript files:
- Utilities
- Configuration
- Type definitions

## Configuration Files

### `astro.config.mjs`

Astro framework configuration:
- Output mode (static)
- Integrations
- Build settings

### `package.json`

Project metadata:
- Dependencies
- Scripts
- Project info

### `tsconfig.json`

TypeScript configuration:
- Compiler options
- Path aliases
- Type definitions

## Related Documentation

- [Component API Reference](./component-api.md)
- [Content Schemas Reference](./content-schemas.md)
- [Build Commands Reference](./build-commands.md)

