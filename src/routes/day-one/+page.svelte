<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props();

	let { all } = data as PageData;

	let filters: 'all' | 'nice' | 'naughty' | 'adding' = $state('all');
	let previous_filters = $derived(() => {
		if (filters === 'adding') {
			return previous_filters;
		}

		return filters;
	});
	function getFilter() {
		switch (filters) {
			case 'all':
				return all;

			case 'nice':
				return all.filter((item) => item.tally > 0);

			case 'naughty':
				return all.filter((item) => item.tally < 0);
			case 'adding':
				return all;
		}
	}

	let filtered = $derived(getFilter());

	function add() {
		const name = (document.getElementById('name') as HTMLInputElement).value;
		const tally = (document.getElementById('tally') as HTMLInputElement).value;

		if (name && tally) {
			all.push({ name, tally: +tally });

			filters = 'adding';
		}

		(document.getElementById('name') as HTMLInputElement).value = '';
		(document.getElementById('tally') as HTMLInputElement).value = '';
	}
</script>

<svelte:head>
	<title>Day one</title>
</svelte:head>

<h1 class="text-center text-3xl font-bold mb-6 font-sans">Day one</h1>

<section class="grid grid-cols-3 gap-3 mb-4">
	<input type="text" name="name" id="name" placeholder="name" />
	<input type="text" name="tally" id="tally" placeholder="tally" />
	<button
		class="px-3 py-1 bg-slate-100 rounded border-b-4 border-r-4 shadow-lg border-b-zinc-900 border-r-zinc-900 hover:border-r-0 hover:border-b-0 active:border-t-2 active:border-l-2 hover:border-zinc-900 transition-all duration-100 ease-in-out font-mono font-medium active:shadow-inner hover:shadow-inner"
		on:click={add}>Add</button
	>
</section>

<section class="grid grid-cols-3 gap-1 mb-4">
	<button
		class="{filters === 'all' ? 'bg-lime-700 text-white' : ''} p-4 rounded-md shadow-md"
		on:click={() => (filters = 'all')}>All</button
	>
	<button
		class="{filters === 'nice' ? 'bg-lime-700 text-white' : ''} p-4 rounded-md shadow-md"
		on:click={() => (filters = 'nice')}>Nice</button
	>
	<button
		class="{filters === 'naughty' ? 'bg-lime-700 text-white' : ''} p-4 rounded-md shadow-md"
		on:click={() => (filters = 'naughty')}>Naughty</button
	>
</section>

<main class="grid grid-cols-4 gap-5 mb-7">
	{#each filtered as item}
		<div class="rounded-box p-5 card shadow-md bg-slate-50">
			<h2>name: {item.name}</h2>
			<p>tally: {item.tally}</p>
		</div>
	{/each}
</main>
