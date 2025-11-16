# Testing Reference

**Type:** Reference  
**Audience:** Developers

## Test Framework

**Playwright** - End-to-end testing framework

## Test Files

- `tests/link-validation.spec.js` - Link validation tests
- `tests/visuals.spec.ts` - Visual regression tests

## Test Commands

See [Build Commands Reference](./build-commands.md#testing)

## Common Test Patterns

### Page Navigation

```javascript
await page.goto('http://localhost:4321/');
```

### Element Selection

```javascript
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Email')
page.getByText('Hello')
```

### Assertions

```javascript
await expect(element).toBeVisible();
await expect(page).toHaveTitle(/Title/);
await expect(page).toHaveURL(/path/);
```

## Related Documentation

- [Testing Basics Tutorial](../../tutorials/developers/06-testing-basics.md)
- [How to Run Tests](../../how-to-guides/developers/run-tests.md)

