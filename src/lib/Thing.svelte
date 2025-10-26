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

<article class="thing" data-price={price}>
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
	.thing {
		border: 1px solid #e0e0e0;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
		background: white;
		transition: box-shadow 0.2s;
	}

	.thing:hover {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.thing-header {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1.5rem;
		align-items: start;
		margin-bottom: 1rem;
	}

	.thing-price {
		font-size: 2rem;
		font-weight: bold;
		color: #5755d9;
		font-family: "SF Mono", "Monaco", "Menlo", "Consolas", "Courier New", monospace;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
		padding: 0.5rem 1rem;
		background: #f8f9fa;
		border-radius: 6px;
		min-width: 150px;
		text-align: right;
	}

	.thing-details {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.thing-name {
		margin: 0;
		font-size: 1.25rem;
		line-height: 1.3;
	}

	.thing-name a {
		color: #333;
		text-decoration: none;
	}

	.thing-name a:hover {
		color: #5755d9;
		text-decoration: underline;
	}

	.thing-date {
		font-size: 0.875rem;
		color: #666;
	}

	.thing-content {
		color: #555;
		line-height: 1.6;
	}

	.thing-content :global(p) {
		margin: 0;
	}

	@media (max-width: 640px) {
		.thing-header {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.thing-price {
			text-align: left;
		}
	}
</style>
