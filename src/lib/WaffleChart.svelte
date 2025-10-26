<script lang="ts">
	type Unit = "thousand" | "hundred thousand" | "million" | "billion" | "auto";

	type Props = {
		price: number;
		unit?: Unit;
	};
	let { price, unit = "auto" }: Props = $props();

	function autoScale(price: number): number {
		// Aim for 100-500 squares to emphasize large numbers
		if (price >= 50_000_000_000) {
			unit = "hundred thousand";
			return 100_000_000;
		}

		if (price >= 5_000_000_000) {
			unit = "million";
			return 10_000_000;
		}

		if (price >= 50_000_000) {
			unit = "hundred thousand";
			return 100_000;
		}

		unit = "thousand";
		return 1_000;
	}

	let scale = $derived.by(() => {
		switch (unit) {
			case "thousand":
				return 1_000;

			case "hundred thousand":
				return 100_000;

			case "million":
				return 1_000_000;

			case "billion":
				return 1_000_000_000;

			default:
				return autoScale(price);
		}
	});

	let squares = $derived(Math.floor(price / scale));
</script>

<div class="container">
	<div class="squares">
		{#each { length: squares }}
			<span class="square {unit}"></span>
		{/each}
	</div>

	<div class="legend">
		<span class="square {unit}"></span> = ${scale.toLocaleString()}
	</div>
</div>

<style>
	.container {
		--size: 10px;
		display: flex;
		flex-flow: column nowrap;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.squares {
		display: grid;
		grid-template-columns: repeat(auto-fill, var(--size));
		gap: 2px;
	}

	.square {
		width: var(--size);
		height: var(--size);
		background-color: var(--color-primary);
		display: inline-block;
	}

	.square.thousand {
		background-color: var(--color-thousands);
	}

	.square.million {
		background-color: var(--color-millions);
	}

	.square.billion {
		background-color: var(--color-billions);
	}
</style>
