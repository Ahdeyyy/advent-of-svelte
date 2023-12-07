<script lang="ts">
	import { Play } from 'lucide-svelte';

	let morse: Record<string, string> = {
		a: '.-',
		b: '-...',
		c: '-.-.',
		d: '-..',
		e: '.',
		f: '..-.',
		g: '--.',
		h: '....',
		i: '..',
		j: '.---',
		k: '-.-',
		l: '.-..',
		m: '--',
		n: '-.',
		o: '---',
		p: '.--.',
		q: '--.-',
		r: '.-.',
		s: '...',
		t: '-',
		u: '..-',
		v: '...-',
		w: '.--',
		x: '-..-',
		y: '-.--',
		z: '--..',
		'1': '.----',
		'2': '..---',
		'3': '...--',
		'4': '....-',
		'5': '.....',
		'6': '-....',
		'7': '--...',
		'8': '---..',
		'9': '----.',
		'0': '-----',
		' ': '/'
	};

	let text = $state('');

	var audioContext = new AudioContext();
	var oscillator = audioContext.createOscillator();
	var gainNode = audioContext.createGain();
	oscillator.type = 'sine';
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);
	// o.start(0);
	// o.stop();

	async function playDot() {
		let startTime = performance.now();
		oscillator.start();
		while (startTime + 30 > performance.now()) {}
		oscillator.stop();
		oscillator = audioContext.createOscillator();
		oscillator.type = 'sine';
		oscillator.connect(gainNode);

		gainNode.connect(audioContext.destination);
	}

	// Function to play a dash
	async function playDash() {
		let startTime = performance.now();
		oscillator.start();
		while (startTime + 70 > performance.now()) {}
		oscillator.stop();
		oscillator = audioContext.createOscillator();
		oscillator.type = 'sine';
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
	}

	async function playSpace() {
		let startTime = performance.now();

		while (startTime + 60 > performance.now()) {}
	}

	async function playSlash() {
		let startTime = performance.now();

		while (startTime + 90 > performance.now()) {}
	}

	function translateMorse() {
		let code = '';
		for (const ch of text) {
			code += morse[ch.toLowerCase()] + ' ';
		}
		return code;
	}

	let morse_code = $derived(translateMorse());

	async function playMorse() {
		for (const ch of morse_code) {
			if (ch === '.') {
				await playDot();
			} else if (ch === '-') {
				await playDash();
			} else if (ch === ' ') {
				await playSpace();
			} else if (ch === '/') {
				await playSlash();
			}
		}
		// oscillator.stop();
		// oscillator = audioContext.createOscillator();
		// oscillator.connect(gainNode);
		// gainNode.connect(audioContext.destination);
	}
</script>

<!-- the text input can only accept space, /, ., -  -->
<input type="text" bind:value={text} placeholder="Enter text" />

<div class="mb-5">
	<h2 class="text-2xl font-mono text-center mb-4 mt-4">morse</h2>
	<p class="p-4">
		{#each morse_code as morse}
			{#if morse === ' '}
				<span class="text-2xl">{morse}</span>
			{:else if morse === '/'}
				<span class="text-2xl">/</span>
			{:else if morse === '.'}
				<span class="text-2xl">.</span>
			{:else if morse === '-'}
				<span class="text-2xl">-</span>
			{/if}
		{:else}
			<p class="p-4"></p>
		{/each}
	</p>
</div>

<button
	class="px-5 py-2 rounded-md flex bg-primary fill-primary-content text-primary-content gap-1 stroke-primary-content"
	on:click={playMorse}
>
	<span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-play fill-primary-content stroke-primary-content"
			><polygon points="5 3 19 12 5 21 5 3" /></svg
		>
	</span>
	play
</button>
