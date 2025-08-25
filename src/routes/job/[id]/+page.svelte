<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	import { find_by_id } from '../job.remote';
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
		{#each await find_by_id(parseInt(id)) as column}
			<pre>{JSON.stringify(column, null, 2)}</pre>
		{/each}
	{/if}
</svelte:boundary>
