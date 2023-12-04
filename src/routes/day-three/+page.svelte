<script lang="ts">
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import { createProgress, melt } from '@melt-ui/svelte';

	let { data } = $props();
	let { weightData } = data as PageData;

	const max_weight = 100;
	let current_weight = $state(0);
	let progress_bg = $derived(update_progress_bg());

	const {
		elements: { root },
		options: { max }
	} = createProgress({
		current_weight,
		max: max_weight
	});
	let all = $state(weightData);

	let load = $state([] as typeof weightData);

	function startDrag(event: DragEvent) {
		const target = event.target as HTMLElement;
		const name = target.querySelector('p:first-child')?.textContent;
		const weight = target.querySelector('p:last-child')?.textContent;

		if (name && weight) {
			const item = { name, weight: Number(weight) };
			event.dataTransfer?.setData('text/plain', JSON.stringify(item));
		}
	}

	function dragOver(event: DragEvent) {
		event.preventDefault();
		event.dataTransfer!.dropEffect = 'move';
	}

	function drop(event: DragEvent) {
		const data = event.dataTransfer?.getData('text/plain');
		if (data) {
			const item = JSON.parse(data) as (typeof weightData)[0];
			item.weight = Number(item.weight);

			const new_weight = current_weight + Number(item.weight);
			if (new_weight <= max_weight) {
				current_weight = Math.round(new_weight * 100) / 100;
				load = [...load, item];
				const new_load = all.filter((i) => i.name !== item.name && i.weight !== item.weight);
				all = new_load;
			}
		}
	}

	function remove(event: Event) {
		const target = event.target as HTMLElement;
		const name = target.querySelector('p:first-child')?.textContent;
		const weight = target.querySelector('p:last-child')?.textContent;

		if (name && weight) {
			const item = { name, weight: Number(weight) };
			const new_load = load.filter((i) => i.name !== item.name && i.weight !== item.weight);
			load = new_load;
			const new_weight = current_weight - Number(item.weight);
			current_weight = Math.round(new_weight * 100) / 100;
			all = [item, ...all];
		}
	}

	function update_progress_bg() {
		if (current_weight > 50 && current_weight <= 75) {
			return ['bg-amber-200', 'bg-amber-400'];
		} else if (current_weight > 75 && current_weight <= 100) {
			return ['bg-red-200', 'bg-red-400'];
		}
		return ['bg-slate-300', 'bg-slate-50'];
	}
</script>

<svelte:head>
	<title>Day three</title>
</svelte:head>

<div class="grid gap-4 place-content-center mb-5">
	<p class="font-mono font-semibold text-center">current load {current_weight}kg</p>
	<div
		use:melt={$root}
		class="relative h-8 w-[400px] overflow-hidden rounded-[99999px] {progress_bg[0]}"
	>
		<div
			class="h-full w-full {progress_bg[1]} transition-all duration-[660ms]
        ease-[cubic-bezier(0.65,0,0.35,1)]"
			style={`transform: translateX(-${100 - (100 * (current_weight ?? 0)) / (max_weight ?? 1)}%)`}
		/>
	</div>
</div>

<section class="flex flex-col gap-6 p-2">
	<div class="bg-slate-100 p-12 grid grid-flow-col gap-3 max-w-screen overflow-x-scroll">
		{#each all as item}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="p-6 grid place-content-center bg-slate-50 shadow-sm aspect-square w-32"
				draggable="true"
				on:dragstart={startDrag}
			>
				<p>
					{item.name}
				</p>
				<p>
					{item.weight}
				</p>
			</div>
		{/each}
	</div>

	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="bg-slate-100 p-12 grid grid-flow-col gap-3 max-w-screen overflow-x-scroll {load.length ==
		0
			? 'w-full h-48'
			: ''}"
		on:dragover={dragOver}
		on:drop={drop}
	>
		{#each load as item}
			<!-- svelte-ignore -->
			<button on:click={remove} class="bg-slate-50 shadow-sm p-6 aspect-square w-32">
				<p>
					{item.name}
				</p>
				<p>
					{item.weight}
				</p>
			</button>
		{/each}
	</div>
</section>
