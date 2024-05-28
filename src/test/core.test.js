import { describe, it } from 'vitest';
import { doWhile } from '../index';

describe('doWhile', () => {
	it('should run the function until the condition is false', async (test) => {
		let done
		let promise = new Promise(resolve => done = resolve)

		const a = [];
		let x = 0;

		doWhile(function (next) {
			a.push(x++);

			return next(x < 4);
		}, function () {
			test.expect(a).toEqual([0, 1, 2, 3]);
			done()
		});

		await promise
	})

	it('should run the function until the condition is false with concurrency 6', async (test) => {
		let done
		let promise = new Promise(resolve => done = resolve)
		const a = [500, 400, 300, 200, 100, 0];
		const b = [];

		doWhile(function (next) {
			const x = a.shift();

			setTimeout(function () {
				b.push(x);
				next(!!x);
			}, x);
		}, function () {
			test.expect(b).toEqual([0, 100, 200, 300, 400, 500]);
			done()
		}, 6);

		await promise
	})

	it('should run the function until the condition is false with concurrency 2', async (test) => {
		let done
		let promise = new Promise(resolve => done = resolve)
		const a = [520, 500, 300, 200, 100, 0];
		const b = [];

		doWhile(function (next) {
			const x = a.shift();

			setTimeout(function () {
				b.push(x);
				next(!!x);
			}, x);
		}, function () {
			test.expect(b).toEqual([500, 520, 200, 300, 0, 100])
			done()
		}, 2);

		await promise
	})
})


