<script lang="ts">
	import type { Snippet } from 'svelte';
	import { list, add, del } from './ok.remote';
	import FormError from '$lib/Form/FormError.svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
	let id: string | undefined = $state();
	const actions = 'Quote, Eta, Stock available, Call back, follow up, Reply'.split(', ');
	const priority = ['high', 'med', 'low'];
</script>

<FormError form={add} />
<svelte:boundary>
	{#snippet pending()}
		pending...
	{/snippet}
	{#snippet failed()}
		oops
	{/snippet}
	{#each await list() as item}
		<pre>{JSON.stringify(item, null, 2)}</pre>
	{:else}
		nope
	{/each}
</svelte:boundary>

<form {...add}>
	<input name="column" />
	<input name="color" type="color" />
	<input name="description" />
	<input name="order" type="number" />
	<input name="check" type="checkbox" />
	<button>save</button>
</form>
