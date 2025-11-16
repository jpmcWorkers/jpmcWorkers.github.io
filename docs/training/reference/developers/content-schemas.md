# Content Schemas Reference

**Type:** Reference  
**Audience:** Developers

## Newsletters Collection

**Location:** `src/pages/newsletters/*.md`

### Schema

```typescript
{
  title: string;                    // Required
  date: Date;                       // Required (coerced from string)
  version?: string;                 // Optional
  author?: string;                  // Optional
  description?: string;             // Optional
  excerpt?: string;                 // Optional
  featured?: boolean;               // Optional, default: false
}
```

### Example

```markdown
---
title: "December 2025 Newsletter"
date: 2025-12-01
version: "1.0"
author: "JWA Team"
description: "Monthly newsletter"
excerpt: "Short excerpt"
featured: true
layout: ~/layouts/Markdown.astro
---
```

## Resources Collection

**Location:** `src/pages/content/*.md`

### Schema

```typescript
{
  title: string;                    // Required
  description?: string;             // Optional
  order?: number;                   // Optional
  tags?: string[];                  // Optional, default: []
}
```

### Example

```markdown
---
title: "Q&A"
description: "Frequently asked questions"
order: 1
tags: ["faq", "education"]
layout: ~/layouts/Markdown.astro
---
```

## Images Collection

**Location:** `public/images/`

### Schema

```typescript
{
  name: string;
  file: string;
  preview?: string | null;
  type: "png" | "jpg" | "jpeg" | "webp" | "gif" | "pdf" | "zip" | "mp4";
  isFolder: boolean;
  width?: number;
  height?: number;
  previewWidth?: number;
  previewHeight?: number;
}
```

## Booklets Collection

**Location:** `public/booklets/`

### Schema

```typescript
{
  name: string;
  file: string;
  preview?: string | null;
  type: "png" | "jpg" | "jpeg" | "webp" | "gif" | "pdf" | "zip" | "mp4";
  isFolder: boolean;
  width?: number;
  height?: number;
  previewWidth?: number;
  previewHeight?: number;
}
```

## Querying Collections

### Get All Items

```typescript
const items = await getCollection('collectionName');
```

### Filter Items

```typescript
const filtered = await getCollection('collectionName', ({ data }) => {
  return data.featured === true;
});
```

### Get Single Item

```typescript
const item = await getEntry('collectionName', 'item-id');
```

## Related Documentation

- [Content Collections Tutorial](../../tutorials/developers/04-content-collections.md)
- [Content Collections Explained](../../explanations/developers/content-collections-explained.md)

