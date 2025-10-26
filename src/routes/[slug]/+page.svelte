<script lang="ts">
	import type { Thing } from "$lib/types";
	import WaffleChart from "$lib/WaffleChart.svelte";

	type Props = { data: Thing };

	let { data }: Props = $props();

	/** @param {string | number | Date} d */
	function format_date(d: string | number | Date) {
		return new Date(d).toDateString();
	}

	// Format price with proper formatting
	const formattedPrice = $derived(
		data.price_raw || `$${data.price.toLocaleString("en-US")}`
	);
</script>

<article class="card">
	<div class="detail-header">
		<div class="price-display">{formattedPrice}</div>
		<div class="detail-info">
			<h1>{data.name}</h1>
			<div class="meta">
				<time datetime={data.date}>{format_date(data.date)}</time>
			</div>
		</div>
	</div>

	<WaffleChart price={data.price} />

	<div class="content">
		{@html data.content}
	</div>

	<dl class="metadata">
		<dt>Paid by:</dt>
		<dd>{data.paid_by}</dd>

		<dt>Source:</dt>
		<dd>
			<a href={data.link} target="_blank" rel="noopener noreferrer">View source</a>
		</dd>
	</dl>
</article>

<style>
	article {
		max-width: 800px;
		margin: 0 auto;
	}

	.detail-header {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--spacing-lg);
		align-items: start;
		margin-bottom: var(--spacing-xl);
		padding-bottom: var(--spacing-lg);
		border-bottom: 1px solid var(--color-border);
	}

	.price-display {
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

	.detail-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	h1 {
		margin: 0;
		font-size: var(--font-size-2xl);
		color: var(--color-text);
		line-height: 1.3;
	}

	.meta {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.content {
		color: var(--color-text-tertiary);
		line-height: 1.6;
		margin-bottom: var(--spacing-xl);
	}

	.content :global(p) {
		margin: 0 0 var(--spacing-md) 0;
	}

	.content :global(p:last-child) {
		margin-bottom: 0;
	}

	.metadata {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--spacing-sm) var(--spacing-lg);
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--color-border);
		font-size: var(--font-size-sm);
	}

	dt {
		font-weight: bold;
		color: var(--color-text-secondary);
	}

	dd {
		margin: 0;
		color: var(--color-text);
	}

	.metadata a {
		color: var(--color-primary);
		text-decoration: none;
	}

	.metadata a:hover {
		text-decoration: underline;
	}

	@media (max-width: 640px) {
		.detail-header {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.price-display {
			text-align: left;
		}
	}
</style>
