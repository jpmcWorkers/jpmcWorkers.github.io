# JPMC Workers Alliance Website

This is the repository for the [JPMC Workers Alliance website](https://jpmcWorkers.github.io), built with Astro and deployed to GitHub Pages.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

The site includes comprehensive automated link validation tests using Playwright to ensure all links work correctly and no 404 errors exist.

### Test Commands

```bash
# Run all tests
npm run test

# Quick link check (local development)
npm run test:quick

# Run specific test suites
npm run test:links      # Link validation tests
npm run test:crawler    # Comprehensive crawler tests

# Interactive testing
npm run test:ui         # UI mode
npm run test:headed     # Visible browser
npm run test:debug      # Debug mode

# View test reports
npm run test:report
```

### Prerequisites for Testing

1. Build the site: `npm run build`
2. Install Playwright browsers: `npx playwright install`

### Automated Testing

Tests run automatically on:
- Every push to main branch
- Every pull request
- Daily at 6 AM UTC (to catch broken external links)

See [`tests/README.md`](tests/README.md) for detailed testing documentation.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

