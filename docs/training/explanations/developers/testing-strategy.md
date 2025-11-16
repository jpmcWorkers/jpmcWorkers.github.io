# Testing Strategy

**Type:** Explanation  
**Audience:** Developers

## Why We Test

- **Prevent Broken Links** - Catch 404s before deployment
- **Ensure Quality** - Verify site works correctly
- **Regression Prevention** - Changes don't break existing features

## Testing Approach

### End-to-End Testing

Playwright tests the actual built site:
- Real browser testing
- Actual user interactions
- Full page rendering

### What We Test

- **Links** - All internal and external links work
- **Navigation** - Site structure is correct
- **Content** - Pages render properly
- **Accessibility** - Basic accessibility checks

## Test Types

### Link Validation

Ensures no broken links:
- Internal links return 200
- External links are accessible
- No 404 errors

### Visual Regression

Screenshots compare visual changes (if configured).

## When Tests Run

- **On Every Push** - Catch issues early
- **On Pull Requests** - Verify changes work
- **Daily** - Check external links

## Related Documentation

- [Testing Basics Tutorial](../../tutorials/developers/06-testing-basics.md)
- [How to Run Tests](../../how-to-guides/developers/run-tests.md)

