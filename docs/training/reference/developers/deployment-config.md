# Deployment Configuration Reference

**Type:** Reference  
**Audience:** Developers

## Deployment Platform

**GitHub Pages** - Static site hosting

## Deployment Method

**Automatic** - Deploys on push to `main` branch via GitHub Actions

## Build Output

- Output directory: `dist/`
- Site URL: `https://jpmcworkers.github.io`

## Configuration

- Static site generation (`output: 'static'` in `astro.config.mjs`)
- No server-side rendering
- All content pre-rendered at build time

## Related Documentation

- [How to Deploy Changes](../../how-to-guides/developers/deploy-changes.md)
- [Deployment Workflow Explanation](../../explanations/developers/deployment-workflow.md)

