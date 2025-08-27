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

<AutoTable
	{list}
	{del}
	config={{
		created: 'date'
	}}
/>
<AutoForm schema={data.form} {add} />
