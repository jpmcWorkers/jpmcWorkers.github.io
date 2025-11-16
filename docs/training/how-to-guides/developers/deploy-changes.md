# How to Deploy Changes

**Type:** How-to Guide  
**Audience:** Developers  
**Goal:** Understand and trigger deployment

## Quick Answer

**Deployment is automatic!** When you push to the `main` branch, GitHub Actions automatically builds and deploys the site.

## How Deployment Works

1. You push changes to `main` branch
2. GitHub Actions detects the push
3. Builds the site (`npm run build`)
4. Runs tests
5. Deploys to GitHub Pages
6. Site is live in a few minutes

## Manual Deployment Steps

### Step 1: Make Your Changes

Make your code changes locally.

### Step 2: Test Locally

```bash
npm run build
npm run preview
```

Visit `http://localhost:4321` to verify everything works.

### Step 3: Run Tests

```bash
npm run test
```

Ensure all tests pass.

### Step 4: Commit and Push

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

### Step 5: Wait for Deployment

- Check GitHub Actions tab for build status
- Usually takes 2-5 minutes
- Site updates automatically when complete

## Checking Deployment Status

### On GitHub

1. Go to repository
2. Click "Actions" tab
3. See latest workflow run
4. Green checkmark = deployed successfully
5. Red X = deployment failed

### Viewing Logs

Click on a workflow run to see:
- Build logs
- Test results
- Deployment status
- Any errors

## Deployment Configuration

Deployment is configured in `.github/workflows/` (if present) or via GitHub Pages settings.

The site is deployed to: `https://jpmcworkers.github.io`

## Troubleshooting

### Deployment Failed

**Check:**
1. GitHub Actions logs for errors
2. Build errors: `npm run build` locally
3. Test failures: `npm run test` locally
4. Syntax errors in code

**Common Issues:**
- Build errors (check `npm run build`)
- Test failures (fix failing tests)
- Configuration errors (check `astro.config.mjs`)

### Changes Not Appearing

**Wait:**
- Deployment takes 2-5 minutes
- GitHub Pages may cache (wait a bit longer)

**Check:**
- Verify changes are on `main` branch
- Check GitHub Actions shows successful deployment
- Hard refresh browser (Ctrl+Shift+R)

### Rollback Changes

If you need to revert:

```bash
git revert HEAD
git push origin main
```

Or revert to specific commit:

```bash
git revert <commit-hash>
git push origin main
```

## Pre-Deployment Checklist

Before pushing to `main`:

- [ ] Code works locally (`npm run dev`)
- [ ] Site builds successfully (`npm run build`)
- [ ] Tests pass (`npm run test`)
- [ ] Preview looks good (`npm run preview`)
- [ ] No console errors
- [ ] Links work correctly
- [ ] Responsive design works

## Branch Strategy

### Working on Features

1. Create feature branch:
```bash
git checkout -b feature/my-feature
```

2. Make changes and commit:
```bash
git add .
git commit -m "Add feature"
git push origin feature/my-feature
```

3. Create pull request on GitHub
4. After review, merge to `main`
5. Deployment happens automatically

### Direct to Main

For small fixes, you can push directly to `main`:

```bash
git checkout main
git pull
# Make changes
git add .
git commit -m "Fix typo"
git push origin main
```

## Related Documentation

- [Deployment Workflow Explanation](../../explanations/developers/deployment-workflow.md)
- [Deployment Config Reference](../../reference/developers/deployment-config.md)
- [Testing Basics Tutorial](../../tutorials/developers/06-testing-basics.md)

