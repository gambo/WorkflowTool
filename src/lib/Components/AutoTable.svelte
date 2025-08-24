<script lang="ts" generics="T extends Record<string, any>[] = Record<string, any>[]">
	import { trash_icon } from '$lib/Icons.svelte';
	import type { RemoteForm, RemoteQueryFunction } from '@sveltejs/kit';

	type Props = {
		list: RemoteQueryFunction<void, T>;
		del: RemoteForm<{ status: string; message: string }>;
		config?: Record<string, 'date' | 'boolean' | 'number'>;
	};

	let { list, del, config }: Props = $props();
	const td_classes = 'border border-slate-200 px-2 py-1 text-sm truncate';
	const id = (x: any) => x;
	const format_funcs = {
		date: (d: string) => new Date(d).toLocaleDateString(),
		boolean: (b: boolean) => (b ? 'Yes' : 'No'),
		number: (n: number) => n.toString()
	};
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
								<td class="{td_classes} font-semibold first-letter:uppercase">{title}</td>
							{/each}
						{/if}
					{/each}
					<td class="{td_classes} font-semibold first-letter:uppercase"></td>
				</tr>
			</thead>
			<tbody>
				{#each await list() as item}
					<tr class="odd:bg-neutral-50">
						{#each Object.entries(item) as [k, i]}
							{@const format = config && config[k] ? format_funcs[config[k]] : id}
							<td class={td_classes}>{format(i)}</td>
						{/each}
						<td class={td_classes}>
							<button name="id" value={item.id} {...del.buttonProps}>{@render trash_icon()}</button>
						</td>
					</tr>
				{:else}
					<tr><td>No Entries</td></tr>
				{/each}
			</tbody>
		</table>
	</svelte:boundary>
</form>
