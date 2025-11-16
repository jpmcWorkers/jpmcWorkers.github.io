# How to Add Booklets to the Collection

**Type:** How-to Guide  
**Audience:** Content Editors  
**Goal:** Add booklets to the booklet collection

## Quick Steps

1. Add PDF/image file to `public/booklets/`
2. Optionally add preview image
3. Booklet appears automatically in collection
4. Accessible at `/booklet` page

## Detailed Instructions

### Step 1: Prepare Booklet File

**Supported formats:**
- PDF (recommended)
- PNG, JPG (for image-based booklets)

**Best practices:**
- Optimize PDF file size
- Use clear, readable format
- Include proper metadata in PDF

### Step 2: Add Booklet File

**On GitHub:**
1. Go to `public/booklets/`
2. Click "Add file" → "Upload files"
3. Upload your booklet file
4. Commit

**Locally:**
1. Copy booklet to `public/booklets/`
2. Commit:
```bash
git add public/booklets/my-booklet.pdf
git commit -m "Add booklet: my-booklet"
git push
```

### Step 3: Organize in Folders (Recommended)

Create a folder for each booklet:

```
public/booklets/
  ├── right-to-union/
  │   ├── Right-to-Union.pdf
  │   └── preview.png (optional)
  └── organizing-guide/
      ├── organizing-guide.pdf
      └── preview.png (optional)
```

### Step 4: Add Preview (Optional)

For better display in the library:

1. Create preview image (thumbnail)
2. Name it `preview.png` (or `preview.jpg`)
3. Place in same folder as booklet

Example:
```
public/booklets/my-booklet/
  ├── my-booklet.pdf
  └── preview.png
```

## Booklet Naming

**Best practices:**
- Use descriptive folder names: `right-to-union`
- Use clear file names: `Right-to-Union.pdf`
- Keep names consistent

## Booklet Structure

Booklets are organized in folders:

```
public/booklets/
  ├── booklet-name/
  │   ├── main-file.pdf (or .png)
  │   └── preview.png (optional)
```

The system automatically:
- Detects the main file
- Uses preview if available
- Displays in the booklet collection

## Using Booklets

Booklets appear automatically on:
- `/booklet` page
- Media library (if configured)

Link to booklets:

```markdown
[Download booklet](/booklets/booklet-name/main-file.pdf)
```

## Best Practices

### File Organization

- One folder per booklet
- Clear, descriptive folder names
- Consistent naming convention

### Preview Images

- Create thumbnails for better UX
- Use PNG or JPG format
- Keep previews small (< 200KB)

### PDF Quality

- Ensure PDFs are readable
- Optimize file size
- Include proper metadata

## Troubleshooting

### Booklet not appearing

- Check file is in `public/booklets/`
- Verify file format is supported
- Wait for site rebuild
- Check folder structure is correct

### Preview not showing

- Verify preview file is named `preview.png` or `preview.jpg`
- Check preview is in same folder as main file
- Ensure preview format is supported

### File too large

- Optimize PDF file size
- Compress images if using image format
- Consider splitting into multiple booklets

## Related Documentation

- [Content Types Reference](../../reference/content-editors/content-types.md)
- [Image Guidelines Reference](../../reference/content-editors/image-guidelines.md)

