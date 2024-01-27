<script>
	/** @type {import('./$types').PageData} */
	export let data;

	/** @param {string | number | Date} d */
	function format_date(d) {
		return new Date(d).toDateString();
	}
</script>

<svelte:head>
	<title>{data.name} | Price of Things</title>
</svelte:head>

<div class="thing">
	<h1>{data.name}</h1>
	<h2>{data.price_raw}</h2>
	{@html data.content}
	<div class="date">
		<time datetime={data.date}>{format_date(data.date)}</time>
	</div>
</div>
