<script lang="ts">
	import Button from '$lib/Form/Button.svelte';
	import Fieldset from '$lib/Form/Fieldset.svelte';
	import Input from '$lib/Form/Input.svelte';
	import Select from '$lib/Form/Select.svelte';
	import ItemForm from '$lib/item/ItemForm.svelte';
	import { items } from '$lib/item/item.remote';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let current_list = $state([{}]);
</script>

<Fieldset label="Items">
	{#each current_list as current}
		<svelte:boundary>
			{#snippet pending()}
				loading
			{/snippet}
			{#snippet failed(e)}
				<pre>{JSON.stringify(e, null, 2)}</pre>
			{/snippet}
			<Select name="item_description" label="Item">
				<option value="">Select an item</option>
				{#each await items() as item}
					<option value={item.id}>{item.description}</option>
				{/each}
			</Select>
			<Button
				type="button"
				onclick={() => {
					current_list = current_list.filter((i) => i !== current);
				}}>Remove Item</Button
			>
		</svelte:boundary>
	{/each}
	<Button
		type="button"
		onclick={() => {
			current_list.push({});
		}}
		>Add Item
	</Button>
</Fieldset>
