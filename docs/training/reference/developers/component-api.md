# Component API Reference

**Type:** Reference  
**Audience:** Developers

## Button Component

**File:** `src/components/Button.astro`

### Props

```typescript
interface Props {
  style?: "primary" | "secondary" | "tertiary" | "fabulous";
  color?: "blue" | "red" | "gold" | "gray" | "destructive" | "success" | "warning";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  fullWidth?: boolean;
  loading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  children: any;
}
```

### Usage

```astro
<Button href="/join-us" style="primary" color="blue">
  Join Us
</Button>
```

## Card Component

**File:** `src/components/Card.astro`

### Props

```typescript
interface Props {
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  borderColor?: "cyan" | "gold" | "blue" | "gray" | "red" | "green" | "purple" | "orange" | "pink" | "brown" | "teal" | "indigo" | "violet" | "lime";
  badges?: Array<{ text: string; color: string; bgColor: string }>;
  date?: string;
  hoverColor?: string;
  external?: boolean;
}
```

### Usage

```astro
<Card 
  title="Card Title"
  description="Card description"
  link="/page"
  borderColor="blue"
/>
```

## Layout Component

**File:** `src/layouts/Layout.astro`

### Props

```typescript
interface Props {
  title: string;
  description?: string;
}
```

### Usage

```astro
<Layout title="Page Title" description="Page description">
  <!-- Page content -->
</Layout>
```

## SocialLinks Component

**File:** `src/components/SocialLinks.astro`

### Props

```typescript
interface Props {
  title?: string;
  links?: SocialLink[];
  variant?: "sidebar" | "footer" | "contact";
  className?: string;
}
```

### Usage

```astro
<SocialLinks variant="sidebar" />
```

## Related Documentation

- [How to Create a Component](../../how-to-guides/developers/create-a-component.md)
- [Component Patterns Explanation](../../explanations/developers/component-patterns.md)

