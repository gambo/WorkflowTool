<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		label: string;
		children: Snippet;
	};

	let { label, children }: Props = $props();
</script>

<fieldset class="rounded border border-slate-300 p-8">
	<legend class="px-2">{label}</legend>

	{@render children()}
</fieldset>
