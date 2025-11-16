# How to Run Tests

**Type:** How-to Guide  
**Audience:** Developers  
**Goal:** Run and debug tests

## Quick Steps

1. Build the site: `npm run build`
2. Run tests: `npm run test`
3. View results
4. Fix any failures

## Prerequisites

Before running tests:

1. **Build the site:**
```bash
npm run build
```

2. **Install Playwright browsers** (first time only):
```bash
npx playwright install
```

## Running Tests

### Run All Tests

```bash
npm run test
```

Runs all tests and shows results in terminal.

### Run Specific Test File

```bash
npm run test tests/link-validation.spec.js
```

### Run Tests in UI Mode

Interactive interface for debugging:

```bash
npm run test:ui
```

Features:
- See tests running in real-time
- Step through tests
- Inspect page at any point
- See what selectors match

### Run Tests with Visible Browser

See the browser while tests run:

```bash
npm run test:headed
```

### Run Tests in Debug Mode

Debug with DevTools:

```bash
npm run test:debug
```

### Run Only Link Tests

```bash
npm run test:links
```

### View Test Reports

After running tests, view HTML report:

```bash
npm run test:report
```

## Understanding Test Output

### Passing Tests

```
✓ Desktop overall Linkage (2.1s)
✓ Mobile overall Linkage (1.8s)

2 passed (5.2s)
```

### Failing Tests

```
✗ Desktop overall Linkage (2.1s)
  Error: expect(received).toBeVisible()
  
  Expected: visible
  Received: hidden
```

## Debugging Test Failures

### 1. Use UI Mode

Best way to debug:

```bash
npm run test:ui
```

- See exactly what's happening
- Inspect elements
- Step through test execution

### 2. Use Debug Mode

```bash
npm run test:debug
```

- Opens browser DevTools
- Can set breakpoints
- Inspect page state

### 3. Add Console Logs

```javascript
test('my test', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  console.log('Page title:', await page.title());
  console.log('URL:', page.url());
});
```

### 4. Take Screenshots

```javascript
test('my test', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  await page.screenshot({ path: 'screenshot.png' });
});
```

### 5. Pause Execution

```javascript
test('my test', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  await page.pause();  // Pauses here for inspection
});
```

## Common Test Issues

### Site Not Built

**Error:** `net::ERR_CONNECTION_REFUSED`

**Solution:**
```bash
npm run build
npm run preview  # Or start dev server
```

### Element Not Found

**Error:** `Timeout waiting for selector`

**Solutions:**
- Check selector is correct
- Verify element exists on page
- Add wait: `await expect(...).toBeVisible()`
- Use more specific selector

### Flaky Tests

**Issue:** Tests sometimes pass, sometimes fail

**Solutions:**
- Add explicit waits
- Use `page.waitForLoadState('networkidle')`
- Increase timeout if needed
- Check for race conditions

### Port Already in Use

**Error:** Port 4321 already in use

**Solution:**
- Stop other dev servers
- Or use different port: `npm run preview -- --port 4322`

## Writing Tests

### Basic Test Structure

```javascript
import { test, expect } from '@playwright/test';

test('test name', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  await expect(page.getByRole('heading', { name: 'Title' })).toBeVisible();
});
```

### Test Organization

```javascript
test.describe('Newsletter Page', () => {
  test('displays newsletters', async ({ page }) => {
    // Test code
  });
  
  test('links work', async ({ page }) => {
    // Test code
  });
});
```

## Test Best Practices

### 1. Use Semantic Selectors

```javascript
// ✅ Good
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Email')

// ❌ Avoid
page.locator('.btn-submit')
page.locator('#email')
```

### 2. Wait Explicitly

```javascript
// ✅ Good
await expect(page.getByText('Loading complete')).toBeVisible();

// ❌ Avoid
await page.waitForTimeout(1000);  // Unreliable
```

### 3. Keep Tests Independent

Each test should work on its own without depending on others.

### 4. Clean Up

Tests should clean up after themselves (Playwright handles this automatically).

## Continuous Integration

Tests run automatically:
- On every push to main
- On every pull request
- Daily at 6 AM UTC (for external links)

## Related Documentation

- [Testing Basics Tutorial](../../tutorials/developers/06-testing-basics.md)
- [Testing Reference](../../reference/developers/testing-reference.md)
- [Testing Strategy Explanation](../../explanations/developers/testing-strategy.md)
- [How to Fix Broken Links](./fix-broken-links.md)

