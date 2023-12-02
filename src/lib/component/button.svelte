<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { ...attr } = $props<HTMLButtonAttributes>();
	console.log(attr['on:click']);
</script>

<button
	{...attr}
	class="px-3 py-1 bg-slate-100 rounded-md border-b-4 border-r-4 shadow-lg border-b-zinc-900 border-r-zinc-900 hover:border-r-0 hover:border-b-0 active:border-t-2 active:border-l-2 hover:border-zinc-900 transition-all duration-100 ease-in-out font-mono font-medium active:shadow-inner hover:shadow-inner"
>
	<slot />
</button>
