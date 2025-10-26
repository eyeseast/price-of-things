# Project Plan: Cost Archive Website

Price of things: A database or tumblelog of what things in the news cost.

This project is a lightweight, human-curated website for recording and comparing the costs of things mentioned in news stories. Each record is stored as a standalone Markdown file with YAML frontmatter. The site is generated statically using SvelteKit.

---

## Goals

- Track the cost of notable purchases, acquisitions, missions, contracts, etc.
- Keep the data **simple**, **transparent**, and **manually curated**.
- Present items in a clean, browsable website.
- Allow each item to be updated easily, one file at a time.
- Avoid databases and server-side complexity wherever possible.
- Run entirely as a **static site** if possible.

---

## Data Storage

- Each item is stored as a **Markdown file** with **YAML frontmatter**.
- Files are located in:  
  `content/things/`

### Fields stored in frontmatter:

- `name`: Display name
- `price`: Numeric price value
- `date`: ISO date string
- `paid_by`: Entity that paid
- `link`: Source URL

The markdown content is an excerpt to provide context for the price, usually from a news story.

The filename serves as a URL-safe slug and a unique ID for each thing.

### Body content:

- A quote or short summary describing the purchase or event.

### Example filename:

### Example content structure: `content/things/github-acquisition-2018.md`

```yaml
---
name: GitHub
price: 7500000000
paid_by: Microsoft
date: 2018-06-04
link: https://www.theverge.com/2018/6/4/17422788/microsoft-github-acquisition-official-deal
---
It’s easy to imagine why Microsoft would want to acquire GitHub. Microsoft killed its own GitHub competitor, Codeplex, in December and is now the top contributor to GitHub, Microsoft now has more than 1,000 employees actively pushing code to GitHub repositories.
```

## Scripting updates

I want to use a Github Action to extract data from articles I select. I might supply a title and other details, or I might have only a link. A script should use an LLM to extract cost and other details.

## Visualization

I want to visualize the cost of each thing on the site.

## Comparison

Users should be able to compare different things we've collected.
