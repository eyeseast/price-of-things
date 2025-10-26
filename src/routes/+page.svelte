<script lang="ts">
	import Thing from "$lib/Thing.svelte";

	type Props = { data: { things: import("$lib/types").Thing[] } };

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Price of Things</title>
</svelte:head>

<h1>Price of Things</h1>

{#each data.things as thing}
	<Thing level={2} {...thing} />
{/each}
