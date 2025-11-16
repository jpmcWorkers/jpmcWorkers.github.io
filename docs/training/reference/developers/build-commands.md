# Build Commands Reference

**Type:** Reference  
**Audience:** Developers

## Development

```bash
npm run dev
```

Start development server at `http://localhost:4321/`

## Build

```bash
npm run build
```

Build site for production to `dist/` directory.

## Preview

```bash
npm run preview
```

Preview production build locally.

## Testing

```bash
npm run test              # Run all tests
npm run test:ui           # Interactive UI mode
npm run test:headed       # Visible browser
npm run test:debug        # Debug mode
npm run test:links        # Link validation only
npm run test:report       # View test reports
npm run test:quick        # Quick link check
```

## Deployment

```bash
npm run deploy
```

Builds for production (same as `npm run build`).

## Related Documentation

- [How to Run Tests](../../how-to-guides/developers/run-tests.md)
- [How to Deploy Changes](../../how-to-guides/developers/deploy-changes.md)

