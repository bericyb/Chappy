/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
export class Petal {
	/**
	 * @param {any} ctx
	 * @param {undefined} [x]
	 * @param {undefined} [y]
	 */
	constructor(ctx, x, y, size, isRight) {
		this.size = size;
		this.brighten = true;
		this.shrinking = false;
		this.shade = Math.random() * 255;
		this.r = 100 + Math.random() * 50;
		this.g = 80 + Math.random() * 50;
		this.b = 200 + Math.random() * 65;
		this.points = [
			{
				x: x,
				y: y
			},
			{
				x: x - (size * Math.random() * 4 + size * 2),
				y: y - size * Math.random() * 8
			},
			{
				x: x,
				y: y - (size * 10 + Math.random() * 5 * size)
			},
			{
				x: x + size * Math.random() * 8 + size * 2,
				y: y - size * 8
			},
			{
				x: x,
				y: y
			}
		];

		this.color = 0;
		this.hueChangeR = Math.random() * 0.75;
		this.hueChangeG = Math.random() * 0.75;
		this.hueChangeB = Math.random() * 0.75;
		this.ctx = ctx;
		this.rotateSpeed = (isRight ? -1 : 1) * (Math.random() * 0.001);
	}

	draw() {
		// this.ctx.shadowColor = `rgba(${this.r}, ${this.g}, ${this.b}, .5)`;
		// this.ctx.shadowBlur = 25;
		this.ctx.fillStyle = `rgba(${this.r},${this.g},${this.b}, 1)`;
		this.ctx.beginPath();
		this.ctx.moveTo(this.x1, this.y1);
		for (let i = 1; i < this.points.length - 1; i = i + 2) {
			this.ctx.bezierCurveTo(
				this.points[i - 1].x,
				this.points[i - 1].y,
				this.points[i].x,
				this.points[i].y,
				this.points[i + 1].x,
				this.points[i + 1].y
			);
		}
		this.ctx.fill();
	}

	grow() {
		let newSize = this.size;
		if (this.size < 200) {
			this.shrinking = false;
		} else if (this.size > 800) {
			this.shrinking = true;
		}

		if (!this.shrinking) {
			newSize = newSize + 0.00001;
		} else {
			newSize = newSize - 0.00001;
		}

		this.size = newSize;
		let size = newSize;
		let x = this.points[0].x;
		let y = this.points[0].y;
		// this.points = [
		// 	{
		// 		x: x,
		// 		y: y
		// 	},
		// 	{
		// 		x: x - (size * Math.random() * 4 + size * 2),
		// 		y: y - size * Math.random() * 8
		// 	},
		// 	{
		// 		x: x,
		// 		y: y - (size * 10 + Math.random() * 5 * size)
		// 	},
		// 	{
		// 		x: x + size * Math.random() * 8 + size * 2,
		// 		y: y - size * 8
		// 	},
		// 	{
		// 		x: x,
		// 		y: y
		// 	}
		// ];
	}

	rotate() {
		let r = this.rotateSpeed;
		for (let i = 1; i < this.points.length; i++) {
			let xPrime =
				(this.points[i].x - this.points[0].x) * Math.cos(r) -
				(this.points[i].y - this.points[0].y) * Math.sin(r);
			xPrime = xPrime + this.points[0].x;
			let yPrime =
				(this.points[i].y - this.points[0].y) * Math.cos(r) +
				(this.points[i].x - this.points[0].x) * Math.sin(r);

			yPrime = yPrime + this.points[0].y;

			this.points[i] = {
				x: xPrime,
				y: yPrime
			};
		}
	}

	translate(x, y) {
		this.x1 = this.x1 + x;
		this.y1 = this.y1 + y;

		for (let i = 0; i < 4; i++) {
			this.points[i] = [this.points[i][0] + x, this.points[i][1] + y];
		}
	}

	changeHue() {
		this.r = !this.brighten ? this.r - this.hueChangeR : this.r + this.hueChangeR;
		this.g = !this.brighten ? this.g - this.hueChangeG : this.g + this.hueChangeG;
		this.b = !this.brighten ? this.b - this.hueChangeB : this.b + this.hueChangeB;
		if ((this.r > 255) | (this.g > 255) | (this.b > 255)) {
			this.brighten = false;
		} else if ((this.r <= 0) | (this.g <= 0) | (this.b <= 0)) {
			this.brighten = true;
		}
	}
}
