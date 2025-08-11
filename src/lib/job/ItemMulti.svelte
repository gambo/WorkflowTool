<script lang="ts">
	import Button from '$lib/Form/Button.svelte';
	import Fieldset from '$lib/Form/Fieldset.svelte';
	import Input from '$lib/Form/Input.svelte';
	import Select from '$lib/Form/Select.svelte';
	import { add_icon, trash_icon } from '$lib/Icons.svelte';
	import ItemForm from '$lib/item/ItemForm.svelte';
	import { items } from '$lib/item/item.remote';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let current_list = $state([{}]);
</script>

<Fieldset label="Items">
	<div class="grid gap-2">
		{#each current_list as current (current)}
			<svelte:boundary>
				{#snippet pending()}
					loading
				{/snippet}
				{#snippet failed(e)}
					<pre>{JSON.stringify(e, null, 2)}</pre>
				{/snippet}
				<div class="grid grid-cols-[1fr_auto] items-end gap-2">
					<Input
						name="quantity"
						type="number"
						min="0"
						label="Quantity"
						value=''
						required
					/>
					<br />
					<Select name="item_description" label="Item">
						<option disabled value="">Select an item</option>
						{#each await items() as item}
							<option value={item.id}>{item.description}</option>
						{/each}
					</Select>
					<Button
						variant="danger"
						type="button"
						onclick={() => {
							current_list = current_list.filter((i) => i !== current);
						}}>{@render trash_icon()}Remove</Button
					>
				</div>
			</svelte:boundary>
		{/each}
		<div>
			<Button
				type="button"
				onclick={() => {
					current_list.push({});
				}}
				>{@render add_icon()}Add another item
			</Button>
		</div>
	</div>
</Fieldset>
