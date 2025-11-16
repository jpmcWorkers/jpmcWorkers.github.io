# Styling with Tailwind CSS

**Type:** Tutorial  
**Audience:** Developers  
**Prerequisites:** Completed [Your First Component](03-your-first-component.md), basic CSS knowledge

## What You'll Learn

By the end of this tutorial, you'll be able to:
- Use Tailwind CSS utility classes
- Understand the JPMC brand color system
- Apply responsive design patterns
- Use Tailwind's typography plugin
- Follow styling conventions in this project

## What is Tailwind CSS?

Tailwind CSS is a utility-first CSS framework. Instead of writing custom CSS, you use pre-built utility classes directly in your HTML.

**Traditional CSS:**
```html
<div class="card">Content</div>
<style>
  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
</style>
```

**Tailwind CSS:**
```html
<div class="bg-white p-6 rounded-lg shadow-md">Content</div>
```

## JPMC Brand Colors

This project uses a custom color palette based on JPMC brand colors. These are defined in `src/styles/global.css`:

### Primary Colors

- **Blue** (`jpmc-blue`) - Primary brand color
  - Shades: `jpmc-blue-50` through `jpmc-blue-950`
  - Usage: Primary actions, links, headers

- **Red** (`jpmc-red`) - Secondary brand color
  - Shades: `jpmc-red-50` through `jpmc-red-950`
  - Usage: Accents, important elements

- **Gold** (`jpmc-gold`) - Accent color
  - Shades: `jpmc-gold-50` through `jpmc-gold-950`
  - Usage: Highlights, special elements

### Using Brand Colors

```astro
<div class="bg-jpmc-blue text-white p-4">
  Blue background
</div>

<div class="border-l-4 border-jpmc-red p-4">
  Red left border
</div>

<h1 class="text-jpmc-gold">
  Gold heading
</h1>
```

## Common Utility Classes

### Spacing

```astro
<!-- Padding -->
<div class="p-4">        <!-- padding: 1rem (16px) -->
<div class="px-6">       <!-- padding-left & right: 1.5rem -->
<div class="py-8">       <!-- padding-top & bottom: 2rem -->
<div class="pt-2 pb-4">  <!-- padding-top: 0.5rem, bottom: 1rem -->

<!-- Margin -->
<div class="m-4">        <!-- margin: 1rem -->
<div class="mx-auto">    <!-- margin-left & right: auto (centers) -->
<div class="mb-8">       <!-- margin-bottom: 2rem -->
```

### Colors

```astro
<!-- Background -->
<div class="bg-white">           <!-- White background -->
<div class="bg-jpmc-blue">       <!-- Brand blue -->
<div class="bg-gray-100">        <!-- Light gray -->

<!-- Text -->
<p class="text-jpmc-dark">       <!-- Dark text -->
<p class="text-gray-600">        <!-- Medium gray text -->
<p class="text-jpmc-red">        <!-- Red text -->
```

### Typography

```astro
<h1 class="text-4xl font-bold">     <!-- Large, bold -->
<h2 class="text-2xl font-semibold"> <!-- Medium, semibold -->
<p class="text-lg">                  <!-- Large text -->
<p class="text-sm text-gray-600">   <!-- Small, gray text -->
```

### Layout

```astro
<!-- Flexbox -->
<div class="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Container -->
<div class="container mx-auto px-4">
  <!-- Centered, max-width container with padding -->
</div>
```

### Borders and Shadows

```astro
<div class="border border-gray-300 rounded-lg">
  <!-- Border with rounded corners -->
</div>

<div class="border-l-4 border-jpmc-red">
  <!-- Left border accent -->
</div>

<div class="shadow-md">
  <!-- Medium shadow -->
</div>

<div class="shadow-lg rounded-lg">
  <!-- Large shadow with rounded corners -->
</div>
```

## Responsive Design

Tailwind uses mobile-first breakpoints:

```astro
<!-- Base (mobile) -->
<div class="text-sm">
  Small text on mobile
</div>

<!-- Tablet and up -->
<div class="md:text-base">
  Base text on tablet+
</div>

<!-- Desktop and up -->
<div class="lg:text-lg">
  Large text on desktop+
</div>
```

