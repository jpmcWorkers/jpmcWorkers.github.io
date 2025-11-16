# Content Editor Setup

**Type:** Tutorial  
**Audience:** Content Editors  
**Prerequisites:** Basic computer skills, GitHub account

## What You'll Learn

By the end of this tutorial, you'll have:
- Set up your environment to edit content
- Cloned the repository (or understand how to edit online)
- Learned the basics of Markdown
- Made your first content edit

## Two Ways to Edit Content

You can edit content in two ways:

### Option 1: Edit on GitHub (Easiest)

No setup required! Just edit files directly on GitHub:

1. Go to the file you want to edit on GitHub
2. Click the pencil icon (✏️) to edit
3. Make your changes
4. Commit the changes
5. Create a pull request

**Best for:** Quick edits, small changes, non-technical users

### Option 2: Edit Locally (More Control)

Edit files on your computer with a code editor:

1. Clone the repository
2. Install a code editor
3. Make changes locally
4. Test changes
5. Push to GitHub

**Best for:** Larger edits, multiple files, previewing changes

## Option 1: Editing on GitHub

### Step 1: Find the File

1. Go to `https://github.com/jpmcWorkers/workers.github.io`
2. Navigate to the file you want to edit
   - Newsletters: `src/pages/newsletters/`
   - Resources: `src/pages/content/`

### Step 2: Edit the File

1. Click the pencil icon (✏️) in the top right
2. Make your changes in the editor
3. Scroll down to "Commit changes"
4. Write a brief description of your changes
5. Click "Commit changes"

### Step 3: Create a Pull Request

1. After committing, you'll see a banner suggesting a pull request
2. Click "Compare & pull request"
3. Fill in the description
4. Click "Create pull request"

Your changes will be reviewed and merged!

## Option 2: Editing Locally

### Step 1: Install Prerequisites

You'll need:
- **Git** - [Download here](https://git-scm.com/)
- **A code editor** - We recommend [VS Code](https://code.visualstudio.com/) (free)

### Step 2: Clone the Repository

1. Open a terminal (Command Prompt on Windows, Terminal on Mac)
2. Navigate to where you want the project:
```bash
cd ~/Documents  # or wherever you want it
```

3. Clone the repository:
```bash
git clone https://github.com/jpmcWorkers/workers.github.io.git
cd workers.github.io
```

### Step 3: Install VS Code (Recommended)

1. Download VS Code from [code.visualstudio.com](https://code.visualstudio.com/)
2. Install it
3. Open the project folder in VS Code:
   - File → Open Folder
   - Select the `workers.github.io` folder

### Step 4: Install Markdown Extension

VS Code has built-in Markdown support, but you can enhance it:

1. Open VS Code
2. Click the Extensions icon (or press `Ctrl+Shift+X`)
3. Search for "Markdown All in One"
4. Click Install

## Understanding Markdown

Markdown is a simple way to format text. Here are the basics:

### Headings

```markdown
# Heading 1 (largest)
## Heading 2
### Heading 3
```

### Text Formatting

```markdown
**bold text**
*italic text*
`code text`
```

### Lists

```markdown
- Item 1
- Item 2
- Item 3

1. First item
2. Second item
3. Third item
```

### Links

```markdown
[Link text](https://example.com)
```

### Images

```markdown
![Alt text](/path/to/image.png)
```

## Your First Edit

Let's make a simple test edit to verify everything works.

### If Editing on GitHub:

1. Go to any `.md` file in `src/pages/content/`
2. Click the pencil icon
3. Add a comment at the top: `<!-- Test edit by [Your Name] -->`
4. Commit the change

### If Editing Locally:

1. Open `src/pages/content/qa.md` (or any content file)
2. Add a comment at the top: `<!-- Test edit by [Your Name] -->`
3. Save the file
4. Commit and push:
```bash
git add .
git commit -m "Test edit"
git push
```

## Previewing Changes (Local Only)

If you're editing locally, you can preview changes:

1. Install Node.js: [nodejs.org](https://nodejs.org/)
2. In the project folder, run:
```bash
npm install
npm run dev
```

3. Open `http://localhost:4321` in your browser
4. Navigate to your edited page to see changes

**Note:** This is optional - you can also just edit and let the automated tests check everything.

## File Organization

Content files are organized like this:

```
src/pages/
├── newsletters/          # Newsletter files
│   ├── 2025-05.md
│   ├── 2025-06.md
│   └── ...
└── content/              # Resource pages
    ├── qa.md
    ├── mission.md
    └── ...
```

## Next Steps

Now that you're set up:

- **[Adding a Newsletter](02-adding-a-newsletter.md)** - Create your first newsletter
- **[Adding Resources](03-adding-resources.md)** - Create resource pages
- **[Formatting Content](04-formatting-content.md)** - Master Markdown formatting

## Troubleshooting

### Can't find the edit button on GitHub

Make sure you're logged into GitHub and have write access to the repository. If you don't have access, ask a maintainer to add you.

### Git commands don't work

Make sure Git is installed:
```bash
git --version
```

If it's not installed, download from [git-scm.com](https://git-scm.com/).

### VS Code doesn't show Markdown preview

1. Open a `.md` file
2. Press `Ctrl+Shift+V` (or `Cmd+Shift+V` on Mac) to open preview
3. Or right-click the file and select "Open Preview"

## Related Documentation

- [Content Workflow](../../explanations/content-editors/content-workflow.md)
- [File Naming Conventions](../../reference/content-editors/file-naming-conventions.md)
- [Markdown Syntax Reference](../../reference/content-editors/markdown-syntax.md)

