<script>
	/**
	 * @typedef {Object} Props
	 * @property {number} [level]
	 * @property {string} [id]
	 * @property {string} [name]
	 * @property {string} [slug]
	 * @property {number} [price]
	 * @property {string} [price_raw]
	 * @property {string} [date]
	 * @property {string} [content]
	 */

	/** @type {Props} */
	let {
		level = 1,
		id = "",
		name = "",
		slug = "",
		price = 0,
		price_raw = "",
		date = "",
		content = "",
	} = $props();

	/** @param {string | number | Date} d */
	function format_date(d) {
		return new Date(d).toDateString();
	}

	function h(n = 1) {
		return `h${n}`;
	}
</script>

<div class="thing" data-price={price}>
	<svelte:element this={h(level)}><a href="/{id}-{slug}">{name}</a></svelte:element>
	<svelte:element this={h(level + 1)}>{price_raw}</svelte:element>
	{@html content}
	<div class="date">
		<time datetime={date}>{format_date(date)}</time>
	</div>
</div>
