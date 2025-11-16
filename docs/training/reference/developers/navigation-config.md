# Navigation Configuration Reference

**Type:** Reference  
**Audience:** Developers

## File Location

`src/config/navigation.ts`

## Navigation Structure

```typescript
export const navigationConfig: Record<string, NavigationItem[]> = {
  startHere: NavigationItem[],
  join: NavigationItem[],
  events: NavigationItem[],
  learn: NavigationItem[],
  toolkit: NavigationItem[],
  media: NavigationItem[],
  myth: NavigationItem[],
  about: NavigationItem[],
  footer: NavigationItem[],
};
```

## NavigationItem Interface

```typescript
interface NavigationItem {
  href: string;              // Required: URL path
  label: string;             // Required: Display text
  description?: string;      // Optional: Tooltip/description
  external?: boolean;        // Optional: External link flag
  disabled?: boolean;        // Optional: Disable link
  skipMobile?: boolean;      // Optional: Hide on mobile
}
```

## Navigation Sections

### startHere

Main entry point navigation.

### join

Join/get involved section.

### events

News and events section.

### learn

Educational content section.

### toolkit

Organizer toolkit section.

### media

Media library section.

### myth

Myth busting section (currently disabled).

### about

About us section.

### footer

Footer quick links (subset of main navigation).

## Helper Functions

### getSidebarNavigation()

Returns navigation formatted for sidebar display.

### isActiveLink(currentPath, linkHref)

Checks if a link is currently active.

## Related Documentation

- [How to Modify Navigation](../../how-to-guides/developers/modify-navigation.md)

