<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	import { find_by_id } from '../funcs.remote';
	let id = $derived(page.params.id);
</script>

<svelte:boundary>
	{#snippet pending()}
		loading
	{/snippet}
	{#snippet failed()}
		oopsy
	{/snippet}
	{#if id}
		{#each await find_by_id(parseInt(id)) as entry}
			<pre>{JSON.stringify(entry, null, 2)}</pre>
		{/each}
	{/if}
</svelte:boundary>
