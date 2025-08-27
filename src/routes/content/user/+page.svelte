<script lang="ts">
	import type { Snippet } from 'svelte';
	import { list, add, del, edit, find_by_id } from './funcs.remote';
	import AutoTable from '$lib/Components/AutoTable.svelte';
	import AutoForm from '$lib/Form/AutoForm.svelte';

	type Props = {
		children: Snippet;
	};

	let { data } = $props();
</script>

<svelte:boundary>
	{#snippet pending()}
		loading
	{/snippet}
	{#snippet failed()}
		oopsy
	{/snippet}
	{#each await find_by_id(12) as item}
		{item.username}
	{/each}
</svelte:boundary>

<AutoTable
	{list}
	{del}
	config={{
		created: 'date'
	}}
/>
<AutoForm schema={data.form} {add} />
