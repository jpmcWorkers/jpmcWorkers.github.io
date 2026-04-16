# JPMC Workers Alliance Website

This is the repository for the [JPMC Workers Alliance website](https://jpmcWorkers.github.io), built with Astro and deployed to GitHub Pages.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

Dependency installs are gated by pnpm's `minimumReleaseAge` policy in `pnpm-workspace.yaml`, so newly published package versions must be at least 7 days old before they are eligible to install.

## Testing

The site includes comprehensive automated link validation tests using Playwright to ensure all links work correctly and no 404 errors exist.

### Test Commands

```bash
# Run all tests
pnpm run test

# Quick link check (local development)
pnpm run test:quick

# Run specific test suites
pnpm run test:links      # Link validation tests
pnpm run test:crawler    # Comprehensive crawler tests

# Interactive testing
pnpm run test:ui         # UI mode
pnpm run test:headed     # Visible browser
pnpm run test:debug      # Debug mode

# View test reports
pnpm run test:report
```

### Prerequisites for Testing

1. Build the site: `pnpm run build`
2. Install Playwright browsers: `pnpm exec playwright install`

### Automated Testing

Tests run automatically on:
- Every push to main branch
- Every pull request
- Daily at 6 AM UTC (to catch broken external links)

See [`tests/README.md`](tests/README.md) for detailed testing documentation.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

