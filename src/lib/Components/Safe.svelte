<script lang="ts" generics="T extends () => Promise<any> = T">
	import { item } from '$lib/item/item.remote';
	import type { Snippet } from 'svelte';

	type Props = {
		item: Snippet<[ReturnType<Awaited<T>>]>;
		pending: Snippet;
		fail: Snippet;
		call: T;
	};

	let { call, pending, fail }: Props = $props();
</script>

<svelte:boundary>
	{@render pending()}
	{@render fail()}
	{#each await call() as item_contents}
		{@render item(item_contents)}
	{/each}
</svelte:boundary>
