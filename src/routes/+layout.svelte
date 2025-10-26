<script lang="ts">
	import "../app.css";

	import { page } from "$app/state";

	type Props = {
		children?: import("svelte").Snippet;
	};

	let { children }: Props = $props();

	// Determine if we're on the home page
	const isHome = $derived(page.url.pathname === "/");

	// Get current thing name from page data if available
	const current = $derived(page.data?.name);
</script>

<nav class="navbar">
	<section class="navbar-section">
		<a href="/" class="navbar-brand">Price of Things</a>
		{#if !isHome && current}
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-current">{current}</span>
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
		background: var(--color-bg-secondary);
		padding: var(--spacing-md) var(--spacing-xl);
		border-bottom: 1px solid var(--color-border);
		margin-bottom: var(--spacing-xl);
	}

	.navbar-section {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.navbar-brand {
		font-weight: bold;
		font-size: 1.2rem;
		text-decoration: none;
		color: var(--color-text);
	}

	.navbar-brand:hover {
		color: var(--color-primary);
	}

	.breadcrumb-separator {
		color: var(--color-text-muted);
		user-select: none;
	}

	.breadcrumb-current {
		color: var(--color-text-secondary);
	}
</style>
