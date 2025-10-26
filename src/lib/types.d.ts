/**
 * Frontmatter structure for thing markdown files
 */
export interface ThingFrontmatter {
	/** Display name of the thing */
	name: string;
	/** Numeric price value */
	price: number;
	price_raw?: number;

	/** ISO date string (YYYY-MM-DD) */
	date: string;
	/** Entity that paid for the thing */
	paid_by: string;
	/** Source URL for the thing */
	link: string;
}

/**
 * Complete thing data including content
 */
export interface Thing extends ThingFrontmatter {
	/** HTML content (converted from markdown) */
	content: string;
	/** URL slug */
	slug: string;
}
