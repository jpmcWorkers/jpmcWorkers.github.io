# Content Collections

**Type:** Tutorial  
**Audience:** Developers  
**Prerequisites:** Completed [Your First Component](03-your-first-component.md), basic understanding of TypeScript

## What You'll Learn

By the end of this tutorial, you'll understand:
- What content collections are and why we use them
- How to work with existing collections (newsletters, resources, images, booklets)
- How to query and display content from collections
- How content collections provide type safety

## What are Content Collections?

Content collections are Astro's way of managing structured content. Instead of manually importing files, you define collections with schemas, and Astro provides type-safe access to your content.

**Benefits:**
- **Type safety** - TypeScript knows what fields exist
- **Validation** - Ensures content matches the schema
- **Organization** - Groups related content together
- **Easy querying** - Simple API to get all items or filter

## Our Content Collections

This project has four content collections:

1. **Newsletters** - Monthly newsletters (`src/pages/newsletters/*.md`)
2. **Resources** - Resource pages (`src/pages/content/*.md`)
3. **Images** - Media library images (`public/images/`)
4. **Booklets** - Printable booklets (`public/booklets/`)

## Understanding the Schema

Let's look at how collections are defined. Open `src/content/config.ts`:

```typescript
const newslettersCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/pages/newsletters' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    version: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});
```

**Key parts:**
- `loader` - Where to find the files
- `schema` - What fields are required/optional (using Zod)

## Working with Newsletters

Let's see how newsletters are used. Open `src/pages/newsletters.astro`:

```astro
---
import { getCollection } from 'astro:content';

// Get all newsletters
const newsletters = await getCollection('newsletters');

// Sort by date (newest first)
const sortedNewsletters = newsletters.sort((a, b) => {
  const dateA = typeof a.data.date === 'string' ? new Date(a.data.date) : a.data.date;
  const dateB = typeof b.data.date === 'string' ? new Date(b.data.date) : b.data.date;
  return dateB.getTime() - dateA.getTime();
});
---

<div>
  {sortedNewsletters.map((newsletter) => (
    <div>
      <h3>{newsletter.data.title}</h3>
      <p>{newsletter.data.excerpt}</p>
      <p>Published: {newsletter.data.date.toLocaleDateString()}</p>
    </div>
  ))}
</div>
```

**Key concepts:**
- `getCollection('newsletters')` - Gets all items in the collection
- `newsletter.data` - Access to the frontmatter data (type-safe!)
- `newsletter.id` - The file path/ID
- `newsletter.body` - The markdown content (if needed)

## Filtering Collections

You can filter collections:

```astro
---
import { getCollection } from 'astro:content';

// Get only featured newsletters
const featuredNewsletters = await getCollection('newsletters', ({ data }) => {
  return data.featured === true;
});

// Get newsletters from a specific year
const thisYearNewsletters = await getCollection('newsletters', ({ data }) => {
  return data.date.getFullYear() === 2025;
});
---
```

## Working with Resources

Resources work similarly. Let's look at how they're used:

```astro
---
import { getCollection } from 'astro:content';

const resources = await getCollection('resources');

// Sort by order field if it exists
const sortedResources = resources.sort((a, b) => {
  const orderA = a.data.order ?? 999;
  const orderB = b.data.order ?? 999;
  return orderA - orderB;
});
---

<div>
  {sortedResources.map((resource) => (
    <div>
      <h2>{resource.data.title}</h2>
      {resource.data.description && (
        <p>{resource.data.description}</p>
      )}
      {resource.data.tags && resource.data.tags.length > 0 && (
        <div>
          {resource.data.tags.map(tag => (
            <span>{tag}</span>
          ))}
        </div>
      )}
    </div>
  ))}
</div>
```

## Getting a Single Item

To get a single item by ID:

```astro
---
import { getEntry } from 'astro:content';

// Get a specific newsletter
const newsletter = await getEntry('newsletters', '2025-05');

if (!newsletter) {
  return Astro.redirect('/404');
}
---

<h1>{newsletter.data.title}</h1>
<p>{newsletter.data.description}</p>
```

## Rendering Markdown Content

To render the markdown content from a collection entry:

```astro
---
import { getEntry } from 'astro:content';
import Layout from '~/layouts/Markdown.astro';

const newsletter = await getEntry('newsletters', '2025-05');
---

<Layout title={newsletter.data.title}>
  <article>
    <header>
      <h1>{newsletter.data.title}</h1>
      <p>Published: {newsletter.data.date.toLocaleDateString()}</p>
    </header>
    <Content />
  </article>
</Layout>
```

**Note:** The `Content` component is provided by Astro when you use `getEntry()`.

## Working with Images and Booklets

Images and booklets are handled differently - they're file-based collections:

```astro
---
import { getCollection } from 'astro:content';

const images = await getCollection('images');
const booklets = await getCollection('booklets');
---

<div>
  <h2>Images</h2>
  {images.map((image) => (
    <div>
      <img 
        src={`/images/${image.data.file}`} 
        alt={image.data.name}
        width={image.data.width}
        height={image.data.height}
      />
    </div>
  ))}
</div>

<div>
  <h2>Booklets</h2>
  {booklets.map((booklet) => (
    <div>
      <a href={`/booklets/${booklet.data.file}`}>
        {booklet.data.name}
      </a>
    </div>
  ))}
</div>
```

## Type Safety in Action

One of the best features is TypeScript autocomplete:

```typescript
const newsletters = await getCollection('newsletters');

newsletters.forEach(newsletter => {
  // TypeScript knows these fields exist!
  console.log(newsletter.data.title);  // ✅
  console.log(newsletter.data.date);   // ✅
  console.log(newsletter.data.excerpt); // ✅
  console.log(newsletter.data.invalid); // ❌ TypeScript error!
});
```

## Hands-On Exercise

Create a page that:
1. Gets all newsletters
2. Filters to show only featured ones
3. Displays them in a grid with cards
4. Shows the title, excerpt, and date for each

## Common Patterns

### Grouping by Date

```astro
---
const newsletters = await getCollection('newsletters');

// Group by year
const byYear = newsletters.reduce((acc, newsletter) => {
  const year = newsletter.data.date.getFullYear();
  if (!acc[year]) acc[year] = [];
  acc[year].push(newsletter);
  return acc;
}, {} as Record<number, typeof newsletters>);
---

{Object.entries(byYear).map(([year, items]) => (
  <section>
    <h2>{year}</h2>
    {items.map(item => (
      <div>{item.data.title}</div>
    ))}
  </section>
))}
```

### Filtering by Tags

```astro
---
const resources = await getCollection('resources');

// Get resources with a specific tag
const unionResources = resources.filter(resource => 
  resource.data.tags?.includes('union-structure')
);
---
```

## Next Steps

- **[Styling with Tailwind](05-styling-with-tailwind.md)** - Style your content displays
- **[Testing Basics](06-testing-basics.md)** - Test your pages

## Related Documentation

- [Content Collections Explained](../../explanations/developers/content-collections-explained.md)
- [Content Schemas Reference](../../reference/developers/content-schemas.md)
- [How to Add a Content Collection](../../how-to-guides/developers/add-content-collection.md)

