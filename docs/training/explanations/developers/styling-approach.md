# Styling Approach

**Type:** Explanation  
**Audience:** Developers

## Why Tailwind CSS?

### Utility-First

Write styles directly in HTML:
```html
<div class="bg-white p-6 rounded-lg shadow-md">
```

### Consistent Design

Pre-defined spacing, colors, and sizes ensure consistency.

### Small Bundle Size

Only used classes are included in final CSS.

### Rapid Development

No context switching between HTML and CSS files.

## JPMC Brand Colors

Custom color palette defined in `src/styles/global.css`:
- Blue (primary)
- Red (secondary)
- Gold (accent)

## Design System

### Spacing Scale

Consistent spacing: `p-4`, `p-6`, `p-8`, etc.

### Typography Scale

Consistent text sizes: `text-sm`, `text-base`, `text-lg`, etc.

### Color System

Brand colors with shades: `jpmc-blue-50` through `jpmc-blue-950`

## Responsive Design

Mobile-first approach:
- Base styles for mobile
- `md:` for tablet
- `lg:` for desktop

## Related Documentation

- [Styling with Tailwind Tutorial](../../tutorials/developers/05-styling-with-tailwind.md)
- [Styling System Reference](../../reference/developers/styling-system.md)

