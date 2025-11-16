# Adding a Newsletter

**Type:** Tutorial  
**Audience:** Content Editors  
**Prerequisites:** Completed [Content Editor Setup](01-content-editor-setup.md), basic Markdown knowledge

## What You'll Learn

By the end of this tutorial, you'll be able to:
- Create a new newsletter file
- Add proper frontmatter (metadata)
- Write newsletter content in Markdown
- Format newsletters correctly
- Understand where newsletters appear on the site

## Newsletter Overview

Newsletters are monthly updates published on the website. They:
- Appear on the `/newsletters` page
- Are sorted by date (newest first)
- Can be marked as "featured"
- Include metadata like title, date, author, and excerpt

## Step 1: Create the Newsletter File

### File Naming

Newsletter files are named by date: `YYYY-MM.md`

Examples:
- `2025-05.md` - May 2025 newsletter
- `2025-06.md` - June 2025 newsletter
- `mayday2025.md` - Special newsletter (can use custom names)

**Location:** `src/pages/newsletters/`

### Create the File

**On GitHub:**
1. Go to `src/pages/newsletters/`
2. Click "Add file" → "Create new file"
3. Name it `2025-12.md` (or your date)

**Locally:**
1. Create a new file: `src/pages/newsletters/2025-12.md`
2. Open it in your editor

## Step 2: Add Frontmatter

Every newsletter needs frontmatter (metadata at the top). Here's the template:

```markdown
---
title: "December 2025 Newsletter - Your Title Here"
date: 2025-12-01
version: "1.0"
author: "JWA Team"
description: "Brief description of the newsletter content"
excerpt: "Short excerpt that appears on the newsletters listing page"
featured: false
layout: ~/layouts/Markdown.astro
---
```

### Frontmatter Fields Explained

- **title** (required) - Full title of the newsletter
- **date** (required) - Publication date (YYYY-MM-DD format)
- **version** (optional) - Version number, usually "1.0"
- **author** (optional) - Author name(s)
- **description** (optional) - Meta description for SEO
- **excerpt** (optional) - Short summary shown on listing page
- **featured** (optional) - Set to `true` to feature on homepage
- **layout** (required) - Always use `~/layouts/Markdown.astro`

### Example Frontmatter

```markdown
---
title: "December 2025 Newsletter - Year in Review"
date: 2025-12-01
version: "1.0"
author: "JWA Team"
description: "A look back at 2025 and what we accomplished together"
excerpt: "2025 was a year of growth and progress for the JPMC Workers Alliance. Here's what we achieved together."
featured: true
layout: ~/layouts/Markdown.astro
---
```

## Step 3: Write the Content

After the frontmatter, write your newsletter content in Markdown:

```markdown
---
title: "December 2025 Newsletter - Year in Review"
date: 2025-12-01
layout: ~/layouts/Markdown.astro
---

# Happy December!

Welcome to the December newsletter! This month we're looking back at everything we accomplished in 2025.

## Major Accomplishments

- Organized our first major event
- Grew membership by 200%
- Published 12 newsletters
- Launched new resources section

## What's Next?

Looking ahead to 2026, we're planning:

1. More in-person events
2. Expanded organizing efforts
3. New resource materials
4. Continued growth

**Thank you** for being part of this movement!

-- The JWA Team
```

## Step 4: Newsletter Structure

While there's no required structure, here's a common pattern:

### Opening

```markdown
# Happy [Month]!

Welcome message or introduction from the editor.
```

### Sections

Use headings to organize content:

```markdown
## Section Title

Content for this section.

### Subsection

More detailed content.
```

### Closing

```markdown
**What's next?**

Call to action or upcoming events.

-- [Author Name]
```

## Step 5: Formatting Tips

### Use Headings for Structure

```markdown
# Main Title (H1 - only one per newsletter)
## Section Heading (H2)
### Subsection (H3)
```

### Emphasize Important Text

```markdown
**Bold text** for emphasis
*Italic text* for subtle emphasis
```

### Create Lists

```markdown
- Bullet point 1
- Bullet point 2
- Bullet point 3

1. Numbered item 1
2. Numbered item 2
3. Numbered item 3
```

### Add Links

```markdown
[Link text](https://example.com)
[Internal link](/mission)
```

### Add Images

```markdown
![Alt text](/images/poster.png)
```

## Real Example

Let's look at a real newsletter. Open `src/pages/newsletters/2025-05.md` to see the structure.

Key things to notice:
- Clear frontmatter with all fields
- Well-organized sections with headings
- Mix of text, lists, and links
- Personal voice and tone
- Call to action at the end

## Step 6: Save and Commit

### On GitHub:

1. Scroll to bottom
2. Write commit message: "Add December 2025 newsletter"
3. Click "Commit new file"

### Locally:

```bash
git add src/pages/newsletters/2025-12.md
git commit -m "Add December 2025 newsletter"
git push
```

## Step 7: Verify

After your newsletter is merged:

1. Wait a few minutes for the site to rebuild
2. Visit `https://jpmcworkers.com/newsletters`
3. Your newsletter should appear at the top (newest first)
4. Click on it to view the full content

## Common Patterns

### Monthly Greeting

```markdown
# Happy [Month]!

To the members, supporters, and hangers-on of the JPMC Workers Alliance...
```

### Event Announcements

```markdown
## Upcoming Events

**Pizza Party - December 15th**
Join us for pizza and organizing in the 2J wing at 5 PM.
```

### Member Stories

```markdown
## Member Spotlight

*This section features stories from our members.*

I worked at JPMC for five years and experienced...
```

### Call to Action

```markdown
**What's next?**

If you'd like to get involved, [join us](/join-us) or email us at...
```

## Best Practices

### 1. Write Clear, Engaging Headlines

```markdown
# ✅ Good: "December 2025 Newsletter - Year in Review"
# ❌ Bad: "Newsletter"
```

### 2. Use Excerpts Effectively

The excerpt appears on the listing page - make it compelling:

```markdown
excerpt: "2025 was a year of growth. Here's what we accomplished together."
```

### 3. Break Up Long Text

Use headings, lists, and paragraphs to make content scannable:

```markdown
## Section 1
Content here.

## Section 2
More content.
```

### 4. Include Calls to Action

Always end with a way for readers to get involved:

```markdown
**Want to help?** [Join us](/join-us) or email jpmcWorkers@gmail.com
```

## Troubleshooting

### Newsletter doesn't appear

- Check the date format: `YYYY-MM-DD`
- Verify the file is in `src/pages/newsletters/`
- Make sure frontmatter is correct (between `---` lines)
- Wait a few minutes for the site to rebuild

### Date sorting is wrong

- Ensure date is in `YYYY-MM-DD` format
- Check for typos in the date field
- Verify the file name matches the date (optional but recommended)

### Formatting looks wrong

- Check Markdown syntax
- Make sure headings use `#` correctly
- Verify lists use `-` or numbers correctly
- Check that links are formatted properly

## Next Steps

- **[Adding Resources](03-adding-resources.md)** - Create resource pages
- **[Formatting Content](04-formatting-content.md)** - Master Markdown

## Related Documentation

- [Frontmatter Schemas Reference](../../reference/content-editors/frontmatter-schemas.md)
- [Markdown Syntax Reference](../../reference/content-editors/markdown-syntax.md)
- [How to Add Newsletter](../../how-to-guides/content-editors/add-newsletter.md)

