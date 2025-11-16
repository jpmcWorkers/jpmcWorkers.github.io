# How to Create a Component

**Type:** How-to Guide  
**Audience:** Developers  
**Goal:** Create a reusable component

## Quick Steps

1. Create file in `src/components/`
2. Define Props interface
3. Write component template
4. Style with Tailwind
5. Export and use

## Detailed Instructions

### Step 1: Create Component File

Create a new `.astro` file in `src/components/`:

**Naming:** Use PascalCase (e.g., `MyComponent.astro`)

```astro
---
// Component code here
---

<!-- Component template here -->
```

### Step 2: Define Props

Define what data the component accepts:

```astro
---
export interface Props {
  title: string;
  description?: string;
  children?: any;
}

const { title, description, children } = Astro.props;
---
```

### Step 3: Write Template

Add the HTML/JSX template:

```astro
---
export interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="bg-white p-6 rounded-lg shadow-md">
  <h3 class="text-xl font-semibold text-jpmc-dark mb-3">
    {title}
  </h3>
  {description && (
    <p class="text-gray-600">
      {description}
    </p>
  )}
</div>
```

### Step 4: Add Styling

Use Tailwind CSS classes:

```astro
<div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-jpmc-red">
  <!-- Content -->
</div>
```

### Step 5: Use the Component

Import and use in pages:

```astro
---
import Layout from '../layouts/Layout.astro';
import MyComponent from '../components/MyComponent.astro';
---

<Layout title="Page">
  <MyComponent 
    title="Component Title"
    description="Component description"
  />
</Layout>
```

## Complete Example

### Component File: `src/components/FeatureCard.astro`

```astro
---
export interface Props {
  title: string;
  icon?: string;
  description?: string;
  href?: string;
}

const { title, icon, description, href } = Astro.props;
---

<div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-jpmc-blue hover:shadow-lg transition-shadow">
  {icon && (
    <div class="text-4xl mb-4">{icon}</div>
  )}
  
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
    <p class="text-gray-600">
      {description}
    </p>
  )}
</div>
```

### Using the Component

```astro
---
import Layout from '../layouts/Layout.astro';
import FeatureCard from '../components/FeatureCard.astro';
---

<Layout title="Features">
  <div class="grid md:grid-cols-3 gap-6">
    <FeatureCard 
      title="Feature 1"
      icon="🚀"
      description="Description here"
      href="/feature-1"
    />
    <FeatureCard 
      title="Feature 2"
      icon="⭐"
      description="Another description"
    />
  </div>
</Layout>
```

## Advanced Patterns

### Using Slots

Allow content to be passed in:

```astro
---
export interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div class="card">
  <h3>{title}</h3>
  <div class="content">
    <slot />
  </div>
</div>
```

Usage:
```astro
<MyComponent title="Title">
  <p>Content goes in the slot</p>
</MyComponent>
```

### Conditional Rendering

```astro
---
export interface Props {
  showButton?: boolean;
  buttonText?: string;
}

const { showButton = false, buttonText = "Click" } = Astro.props;
---

<div>
  {showButton && (
    <button>{buttonText}</button>
  )}
</div>
```

### Default Values

```astro
---
export interface Props {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "red" | "gold";
}

const { 
  size = "md", 
  color = "blue" 
} = Astro.props;

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg"
};

const colorClasses = {
  blue: "text-jpmc-blue",
  red: "text-jpmc-red",
  gold: "text-jpmc-gold"
};
---

<div class={`${sizeClasses[size]} ${colorClasses[color]}`}>
  Content
</div>
```

## Best Practices

### 1. Single Responsibility

Each component should do one thing well:

```astro
<!-- ✅ Good: Focused component -->
<Button href="/link">Click</Button>

<!-- ❌ Bad: Too many responsibilities -->
<ButtonWithHeaderAndFooter href="/link">Click</Button>
```

### 2. Type Safety

Always define Props interface:

```astro
---
export interface Props {
  title: string;
  count?: number;
}
---
```

### 3. Use Semantic HTML

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

### 4. Follow Naming Conventions

- Files: `PascalCase.astro` (e.g., `Button.astro`)
- Props: `camelCase` (e.g., `fullWidth`, `borderColor`)

### 5. Document Props

Add comments for complex props:

```astro
---
export interface Props {
  /** Button text to display */
  label: string;
  /** URL to navigate to (optional) */
  href?: string;
  /** Button style variant */
  variant?: "primary" | "secondary";
}
---
```

## Testing Components

Test components by using them in pages:

1. Create a test page: `src/pages/component-test.astro`
2. Import and use your component
3. View at `http://localhost:4321/component-test`
4. Test different prop combinations

## Troubleshooting

### Component not rendering

- Check import path is correct
- Verify component file exists
- Check for syntax errors in component
- Ensure Props are defined correctly

### Props not working

- Verify Props interface matches usage
- Check prop names match exactly
- Ensure required props are provided
- Check TypeScript errors

### Styling issues

- Verify Tailwind classes are correct
- Check for typos in class names
- Ensure responsive classes are used correctly
- Test in different screen sizes

## Related Documentation

- [Component API Reference](../../reference/developers/component-api.md)
- [Component Patterns Explanation](../../explanations/developers/component-patterns.md)
- [Styling System Reference](../../reference/developers/styling-system.md)

