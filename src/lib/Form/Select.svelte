<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	type Props = {
		label: string;
		name: string;
		children: Snippet;
	} & HTMLSelectAttributes;

	let { name, label, children, ...rest }: Props = $props();
	const selectClass = [
		'border border-slate-300 bg-slate-50',
		'px-[1rch] py-[1rex]',
		'rounded outline-sky-500'
	];
</script>

<div class="grid">
	<label for={name}>{label}</label>
	<select class={selectClass} {name} {...rest}>
		{@render children()}
	</select>
</div>
