# JPMC Workers Alliance - Astro Theme

A modern, responsive website for the JPMC Workers Alliance built with Astro and Tailwind CSS.

## 🎨 Brand Colors

Based on the JPMC Workers Alliance logo, this theme uses:

- **JPMC Blue**: `#0066cc` - Primary brand color
- **Workers Red**: `#cc0000` - Secondary brand color  
- **Alliance Gold**: `#f4d03f` - Accent color
- **Dark**: `#1a1a1a` - Text and borders
- **Light**: `#f8f9fa` - Background

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Copy assets**:
   ```bash
   cp docs/img/96x96.png public/img/
   cp docs/img/banner.png public/img/
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
├── public/
│   └── img/           # Static images (logo, banner)
├── src/
│   ├── layouts/
│   │   └── Layout.astro  # Main layout component
│   └── pages/
│       └── index.astro   # Homepage
├── tailwind.config.mjs   # Tailwind configuration
├── astro.config.mjs      # Astro configuration
└── package.json
```

## 🎯 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Brand Consistency**: Uses official JPMC Workers Alliance colors and branding
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: Semantic HTML and ARIA labels
- **Performance**: Optimized with Astro's static site generation

## 🎨 Customization

### Colors
Edit `tailwind.config.mjs` to modify the brand colors:

```javascript
colors: {
  'jpmc': {
    'blue': '#0066cc',    // JPMC blue
    'red': '#cc0000',     // Workers red
    'gold': '#f4d03f',    // Alliance gold
    'dark': '#1a1a1a',    // Dark text
    'light': '#f8f9fa',   // Light background
  }
}
```

### Layout
The main layout is in `src/layouts/Layout.astro` and includes:
- Header with logo and navigation
- Mobile-responsive menu
- Footer with social links
- SEO meta tags

## 📱 Responsive Breakpoints

- **Mobile**: Default (320px+)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)
- **Large Desktop**: `xl:` (1280px+)

## 🔧 Development

### Adding New Pages
Create new `.astro` files in `src/pages/`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Title">
  <!-- Your content here -->
</Layout>
```

### Styling
Use Tailwind CSS classes with the custom JPMC color palette:

```html
<div class="bg-jpmc-blue text-white p-4">
  <h1 class="text-jpmc-red font-bold">Title</h1>
  <p class="text-jpmc-gold">Content</p>
</div>
```

## 🚀 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to GitHub Pages

### Netlify/Vercel
The project is ready for deployment on Netlify or Vercel with zero configuration.

## 📄 License

This project is for the JPMC Workers Alliance. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for the JPMC Workers Alliance**

