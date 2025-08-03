<script lang="ts">
	import { add_user, edit_user, user, users } from './user.remote';
	import { spinner_icon } from '$lib/Icons.svelte';
	import Button from '$lib/Form/Button.svelte';
	import Fieldset from '$lib/Form/Fieldset.svelte';
	import Input from '$lib/Form/Input.svelte';
	import Select from '$lib/Form/Select.svelte';
	import toast from 'svelte-french-toast';

	let { id }: { id?: string } = $props();

	let pending = $state(false);

	const actions = $derived.by(() => {
		let action = id ? edit_user : add_user;
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
	const data = $derived(user(id));
</script>

<form {...actions}>
	<Fieldset label="User">
		<div class="grid gap-8">
			<input name="id" type="hidden" value={data.current?.id} />
			<Input required name="username" label="Username" value={data.current?.username} />
			<Input
				required
				name="passwordHash"
				label="Password"
				type="password"
				value={data.current?.passwordHash}
			/>
			<Select name="status" label="Status" value={data.current?.status}>
				<option value="active">Active</option>
				<option value="inactive">Inactive</option>
			</Select>
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
