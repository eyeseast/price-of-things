import type { Thing, ThingFrontmatter } from "$lib/types.js";

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

import fm from "front-matter";
import { marked } from "marked";

/** @type {import('./$types').PageServerLoad} */
export async function load(): Promise<{ things: Thing[] }> {
	const contentDir = join(process.cwd(), "content", "things");

	// Read all markdown files
	const files = await readdir(contentDir);
	const markdownFiles = files.filter((file) => file.endsWith(".md"));

	// Load and parse each file
	const things = await Promise.all(
		markdownFiles.map(async (filename) => {
			const filePath = join(contentDir, filename);
			const fileContent = await readFile(filePath, "utf-8");
			const { attributes, body } = fm<ThingFrontmatter>(fileContent);

			// Convert markdown body to HTML
			const content = await marked(body);

			// Extract slug from filename (remove .md extension)
			const slug = filename.replace(/\.md$/, "");

			return {
				...attributes,
				content,
				slug,
			} as Thing;
		}),
	);

	// Sort by date, newest first
	things.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { things };
}
