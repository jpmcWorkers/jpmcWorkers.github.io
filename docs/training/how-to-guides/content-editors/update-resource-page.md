# How to Update a Resource Page

**Type:** How-to Guide  
**Audience:** Content Editors  
**Goal:** Edit an existing resource page

## Quick Steps

1. Find the resource file in `src/pages/content/`
2. Edit the file
3. Save and commit
4. Verify changes

## Finding Resource Files

Resources are in `src/pages/content/`:

- `qa.md` - Q&A page
- `mission.md` - Mission statement
- `carpool.md` - Carpool info
- etc.

## Editing a Resource

### Step 1: Open the File

**On GitHub:**
1. Navigate to `src/pages/content/`
2. Click on the file you want to edit
3. Click pencil icon (✏️)

**Locally:**
1. Open `src/pages/content/resource-name.md`
2. Edit in your editor

### Step 2: Make Changes

You can edit:
- Frontmatter (title, description, tags, order)
- Content (Markdown text)

### Step 3: Update Frontmatter (if needed)

```markdown
---
title: "Updated Title"
description: "Updated description"
order: 5
tags: ["tag1", "tag2"]
layout: ~/layouts/Markdown.astro
---
```

### Step 4: Update Content

Edit the Markdown content below the frontmatter.

### Step 5: Save and Commit

**On GitHub:**
1. Scroll to bottom
2. Commit message: "Update [resource name]"
3. Commit changes

**Locally:**
```bash
git add src/pages/content/resource-name.md
git commit -m "Update resource-name"
git push
```

## Common Updates

### Update Title

```markdown
---
title: "New Title"  # Change this
---
```

### Update Description

```markdown
---
description: "New description"  # Change this
---
```

### Add/Remove Tags

```markdown
---
tags: ["tag1", "tag2", "new-tag"]  # Add or remove tags
---
```

### Change Order

```markdown
---
order: 10  # Change number (lower = appears first)
---
```

### Update Content

Just edit the Markdown below the frontmatter.

## Best Practices

### Keep Frontmatter Consistent

Don't remove required fields:
- `title` (required)
- `layout` (required)

### Update Tags Appropriately

Add relevant tags, remove outdated ones.

### Test Links

If you add links, verify they work:
- Internal links: `/path`
- External links: `https://example.com`

## Troubleshooting

### Changes not appearing

- Wait for site rebuild (2-5 minutes)
- Verify file was saved
- Check for syntax errors in frontmatter

### Formatting broken

- Check Markdown syntax
- Verify frontmatter is between `---` lines
- Check for unclosed tags or brackets

## Related Documentation

- [Adding Resources Tutorial](../../tutorials/content-editors/03-adding-resources.md)
- [Formatting Content Tutorial](../../tutorials/content-editors/04-formatting-content.md)
- [Frontmatter Schemas Reference](../../reference/content-editors/frontmatter-schemas.md)

