<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	type Props = {
		label: string;
		name: string;
		children: Snippet;
	} & HTMLSelectAttributes;

	let { name, label, children, ...rest }: Props = $props();
</script>

<div class="grid">
	<label for={name}>{label}</label>
	<select class="border border-slate-300 bg-slate-50 px-[1rch] py-[1rex]" {name} {...rest}>
		{@render children()}
	</select>
</div>
