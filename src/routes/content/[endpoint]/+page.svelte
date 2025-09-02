<script lang="ts">
	import type { Snippet } from 'svelte';
	import AutoTable from '$lib/Components/AutoTable.svelte';
	import AutoForm from '$lib/Form/AutoForm.svelte';
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
		children: Snippet;
	};

	let { data }: Props = $props();
</script>

<div class="mb-8 grid border-b border-b-slate-600 pb-2">
	<h1 class="text-lg font-medium">{data.label}</h1>
	<h2 class="text-slate-600">{data.description}</h2>
</div>
<AutoTable
	{...data}
	config={{
		created: 'date',
		check: 'boolean'
	}}
/>
<AutoForm schema={data.form} add={data.add} />
