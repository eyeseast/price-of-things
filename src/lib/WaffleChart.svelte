<script lang="ts">
	import type { Unit } from "$lib/types";

	type Props = {
		price: number;
		unit?: Unit;
	};
	let { price, unit = $bindable("auto") }: Props = $props();

	function getAutoScale(price: number): { scale: number; unit: Unit } {
		// Aim for 100-500 squares to emphasize large numbers
		if (price >= 50_000_000_000) {
			return { scale: 100_000_000, unit: "hundred thousand" };
		}

		if (price >= 5_000_000_000) {
			return { scale: 10_000_000, unit: "million" };
		}

		if (price >= 50_000_000) {
			return { scale: 100_000, unit: "hundred thousand" };
		}

		return { scale: 1_000, unit: "thousand" };
	}

	let scale = $derived.by((): number => {
		if (unit === "auto") {
			return getAutoScale(price).scale;
		}

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
				return 1_000;
		}
	});

	let effectiveUnit = $derived<Exclude<Unit, "auto">>(
		(unit === "auto" ? getAutoScale(price).unit : unit) as Exclude<Unit, "auto">
	);

	let squares = $derived(Math.floor(price / scale));
</script>

<div class="container">
	<div class="legend">
		<span class="square {effectiveUnit}"></span> = ${scale.toLocaleString()}
	</div>
	<div class="squares">
		{#each { length: squares }}
			<span class="square {effectiveUnit}"></span>
		{/each}
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

	.square.hundred.thousand {
		background-color: var(--color-hundred-thousands);
	}

	.square.million {
		background-color: var(--color-millions);
	}

	.square.billion {
		background-color: var(--color-billions);
	}
</style>
