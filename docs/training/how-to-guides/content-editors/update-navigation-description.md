# How to Update Navigation Descriptions

**Type:** How-to Guide  
**Audience:** Content Editors  
**Goal:** Update navigation item descriptions

## Quick Steps

1. Open `src/config/navigation.ts`
2. Find the navigation item
3. Update the `description` field
4. Save and commit

## Detailed Instructions

### Step 1: Open Navigation Config

**On GitHub:**
1. Go to `src/config/navigation.ts`
2. Click pencil icon (✏️) to edit

**Locally:**
1. Open `src/config/navigation.ts`
2. Edit in your editor

### Step 2: Find the Item

Navigation is organized in sections:

```typescript
export const navigationConfig = {
  startHere: [...],
  join: [...],
  events: [...],
  // etc.
};
```

Find the section and item you want to update.

### Step 3: Update Description

Find the item and update the `description` field:

```typescript
// Before
{
  href: "/join-us",
  label: "Join / Get Involved",
  description: "Old description"
}

// After
{
  href: "/join-us",
  label: "Join / Get Involved",
  description: "New updated description"
}
```

### Step 4: Save and Commit

**On GitHub:**
1. Scroll to bottom
2. Commit message: "Update navigation description"
3. Commit changes

**Locally:**
```bash
git add src/config/navigation.ts
git commit -m "Update navigation description"
git push
```

## Example Updates

### Update Join Section

```typescript
join: [
  {
    href: "/join-us",
    label: "Join / Get Involved",
    description: "Join form • Volunteer roles • Become a Workplace Contact • Donate • Subscribe"
  }
]
```

### Update Events Section

```typescript
events: [
  {
    href: "/news",
    label: "Events & News",
    description: "Upcoming actions & trainings • News/press releases • Recaps"
  }
]
```

## Best Practices

### Keep Descriptions Concise

Descriptions appear as tooltips/help text - keep them short and informative.

### Use Bullet Points

Separate items with bullets (•) for clarity:

```typescript
description: "Item 1 • Item 2 • Item 3"
```

### Be Descriptive

Help users understand what they'll find:

```typescript
// ✅ Good
description: "Practical how-tos for talking with coworkers, mapping your workplace"

// ❌ Too vague
description: "Resources"
```

## Troubleshooting

### Changes not appearing

- Wait for site rebuild (2-5 minutes)
- Verify file was saved correctly
- Check for syntax errors (commas, quotes)

### Description not showing

- Verify `description` field is in the object
- Check quotes are correct
- Ensure no syntax errors

## Related Documentation

- [Navigation Config Reference](../../reference/developers/navigation-config.md)
- [How to Modify Navigation](../../how-to-guides/developers/modify-navigation.md) (for developers)

