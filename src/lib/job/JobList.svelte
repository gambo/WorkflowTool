<script lang="ts">
	import toast from 'svelte-french-toast';
	import { edit_icon, trash_icon } from '$lib/Icons.svelte';
	import { delete_job, jobs } from './job.remote';
	let { onedit }: { onedit: (id: string) => void } = $props();

	const format = (d: Date) =>
		`${String(d.getDate()).padStart(2, '0')} ${d.toLocaleString('en', { month: 'short' })} ${d.getFullYear()} - ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

	const delete_job_notify = delete_job.enhance(async ({ data, submit }) => {
		try {
			await submit();
			toast.success('Job deleted successfully');
			console.log('cool');
		} catch {
			toast.error('Failed to delete Job');
		}
	});
</script>

<svelte:boundary>
	<table>
		<thead>
			<tr>
				<th></th>
				<th>Id</th>
				<th>Quantity</th>
				<th>Description</th>
				<th>Priority</th>
				<th>Status</th>
				<th>Created</th>
				<th>Updated</th>
			</tr>
		</thead>
		<tbody>
			{#each await jobs() as job}
				<tr>
					<td>
						<div class="flex items-center gap-1">
							<form {...delete_job_notify}>
								<button name="id" value={job.id}>
									{@render trash_icon()}
								</button>
							</form>
							<button type="button" onclick={() => onedit(job.id)}>
								{@render edit_icon()}
							</button>
						</div>
					</td>
					<td>{job.id}</td>
					<td>{job.quantity}</td>
					<td>{job.description}</td>
					<td>{job.priority}</td>
					<td>{job.status}</td>
					<td>{format(job.created)}</td>
					<td>{format(job.updated)}</td>
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
