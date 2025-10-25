<script>
	import Thing from "$lib/Thing.svelte";
	
	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').PageData} data
	 */

	/** @type {Props} */
	let { data } = $props();

	/** @param {string | number | Date} d */
	function format_date(d) {
		return new Date(d).toDateString();
	}
</script>

<svelte:head>
	<title>{data.name} | Price of Things</title>
</svelte:head>

<Thing {...data}></Thing>
