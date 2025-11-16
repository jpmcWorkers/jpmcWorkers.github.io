# Testing Basics

**Type:** Tutorial  
**Audience:** Developers  
**Prerequisites:** Completed [Styling with Tailwind](05-styling-with-tailwind.md), basic understanding of testing concepts

## What You'll Learn

By the end of this tutorial, you'll understand:
- How testing works in this project
- How to run tests
- How to write basic tests with Playwright
- How to test links and navigation
- How to debug test failures

## Testing in This Project

This project uses **Playwright** for end-to-end testing. Playwright tests:
- Run in real browsers
- Test the actual built website
- Verify links work correctly
- Check for accessibility issues
- Validate page structure

## Why We Test

Testing ensures:
- **No broken links** - All internal and external links work
- **Consistent structure** - Pages render correctly
- **Accessibility** - Basic accessibility checks pass
- **Regression prevention** - Changes don't break existing features

## Running Tests

### Prerequisites

Before running tests, you need to:

1. **Build the site:**
```bash
npm run build
```

2. **Install Playwright browsers** (first time only):
```bash
npx playwright install
```

### Basic Test Commands

```bash
# Run all tests
npm run test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests with visible browser
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run only link validation tests
npm run test:links

# View test reports
npm run test:report
```

## Understanding Test Structure

Let's look at an existing test. Open `tests/link-validation.spec.js`:

```javascript
import { test, expect } from '@playwright/test';

test('Desktop overall Linkage', async ({ page, isMobile }) => {
  // Skip on mobile
  test.skip(isMobile, 'Skip mobile for now');
  
  // Navigate to homepage
  await page.goto('http://localhost:4321/');
  
  // Check sidebar navigation structure
  await expect(page.getByLabel('Sidebar navigation'))
    .toMatchAriaSnapshot(`
      - navigation:
        - heading "Navigation" [level=3]
        - list:
          - listitem:
            - link "Start Here":
              - /url: /
    `);
});
```

