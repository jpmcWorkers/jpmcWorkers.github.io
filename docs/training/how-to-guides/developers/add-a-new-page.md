# How to Add a New Page

**Type:** How-to Guide  
**Audience:** Developers  
**Goal:** Create a new page on the website

## Quick Steps

1. Create a new file in `src/pages/`
2. Add frontmatter and content
3. Use the Layout component
4. Test the page
5. Commit and push

## Detailed Instructions

### Step 1: Choose the File Location

Pages use file-based routing:
- `src/pages/about.astro` → `/about`
- `src/pages/contact.astro` → `/contact`
- `src/pages/team/index.astro` → `/team`
- `src/pages/blog/[slug].astro` → `/blog/any-slug` (dynamic)

### Step 2: Create the Page File

Create a new `.astro` file in `src/pages/`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Title">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-jpmc-dark mb-4">Page Title</h1>
    <p>Page content goes here.</p>
  </div>
</Layout>
```

### Step 3: Add Content

Add your content inside the Layout component:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="About Us">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-jpmc-dark mb-4">About Us</h1>
    
    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-jpmc-blue mb-4">Our Mission</h2>
      <p class="text-gray-700 mb-4">
        Content here...
      </p>
    </section>
  </div>
</Layout>
```

### Step 4: Use Components

Import and use existing components:

```astro
---
import Layout from '../layouts/Layout.astro';
import Button from '../components/Button.astro';
import Card from '../components/Card.astro';
---

<Layout title="Page Title">
  <div class="max-w-4xl mx-auto">
    <Card 
      title="Card Title"
      description="Card description"
    />
    
    <Button href="/join-us">Join Us</Button>
  </div>
</Layout>
```

### Step 5: Test the Page

1. Start dev server: `npm run dev`
2. Visit `http://localhost:4321/your-page`
3. Verify it looks correct
4. Check responsive design (resize browser)

### Step 6: Commit and Push

```bash
git add src/pages/your-page.astro
git commit -m "Add new page: Your Page"
git push
```

## Examples

### Simple Static Page

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Contact">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-jpmc-dark mb-4">Contact Us</h1>
    <p class="text-gray-700">Email: jpmcWorkers@gmail.com</p>
  </div>
</Layout>
```

### Page with Data

```astro
---
import Layout from '../layouts/Layout.astro';

const teamMembers = [
  { name: "John", role: "Organizer" },
  { name: "Jane", role: "Coordinator" },
];
---

<Layout title="Team">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-jpmc-dark mb-4">Our Team</h1>
    
    <div class="grid md:grid-cols-2 gap-6">
      {teamMembers.map(member => (
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold">{member.name}</h3>
          <p class="text-gray-600">{member.role}</p>
        </div>
      ))}
    </div>
  </div>
</Layout>
```

## Markdown Pages

For content-heavy pages, use Markdown:

1. Create `src/pages/page-name.md`
2. Add frontmatter:

```markdown
---
title: "Page Title"
layout: ~/layouts/Markdown.astro
---

# Page Title

Content in Markdown...
```

## Dynamic Routes

For pages with parameters:

1. Create `src/pages/blog/[slug].astro`
2. Access params:

```astro
---
import Layout from '../layouts/Layout.astro';

const { slug } = Astro.params;
---

<Layout title={slug}>
  <h1>{slug}</h1>
</Layout>
```

## Troubleshooting

### Page not appearing

- Check file is in `src/pages/`
- Verify file extension is `.astro` or `.md`
- Restart dev server
- Check for syntax errors

### Layout not working

- Verify Layout import path is correct
- Check Layout component exists
- Ensure title prop is provided

### Styling issues

- Use Tailwind classes
- Check responsive classes (`md:`, `lg:`)
- Verify color classes use JPMC brand colors

## Related Documentation

- [Project Structure Reference](../../reference/developers/project-structure.md)
- [Component API Reference](../../reference/developers/component-api.md)
- [Styling System Reference](../../reference/developers/styling-system.md)

