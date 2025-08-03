<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		label: string;
		name: string;
		type?: string;
	} & HTMLInputAttributes;

	let { name, type = 'text', label, ...rest }: Props = $props();
</script>

<div class="grid">
	<label for={name}>{label}</label>
	<input class="border border-slate-300 bg-slate-50 px-[1rch] py-[1rex]" {name} {...rest} />
</div>
