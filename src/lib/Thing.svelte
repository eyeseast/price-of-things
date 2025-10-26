<script lang="ts">
	type Props = {
		level?: number;
		id?: string;
		name?: string;
		slug?: string;
		price?: number;
		price_raw?: string;
		date?: string;
		content?: string;
	};

	let {
		level = 1,
		name = "",
		slug = "",
		price = 0,
		price_raw = "",
		date = "",
		content = "",
	}: Props = $props();

	/** @param {string | number | Date} d */
	function format_date(d: string | number | Date) {
		return new Date(d).toDateString();
	}

	function h(n: number = 1) {
		return `h${n}`;
	}

	// Format price with proper formatting
	const formattedPrice = $derived(price_raw || `$${price.toLocaleString("en-US")}`);
</script>

<article class="thing card" data-price={price}>
	<div class="thing-header">
		<div class="thing-price">
			{formattedPrice}
		</div>
		<div class="thing-details">
			<svelte:element this={h(level)} class="thing-name">
				<a href="/{slug}/">{name}</a>
			</svelte:element>
			<div class="thing-date">
				<time datetime={date}>{format_date(date)}</time>
			</div>
		</div>
	</div>
	<div class="thing-content">
		{@html content}
	</div>
</article>

<style>
	.thing-header {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--spacing-lg);
		align-items: start;
		margin-bottom: var(--spacing-md);
	}

	.thing-price {
		font-size: var(--font-size-2xl);
		font-weight: bold;
		color: var(--color-primary);
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-bg-secondary);
		border-radius: var(--border-radius-sm);
		min-width: 150px;
		text-align: right;
	}

	.thing-details {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.thing-name {
		margin: 0;
		font-size: var(--font-size-xl);
		line-height: 1.3;
	}

	.thing-name a {
		color: var(--color-text);
		text-decoration: none;
	}

	.thing-name a:hover {
		color: var(--color-primary);
		text-decoration: underline;
	}

	.thing-date {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.thing-content {
		color: var(--color-text-tertiary);
		line-height: 1.6;
	}

	.thing-content :global(p) {
		margin: 0;
	}

	@media (max-width: 640px) {
		.thing-header {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.thing-price {
			text-align: left;
		}
	}
</style>
