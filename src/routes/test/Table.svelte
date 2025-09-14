<script lang="ts">
	import { list } from '$lib/db/audit/funcs.remote';
	import { edit_icon } from '$lib/Icons.svelte';
	import { id } from 'zod/v4/locales';

	type Props = {
		onedit: (d: any) => void;
		ondelete: (d: any) => void;
	};

	let { onedit, ondelete }: Props = $props();
</script>

<svelte:boundary>
	{@const data = await list()}
	{#snippet pending()}
		loading awesome table
	{/snippet}
	{#snippet failed()}
		table wasnt awesome
	{/snippet}
	<pre>{JSON.stringify(await list(), null, 2)}</pre>
	<table>
		<caption>Thing in the place</caption>
		<thead>
			<tr>
				<th>ID</th>
				<th>Created</th>
				<th>Message</th>
				<th>Payload</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each data as d}
				<tr>
					<td>{d.id}</td>
					<td>{d.created.toDateString()}</td>
					<td>{d.message}</td>
					<td><pre>{JSON.stringify(d.payload, null, 2)}</pre></td>
					<td class="">
						<div class="flex gap-1">
							<button class="button edit" onclick={() => onedit(d.id)}>
								{@render edit_icon()}
								Edit
							</button>
							<button class="button delete" onclick={() => ondelete(d.id)}>Delete</button>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</svelte:boundary>

<style>
	td,
	th {
		border: 1px solid #eee;
		padding: 1rex 1rem;
	}
	caption {
		font-weight: 600;
		font-size: 1.2rem;
		text-align: left;
	}
	.button {
		--light: color-mix(in oklch, var(--color), white 90%);
		--dark: color-mix(in oklch, var(--color), black 60%);
		border: 1px solid var(--dark);
		color: var(--dark);
		background: var(--light);
		padding: 0.5rex 1ch;
		font-weight: 600;
		font-size: 0.9rem;
		border-radius: 900rem;
		cursor: pointer;
		display: flex;
		gap: 1rch;
	}
	.edit {
		--color: var(--color-green-500);
	}
	.delete {
		--color: var(--color-red-500);
	}
</style>
