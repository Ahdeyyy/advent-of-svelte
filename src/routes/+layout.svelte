<script>
	import '../app.pcss';
</script>

<svelte:head>
	<title>Advent of svelte 2023</title>
</svelte:head>

<div class="grid grid-cols-7 gap-2">
	<aside class="grid grid-cols-1 col-span-1 gap-0 p-5">
		<a class="btn btn-neutral rounded-btn" href="/">home</a>
	</aside>

	<div class="col-span-6 container p-12 mx-auto">
		<slot />
	</div>
</div>
