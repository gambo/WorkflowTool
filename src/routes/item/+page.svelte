<script module>
	export const label = 'Item';
</script>

<script lang="ts">
	import ItemForm from '$lib/item/ItemForm.svelte';
	import ItemList from '$lib/item/ItemList.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();

	let id: string | undefined = $state();
	const onedit = (itemid: string) => {
		id = itemid;
	};
</script>

<ItemList {onedit} />
<ItemForm {id} />
