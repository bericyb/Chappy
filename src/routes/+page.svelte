<script>
	// @ts-nocheck

	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Visualizer from '$lib/ui/Visualizer.svelte';
	let visible = false;

	onMount(async () => {
		visible = true;
	});
</script>

<div id="background" />

<Visualizer />
<body>
	{#if visible}
		<div id="container" transition:fade={{ duration: 2500 }}>
			<div>
				<h1>Chappy</h1>
				<h3>a meditation chatbot</h3>
				<button />
			</div>
		</div>
	{/if}
</body>

<style>
	body {
		margin: 0;
		padding: 0;
		color: aliceblue;
		font-size: 2em;
		display: flex;
	}
	#container {
		display: flex;
		height: 100vh;
		width: 99vw;
		margin: auto;
		justify-content: center;
		background-color: transparent;
		align-items: center;
		text-align: center;
	}
	#background {
		position: absolute;
		height: 100vh;
		width: 100vw;
		background-color: black;
		z-index: -100000;
	}
</style>
