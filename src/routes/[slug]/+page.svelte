<script lang="ts">
	import type { Thing } from "$lib/types";

	type Props = { data: Thing };

	let { data }: Props = $props();
</script>

<article>
	<h1>{data.name}</h1>

	<dl>
		<dt>Price:</dt>
		<dd>${data.price.toLocaleString()}</dd>

		<dt>Paid by:</dt>
		<dd>{data.paid_by}</dd>

		<dt>Date:</dt>
		<dd>{data.date}</dd>

		<dt>Source:</dt>
		<dd><a href={data.link} target="_blank" rel="noopener noreferrer">Link</a></dd>
	</dl>

	<div class="content">
		{@html data.content}
	</div>
</article>

<style>
	article {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.5rem 1rem;
		margin: 1rem 0;
	}

	dt {
		font-weight: bold;
	}

	.content {
		margin-top: 2rem;
		line-height: 1.6;
	}
</style>
