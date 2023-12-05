<script lang="ts">
	let heart_rates = JSON.parse(localStorage.getItem('heart_rates') || '[]');

	let heart_rate = $state(Number(heart_rates[heart_rates.length - 1]));
	let average_heart_rate = $state(
		Math.round(
			heart_rates.reduce((a: number, b: number) => Number(a) + Number(b), 0) / heart_rates.length
		)
	);

	async function getHeartRate() {
		const json = await fetch('https://advent.sveltesociety.dev/data/2023/day-four.json');
		const data = await json.json();

		return data.heartRate;
	}

	async function setHeartRate() {
		const rate = await getHeartRate();
		const heart_rates = JSON.parse(localStorage.getItem('heart_rates') || '[]');
		heart_rates.push(rate);
		localStorage.setItem('heart_rates', JSON.stringify(heart_rates));
		heart_rate = rate;
	}

	$effect(() => {
		setInterval(async () => {
			await setHeartRate();
			const heart_rates = JSON.parse(localStorage.getItem('heart_rates') || '[]');

			average_heart_rate = Math.round(
				heart_rates.reduce((a: number, b: number) => Number(a) + Number(b), 0) / heart_rates.length
			);
		}, 1000);
	});
</script>

<svelte:head>
	<title>Day four</title>
</svelte:head>

<h1 class="text-center text-3xl font-bold mb-6 font-sans">Day four</h1>

<section class="grid place-content-center gap-3 card card-bordered shadow-lg">
	<div class="card-body grid place-content-center gap-3">
		<p class="text-center text-2xl font-mono">{heart_rate}</p>
		<p class=" transition-all text-5xl animate-pulse text-center">💗</p>
		<p class="font-mono font-semibold text-center">average heart rate {average_heart_rate}</p>
	</div>
</section>
