<script lang="ts">
	import toast from 'svelte-french-toast';
	import { edit_icon, trash_icon } from '$lib/Icons.svelte';
	import { delete_job, job, jobItems, jobs } from './job.remote';
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
	{#each await jobs() as job (job.id)}
		<div class="grid grid-cols-[200px_1fr] gap-2 border border-slate-200 px-4 py-2">
			<div class="flex flex-col">
				<div class="font-semibold">{job.priority} {job.description} - {job.status}</div>
				<div class="font-semibold">{job.quantity} </div>
				<div class="text-sm text-slate-600">{job.created.toDateString()}</div>
			</div>
			<div>
				{#each job.jobItems as { item, quantity } (item?.id)}
					<div class="flex items-center justify-between gap-2">
						<span class="text font-semibold">{job.quantity}</span>
						<span class="text font-semibold">{item?.description}</span>
						<span class="text-sm text-slate-600">{item?.created.toDateString()}</span>
					</div>
				{/each}
			</div>
		</div>
	{/each}
	{#snippet pending()}
		loading
	{/snippet}
	{#snippet failed()}
		something went wrong
	{/snippet}
</svelte:boundary>

<style>
</style>
