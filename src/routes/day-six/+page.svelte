<script lang="ts">
	let start_time = performance.now();

	function create_bpm_counter() {
		let value = $state(0);

		function increment() {
			value += 1;
		}

		function decrement() {
			value -= 1;
		}

		function reset() {
			value = 0;
			start_time = performance.now();
		}

		return {
			increment,
			decrement,
			reset,
			get() {
				return value;
			}
		};
	}

	function get_bpm(beats: number) {
		const end_time = performance.now();
		const time_taken = end_time - start_time;
		const bpm = beats / (time_taken / 60000);
		return Math.round(bpm) || 0;
	}

	let bpm_counter = create_bpm_counter();
	let bpm = $derived(get_bpm(bpm_counter.get()));
</script>

<svelte:head>
	<title>day six</title>
</svelte:head>

<h1 class="font-sans font-bold text-center text-5xl mb-6 mt-4">Day six</h1>

<section class="grid gap-6 justify-center mt-6 mb-6 p-6">
	<p class="font-semibold text-center font-mono text-2xl self-center">{bpm} <span>BPM</span></p>

	<div class="join content-center self-center">
		<button class="btn px-7 py-2 btn-error/60 join-item" on:click={bpm_counter.increment}>
			tap
		</button>
		<button class="btn px-7 py-2 btn-error join-item" on:click={bpm_counter.reset}> reset </button>
	</div>
</section>

<section class="flex overflow-x-auto gap-3 p-6">
	<iframe
		width="560"
		height="315"
		src="https://www.youtube.com/embed/PhKVSZsRxQM?si=mDDLtLlfT194fBeq"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
	></iframe>
	<iframe
		width="560"
		height="315"
		src="https://www.youtube.com/embed/yXQViqx6GMY?si=QMGxFO6yLg2TtNIf"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
	></iframe>
</section>
