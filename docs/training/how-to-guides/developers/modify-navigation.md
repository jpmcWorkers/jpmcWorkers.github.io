# How to Modify Navigation

**Type:** How-to Guide  
**Audience:** Developers  
**Goal:** Update site navigation

## Quick Steps

1. Open `src/config/navigation.ts`
2. Find the navigation section
3. Add, modify, or remove items
4. Test navigation
5. Commit changes

## Navigation Structure

Navigation is configured in `src/config/navigation.ts`:

```typescript
export const navigationConfig: Record<string, NavigationItem[]> = {
  startHere: [...],
  join: [...],
  events: [...],
  // etc.
};
```

## Adding a Navigation Item

### Step 1: Choose the Section

Navigation is organized into sections:
- `startHere` - Main entry point
- `join` - Join/get involved
- `events` - News and events
- `learn` - Educational content
- `toolkit` - Organizer tools
- `media` - Media library
- `about` - About us

### Step 2: Add the Item

Add to the appropriate section:

```typescript
export const navigationConfig = {
  startHere: [
    {
      href: "/",
      label: "Start Here",
      description: "60-second explainer"
    },
    {
      href: "/new-page",  // Add new item
      label: "New Page",
      description: "Description of new page"
    }
  ],
  // ...
};
```

### Step 3: Navigation Item Properties

```typescript
{
  href: "/path",              // Required: URL path
  label: "Display Name",      // Required: Link text
  description?: string,        // Optional: Tooltip/description
  external?: boolean,          // Optional: External link
  disabled?: boolean,          // Optional: Disable link
  skipMobile?: boolean,        // Optional: Hide on mobile
}
```

## Modifying an Existing Item

### Change Link Text

```typescript
join: [
  {
    href: "/join-us",
    label: "Join / Get Involved",  // Change this
    description: "Updated description"
  }
]
```

### Change URL

```typescript
events: [
  {
    href: "/news",  // Changed from "/events"
    label: "Events & News",
  }
]
```

### Update Description

```typescript
toolkit: [
  {
    href: "/content",
    label: "Organizer Toolkit",
    description: "Updated description here"  // Change this
  }
]
```

## Removing a Navigation Item

Simply remove the item from the array:

```typescript
// Before
media: [
  {
    href: "/image",
    label: "Media Library"
  },
  {
    href: "/booklet",
    label: "Booklets"  // Remove this
  }
]

// After
media: [
  {
    href: "/image",
    label: "Media Library"
  }
]
```

## Adding a New Section

1. Add section to `navigationConfig`:

```typescript
export const navigationConfig = {
  // ... existing sections
  newSection: [
    {
      href: "/new",
      label: "New Section",
      description: "Description"
    }
  ]
};
```

2. Add to `getSidebarNavigation()` function:

```typescript
export function getSidebarNavigation(): NavigationSection[] {
  const items: NavigationItem[] = [
    ...navigationConfig.startHere,
    // ... existing sections
    ...navigationConfig.newSection,  // Add here
  ];
  // ...
}
```

## Examples

### Add External Link

```typescript
about: [
  {
    href: "https://example.com",
    label: "External Link",
    external: true  // Marks as external
  }
]
```

### Hide on Mobile

```typescript
learn: [
  {
    href: "/issues-and-resources",
    label: "Learn the Issues",
    skipMobile: true  // Hidden on mobile
  }
]
```

### Disable Link

```typescript
myth: [
  {
    href: "/myth-busting",
    label: "Myth Busting",
    disabled: true  // Disabled (grayed out)
  }
]
```

## Testing Navigation

1. Start dev server: `npm run dev`
2. Check sidebar navigation appears
3. Verify links work
4. Test on mobile (resize browser)
5. Check disabled/skipped items behave correctly

## Footer Navigation

Footer uses a subset of navigation:

```typescript
footer: [
  {
    href: "/mission",
    label: "About Us"
  },
  // ...
]
```

Update footer separately if needed.

## Troubleshooting

### Navigation not updating

- Restart dev server
- Clear browser cache
- Check for syntax errors in `navigation.ts`
- Verify TypeScript compiles

### Link not working

- Verify `href` path is correct
- Check page exists at that path
- Ensure no typos in path
- Test link in browser

### Item not appearing

- Check section is included in `getSidebarNavigation()`
- Verify `skipMobile` isn't hiding it
- Check `disabled` isn't set
- Ensure item is in correct section

## Related Documentation

- [Navigation Config Reference](../../reference/developers/navigation-config.md)
- [Project Structure Reference](../../reference/developers/project-structure.md)

