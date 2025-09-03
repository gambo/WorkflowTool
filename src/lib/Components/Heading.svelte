<script lang="ts">
	import type { Snippet } from 'svelte';

	let data: { label: string; description: string } = $props();
</script>

<div class="flex items-baseline gap-2">
	<h1 class="text-xl font-medium">{data.label}</h1>
	<h2 class="text-slate-600">{data.description}</h2>
</div>

<style>
	h1,
	h2 {
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
	}
</style>
