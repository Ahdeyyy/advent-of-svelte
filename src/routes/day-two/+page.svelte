<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import Button from '$lib/component/button.svelte';

	const { data } = $props();

	function create_count(start: number) {
		let tally = $state(start);

		return {
			get() {
				return tally;
			},
			increment() {
				tally += 1;
			},

			add(amount: number) {
				tally += amount;
			},
			remove(amount: number) {
				tally -= amount;
			},
			decrement() {
				tally -= 1;
			},
			reset() {
				tally = start;
			}
		};
	}

	let count = create_count(0);
	let add = $state(0);
	let remove = $state(0);
	let mood = $derived(() => {
		if (count.get() < -10) {
			return '💔';
		}

		if (count.get() > 10) {
			return '😊';
		}

		return '🎅';
	});

	function foo() {
		console.log('foo');
	}
</script>

<svelte:head>
	<title>Day two</title>
</svelte:head>

<h1 class="text-center text-3xl font-bold mb-6 font-sans">Day two</h1>

<section class="grid grid-cols-3 gap-3 mb-4">
	<div class="flex gap-2">
		<input class="rounded-md shadow-md" bind:value={add} type="number" />
		<button
			class="px-3 py-1 bg-slate-100 rounded-md border-b-4 border-r-4 shadow-lg border-b-zinc-900 border-r-zinc-900 hover:border-r-0 hover:border-b-0 active:border-t-2 active:border-l-2 hover:border-zinc-900 transition-all duration-100 ease-in-out font-mono font-medium active:shadow-inner hover:shadow-inner"
			on:click={() => count.add(add)}>Add</button
		>
	</div>

	<div class="flex gap-2">
		<input class="rounded-md shadow-md" bind:value={remove} type="number" />
		<button
			class="px-3 py-1 bg-slate-100 rounded-md border-b-4 border-r-4 shadow-lg border-b-zinc-900 border-r-zinc-900 hover:border-r-0 hover:border-b-0 active:border-t-2 active:border-l-2 hover:border-zinc-900 transition-all duration-100 ease-in-out font-mono font-medium active:shadow-inner hover:shadow-inner"
			on:click={() => count.remove(remove)}>Remove</button
		>
	</div>

	<button
		class="px-3 py-1 bg-slate-100 rounded-md border-b-4 border-r-4 shadow-lg border-b-zinc-900 border-r-zinc-900 hover:border-r-0 hover:border-b-0 active:border-t-2 active:border-l-2 hover:border-zinc-900 transition-all duration-100 ease-in-out font-mono font-medium active:shadow-inner hover:shadow-inner"
		on:click={() => count.reset()}
	>
		Reset
	</button>

	<p class="col-span-3 text-center font-bold text-2xl">{count.get()}</p>
</section>

<section>
	<p class="text-center font-medium">Santa's mood</p>
	<p transition:fade class="text-center font-bold text-2xl">{mood()}</p>
</section>