**Key concepts:**
- `test()` - Defines a test case
- `page` - Represents the browser page
- `expect()` - Assertions (what we're checking)
- `await` - Wait for async operations

## Writing Your First Test

Let's create a simple test. Create `tests/my-first-test.spec.js`:

```javascript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  // Navigate to homepage
  await page.goto('http://localhost:4321/');
  
  // Check that the page title is correct
  await expect(page).toHaveTitle(/JPMC Workers Alliance/);
  
  // Check that main heading exists
  const heading = page.getByRole('heading', { name: /JPMC.*WORKERS.*ALLIANCE/i });
  await expect(heading).toBeVisible();
});
```

**What this test does:**
1. Navigates to the homepage
2. Checks the page title contains "JPMC Workers Alliance"
3. Verifies the main heading is visible

## Testing Links

One of the most important tests is checking links work:

```javascript
test('all navigation links work', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  
  // Get all links in the sidebar
  const links = page.getByLabel('Sidebar navigation').getByRole('link');
  const count = await links.count();
  
  // Check each link
  for (let i = 0; i < count; i++) {
    const link = links.nth(i);
    const href = await link.getAttribute('href');
    
    // Skip external links for now
    if (href?.startsWith('http')) continue;
    
    // Click the link
    await link.click();
    
    // Verify we navigated (not a 404)
    await expect(page).not.toHaveURL(/404/);
    
    // Go back
    await page.goBack();
  }
});
```

## Testing Page Content

You can test that content appears correctly:

```javascript
test('newsletter page displays newsletters', async ({ page }) => {
  await page.goto('http://localhost:4321/newsletters');
  
  // Check page title
  await expect(page.getByRole('heading', { name: 'Newsletters' }))
    .toBeVisible();
  
  // Check that at least one newsletter card exists
  const cards = page.locator('.bg-white.p-6.rounded-lg');
  await expect(cards.first()).toBeVisible();
});
```

## Testing Forms

If you have forms, you can test them:

```javascript
test('contact form works', async ({ page }) => {
  await page.goto('http://localhost:4321/contact');
  
  // Fill in form fields
  await page.getByLabel('Name').fill('Test User');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Message').fill('Test message');
  
  // Submit form
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Check for success message
  await expect(page.getByText('Thank you')).toBeVisible();
});
```

## Common Test Patterns

### Waiting for Content

```javascript
// Wait for element to be visible
await expect(page.getByText('Loading complete')).toBeVisible();

// Wait for navigation
await page.waitForURL('**/success');

// Wait for network request
await page.waitForResponse(response => 
  response.url().includes('/api/data')
);
```

### Taking Screenshots

```javascript
test('visual regression', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  await page.screenshot({ path: 'screenshot.png' });
});
```

### Checking Accessibility

```javascript
test('page is accessible', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  
  // Check for accessibility issues
  const accessibility = await page.accessibility.snapshot();
  // Verify structure...
});
```

## Debugging Tests

### Using UI Mode

The easiest way to debug is using UI mode:

```bash
npm run test:ui
```

This opens an interactive interface where you can:
- See tests running in real-time
- Step through tests
- Inspect the page at any point
- See what selectors match

### Using Debug Mode

```bash
npm run test:debug
```

This runs tests in debug mode with:
- Slower execution
- Browser DevTools open
- Ability to set breakpoints

### Adding Console Logs

```javascript
test('debug test', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  
  // Log page title
  console.log('Page title:', await page.title());
  
  // Log all links
  const links = await page.$$eval('a', links => 
    links.map(link => link.href)
  );
  console.log('Links:', links);
});
```

## Test Best Practices

### 1. Test User Flows

Test what users actually do:
```javascript
test('user can navigate to newsletter', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  await page.getByRole('link', { name: 'Newsletters' }).click();
  await expect(page).toHaveURL(/\/newsletters/);
});
```

### 2. Use Semantic Selectors

Prefer semantic selectors:
```javascript
// ✅ Good - semantic
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Email')

// ❌ Avoid - fragile
page.locator('.btn-submit')
page.locator('#email-input')
```

### 3. Keep Tests Independent

Each test should work on its own:
```javascript
// ✅ Good - independent
test('test 1', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  // test...
});

// ❌ Bad - depends on previous test
test('test 2', async ({ page }) => {
  // Assumes we're already on a page
  // test...
});
```

### 4. Test Edge Cases

```javascript
test('handles empty newsletter list', async ({ page }) => {
  // Test what happens when no newsletters exist
});
```

## Hands-On Exercise

Write a test that:
1. Navigates to the newsletters page
2. Verifies at least one newsletter is displayed
3. Clicks on the first newsletter
4. Verifies the newsletter detail page loads
5. Checks that the title and content are visible

## Common Issues

### Tests Fail Because Site Isn't Built

**Error:** `net::ERR_CONNECTION_REFUSED`

**Solution:** Run `npm run build` first, then start a preview server or ensure the dev server is running.

### Tests Are Flaky

**Issue:** Tests sometimes pass, sometimes fail

**Solutions:**
- Add explicit waits: `await expect(...).toBeVisible()`
- Use `page.waitForLoadState('networkidle')`
- Increase timeout if needed

### Can't Find Element

**Error:** `Timeout waiting for selector`

**Solutions:**
- Check the selector is correct
- Verify the element actually exists
- Use `page.pause()` to inspect the page
- Try a more specific selector

## Next Steps

You've learned the basics of testing! Now explore:

- [How to Run Tests](../../how-to-guides/developers/run-tests.md) - More testing workflows
- [Testing Strategy](../../explanations/developers/testing-strategy.md) - Why we test this way
- [Testing Reference](../../reference/developers/testing-reference.md) - Complete testing API

## Related Documentation

- [Testing Reference](../../reference/developers/testing-reference.md)
- [Testing Strategy Explanation](../../explanations/developers/testing-strategy.md)
- [How to Fix Broken Links](../../how-to-guides/developers/fix-broken-links.md)

