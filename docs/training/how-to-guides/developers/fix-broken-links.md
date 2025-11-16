# How to Fix Broken Links

**Type:** How-to Guide  
**Audience:** Developers  
**Goal:** Find and fix broken links

## Quick Steps

1. Run link tests: `npm run test:links`
2. Identify broken links from test output
3. Fix the links
4. Re-run tests to verify

## Finding Broken Links

### Run Link Tests

```bash
npm run test:links
```

This will:
- Check all internal links
- Check external links
- Report any 404s or broken links

### Test Output

You'll see output like:

```
✓ All links work (5.2s)

Or

✗ Link validation (2.1s)
  Error: Link /broken-page returned 404
```

## Common Link Issues

### Internal Links

**Problem:** Link to non-existent page

```html
<a href="/non-existent-page">Link</a>
```

**Solution:** 
- Create the page, or
- Fix the link to point to correct page

### External Links

**Problem:** External site is down or URL changed

```html
<a href="https://example.com/old-page">Link</a>
```

**Solution:**
- Update URL if it moved
- Remove link if site is down
- Use archive.org link if needed

### Relative vs Absolute Paths

**Problem:** Incorrect path format

```html
<!-- ❌ Wrong -->
<a href="about">About</a>
<a href="./about">About</a>

<!-- ✅ Correct -->
<a href="/about">About</a>
```

## Fixing Links

### Step 1: Identify the Broken Link

From test output, note:
- Which page has the broken link
- What the broken URL is
- What it should link to

### Step 2: Find the Link in Code

Search for the broken URL:

```bash
# Search in files
grep -r "broken-url" src/
```

Or search in your editor.

### Step 3: Fix the Link

Update the link to correct URL:

```astro
<!-- Before -->
<a href="/old-page">Link</a>

<!-- After -->
<a href="/new-page">Link</a>
```

### Step 4: Verify Fix

```bash
npm run test:links
```

Should now pass.

## Link Validation Script

There's also a quick link check script:

```bash
npm run test:quick
```

This runs a faster check without full browser testing.

## Common Scenarios

### Page Moved

If a page was moved:

1. Update all links to new location
2. Or add redirect (if supported)

### External Site Down

Options:
1. Remove the link temporarily
2. Update to new URL if available
3. Use archive.org link
4. Add note that link is temporarily unavailable

### Typo in URL

Simply fix the typo:

```astro
<!-- Before -->
<a href="/abot">About</a>

<!-- After -->
<a href="/about">About</a>
```

## Preventing Broken Links

### Use Constants

Define URLs in constants:

```typescript
// src/config/links.ts
export const LINKS = {
  ABOUT: '/about',
  CONTACT: '/contact',
  JOIN: '/join-us',
} as const;
```

Use in components:

```astro
---
import { LINKS } from '../config/links';
---

<a href={LINKS.ABOUT}>About</a>
```

### Validate on Build

Tests run automatically on:
- Every push
- Every pull request
- Daily at 6 AM UTC

### Check Before Committing

```bash
npm run test:links
```

## Link Testing Details

### What Gets Tested

- All `<a href="">` links
- Internal links (same domain)
- External links (other domains)
- Navigation links
- Footer links

### What's Not Tested

- JavaScript-generated links
- Links behind authentication
- Links requiring specific state

## Troubleshooting

### Test Says Link is Broken But It Works

**Possible causes:**
- External site is slow (test timeout)
- Site requires specific headers
- Site blocks automated requests

**Solution:** Check manually, may be false positive.

### Link Works But Test Fails

**Check:**
- Is site built? (`npm run build`)
- Is preview server running?
- Is URL correct in test?

### Many Links Failing

**Check:**
- Site built correctly?
- Preview server running?
- Base URL correct in tests?

## Related Documentation

- [Testing Basics Tutorial](../../tutorials/developers/06-testing-basics.md)
- [How to Run Tests](./run-tests.md)
- [Testing Reference](../../reference/developers/testing-reference.md)

