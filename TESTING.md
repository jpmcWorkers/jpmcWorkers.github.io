# Testing Documentation

## Overview

The JPMC Workers Alliance website now includes comprehensive automated link validation tests using Playwright. These tests ensure all links work correctly, no 404 errors exist, and the site maintains high quality.

## What We've Added

### 🔧 Test Infrastructure
- **Playwright Configuration** (`playwright.config.js`)
  - Multi-browser testing (Chrome, Firefox, Safari, Mobile)
  - Automatic web server startup
  - HTML reporting with screenshots and traces
  - Optimized for CI/CD environments

### 🧪 Test Suites

#### 1. Link Validation Tests (`tests/link-validation.spec.js`)
- ✅ Homepage loads without 404 errors
- ✅ All internal pages return proper status codes
- ✅ Navigation links work correctly
- ✅ Content area links are functional
- ✅ Redirects work as expected
- ✅ External links have proper attributes
- ✅ Images and assets load correctly
- ✅ Sitemap is accessible
- ✅ Custom 404 page works

#### 2. Comprehensive Link Crawler (`tests/comprehensive-link-crawler.spec.js`)
- 🕷️ Automatically discovers all internal links
- 🧭 Tests all navigation menus (desktop, mobile, sidebar, footer)
- 📄 Validates "What Can I Do" section links
- 📊 Provides detailed reporting of broken links
- 🛡️ Prevents infinite loops with page limits

#### 3. Quick Test Script (`scripts/test-links.js`)
- ⚡ Fast local development testing
- 🔍 Simple link discovery and validation
- 📋 Summary reporting
- 🎯 Perfect for quick checks during development

### 🚀 CI/CD Integration

#### GitHub Actions Workflow (`.github/workflows/link-tests.yml`)
- **Triggers:**
  - Every push to main/master branch
  - Every pull request
  - Daily at 6 AM UTC (catches broken external links)
  - Manual workflow dispatch

- **Features:**
  - Multi-browser testing
  - Test result artifacts
  - PR comment notifications on failures
  - Separate external link checking job

### 📋 Available Commands

```bash
# Main test commands
npm run test              # Run all Playwright tests
npm run test:quick        # Quick local link check

# Specific test suites
npm run test:links        # Link validation tests only
npm run test:crawler      # Crawler tests only

# Interactive/Debug modes
npm run test:ui           # Interactive UI mode
npm run test:headed       # Visible browser mode
npm run test:debug        # Step-by-step debugging

# Reporting
npm run test:report       # View HTML test report
```

## Test Coverage

### Internal Pages Tested
- `/` (Homepage)
- `/mission`
- `/join-us`
- `/news`
- `/issues-and-resources`
- `/content`
- `/images`
- `/contact`
- `/issues`
- All redirected pages (`/qa`, `/gender`, `/aeiou`, `/join_us`)

### Link Types Validated
- **Navigation Links**: Header, sidebar, footer navigation
- **Content Links**: All links within page content
- **Button Links**: Call-to-action buttons and styled links
- **Image Links**: Banner and content images
- **External Links**: Proper attributes and security settings
- **Redirect Links**: Astro configuration redirects

### What Gets Checked
- ✅ HTTP status codes (200, 301, 302 are OK)
- ✅ No 404 error content on pages
- ✅ Page layout elements load correctly
- ✅ Images have alt text and proper dimensions
- ✅ External links have security attributes
- ✅ Redirects resolve to valid pages

## Benefits

### 🛡️ Quality Assurance
- Prevents broken links from being deployed
- Catches configuration errors early
- Ensures consistent user experience

### 🤖 Automation
- No manual link checking required
- Runs on every code change
- Daily monitoring catches external link breakage

### 📊 Visibility
- Clear test reports with screenshots
- Detailed failure information
- PR integration with automatic feedback

### 🔧 Developer Experience
- Easy local testing with `npm run test:quick`
- Multiple testing modes for different needs
- Comprehensive documentation

## Maintenance

### Adding New Pages
1. Add page path to `INTERNAL_PAGES` array in `link-validation.spec.js`
2. Update redirects test if new redirects are added
3. Run tests locally to verify

### Updating External Links
1. Update `EXTERNAL_LINKS` array if new external links are added
2. Monitor daily test runs for external link failures
3. Update or remove broken external links as needed

### Troubleshooting
- Check test reports for detailed failure information
- Use debug mode (`npm run test:debug`) to step through failures
- Review GitHub Actions logs for CI failures
- Ensure site builds successfully before running tests

## Security Considerations

- External links include `rel="noopener"` for security
- Tests don't navigate to external sites (avoiding rate limits)
- Sensitive links (Discord, etc.) are checked for attributes only
- No authentication required for public site testing

This comprehensive testing setup ensures the JPMC Workers Alliance website maintains high quality and provides a reliable experience for all visitors.
