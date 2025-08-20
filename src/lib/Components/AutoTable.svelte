<script lang="ts">
	import type { RemoteForm, RemoteQueryFunction } from '@sveltejs/kit';
	import type { Snippet } from 'svelte';

	type Props = {
		list: RemoteQueryFunction<void, Record<string, any>[]>;
		del: RemoteForm<void>;
	};

	let { list, del }: Props = $props();
</script>

<form>
	<svelte:boundary>
		{#snippet pending()}
			loading...
		{/snippet}
		{#snippet failed()}
			An error occured.
		{/snippet}
		<table>
			<thead>
				<tr class="odd:bg-neutral-50">
					{#each await list() as h, i}
						{#if i === 0}
							{#each Object.keys(h) as title}
								<td class="border border-slate-200 px-2 py-1 font-semibold first-letter:uppercase"
									>{title}</td
								>
							{/each}
						{/if}
					{/each}
					<td class="border border-slate-200 px-2 py-1 font-semibold first-letter:uppercase"
						>Operations</td
					>
				</tr>
			</thead>
			<tbody>
				{#each await list() as item}
					<tr class="odd:bg-neutral-50">
						{#each Object.values(item) as i}
							<td class="border border-slate-200 px-2 py-1">{i}</td>
						{/each}
						<td><button name="id" value={item.id} {...del.buttonProps}>del</button></td>
					</tr>
				{:else}
					<tr><td>No Entries</td></tr>
				{/each}
			</tbody>
		</table>
	</svelte:boundary>
</form>
