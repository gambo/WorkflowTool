<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '$lib/Form/Button.svelte';
	type Props = {
		title: string;
		description: string;
		actionButtons: Snippet;
	};

	let { title, description, actionButtons }: Props = $props();
</script>

<div class="flex">
	<div class="grid">
		<h1 class="text-3xl text-slate-800">{title}</h1>
		<p class="text-slate-600">{description}</p>
	</div>
	<span class="ml-auto">
		{@render actionButtons()}
	</span>
</div>
