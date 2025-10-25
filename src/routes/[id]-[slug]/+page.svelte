<script>
	import Thing from "$lib/Thing.svelte";

	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').PageData} data
	 */

	/** @type {Props} */
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.name} | Price of Things</title>
</svelte:head>

<Thing {...data}></Thing>
