<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { Petal } from '../utils/Petal';

	let canvas;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		const width = canvas.width;
		const height = canvas.height;
		let petals = [];
		for (let i = 0; i < 20; i++) {
			petals.push(
				new Petal(
					ctx,
					i % 3 == 0 ? width : 0,
					Math.random() * height,
					// height,
					width / 20,
					i % 2 == 0 ? true : false
				)
			);
		}
		let frame = requestAnimationFrame(loop);

		function loop(t) {
			frame = requestAnimationFrame(loop);

			ctx.fillStyle = 'rgba(0,25,50,.02)';
			ctx.fillRect(0, 0, 8000, 4000);

			petals.forEach((petal) => {
				petal.draw();
				petal.rotate();
				petal.changeHue();
				// petal.grow();
			});
		}

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<canvas
	style="filter:hue-rotate({Math.random() * 360}deg) blur(40px)"
	bind:this={canvas}
	width={4000}
	height={2000}
/>

<style>
	canvas {
		width: 100vw;
		height: 100vh;
		background-color: rgb(0, 0, 0);
		position: absolute;
		z-index: -500;
	}
</style>
