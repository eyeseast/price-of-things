<script>
	import Thing from "$lib/Thing.svelte";
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

<Thing {...data}></Thing>
