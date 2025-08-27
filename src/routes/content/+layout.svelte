<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/state';

	type Props = {
		data: LayoutData;
		children: Snippet;
	};

	let { data, children }: Props = $props();
</script>

<div class="p-8">
	<h1 class="mb-8 text-3xl text-slate-700">{page.data.pageTitle}</h1>
	{@render children()}
</div>
