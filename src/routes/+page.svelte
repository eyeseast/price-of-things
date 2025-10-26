<script lang="ts">
	import Thing from "$lib/Thing.svelte";

	type Props = { data: { things: import("$lib/types").Thing[] } };

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Price of Things</title>
</svelte:head>

<header class="page-header card">
	<h1>Price of Things</h1>
	<p class="tagline">When money is in the news, I always ask: Is that a lot?</p>
</header>

{#each data.things as thing}
	<Thing level={2} {...thing} />
{/each}

<style>
	.page-header {
		padding: var(--spacing-xl);
	}

	h1 {
		margin: 0 0 var(--spacing-sm) 0;
		font-size: var(--font-size-2xl);
		color: var(--color-text);
	}

	.tagline {
		margin: 0;
		color: var(--color-text-secondary);
		font-size: var(--font-size-lg);
		line-height: 1.6;
	}
</style>
