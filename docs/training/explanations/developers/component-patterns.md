# Component Patterns

**Type:** Explanation  
**Audience:** Developers

## Component Design Principles

### Single Responsibility

Each component does one thing well:
- `Button` - Renders buttons
- `Card` - Displays card content
- `Layout` - Wraps pages

### Reusability

Components are reusable across pages:
- Consistent styling
- Flexible props
- Composable

### Type Safety

TypeScript interfaces define props:
- Catch errors early
- Autocomplete in editors
- Self-documenting

## Common Patterns

### Props with Defaults

```typescript
const { size = "md", color = "blue" } = Astro.props;
```

### Conditional Rendering

```astro
{href ? (
  <a href={href}>Link</a>
) : (
  <div>No link</div>
)}
```

### Slots for Content

```astro
<div>
  <slot />
</div>
```

## Component Hierarchy

- **Layouts** - Top level (header, footer)
- **Pages** - Route handlers
- **Components** - Reusable UI pieces

## Related Documentation

- [Your First Component Tutorial](../../tutorials/developers/03-your-first-component.md)
- [Component API Reference](../../reference/developers/component-api.md)

