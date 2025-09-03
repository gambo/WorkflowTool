<script lang="ts" generics="T extends Array<Record<string, any>> = Record<string, any>[]">
	import Date from '$lib/Components/Formatters/Date.svelte';
	import Color from '$lib/Components/Formatters/Color.svelte';
	import Num from '$lib/Components/Formatters/Number.svelte';
	import Str from '$lib/Components/Formatters/String.svelte';
	import YesNo from '$lib/Components/Formatters/YesNo.svelte';
	import Json from '$lib/Components/Formatters/Json.svelte';
	import { chevron, trash_icon } from '$lib/Icons.svelte';
	import type { RemoteForm, RemoteQueryFunction } from '@sveltejs/kit';
	import { fly, slide } from 'svelte/transition';

	type Props = {
		list: RemoteQueryFunction<void, T>;
		list_asc_by: RemoteQueryFunction<string, T>;
		list_desc_by: RemoteQueryFunction<string, T>;
		del: RemoteForm<{ status: string; message: string }>;
		table_config: Partial<Record<string, keyof typeof format>>;
	};

	let { list, list_asc_by, list_desc_by, del, table_config = {} }: Props = $props();
	const td_classes = 'px-2 py-1 max-w-80 truncate';
	const id = (x: any) => x;
	const format = {
		date: Date,
		boolean: YesNo,
		number: Num,
		string: Str,
		color: Color,
		json: Json
	};
	let dlist = $derived(list);
	let sorters: Record<string, 'asc' | 'desc' | undefined> = $state({});
	const sort = (by: string) => {
		if (!sorters[by]) {
			dlist = () => list_asc_by(by);
			sorters = {};
			sorters[by] = 'asc';
		} else if (sorters[by] === 'asc') {
			dlist = () => list_desc_by(by);
			sorters = {};
			sorters[by] = 'desc';
		} else {
			dlist = list;
			sorters = {};
		}
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
		<table class="w-full">
			<thead>
				<tr class="border-b border-slate-300">
					{#each await dlist() as h, i}
						{#if i === 0}
							{#each Object.keys(h) as title}
								<td class="{td_classes} font-semibold first-letter:uppercase">
									<button class="flex items-center gap-1" onclick={() => sort(title)}
										>{title}{@render sort_arrow(title)}</button
									>
								</td>
							{/each}
						{/if}
					{/each}
					<td class="{td_classes} font-semibold first-letter:uppercase"></td>
				</tr>
			</thead>
			<tbody>
				{#each await dlist() as item}
					<tr class="odd:bg-neutral-50 hover:bg-sky-50">
						{#each Object.entries(item) as [k, i]}
							{@const formatter = table_config[k]}
							{#if formatter}
								{@const Comp = format[formatter]}
								<td class={td_classes} title={i}>
									<Comp value={i} />
								</td>
							{:else}
								<td>{i}</td>
							{/if}
						{/each}
						<td class={td_classes}>
							<button
								name="id"
								class="cursor-pointer rounded-full p-2 hover:bg-red-700 hover:text-white"
								value={item.id}
								{...del.buttonProps}>{@render trash_icon()}</button
							>
						</td>
					</tr>
				{:else}
					<tr><td>No Entries</td></tr>
				{/each}
			</tbody>
		</table>
	</svelte:boundary>
</form>

{#snippet sort_arrow(title: string)}
	{#if sorters[title] === 'asc'}
		<span in:fly={{ y: -10, duration: 200 }}>
			{@render chevron()}
		</span>
	{:else if sorters[title] === 'desc'}
		<span
			in:fly={{
				y: -10,
				duration: 200
			}}
			class="rotate-180"
		>
			{@render chevron()}
		</span>
	{/if}
{/snippet}
