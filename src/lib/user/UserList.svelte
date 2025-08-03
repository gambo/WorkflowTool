<script lang="ts">
	import toast from 'svelte-french-toast';
	import { edit_icon, trash_icon } from '$lib/Icons.svelte';
	import { delete_user, users } from './user.remote';
	let { onedit }: { onedit: (id: string) => void } = $props();
	const format = (d: Date) =>
		`${String(d.getDate()).padStart(2, '0')} ${d.toLocaleString('en', { month: 'short' })} ${d.getFullYear()} - ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
	const delete_user_notify = delete_user.enhance(async ({ data, submit }) => {
		try {
			await submit();
			toast.success('User deleted successfully');
			console.log('cool');
		} catch {
			toast.error('Failed to delete user');
		}
	});
</script>

<svelte:boundary>
	<table>
		<thead>
			<tr>
				<th></th>
				<th>Id</th>
				<th>Username</th>
				<th>Status</th>
				<th>Created</th>
				<th>Updated</th>
			</tr>
		</thead>
		<tbody>
			{#each await users() as user}
				<tr>
					<td>
						<form {...delete_user_notify}>
							<button name="userId" value={user.id}>
								{@render trash_icon()}
							</button>
						</form>
						<button type="button" onclick={() => onedit(user.id)}>
							{@render edit_icon()}
						</button>
					</td>
					<td>{user.id}</td>
					<td>{user.username}</td>
					<td>{user.status}</td>
					<td>{format(user.created)}</td>
					<td>{format(user.updated)}</td>
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
