<script>
	import prices from "$lib/data.json";

	/** @param {string | number | Date} d */
	function format_date(d) {
		return new Date(d).toDateString();
	}
</script>

<svelte:head>
	<title>Price of Things</title>
</svelte:head>

<h1>Price of Things</h1>

{#each prices as thing}
	<div class="thing">
		<h2><a href="/{thing.id}-{thing.slug}">{thing.name}</a></h2>
		<h3>{thing.price_raw}</h3>
		{@html thing.content}
		<div class="date">
			<time datetime={thing.date}>{format_date(thing.date)}</time>
		</div>
	</div>
{/each}
