<script lang="ts">
	import { page } from "$app/stores";

	type Props = {
		children?: import("svelte").Snippet;
	};

	let { children }: Props = $props();

	// Determine if we're on the home page
	const isHome = $derived($page.url.pathname === "/");

	// Get current thing name from page data if available
	const currentThing = $derived($page.data?.name);
</script>

<nav class="navbar">
	<section class="navbar-section">
		<a href="/" class="navbar-brand">Price of Things</a>
		{#if !isHome && currentThing}
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-current">{currentThing}</span>
		{/if}
	</section>
</nav>

<div class="container">
	<div class="columns">
		{@render children?.()}
	</div>
</div>

<style>
	.navbar {
		background: #f8f9fa;
		padding: 1rem 2rem;
		border-bottom: 1px solid #e0e0e0;
		margin-bottom: 2rem;
	}

	.navbar-section {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.navbar-brand {
		font-weight: bold;
		font-size: 1.2rem;
		text-decoration: none;
		color: #333;
	}

	.navbar-brand:hover {
		color: #5755d9;
	}

	.breadcrumb-separator {
		color: #999;
		user-select: none;
	}

	.breadcrumb-current {
		color: #666;
	}
</style>
