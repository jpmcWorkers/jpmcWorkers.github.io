# Content Collections Explained

**Type:** Explanation  
**Audience:** Developers

## What Are Content Collections?

Content collections are Astro's way of managing structured content with type safety.

## How They Work

1. **Define Schema** - Use Zod to define content structure
2. **Load Content** - Astro loads files matching pattern
3. **Validate** - Content validated against schema
4. **Type Safety** - TypeScript knows content structure
5. **Query** - Simple API to get and filter content

## Benefits

### Type Safety

TypeScript knows what fields exist:
```typescript
const newsletter = await getEntry('newsletters', '2025-05');
newsletter.data.title  // ✅ TypeScript knows this exists
newsletter.data.invalid // ❌ TypeScript error
```

### Validation

Invalid content caught at build time:
- Missing required fields
- Wrong field types
- Invalid data

### Organization

Content grouped logically:
- Newsletters in one collection
- Resources in another
- Images in another

### Easy Querying

Simple API to get content:
```typescript
const newsletters = await getCollection('newsletters');
const featured = await getCollection('newsletters', ({ data }) => 
  data.featured === true
);
```

## Our Collections

- **Newsletters** - Monthly updates
- **Resources** - Informational pages
- **Images** - Media library
- **Booklets** - PDF collections

## Related Documentation

- [Content Collections Tutorial](../../tutorials/developers/04-content-collections.md)
- [Content Schemas Reference](../../reference/developers/content-schemas.md)

