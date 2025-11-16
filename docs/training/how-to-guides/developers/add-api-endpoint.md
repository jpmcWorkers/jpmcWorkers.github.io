# How to Add an API Endpoint

**Type:** How-to Guide  
**Audience:** Developers  
**Goal:** Create an API route

## Important Note

This project uses **static site generation** (`output: 'static'` in `astro.config.mjs`). API endpoints require server-side rendering.

**Current setup:** Static only - API endpoints won't work.

**To use API endpoints:** Change to server mode (not recommended for GitHub Pages).

## Static Site Limitations

GitHub Pages only serves static files. API endpoints require:
- Server-side code execution
- Dynamic request handling
- Not supported on GitHub Pages

## Alternatives for Static Sites

### 1. External API

Use an external API service:
- Vercel Functions
- Netlify Functions
- Cloudflare Workers
- AWS Lambda

### 2. Client-Side Only

Handle everything in the browser:

```astro
---
// No server-side code needed
---

<script>
  // Client-side API call
  fetch('https://external-api.com/data')
    .then(res => res.json())
    .then(data => {
      // Handle data
    });
</script>
```

### 3. Build-Time Data

Fetch data at build time:

```astro
---
// Fetches at build time, not runtime
const response = await fetch('https://api.example.com/data');
const data = await response.json();
---

<div>
  {data.map(item => <div>{item.name}</div>)}
</div>
```

## If You Need API Endpoints

If you absolutely need API endpoints, you'll need to:

1. **Change to server mode** in `astro.config.mjs`:
```javascript
export default defineConfig({
  output: 'server',  // Changed from 'static'
  // ...
});
```

2. **Deploy to a platform that supports SSR:**
   - Vercel
   - Netlify
   - Cloudflare Pages
   - Not GitHub Pages

3. **Create API route** in `src/pages/api/`:

```typescript
// src/pages/api/data.ts
export async function GET() {
  return new Response(JSON.stringify({ data: 'value' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

## Current API-Like Endpoints

The project has some endpoints in `src/pages/api/` that work differently:

### Download Endpoints

These generate files at build time, not runtime.

### Image Endpoints

Similar - static generation, not dynamic API.

## Recommendation

For this project (GitHub Pages):
- Use build-time data fetching
- Use external APIs from client-side
- Avoid server-side API endpoints

## Related Documentation

- [Architecture Overview](../../explanations/developers/architecture-overview.md)
- [Deployment Workflow](../../explanations/developers/deployment-workflow.md)
- [Project Structure Reference](../../reference/developers/project-structure.md)

