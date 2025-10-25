#!/usr/bin/env python3
# /// script
# dependencies = [
#   "python-frontmatter",
#   "html2text",
# ]
# ///
"""
Migrate data from src/lib/data.json to individual Markdown files in content/things/
Each item becomes a Markdown file with YAML frontmatter.
"""

import json
from pathlib import Path
import frontmatter
from html2text import html2text

# Load the JSON data
data_file = Path(__file__).parent.parent / "src" / "lib" / "data.json"


def main():

    with open(data_file) as f:
        items = json.load(f)

    # Output directory
    output_dir = Path(__file__).parent.parent / "content" / "things"
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"Migrating {len(items)} items to Markdown files...")

    for item in items:
        # Extract frontmatter fields
        metadata = {
            "name": item["name"],
            "price": item["price"],
            "paid_by": item["paid_by"],
            "date": item["date"].split("T")[0],  # Convert ISO datetime to date string
            "link": item["link"],
        }

        # Convert HTML content back to Markdown
        # The content is stored as HTML in the JSON, but we want Markdown in the files
        content = item["content"]
        content_markdown = html2text(content).strip()

        # Create the frontmatter post
        post = frontmatter.Post(content_markdown, **metadata)

        # Write to file using the slug as filename
        output_file = output_dir / f"{item['slug']}.md"
        with open(output_file, "w") as f:
            f.write(frontmatter.dumps(post))

        print(f"  ✓ Created {output_file.name}")

    print(f"\nMigration complete! Created {len(items)} Markdown files in {output_dir}")


if __name__ == "__main__":
    main()
