# How to Add a Newsletter

**Type:** How-to Guide  
**Audience:** Content Editors  
**Goal:** Add a new newsletter to the site

## Quick Steps

1. Create new file: `src/pages/newsletters/YYYY-MM.md`
2. Add frontmatter
3. Write content in Markdown
4. Commit and push
5. Verify on site

## Detailed Instructions

### Step 1: Create Newsletter File

**File naming:** Use date format `YYYY-MM.md`

Examples:
- `2025-12.md` - December 2025
- `2026-01.md` - January 2026

**Location:** `src/pages/newsletters/`

### Step 2: Add Frontmatter

Copy this template:

```markdown
---
title: "December 2025 Newsletter - Your Title"
date: 2025-12-01
version: "1.0"
author: "JWA Team"
description: "Brief description for SEO"
excerpt: "Short excerpt shown on newsletters listing page"
featured: false
layout: ~/layouts/Markdown.astro
---
```

**Required fields:**
- `title` - Full newsletter title
- `date` - Publication date (YYYY-MM-DD)
- `layout` - Always `~/layouts/Markdown.astro`

**Optional fields:**
- `version` - Usually "1.0"
- `author` - Author name(s)
- `description` - Meta description
- `excerpt` - Short summary for listing
- `featured` - Set to `true` to feature on homepage

### Step 3: Write Content

After frontmatter, write your newsletter:

```markdown
---
title: "December 2025 Newsletter"
date: 2025-12-01
layout: ~/layouts/Markdown.astro
---

# Happy December!

Welcome to the December newsletter!

## Section 1

Content here...

## Section 2

More content...
```

### Step 4: Save and Commit

**On GitHub:**
1. Click "Commit new file"
2. Message: "Add December 2025 newsletter"
3. Commit

**Locally:**
```bash
git add src/pages/newsletters/2025-12.md
git commit -m "Add December 2025 newsletter"
git push
```

### Step 5: Verify

1. Wait 2-5 minutes for site rebuild
2. Visit `https://jpmcworkers.com/newsletters`
3. Your newsletter should appear at top (newest first)
4. Click to view full content

## Newsletter Structure

While flexible, common structure:

```markdown
# Happy [Month]!

Opening greeting.

## Section Title

Content section.

### Subsection

More detailed content.

## Another Section

More content.

**What's next?**

Call to action.

-- Author Name
```

## Tips

### Write Good Excerpts

The excerpt appears on the listing page - make it compelling:

```markdown
excerpt: "2025 was a year of growth. Here's what we accomplished together."
```

### Use Featured Flag

Feature important newsletters:

```markdown
featured: true
```

### Format Consistently

- Use headings for sections
- Break up long paragraphs
- Use lists for multiple items
- Include calls to action

## Troubleshooting

### Newsletter not appearing

- Check date format: `YYYY-MM-DD`
- Verify file is in `src/pages/newsletters/`
- Ensure frontmatter is correct
- Wait for site rebuild

### Wrong date sorting

- Verify date is correct format
- Check for typos
- Ensure date matches file name (recommended)

## Related Documentation

- [Adding a Newsletter Tutorial](../../tutorials/content-editors/02-adding-a-newsletter.md)
- [Frontmatter Schemas Reference](../../reference/content-editors/frontmatter-schemas.md)
- [Markdown Syntax Reference](../../reference/content-editors/markdown-syntax.md)

