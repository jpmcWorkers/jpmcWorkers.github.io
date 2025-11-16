# Getting Started

**Type:** Tutorial  
**Audience:** Developers  
**Prerequisites:** Basic familiarity with command line and Git

## What You'll Learn

By the end of this tutorial, you'll have:
- Cloned the repository
- Set up your development environment
- Installed all dependencies
- Started the development server
- Made your first small change

## Step 1: Prerequisites

Before you begin, make sure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **A code editor** - We recommend [VS Code](https://code.visualstudio.com/)
- **A GitHub account** - For cloning and contributing

### Verify Your Setup

Open a terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

```bash
node --version
npm --version
git --version
```

You should see version numbers for each. If not, install the missing tools.

## Step 2: Clone the Repository

1. Navigate to the repository on GitHub: `https://github.com/jpmcWorkers/workers.github.io`

2. Click the green "Code" button and copy the repository URL

3. Open your terminal and navigate to where you want to store the project:

```bash
cd ~/code  # or wherever you keep your projects
```

4. Clone the repository:

```bash
git clone https://github.com/jpmcWorkers/workers.github.io.git
cd workers.github.io
```

## Step 3: Install Dependencies

The project uses npm (Node Package Manager) to manage dependencies. Install them with:

```bash
npm install
```

This will:
- Download all required packages (Astro, Tailwind CSS, Playwright, etc.)
- Create a `node_modules` folder with all dependencies
- Take a few minutes the first time

**Troubleshooting:** If you get errors:
- Make sure you have Node.js 18+ installed
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
- On Windows, you might need to run the terminal as Administrator

## Step 4: Start the Development Server

Once dependencies are installed, start the development server:

```bash
npm run dev
```

You should see output like:

```
  ▲ Astro  v5.x.x
  ▶ Local    http://localhost:4321/
  ▶ Network  use --host to expose
```

Open your browser and go to `http://localhost:4321/`. You should see the JPMC Workers Alliance website!

**What's happening:** Astro is running a local development server that:
- Watches for file changes
- Automatically rebuilds when you save files
- Provides hot module replacement (changes appear instantly)

## Step 5: Make Your First Change

Let's verify everything works by making a small change:

1. Open `src/pages/index.astro` in your editor
2. Find the main heading (around line 24-30)
3. Make a small change - maybe add your name in a comment:

```astro
<!-- Edited by [Your Name] -->
<h1 class="text-4xl md:text-6xl font-bold mb-6">
```

4. Save the file
5. Check your browser - the page should automatically refresh!

**Note:** This is just for testing. Don't commit this change unless you want to.

## Step 6: Stop the Development Server

When you're done working, stop the server by pressing `Ctrl+C` (or `Cmd+C` on Mac) in the terminal.

## Understanding the Project Structure

While the server is running, let's understand what we're working with:

```
workers.github.io/
├── src/              # Source code
│   ├── components/   # Reusable UI components
│   ├── layouts/      # Page layouts
│   ├── pages/        # Website pages (routes)
│   ├── content/      # Content collections config
│   └── styles/       # Global styles
├── public/           # Static assets (images, etc.)
├── docs/             # Documentation
├── tests/            # Test files
├── package.json      # Project dependencies and scripts
└── astro.config.mjs  # Astro configuration
```

## Common Commands

Here are the commands you'll use most often:

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run test     # Run tests
```

## Next Steps

Congratulations! You've set up your development environment. Next, learn about:

- **[Understanding Astro](02-understanding-astro.md)** - Learn the basics of the Astro framework
- **[Your First Component](03-your-first-component.md)** - Build a reusable component

## Troubleshooting

### Port 4321 is already in use
If you see an error about the port being in use:
- Another process might be using it
- Stop other development servers
- Or specify a different port: `npm run dev -- --port 4322`

### Changes aren't showing up
- Make sure you saved the file
- Check the terminal for errors
- Try hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
- Restart the dev server

### npm install fails
- Check your Node.js version: `node --version` (should be 18+)
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then try again

## Related Documentation

- [Project Structure Reference](../../reference/developers/project-structure.md)
- [Build Commands Reference](../../reference/developers/build-commands.md)
- [Architecture Overview](../../explanations/developers/architecture-overview.md)

