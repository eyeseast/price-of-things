<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<nav class="navbar">site nav</nav>

<div class="container">
	<div class="columns">
		{@render children?.()}
	</div>
</div>
