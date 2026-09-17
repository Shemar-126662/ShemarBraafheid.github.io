const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('bg-canvas');

if (canvas instanceof HTMLCanvasElement && !reduceMotion) {
	const ctx = canvas.getContext('2d');

	if (ctx) {
		// Losse stukjes code uit mijn eigen skills, die langzaam naar beneden vallen.
		const tokens = [
			'<?php',
			'$query',
			'echo',
			'public class',
			'using System;',
			'const',
			'=>',
			'console.log()',
			'<div>',
			'</div>',
			'.container',
			'wp_query',
			'functions.php',
		];

		let width = 0;
		let height = 0;
		let drops = [];

		function pickToken() {
			return tokens[Math.floor(Math.random() * tokens.length)];
		}

		function setup() {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
			const columns = Math.max(6, Math.floor(width / 160));
			drops = [];
			for (let i = 0; i < columns; i++) {
				drops.push({
					x: i * (width / columns) + 8,
					y: Math.random() * -height,
					speed: 0.4 + Math.random() * 0.6,
					text: pickToken(),
				});
			}
			ctx.fillStyle = '#0d1117';
			ctx.fillRect(0, 0, width, height);
		}

		function draw() {
			ctx.fillStyle = 'rgba(13, 17, 23, 0.12)';
			ctx.fillRect(0, 0, width, height);
			ctx.font = '14px ui-monospace, Menlo, Consolas, monospace';
			ctx.fillStyle = 'rgba(45, 212, 191, 0.18)';

			for (const drop of drops) {
				ctx.fillText(drop.text, drop.x, drop.y);
				drop.y += drop.speed;
				if (drop.y > height + 20) {
					drop.y = Math.random() * -100;
					drop.text = pickToken();
				}
			}

			if (!document.hidden) {
				requestAnimationFrame(draw);
			}
		}

		setup();
		requestAnimationFrame(draw);
		window.addEventListener('resize', setup);
		document.addEventListener('visibilitychange', () => {
			if (!document.hidden) requestAnimationFrame(draw);
		});
	}
} else if (canvas instanceof HTMLCanvasElement) {
	canvas.style.background = '#0d1117';
}
