// load a single thing
import { error, redirect } from "@sveltejs/kit";

import things from "$lib/data.json";

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const row = things.find((r) => r.id === params.id);

	if (!row) {
		error(404, "Not found");
	}

	if (row.slug !== params.slug) {
		redirect(302, `/${row.id}-${row.slug}`);
	}

	return row;
}
