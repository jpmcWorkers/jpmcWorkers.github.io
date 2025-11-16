# How to Add a Content Collection

**Type:** How-to Guide  
**Audience:** Developers  
**Goal:** Create a new content collection type

## Quick Steps

1. Define collection schema in `src/content/config.ts`
2. Create loader for content files
3. Export collection
4. Use collection in pages
5. Test

## Detailed Instructions

### Step 1: Define the Schema

Open `src/content/config.ts` and add your collection:

```typescript
import { defineCollection, z } from 'astro:content';

const myCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/pages/my-content' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});
```

### Step 2: Export the Collection

Add to the `collections` export:

```typescript
export const collections = {
  'resources': resourcesCollection,
  'newsletters': newslettersCollection,
  'myCollection': myCollection,  // Add here
};
```

### Step 3: Create Content Files

Create content files matching your loader pattern:

```
src/pages/my-content/
  ├── item-1.md
  ├── item-2.md
  └── ...
```

### Step 4: Add Frontmatter

Each content file needs frontmatter matching your schema:

```markdown
---
title: "My Item"
date: 2025-01-01
author: "Author Name"
tags: ["tag1", "tag2"]
---

Content here...
```

### Step 5: Use the Collection

Query the collection in pages:

```astro
---
import { getCollection } from 'astro:content';

const items = await getCollection('myCollection');
---

<div>
  {items.map(item => (
    <div>
      <h2>{item.data.title}</h2>
      <p>{item.data.date.toLocaleDateString()}</p>
    </div>
  ))}
</div>
```

## Complete Example

### 1. Define Collection

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/pages/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    excerpt: z.string().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  'resources': resourcesCollection,
  'newsletters': newslettersCollection,
  'blog': blogCollection,  // Add here
};
```

### 2. Create Content Files

Create `src/pages/blog/first-post.md`:

```markdown
---
title: "First Blog Post"
date: 2025-01-15
author: "John Doe"
excerpt: "This is my first blog post"
featured: true
tags: ["announcement", "update"]
---

# First Blog Post

Content here...
```

### 3. Create Listing Page

Create `src/pages/blog/index.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
const sortedPosts = posts.sort((a, b) => 
  b.data.date.getTime() - a.data.date.getTime()
);
---

<Layout title="Blog">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Blog</h1>
    
    <div class="grid gap-6">
      {sortedPosts.map(post => (
        <article class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-2">
            <a href={`/blog/${post.id}`}>{post.data.title}</a>
          </h2>
          <p class="text-gray-600 mb-4">
            {post.data.excerpt || post.data.title}
          </p>
          <div class="text-sm text-gray-500">
            By {post.data.author} on {post.data.date.toLocaleDateString()}
          </div>
        </article>
      ))}
    </div>
  </div>
</Layout>
```

### 4. Create Detail Page

Create `src/pages/blog/[slug].astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import { getEntry } from 'astro:content';

const { slug } = Astro.params;
const post = await getEntry('blog', slug);

if (!post) {
  return Astro.redirect('/404');
}
---

<Layout title={post.data.title}>
  <article class="max-w-4xl mx-auto prose">
    <header class="mb-8">
      <h1 class="text-4xl font-bold mb-4">{post.data.title}</h1>
      <div class="text-gray-600">
        By {post.data.author} on {post.data.date.toLocaleDateString()}
      </div>
    </header>
    <Content />
  </article>
</Layout>
```

## Schema Options

### Required Fields

```typescript
schema: z.object({
  title: z.string(),  // Required
  date: z.coerce.date(),  // Required
})
```

### Optional Fields

```typescript
schema: z.object({
  title: z.string(),
  description: z.string().optional(),  // Optional
  tags: z.array(z.string()).default([]),  // Optional with default
})
```

### Field Types

```typescript
schema: z.object({
  title: z.string(),
  count: z.number(),
  isActive: z.boolean(),
  date: z.coerce.date(),
  tags: z.array(z.string()),
  metadata: z.object({
    key: z.string(),
    value: z.string(),
  }),
})
```

## File-Based Collections

For non-Markdown content (like images):

```typescript
const imageCollection = defineCollection({
  loader: loadContentInDirectory(imagePath),
  schema: z.object({
    name: z.string(),
    file: z.string(),
    type: z.enum(['png', 'jpg', 'jpeg']),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
});
```

See `src/content/config.ts` for the `loadContentInDirectory` implementation.

## Filtering Collections

Filter when querying:

```astro
---
const featuredPosts = await getCollection('blog', ({ data }) => {
  return data.featured === true;
});
---
```

## Troubleshooting

### Collection not found

- Verify collection is exported in `collections`
- Check collection name matches exactly
- Restart dev server

### Schema validation errors

- Check frontmatter matches schema
- Verify required fields are present
- Check field types match (string, number, date, etc.)

### Files not loading

- Verify loader pattern matches file locations
- Check file paths are correct
- Ensure files have correct extension

## Related Documentation

- [Content Collections Tutorial](../../tutorials/developers/04-content-collections.md)
- [Content Schemas Reference](../../reference/developers/content-schemas.md)
- [Content Collections Explained](../../explanations/developers/content-collections-explained.md)

