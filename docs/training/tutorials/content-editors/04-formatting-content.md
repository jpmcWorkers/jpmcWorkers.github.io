# Formatting Content

**Type:** Tutorial  
**Audience:** Content Editors  
**Prerequisites:** Completed [Adding Resources](03-adding-resources.md)

## What You'll Learn

By the end of this tutorial, you'll master:
- All Markdown formatting options
- How to format text, lists, and links
- How to add images and code blocks
- Advanced formatting techniques
- Common formatting patterns

## Markdown Basics

Markdown is a simple way to format text using plain text characters. It's easy to read and write.

## Text Formatting

### Bold and Italic

```markdown
**bold text** or __bold text__
*italic text* or _italic text_
***bold and italic*** or ___bold and italic___
```

**Result:**
- **bold text**
- *italic text*
- ***bold and italic***

### Strikethrough

```markdown
~~strikethrough text~~
```

**Result:** ~~strikethrough text~~

### Inline Code

```markdown
Use `code` for technical terms or file names.
```

**Result:** Use `code` for technical terms.

## Headings

Headings create document structure:

```markdown
# Heading 1 (largest)
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6 (smallest)
```

**Best Practice:** Use only one H1 per page (the main title).

## Lists

### Unordered Lists (Bullets)

```markdown
- Item 1
- Item 2
- Item 3

Or using asterisks:
* Item 1
* Item 2
* Item 3
```

**Result:**
- Item 1
- Item 2
- Item 3

### Ordered Lists (Numbers)

```markdown
1. First item
2. Second item
3. Third item
```

**Result:**
1. First item
2. Second item
3. Third item

### Nested Lists

```markdown
- Main item
  - Sub-item 1
  - Sub-item 2
- Another main item
  1. Numbered sub-item
  2. Another numbered sub-item
```

**Result:**
- Main item
  - Sub-item 1
  - Sub-item 2
- Another main item
  1. Numbered sub-item
  2. Another numbered sub-item

## Links

### Basic Links

```markdown
[Link text](https://example.com)
```

**Result:** [Link text](https://example.com)

### Links with Titles

```markdown
[Link text](https://example.com "Hover text")
```

### Internal Links

```markdown
[About Us](/mission)
[Newsletters](/newsletters)
[Q&A](/content/qa)
```

### Reference-Style Links

```markdown
[Link text][reference]

[reference]: https://example.com
```

## Images

### Basic Images

```markdown
![Alt text](/images/poster.png)
```

### Images with Links

```markdown
[![Alt text](/images/poster.png)](https://example.com)
```

### Image Best Practices

- Always include descriptive alt text
- Use relative paths: `/images/filename.png`
- Optimize images before uploading
- Use appropriate file formats (PNG for graphics, JPG for photos)

## Code Blocks

### Inline Code

```markdown
Use `npm install` to install packages.
```

### Code Blocks

Use triple backticks with optional language:

````markdown
```javascript
function hello() {
  console.log("Hello, world!");
}
```
````

**Result:**
```javascript
function hello() {
  console.log("Hello, world!");
}
```

### Supported Languages

```markdown
```bash
```javascript
```python
```html
```css
```json
```

## Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
>
> You can have paragraphs within blockquotes.
```

**Result:**
> This is a blockquote.
> It can span multiple lines.
>
> You can have paragraphs within blockquotes.

### Nested Blockquotes

```markdown
> Main quote
>> Nested quote
```

## Horizontal Rules

```markdown
---

Or

***

Or

___
```

**Result:** Creates a horizontal line

## Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
```

**Result:**

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |

### Aligned Columns

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| Left | Center | Right |
```

## Line Breaks

### Single Line Break

End a line with two spaces:
```markdown
Line 1  
Line 2
```

### Paragraph Break

Blank line between paragraphs:
```markdown
Paragraph 1

Paragraph 2
```

## Escaping Characters

Use backslash to escape special characters:

```markdown
\*not italic\*
\#not a heading
\[not a link\]\(not a url\)
```

## Common Patterns

### Callout Boxes

While not standard Markdown, you can use blockquotes:

```markdown
> **Important:** This is important information!
>
> Make sure to read this carefully.
```

### Definition Lists

```markdown
Term 1
: Definition 1

Term 2
: Definition 2
```

### Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

**Result:**
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Real-World Examples

### Newsletter Formatting

```markdown
# Happy December!

Welcome to the December newsletter!

## Major Events

**Pizza Party - December 15th**
Join us at 5 PM in the 2J wing.

**Organizing Meeting - December 20th**
Discuss next steps and strategy.

## Member Spotlight

> "Working together has made all the difference."
> -- Anonymous Member

## Resources

Check out these resources:
- [Q&A Page](/content/qa)
- [Mission Statement](/mission)
- [Join Us](/join-us)

**Questions?** Email us at jpmcWorkers@gmail.com
```

### FAQ Formatting

```markdown
# Frequently Asked Questions

## What are my rights?

You have the right to:

1. Organize with coworkers
2. Discuss working conditions
3. File safety complaints
4. And more...

## Can I be fired?

**Short answer:** No, not for organizing.

**Long answer:** [Detailed explanation...]

For more information, see [this resource](/content/rights).
```

## Best Practices

### 1. Use Consistent Heading Levels

```markdown
# Main Title (H1 - only one)
## Section (H2)
### Subsection (H3)
```

### 2. Keep Lists Consistent

Use the same bullet style throughout:
```markdown
- Item 1
- Item 2
- Item 3
```

### 3. Write Descriptive Link Text

```markdown
# ✅ Good
[Read our mission statement](/mission)

# ❌ Bad
[Click here](/mission)
```

### 4. Use Emphasis Sparingly

Too much bold/italic is hard to read:
```markdown
# ✅ Good
This is **important** information.

# ❌ Bad
This is **very** **important** **information** that you **must** read.
```

### 5. Break Up Long Paragraphs

Use headings, lists, and line breaks to make content scannable.

## Troubleshooting

### Formatting not working

- Check for typos in Markdown syntax
- Ensure proper spacing (blank lines between elements)
- Verify special characters are escaped if needed

### Lists not formatting

- Make sure there's a blank line before lists
- Check indentation for nested lists (2 spaces)
- Verify list markers (`-`, `*`, or numbers)

### Links broken

- Check URL format: `[text](url)`
- Verify internal paths start with `/`
- Test external URLs in a browser

### Images not showing

- Verify image path is correct
- Check file exists in `public/images/`
- Ensure alt text is included

## Next Steps

You've mastered Markdown formatting! Now explore:

- [How to Add Newsletter](../../how-to-guides/content-editors/add-newsletter.md)
- [How to Update Resource Page](../../how-to-guides/content-editors/update-resource-page.md)
- [Markdown Syntax Reference](../../reference/content-editors/markdown-syntax.md)

## Related Documentation

- [Markdown Syntax Reference](../../reference/content-editors/markdown-syntax.md)
- [How to Add Newsletter](../../how-to-guides/content-editors/add-newsletter.md)
- [How to Add Images](../../how-to-guides/content-editors/add-images-to-library.md)

