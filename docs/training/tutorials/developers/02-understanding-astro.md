# Understanding Astro

**Type:** Tutorial  
**Audience:** Developers  
**Prerequisites:** Completed [Getting Started](01-getting-started.md), basic HTML/CSS knowledge

## What You'll Learn

By the end of this tutorial, you'll understand:
- What Astro is and why we use it
- How Astro pages work
- The component islands architecture
- How to write Astro components
- The difference between frontmatter and template code

## What is Astro?

Astro is a modern web framework designed for content-heavy websites. It's perfect for this project because:

- **Fast by default** - Ships zero JavaScript by default
- **Component-based** - Use React, Vue, or plain HTML components
- **Content-focused** - Great for blogs, documentation, and content sites
- **Flexible** - Can add interactivity only where needed

## Astro File Structure

Astro files (`.astro`) have two parts:

1. **Frontmatter** (between `---` lines) - JavaScript/TypeScript code
2. **Template** (below frontmatter) - HTML-like markup

Here's a simple example:

```astro
---
// This is the frontmatter - JavaScript/TypeScript code runs here
const title = "Hello World";
const items = ["Item 1", "Item 2", "Item 3"];
---

<!-- This is the template - HTML with some special features -->
<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
    <ul>
      {items.map(item => <li>{item}</li>)}
    </ul>
  </body>
</html>
```

## Your First Astro Page

Let's look at a real example from the project. Open `src/pages/index.astro`:

```astro
---
import Layout from "../layouts/Layout.astro";
import { Picture } from "astro:assets";
import banner from "../img/banner.png";
import UsInTheNews from "../components/UsInTheNews.astro";
---

<Layout title="JPMC Workers Alliance">
  <!-- Page content here -->
</Layout>
```

**Key concepts:**

1. **Imports** - Import components, layouts, and assets in the frontmatter
2. **Layout component** - Wraps the page with common structure (header, footer, etc.)
3. **Props** - Pass data to components (like `title="JPMC Workers Alliance"`)

## Component Islands

Astro uses "component islands" - components are static by default, but you can add interactivity:

```astro
---
// Static component - no JavaScript shipped
import Button from "../components/Button.astro";
---

<Button href="/join-us">Join Us</Button>
```

To add interactivity, use a client directive:

```astro
---
import InteractiveComponent from "../components/InteractiveComponent.astro";
---

<!-- This component will be interactive -->
<InteractiveComponent client:load />
```

**Why this matters:** Most of our site is static (faster), but we can add interactivity only where needed.

## Working with Data

Astro pages can fetch data in the frontmatter:

```astro
---
// Fetch data at build time
const response = await fetch('https://api.example.com/data');
const data = await response.json();
---

<div>
  <h1>{data.title}</h1>
  <p>{data.description}</p>
</div>
```

In this project, we use **content collections** for data (we'll cover this in the next tutorial).

## Styling in Astro

You can style components in several ways:

### 1. Scoped Styles (Recommended)

```astro
---
// Component code
---

<div class="card">
  <h2>Title</h2>
</div>

<style>
  .card {
    background: white;
    padding: 1rem;
    border-radius: 8px;
  }
</style>
```

Styles are automatically scoped to the component.

### 2. Global Styles

```astro
---
import "../styles/global.css";
---

<div>Content</div>
```

### 3. Tailwind CSS (What we use)

```astro
---
// Component code
---

<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold">Title</h2>
</div>
```

We use Tailwind CSS throughout the project for consistent styling.

## Hands-On Exercise

Let's create a simple page to practice:

1. Create a new file: `src/pages/test.astro`

2. Add this content:

```astro
---
const name = "Your Name";
const today = new Date().toLocaleDateString();
---

<html>
  <head>
    <title>Test Page</title>
  </head>
  <body>
    <h1>Hello, {name}!</h1>
    <p>Today is {today}</p>
    <ul>
      {["Apple", "Banana", "Cherry"].map(fruit => (
        <li>{fruit}</li>
      ))}
    </ul>
  </body>
</html>
```

3. Save the file

4. Visit `http://localhost:4321/test` in your browser

You should see your test page! Try modifying the variables and see what happens.

## Key Astro Features We Use

### 1. File-based Routing

Files in `src/pages/` automatically become routes:
- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/news/index.astro` → `/news`

### 2. Layouts

We use layouts to avoid repeating header/footer code:

```astro
---
import Layout from "../layouts/Layout.astro";
---

<Layout title="Page Title">
  <p>Page content goes here</p>
</Layout>
```

### 3. Components

Reusable pieces of UI live in `src/components/`:

```astro
---
import Button from "../components/Button.astro";
---

<Button href="/join-us" style="primary">Join Us</Button>
```

## Common Patterns

### Conditional Rendering

```astro
---
const isLoggedIn = false;
---

{isLoggedIn ? (
  <p>Welcome back!</p>
) : (
  <p>Please log in</p>
)}
```

### Loops

```astro
---
const items = ["One", "Two", "Three"];
---

<ul>
  {items.map(item => (
    <li>{item}</li>
  ))}
</ul>
```

### Attributes

```astro
---
const className = "text-blue-500";
const href = "/about";
---

<a href={href} class={className}>Link</a>
```

## Next Steps

Now that you understand Astro basics:

- **[Your First Component](03-your-first-component.md)** - Build a reusable component
- **[Content Collections](04-content-collections.md)** - Work with structured content

## Related Documentation

- [Why Astro?](../../explanations/developers/why-astro.md)
- [Component Patterns](../../explanations/developers/component-patterns.md)
- [Project Structure Reference](../../reference/developers/project-structure.md)

