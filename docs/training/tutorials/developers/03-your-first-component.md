# Your First Component

**Type:** Tutorial  
**Audience:** Developers  
**Prerequisites:** Completed [Understanding Astro](02-understanding-astro.md)

## What You'll Learn

By the end of this tutorial, you'll be able to:
- Create a new Astro component
- Use props to make components reusable
- Style components with Tailwind CSS
- Use components in pages
- Follow component patterns used in this project

## What is a Component?

Components are reusable pieces of UI. Instead of writing the same HTML repeatedly, you create a component once and use it everywhere.

For example, instead of writing this button code multiple times:

```html
<a href="/join-us" class="bg-blue-500 text-white px-4 py-2 rounded">
  Join Us
</a>
```

You create a `Button` component and use it like:

```astro
<Button href="/join-us">Join Us</Button>
```

## Examining an Existing Component

Let's look at a real component from the project. Open `src/components/Button.astro`:

```astro
---
import { buttonVariants, type ButtonVariantProps } from './button-variants';
import { twMerge } from 'tailwind-merge';

export interface Props extends ButtonVariantProps {
  class?: string;
  href?: string;
  children: any;
}

const {
  style,
  color,
  size,
  href,
  children,
  ...rest
} = Astro.props;
---

{/* Component template */}
```

**Key parts:**
1. **Props interface** - Defines what data the component accepts
2. **Props destructuring** - Gets values from `Astro.props`
3. **Template** - The HTML/JSX that gets rendered

## Creating Your First Component

Let's create a simple `Card` component that displays content in a styled box.

### Step 1: Create the Component File

Create a new file: `src/components/MyCard.astro`

### Step 2: Define the Component

Add this code:

```astro
---
export interface Props {
  title: string;
  description?: string;
  children?: any;
}

const { title, description, children } = Astro.props;
---

<div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-jpmc-blue">
  <h3 class="text-xl font-semibold text-jpmc-dark mb-3">
    {title}
  </h3>
  {description && (
    <p class="text-gray-600 mb-4">
      {description}
    </p>
  )}
  {children && (
    <div class="text-gray-700">
      <slot />
    </div>
  )}
</div>
```

**What's happening:**
- `Props` interface defines what props the component accepts
- `title` is required (no `?`)
- `description` and `children` are optional (have `?`)
- `<slot />` renders content passed between component tags

### Step 3: Use Your Component

Create a test page: `src/pages/component-test.astro`

```astro
---
import Layout from "../layouts/Layout.astro";
import MyCard from "../components/MyCard.astro";
---

<Layout title="Component Test">
  <div class="max-w-4xl mx-auto space-y-4">
    <MyCard 
      title="Simple Card"
      description="This is a simple card component"
    />
    
    <MyCard title="Card with Content">
      <p>This card has content passed via the slot.</p>
      <ul class="list-disc list-inside mt-2">
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </MyCard>
  </div>
</Layout>
```

### Step 4: View Your Component

Visit `http://localhost:4321/component-test` to see your component in action!

## Making Components More Flexible

Let's improve our component to accept more customization:

```astro
---
export interface Props {
  title: string;
  description?: string;
  borderColor?: "blue" | "red" | "gold";
  children?: any;
}

const { 
  title, 
  description, 
  borderColor = "blue",
  children 
} = Astro.props;

const borderColorClass = {
  blue: "border-jpmc-blue",
  red: "border-jpmc-red",
  gold: "border-jpmc-gold"
}[borderColor];
---

<div class={`bg-white p-6 rounded-lg shadow-md border-l-4 ${borderColorClass}`}>
  <h3 class="text-xl font-semibold text-jpmc-dark mb-3">
    {title}
  </h3>
  {description && (
    <p class="text-gray-600 mb-4">
      {description}
    </p>
  )}
  {children && (
    <div class="text-gray-700">
      <slot />
    </div>
  )}
</div>
```

Now you can use it like:

```astro
<MyCard title="Red Card" borderColor="red">
  Content here
</MyCard>
```

## Understanding Slots

Slots let you pass content into components. There are two types:

### Default Slot

```astro
<!-- Component -->
<div>
  <slot />
</div>

<!-- Usage -->
<MyComponent>
  <p>This content goes in the slot</p>
</MyComponent>
```

### Named Slots

```astro
<!-- Component -->
<div>
  <slot name="header" />
  <slot name="body" />
  <slot name="footer" />
</div>

<!-- Usage -->
<MyComponent>
  <div slot="header">Header content</div>
  <div slot="body">Body content</div>
  <div slot="footer">Footer content</div>
</MyComponent>
```

## Styling Components

### Using Tailwind CSS (Recommended)

We use Tailwind CSS throughout the project. Use utility classes:

```astro
<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-jpmc-blue">
    Title
  </h2>
</div>
```

### Scoped Styles

For component-specific styles, use `<style>`:

```astro
<div class="card">
  <h2>Title</h2>
</div>

<style>
  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
  }
</style>
```

**Note:** Styles are automatically scoped to the component.

## Component Best Practices

### 1. Keep Components Focused

Each component should do one thing well. If a component is getting complex, break it into smaller components.

### 2. Use TypeScript for Props

Always define a `Props` interface:

```astro
---
export interface Props {
  title: string;
  count?: number;
}
---
```

### 3. Provide Default Values

Use default values for optional props:

```astro
const { size = "medium", color = "blue" } = Astro.props;
```

### 4. Use Semantic HTML

Use appropriate HTML elements:

```astro
<article class="card">
  <header>
    <h2>{title}</h2>
  </header>
  <main>
    <slot />
  </main>
</article>
```

### 5. Follow Naming Conventions

- Component files: `PascalCase.astro` (e.g., `Button.astro`)
- Props: `camelCase` (e.g., `fullWidth`, `borderColor`)
- CSS classes: Use Tailwind utilities when possible

## Real-World Example: Card Component

Let's look at the actual `Card` component in the project. Open `src/components/Card.astro`:

```astro
---
export interface Props {
  title: string;
  description?: string;
  href?: string;
  tags?: string[];
}

const { title, description, href, tags } = Astro.props;
---

<div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-jpmc-red">
  {href ? (
    <a href={href} class="block">
      <h3 class="text-xl font-semibold text-jpmc-dark mb-3 hover:text-jpmc-red transition-colors">
        {title}
      </h3>
    </a>
  ) : (
    <h3 class="text-xl font-semibold text-jpmc-dark mb-3">
      {title}
    </h3>
  )}
  {description && (
    <p class="text-gray-600 mb-4">
      {description}
    </p>
  )}
  {tags && tags.length > 0 && (
    <div class="flex flex-wrap gap-2">
      {tags.map(tag => (
        <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
          {tag}
        </span>
      ))}
    </div>
  )}
</div>
```

**Notice:**
- Conditional rendering for `href`
- Optional `tags` array with mapping
- Tailwind CSS classes
- TypeScript interface

## Hands-On Exercise

Create a `FeatureCard` component that:
1. Takes `title`, `icon` (emoji), and `description` as props
2. Displays an icon, title, and description
3. Has a hover effect
4. Uses JPMC brand colors

Then use it in a test page with 3 different feature cards.

## Next Steps

- **[Content Collections](04-content-collections.md)** - Work with structured content
- **[Styling with Tailwind](05-styling-with-tailwind.md)** - Master Tailwind CSS

## Related Documentation

- [Component API Reference](../../reference/developers/component-api.md)
- [Component Patterns](../../explanations/developers/component-patterns.md)
- [How to Create a Component](../../how-to-guides/developers/create-a-component.md)

