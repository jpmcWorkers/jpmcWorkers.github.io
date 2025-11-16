# Frontmatter Schemas Reference

**Type:** Reference  
**Audience:** Content Editors

## Newsletters

**Location:** `src/pages/newsletters/*.md`

### Required Fields

- `title` (string) - Newsletter title
- `date` (date) - Publication date (YYYY-MM-DD)
- `layout` (string) - Always `~/layouts/Markdown.astro`

### Optional Fields

- `version` (string) - Version number, usually "1.0"
- `author` (string) - Author name(s)
- `description` (string) - Meta description for SEO
- `excerpt` (string) - Short summary for listing page
- `featured` (boolean) - Feature on homepage (default: false)

### Example

```markdown
---
title: "December 2025 Newsletter - Year in Review"
date: 2025-12-01
version: "1.0"
author: "JWA Team"
description: "A look back at 2025"
excerpt: "2025 was a year of growth and progress."
featured: true
layout: ~/layouts/Markdown.astro
---
```

## Resources

**Location:** `src/pages/content/*.md`

### Required Fields

- `title` (string) - Page title
- `layout` (string) - Always `~/layouts/Markdown.astro`

### Optional Fields

- `description` (string) - Brief description
- `order` (number) - Sort order (lower = appears first)
- `tags` (array) - Array of tags: `["tag1", "tag2"]`

### Example

```markdown
---
title: "Workplace Rights FAQ"
description: "Common questions about worker rights"
order: 5
tags: ["rights", "faq", "legal"]
layout: ~/layouts/Markdown.astro
---
```

## Related Documentation

- [Adding a Newsletter Tutorial](../../tutorials/content-editors/02-adding-a-newsletter.md)
- [Adding Resources Tutorial](../../tutorials/content-editors/03-adding-resources.md)

