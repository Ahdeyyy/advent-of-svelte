<script lang="ts">
	const eve = new Date('12-25-2023');
	let now = $state(new Date());

	$effect(() => {
		setInterval(() => {
			now = new Date();
		}, 1000);
	});

	let time_left = $derived(get_time_left());

	function get_time_left() {
		const diff = eve.getTime() - now.getTime();
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);
		return {
			days,
			hours,
			minutes,
			seconds
		};
	}
</script>

<section class="grid place-content-center h-[80vh] p-5 max-h-screen">
	<h1 class="text-5xl font-mono text-center mb-8 mt-4 uppercase">Countdown to Christmas</h1>
	<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
		<div class="flex flex-col p-5 bg-red-700 rounded-box text-white">
			<span class="countdown font-mono text-9xl">
				<span style="--value:{time_left.days}"></span>
			</span>
			days
		</div>
		<div class="flex flex-col p-2 bg-white rounded-box text-green-800">
			<span class="countdown font-mono text-9xl">
				<span style="--value:{time_left.hours}"></span>
			</span>
			hours
		</div>
		<div class="flex flex-col p-2 bg-red-700 rounded-box text-white">
			<span class="countdown font-mono text-9xl">
				<span style="--value:{time_left.minutes}"></span>
			</span>
			minutes
		</div>
		<div class="flex flex-col p-2 bg-white rounded-box text-green-800">
			<span class="countdown font-mono text-9xl">
				<span style="--value:{time_left.seconds}"></span>
			</span>
			seconds
		</div>
	</div>
</section>

<style>
	svg {
		animation:
			rotate 60s linear infinite,
			move 6s linear infinite alternate-reverse;
	}

	@keyframes rotate {
		from {
			rotate: 0deg;
		}
		to {
			rotate: 360deg;
		}
	}

	@keyframes rotate-reverse {
		from {
			rotate: 360deg;
		}
		to {
			rotate: 0deg;
		}
	}

	@keyframes move {
		from {
			transform: translateX(0) translateY(0);
		}
		to {
			transform: translateX(100wh) translateY(100vh);
		}
	}
</style>
