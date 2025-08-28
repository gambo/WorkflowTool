<script lang="ts">
	import type { Snippet } from 'svelte';
	import { list, add, del, edit, find_by_id, list_asc_by, list_desc_by } from './funcs.remote';
	import AutoTable from '$lib/Components/AutoTable.svelte';
	import AutoForm from '$lib/Form/AutoForm.svelte';

	type Props = {
		children: Snippet;
	};

	let { data } = $props();
</script>

<AutoTable
	{list}
	{list_asc_by}
	{list_desc_by}
	{del}
	config={{
		created: 'date',
		check: 'boolean'
	}}
/>
<AutoForm schema={data.form} {add} />
