# Adding Resources

**Type:** Tutorial  
**Audience:** Content Editors  
**Prerequisites:** Completed [Adding a Newsletter](02-adding-a-newsletter.md)

## What You'll Learn

By the end of this tutorial, you'll be able to:
- Create new resource pages
- Understand the resource structure
- Add proper frontmatter for resources
- Organize resources with tags and ordering
- Link resources in navigation

## What are Resources?

Resources are informational pages that help visitors understand:
- Union organizing
- Workplace rights
- Common questions
- How to get involved
- Issues and topics

Examples of resources:
- Q&A pages
- Mission statements
- Issue explanations
- How-to guides
- Contact information

## Step 1: Create the Resource File

### File Naming

Resource files use descriptive names in `kebab-case`:

Examples:
- `qa.md` - Questions and Answers
- `mission.md` - Mission statement
- `carpool.md` - Carpool information
- `rto-petition-status.md` - RTO petition status

**Location:** `src/pages/content/`

### Create the File

**On GitHub:**
1. Go to `src/pages/content/`
2. Click "Add file" → "Create new file"
3. Name it `my-resource.md`

**Locally:**
1. Create: `src/pages/content/my-resource.md`
2. Open in your editor

## Step 2: Add Frontmatter

Resources use this frontmatter template:

```markdown
---
title: "Resource Title"
description: "Brief description of the resource"
order: 1
tags: ["tag1", "tag2", "tag3"]
layout: ~/layouts/Markdown.astro
---
```

### Frontmatter Fields Explained

- **title** (required) - Page title
- **description** (optional) - Brief description for SEO and listings
- **order** (optional) - Number for sorting (lower numbers appear first)
- **tags** (optional) - Array of tags for categorization
- **layout** (required) - Always use `~/layouts/Markdown.astro`

### Example Frontmatter

```markdown
---
title: "Workplace Rights FAQ"
description: "Common questions about your rights as a worker"
order: 5
tags: ["rights", "faq", "legal", "education"]
layout: ~/layouts/Markdown.astro
---
```

## Step 3: Write the Content

After frontmatter, write your content in Markdown:

```markdown
---
title: "Workplace Rights FAQ"
description: "Common questions about your rights as a worker"
order: 5
tags: ["rights", "faq", "legal"]
layout: ~/layouts/Markdown.astro
---

# Workplace Rights FAQ

## What are my rights as a worker?

You have the right to:

- Organize with coworkers
- Discuss working conditions
- File complaints about safety
- And more...

## Can I be fired for organizing?

[Answer here]

## How do I file a complaint?

[Answer here]
```

## Step 4: Understanding Tags

Tags help organize and categorize resources. Common tags include:

- `education` - Educational content
- `union-structure` - Information about unions
- `rights` - Worker rights information
- `legal` - Legal information
- `organizing` - Organizing guides
- `faq` - Frequently asked questions
- `workplace-issues` - Issues in the workplace

### Using Tags

```markdown
tags: ["education", "union-structure", "rights"]
```

Tags are used for:
- Filtering resources
- Related content suggestions
- Organization and discovery

## Step 5: Understanding Order

The `order` field controls how resources appear in listings:

```markdown
order: 1  # Appears first
order: 5  # Appears later
order: 10 # Appears even later
```

**Tips:**
- Use increments of 5 or 10 (easier to insert items later)
- Lower numbers appear first
- If no order is specified, resources are sorted alphabetically

## Real Example

Let's look at a real resource. Open `src/pages/content/qa.md`:

Notice:
- Clear, descriptive title
- Helpful description
- Well-organized content with headings
- Appropriate tags
- Order value for positioning

## Step 6: Resource Structure

While structure varies, here are common patterns:

### FAQ Format

```markdown
# Questions and Answers

## Question 1?

Answer here.

## Question 2?

Answer here.
```

### Guide Format

```markdown
# Guide Title

## Introduction

Overview of the topic.

## Step 1: First Step

Instructions here.

## Step 2: Second Step

More instructions.
```

### Information Page

```markdown
# Topic Title

## Overview

Introduction to the topic.

## Key Points

- Point 1
- Point 2
- Point 3

## Resources

Links to additional resources.
```

## Step 7: Linking Resources

Resources automatically appear in the resources section. To link to them:

```markdown
[Link text](/content/resource-name)
```

For example:
```markdown
See our [Q&A page](/content/qa) for more information.
```

## Step 8: Save and Commit

### On GitHub:

1. Scroll to bottom
2. Commit message: "Add [resource name] resource"
3. Click "Commit new file"

### Locally:

```bash
git add src/pages/content/my-resource.md
git commit -m "Add my-resource resource"
git push
```

## Step 9: Verify

After your resource is merged:

1. Wait for site rebuild
2. Visit `https://jpmcworkers.com/content`
3. Your resource should appear in the list
4. Click to view the full page

## Common Resource Types

### FAQ Pages

```markdown
---
title: "Frequently Asked Questions"
tags: ["faq", "education"]
---

# FAQ

## Question 1?
Answer.

## Question 2?
Answer.
```

### How-To Guides

```markdown
---
title: "How to Organize Your Workplace"
tags: ["organizing", "guide"]
---

# How to Organize Your Workplace

## Step 1
Instructions.

## Step 2
More instructions.
```

### Information Pages

```markdown
---
title: "Understanding Collective Bargaining"
tags: ["education", "union-structure"]
---

# Understanding Collective Bargaining

## What is it?
Explanation.

## How does it work?
More explanation.
```

## Best Practices

### 1. Write Clear Titles

```markdown
# ✅ Good: "Workplace Rights FAQ"
# ❌ Bad: "Rights"
```

### 2. Use Descriptive Descriptions

```markdown
description: "Common questions about your rights as a worker and how to exercise them"
```

### 3. Organize with Headings

Use clear heading hierarchy:
```markdown
# Main Title
## Section
### Subsection
```

### 4. Use Tags Consistently

Stick to existing tags when possible, or use clear, descriptive new tags.

### 5. Keep Content Focused

Each resource should cover one topic thoroughly.

## Troubleshooting

### Resource doesn't appear

- Check file is in `src/pages/content/`
- Verify frontmatter is correct
- Ensure layout field is set
- Wait for site rebuild

### Wrong order

- Check the `order` field
- Lower numbers appear first
- Resources without order are alphabetical

### Tags not working

- Tags should be in array format: `["tag1", "tag2"]`
- Use quotes around each tag
- Separate with commas

## Next Steps

- **[Formatting Content](04-formatting-content.md)** - Master Markdown formatting
- **[How to Update Resource Page](../../how-to-guides/content-editors/update-resource-page.md)** - Edit existing resources

## Related Documentation

- [Frontmatter Schemas Reference](../../reference/content-editors/frontmatter-schemas.md)
- [Content Types Reference](../../reference/content-editors/content-types.md)
- [How to Add Newsletter](../../how-to-guides/content-editors/add-newsletter.md)

