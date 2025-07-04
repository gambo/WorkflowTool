<script lang="ts">
	import type { Component } from 'svelte';
	import One from './One.svelte';
	import Two from './Two.svelte';

	type Step = (u: Unit) => void;

	type Unit = {
		form: Component | undefined;
		step: string;
		data: any;
	};

	const station = new Map([
		['one', One],
		['two', Two]
	]);

	type Line = Map<string, Step>;
	const line: Line = new Map([
		[
			'start',
			(u) => {
				u.form = station.get('one');
				u.step = 'next';
			}
		],
		[
			'next',
			(u) => {
				if (u.data.name === 'steven') {
					alert('nope');
					u.step = 'final';
				} else {
					u.step = 'another';
				}
			}
		],
		[
			'another',
			(u) => {
				u.form = station.get('two');
				u.step = 'final';
			}
		],
		['final', (u) => {}]
	]);

	function* process(u: Unit) {
		while (true) {
			if (u.step === 'final') {
				alert('Project Done');
				return u;
			}
			let step = line.get(u.step);
			if (!step) throw 'Boom';
			yield step(u);
		}
	}

	const u: Unit = $state({
		form: undefined,
		data: {},
		step: 'start'
	});

	const a = process(u);
	a.next();
</script>

<u.form value={u.data} />

<pre>{JSON.stringify(u, null, 2)}</pre>
<button type="button" onclick={() => a.next()}>next</button>
