<script lang="ts">
	import type { Snippet } from 'svelte';
	import AutoTable from '$lib/Components/AutoTable.svelte';
	import AutoForm from '$lib/Form/AutoForm.svelte';
	import type { PageData } from './$types';
	import Dialog from '$lib/Components/Dialog.svelte';
	import { add_icon } from '$lib/Icons.svelte';
	import Heading from '$lib/Components/Heading.svelte';

	type Props = {
		data: PageData;
		children: Snippet;
	};

	let { data }: Props = $props();
</script>

<pre>{JSON.stringify(data.table_config, null, 2)}</pre>
<div class="mb-8 flex items-center justify-between border-b border-b-slate-200 pb-2">
	<Heading {...data} />
	<Dialog>
		{#snippet button()}
			<div class="flex items-center gap-1">
				{@render add_icon()}
				Add {data.endpoint}
			</div>
		{/snippet}
		<Heading {...data} />
		<AutoForm schema={data.form} add={data.add} />
	</Dialog>
</div>
<AutoTable {...data} />
