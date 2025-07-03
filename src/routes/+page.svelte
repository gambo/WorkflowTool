<script lang="ts">
	import { linear } from 'svelte/easing';

	type Step = (u: Unit) => void;

	type Unit = {
		step: string;
		data: any;
	};

	type Line = Map<string, Step>;
	const line: Line = new Map([
		[
			'start',
			(u) => {
				u.data = Object.assign({}, u.data, {my: {obj: 1}})
				u.step = 'next';
			}
		],
		[
			'next',
			(u) => {
				u.data = Object.assign({}, u.data, {myother: {obj: 1}})
				u.step = 'another';
			}
		],
		[
			'another',
			(u) => {
				u.data = Object.assign({}, u.data, {whatever: {data: 1}})
				u.step = 'final';
			}
		],
		[
			'final',
			(u) => {
				u.data = Object.assign({}, u.data, {i: {want: 123}})
			}
		]
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
		data: {},
		step: 'start'
	});

	const a = process(u);
	a.next();
</script>

<pre>{JSON.stringify(u, null, 2)}</pre>
<button type="button" onclick={() => a.next()}>next</button>
