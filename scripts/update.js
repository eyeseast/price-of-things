#!/usr/bin/env node

/**
 * Download our data spreadsheet and turn it into usable JSON
 * https://docs.google.com/spreadsheets/d/1Mi-KbzlXclDlIQ3rHeprr4Zc2s0EYKbZG_tQ5uA3Kzg/edit#gid=0
 */

import fs from "node:fs/promises";
import Gootenberg from "gootenberg";
import { marked } from "marked";
import slugify from "slugify";

const SHEET_ID = "1Mi-KbzlXclDlIQ3rHeprr4Zc2s0EYKbZG_tQ5uA3Kzg";
const OUTPUT = "src/lib/data.json";

process.TZ = "UTC";

async function main() {
	const goot = new Gootenberg();

	await goot.auth.jwt();

	const sheet = await goot.parse.table(SHEET_ID);

	const things = sheet.things
		.map((row) => {
			return {
				...row,
				slug: slugify(row.name, { lower: true, remove: /[*+~.,()'"!:@]/g }),
				price_raw: row.price,
				price: +String(row.price).replace("$", "").replaceAll(",", ""),
				date: new Date(row.date),
				content: marked.parse(row.content),
			};
		})
		.sort((a, b) => b.date - a.date);

	return fs.writeFile(OUTPUT, JSON.stringify(things, null, 2));
}

main().catch(console.error);
