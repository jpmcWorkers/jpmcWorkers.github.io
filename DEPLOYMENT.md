# GitHub Pages Deployment Guide

This guide will help you deploy the JPMC Workers Alliance website to GitHub Pages.

## Prerequisites

- A GitHub repository named `workers.github.io` (or your organization's repository)
- The repository must be public (for free GitHub Pages hosting)
- You must have admin access to the repository

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### 2. Push Your Code

The deployment is automatic! Simply push your code to the `main` branch:

```bash
git add .
git commit -m "Initial deployment setup"
git push origin main
```

### 3. Monitor Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow called "Deploy to GitHub Pages" running
3. Click on it to monitor the build progress
4. Once complete, you'll see a green checkmark

### 4. Access Your Site

Your site will be available at:
- **https://jpmcWorkers.github.io** (if using organization repository)
- **https://[your-username].github.io/workers.github.io** (if using personal repository)

## Manual Deployment

If you need to trigger a deployment manually:

1. Go to **Actions** tab
2. Click on **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select the branch (usually `main`)
5. Click **Run workflow**

## Troubleshooting

### Build Failures

If the build fails:

1. Check the **Actions** tab for error details
2. Common issues:
   - Missing dependencies in `package.json`
   - Syntax errors in Astro files
   - Missing files referenced in the code

### Site Not Updating

If your site isn't updating:

1. Check that the GitHub Actions workflow completed successfully
2. Wait a few minutes - GitHub Pages can take time to update
3. Clear your browser cache
4. Check the deployment URL in the Actions tab

### Custom Domain

To use a custom domain:

1. Add your domain to the **Custom domain** field in Pages settings
2. Add a `CNAME` file to your repository root with your domain
3. Configure DNS settings with your domain provider

## Configuration Files

The following files are configured for deployment:

- **`.github/workflows/deploy.yml`** - GitHub Actions workflow
- **`astro.config.mjs`** - Astro configuration with site URL
- **`package.json`** - Build scripts and dependencies

## Local Testing

Before deploying, test locally:

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

## Support

If you encounter issues:

1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review the [Astro deployment guide](https://docs.astro.build/en/guides/deploy/github/)
3. Check the Actions tab for detailed error logs 