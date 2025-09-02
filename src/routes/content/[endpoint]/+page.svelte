<script lang="ts">
	import type { Snippet } from 'svelte';
	import AutoTable from '$lib/Components/AutoTable.svelte';
	import AutoForm from '$lib/Form/AutoForm.svelte';
	import type { PageData } from './$types';
	import Dialog from '$lib/Components/Dialog.svelte';
	import { add_icon } from '$lib/Icons.svelte';

	type Props = {
		data: PageData;
		children: Snippet;
	};

	let { data }: Props = $props();
</script>

<div class="mb-8 flex items-center justify-between border-b border-b-slate-600 pb-2">
	<div class="grid">
		<h1 class="text-lg font-medium">{data.label}</h1>
		<h2 class="text-slate-600">{data.description}</h2>
	</div>
	<div>
		<Dialog>
			{#snippet button()}
				<div class="flex items-center gap-1">
					{@render add_icon()}
					Add {data.endpoint}
				</div>
			{/snippet}
			<AutoForm schema={data.form} add={data.add} />
		</Dialog>
	</div>
</div>
<AutoTable
	{...data}
	config={{
		created: 'date',
		check: 'boolean'
	}}
/>
