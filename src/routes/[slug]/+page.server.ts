import type { ThingFrontmatter, Thing } from "$lib/types";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { error } from "@sveltejs/kit";
import fm from "front-matter";
import { marked } from "marked";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }): Promise<Thing> {
	const { slug } = params;
	const filePath = join(process.cwd(), "content", "things", `${slug}.md`);

	try {
		const fileContent = await readFile(filePath, "utf-8");
		const { attributes, body } = fm<ThingFrontmatter>(fileContent);

		// Convert markdown body to HTML
		const content = await marked(body);

		return {
			...attributes,
			content,
			slug,
		};
	} catch (err) {
		return error(404, {
			message: `Thing not found: ${slug}`,
		});
	}
}
