<script lang="ts">
	import type { Snippet } from 'svelte';
	import AutoTable from '$lib/Components/AutoTable.svelte';
	import AutoForm from '$lib/Form/AutoForm.svelte';

	type Props = {
		children: Snippet;
	};

	let { data } = $props();
</script>

{data.endpoint}
<AutoTable
	list={data.list}
	list_asc_by={data.list_asc_by}
	list_desc_by={data.list_desc_by}
	del={data.del}
	config={{
		created: 'date',
		check: 'boolean'
	}}
/>
<AutoForm schema={data.form} add={data.add} />
