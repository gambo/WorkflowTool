<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	type Props = {
		data: PageServerData;
		children: Snippet;
	};
	let { data }: Props = $props();
	import { add, edit, find_by_id } from '../funcs.remote';
	import AutoForm from '$lib/Form/AutoForm.svelte';
	import type { PageServerData } from '../$types';
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
			<AutoForm schema={data.form} data={entry} add={edit} />
		{/each}
	{/if}
</svelte:boundary>
