<script>
	import Thing from "$lib/Thing.svelte";
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
	<Thing level={2} {...thing} />
{/each}
