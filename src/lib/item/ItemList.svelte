<script lang="ts">
	import toast from 'svelte-french-toast';
	import { edit_icon, trash_icon } from '$lib/Icons.svelte';
	import { delete_item, items } from './item.remote';
	let { onedit }: { onedit: (id: string) => void } = $props();

	const format = (d: Date) =>
		`${String(d.getDate()).padStart(2, '0')} ${d.toLocaleString('en', { month: 'short' })} ${d.getFullYear()} - ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

	const delete_item_notify = delete_item.enhance(async ({ data, submit }) => {
		try {
			await submit();
			toast.success('Item deleted successfully');
			console.log('cool');
		} catch {
			toast.error('Failed to delete Item');
		}
	});
</script>

<svelte:boundary>
	<table>
		<thead>
			<tr>
				<th></th>
				<th>Id</th>
				<th>Description</th>
				<th>Created</th>
				<th>Updated</th>
			</tr>
		</thead>
		<tbody>
			{#each await items() as item}
				<tr>
					<td>
						<div class="flex items-center gap-1">
							<form {...delete_item_notify}>
								<button name="id" value={item.id}>
									{@render trash_icon()}
								</button>
							</form>
							<button type="button" onclick={() => onedit(item.id)}>
								{@render edit_icon()}
							</button>
						</div>
					</td>
					<td>{item.id}</td>
					<td>{item.description}</td>
					<td>{format(item.created)}</td>
					<td>{format(item.updated)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	{#snippet pending()}
		loading
	{/snippet}
	{#snippet failed()}
		something went wrong
	{/snippet}
</svelte:boundary>

<style>
	th,
	td {
		border: 1px solid #ccc;
		padding: 1rex 1rch;
	}
</style>
