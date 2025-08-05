<script lang="ts">
	import { add_item, edit_item, item, items } from './item.remote';
	import { spinner_icon } from '$lib/Icons.svelte';
	import Button from '$lib/Form/Button.svelte';
	import Fieldset from '$lib/Form/Fieldset.svelte';
	import Input from '$lib/Form/Input.svelte';
	import Select from '$lib/Form/Select.svelte';
	import toast from 'svelte-french-toast';

	let { id }: { id?: string } = $props();

	let pending = $state(false);

	const actions = $derived.by(() => {
		let action = id ? edit_item : add_item;
		return action.enhance(async ({ form, data, submit }) => {
			pending = true;
			await submit();
			if (!action.result) return;
			if (action.result.success) {
				toast.success(action.result.message ?? 'User saved successfully');
			} else {
				toast.error(action.result.error ?? 'An error occurred');
			}
			form.reset();
			pending = false;
		});
	});
	const data = $derived(item(id));
</script>

<form {...actions}>
	<Fieldset label="Item">
		<div class="grid gap-8">
			<input name="id" type="hidden" value={data.current?.id} />
			<Input name="description" label="Description" value={data.current?.description} required />
			<Button>
				<span class="flex items-center gap-2">
					{#if pending}
						<span class="animate-spin">{@render spinner_icon()}</span>
						Saving...
					{:else}
						Save
					{/if}
				</span>
			</Button>
		</div>
	</Fieldset>
</form>
