# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Price of Things" is a SvelteKit application that presents news-related prices in context. The project fetches data from a Google Spreadsheet and displays it as a browsable list with individual detail pages for each item.

## Common Commands

**Development:**

```bash
npm run dev          # Start development server
npm run preview      # Preview production build
npm run data         # Update data from Google Sheets (runs scripts/update.js)
```

The dev server is running at http://localhost:5173/.

**Code Quality:**

```bash
npm run check        # Run svelte-check for type checking
npm run check:watch  # Run svelte-check in watch mode
npm test             # Run tests with Vitest
npm run lint         # Check formatting with Prettier
npm run format       # Format code with Prettier
```

**Build:**

```bash
npm run build        # Build for production
```

## Architecture

**Data Pipeline:**

- Data source: Google Spreadsheet (ID: 1Mi-KbzlXclDlIQ3rHeprr4Zc2s0EYKbZG_tQ5uA3Kzg)
- `scripts/update.js` fetches from Google Sheets using Gootenberg library
- Processes each row: slugifies names, parses prices, converts Markdown content to HTML using `marked`
- Outputs to `src/lib/data.json` (sorted by date, newest first)
- Application imports this static JSON file at build time

**Routing:**

- `/` (src/routes/+page.svelte): Lists all items using the Thing component
- `/[id]-[slug]` (src/routes/[id]-[slug]/+page.svelte): Individual item detail pages
- `+page.js` loader validates ID and redirects if slug doesn't match

**Components:**

- `Thing.svelte`: Reusable component that displays name, price, content, and date
- Supports configurable heading levels via `level` prop
- Uses `svelte:element` for dynamic heading tags

**Data Structure:**
Each item in data.json has:

- `id`: Unique identifier
- `name`: Display name
- `slug`: URL-safe slug
- `price`: Numeric price value
- `price_raw`: Formatted price string (e.g., "$23,000,000,000")
- `date`: ISO date string
- `content`: HTML content (Markdown converted during data fetch)
- `paid_by`: Entity that paid
- `link`: Source URL

## Important Notes

- Data is static JSON imported at build time, not fetched at runtime
- After running `npm run data`, rebuild the app to see changes
- Tests use Vitest, configured to look for `*.test.js` and `*.spec.js` files in `src/`
- Project uses JavaScript with JSDoc type annotations (jsconfig.json)
- Python can be used for scripting. Use `uv` to manage Python dependencies.
- For manipulating frontmatter files, use [python-frontmatter](https://github.com/eyeseast/python-frontmatter)