### Common Responsive Patterns

```astro
<!-- Stack on mobile, side-by-side on desktop -->
<div class="flex flex-col md:flex-row gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<!-- 1 column mobile, 2 columns tablet, 3 columns desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>

<!-- Hide on mobile, show on desktop -->
<div class="hidden md:block">
  Desktop only content
</div>
```

## Real Examples from the Project

Let's look at actual components:

### Card Component Pattern

```astro
<div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-jpmc-red">
  <h3 class="text-xl font-semibold text-jpmc-dark mb-3">
    Title
  </h3>
  <p class="text-gray-600 mb-4">
    Description
  </p>
</div>
```

**Breakdown:**
- `bg-white` - White background
- `p-6` - Padding all around (1.5rem)
- `rounded-lg` - Rounded corners
- `shadow-md` - Medium shadow
- `border-l-4 border-jpmc-red` - Red left border accent
- `text-xl font-semibold` - Large, semibold text
- `mb-3` - Margin bottom

### Button Pattern

```astro
<a href="/join-us" class="inline-flex items-center justify-center bg-jpmc-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-jpmc-blue-700 transition-colors">
  Join Us
</a>
```

**Breakdown:**
- `inline-flex items-center justify-center` - Flexbox centering
- `bg-jpmc-blue text-white` - Blue background, white text
- `px-6 py-3` - Horizontal and vertical padding
- `rounded-lg` - Rounded corners
- `hover:bg-jpmc-blue-700` - Darker blue on hover
- `transition-colors` - Smooth color transition

## Typography Plugin

We use `@tailwindcss/typography` for styled markdown content:

```astro
<article class="prose prose-lg max-w-none">
  <Content />
</article>
```

The `prose` class automatically styles markdown content with beautiful typography.

## Dark Mode (Future)

The project has dark mode support configured, though it's currently disabled. When enabled:

```astro
<div class="bg-white dark:bg-gray-800 text-jpmc-dark dark:text-gray-100">
  Adapts to dark mode
</div>
```

## Common Patterns

### Centered Container

```astro
<div class="max-w-4xl mx-auto px-4">
  <!-- Max width container, centered, with padding -->
</div>
```

### Spacing Between Sections

```astro
<section class="py-16">
  <!-- Vertical padding for section spacing -->
</section>
```

### Hover Effects

```astro
<a href="/link" class="text-jpmc-blue hover:text-jpmc-red transition-colors">
  Hover to change color
</a>
```

### Responsive Grid

```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Responsive grid layout -->
</div>
```

## Best Practices

### 1. Use Brand Colors

Always use JPMC brand colors when possible:
- ✅ `text-jpmc-blue`
- ❌ `text-blue-500`

### 2. Consistent Spacing

Use the spacing scale consistently:
- `p-4`, `p-6`, `p-8` for padding
- `gap-4`, `gap-6` for grid/flex gaps
- `mb-4`, `mb-6`, `mb-8` for margins

### 3. Mobile-First

Always design for mobile first, then add larger breakpoints:
```astro
<div class="text-sm md:text-base lg:text-lg">
```

### 4. Use Semantic HTML

Combine Tailwind with semantic HTML:
```astro
<article class="bg-white p-6 rounded-lg">
  <header>
    <h2 class="text-2xl font-bold">Title</h2>
  </header>
  <main>
    <p>Content</p>
  </main>
</article>
```

## Hands-On Exercise

Style a newsletter card component with:
1. White background with shadow
2. Red left border accent
3. Responsive layout (stacked on mobile, side-by-side on desktop)
4. Hover effect that changes the border color
5. Proper spacing and typography

## Next Steps

- **[Testing Basics](06-testing-basics.md)** - Test your styled components
- **[Component Patterns](../../explanations/developers/component-patterns.md)** - Learn more styling patterns

## Related Documentation

- [Styling System Reference](../../reference/developers/styling-system.md)
- [Styling Approach Explanation](../../explanations/developers/styling-approach.md)
- [Component API Reference](../../reference/developers/component-api.md)

