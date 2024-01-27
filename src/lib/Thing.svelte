<script>
	export let level = 1;
	export let id = "";
	export let name = "";
	export let slug = "";
	export let price = 0;
	export let price_raw = "";
	export let date = "";
	export let content = "";

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
