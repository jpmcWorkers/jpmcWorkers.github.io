# Deployment Workflow

**Type:** Explanation  
**Audience:** Developers

## How Deployment Works

### Automatic Deployment

1. **Push to Main** - Changes pushed to `main` branch
2. **GitHub Actions** - Workflow triggered automatically
3. **Build** - Site built with `npm run build`
4. **Test** - Tests run to verify everything works
5. **Deploy** - Built site deployed to GitHub Pages
6. **Live** - Site updates in 2-5 minutes

## Deployment Platform

**GitHub Pages** - Free static site hosting:
- Serves static HTML/CSS/JS
- No server-side code
- Fast CDN delivery

## Build Process

1. Install dependencies
2. Build site (`npm run build`)
3. Run tests
4. Deploy `dist/` directory

## Static Site Generation

All pages pre-rendered at build time:
- No server needed
- Fast page loads
- Secure (no server vulnerabilities)

## Related Documentation

- [How to Deploy Changes](../../how-to-guides/developers/deploy-changes.md)
- [Deployment Config Reference](../../reference/developers/deployment-config.md)

