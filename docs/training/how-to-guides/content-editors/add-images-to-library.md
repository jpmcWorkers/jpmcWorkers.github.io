# How to Add Images to the Media Library

**Type:** How-to Guide  
**Audience:** Content Editors  
**Goal:** Add images to the media library

## Quick Steps

1. Add image file to `public/images/`
2. Optionally add preview image
3. Images appear automatically in media library
4. Use in content with `/images/filename.png`

## Detailed Instructions

### Step 1: Prepare Your Image

**Supported formats:**
- PNG (recommended for graphics)
- JPG/JPEG (for photos)
- WebP (modern format)
- GIF (for animations)

**Best practices:**
- Optimize images before uploading
- Use appropriate format (PNG for graphics, JPG for photos)
- Keep file sizes reasonable (< 1MB when possible)

### Step 2: Add Image File

**On GitHub:**
1. Go to `public/images/`
2. Click "Add file" → "Upload files"
3. Drag and drop or select image
4. Commit

**Locally:**
1. Copy image to `public/images/`
2. Commit:
```bash
git add public/images/my-image.png
git commit -m "Add image: my-image.png"
git push
```

### Step 3: Organize (Optional)

You can organize images in folders:

```
public/images/
  ├── posters/
  │   ├── poster-1.png
  │   └── poster-2.png
  └── logos/
      └── logo.png
```

### Step 4: Use in Content

Reference images in Markdown:

```markdown
![Alt text](/images/filename.png)
```

Or in folders:

```markdown
![Alt text](/images/posters/poster-1.png)
```

## Image Naming

**Best practices:**
- Use descriptive names: `pizza-party-poster.png`
- Use lowercase with hyphens
- Include purpose: `newsletter-header-dec-2025.png`

## Adding Preview Images

For folders, you can add a preview:

1. Create folder: `public/images/my-folder/`
2. Add main image: `public/images/my-folder/main.png`
3. Add preview: `public/images/my-folder/preview.png`

The preview will be used in the media library listing.

## Using Images

### In Markdown

```markdown
![Poster for pizza party](/images/posters/pizza-party.png)
```

### With Links

```markdown
[![Poster](/images/posters/pizza-party.png)](https://example.com)
```

### In HTML (Astro files)

```html
<img src="/images/poster.png" alt="Poster description" />
```

## Image Guidelines

### File Sizes

- Small images: < 100KB
- Medium images: < 500KB
- Large images: < 1MB (when possible)

### Dimensions

- Posters: 1500x750px or similar
- Logos: 200x200px or similar
- Photos: Optimize to reasonable size

### Alt Text

Always include descriptive alt text:

```markdown
![Description of what's in the image](/images/path.png)
```

## Troubleshooting

### Image not showing

- Check path is correct: `/images/filename.png`
- Verify file exists in `public/images/`
- Check file extension matches
- Wait for site rebuild

### Image too large

- Optimize image before uploading
- Use image compression tools
- Consider using WebP format

### Wrong format

- Convert to supported format (PNG, JPG, WebP, GIF)
- Use appropriate format for content type

## Related Documentation

- [Image Guidelines Reference](../../reference/content-editors/image-guidelines.md)
- [Content Types Reference](../../reference/content-editors/content-types.md)

