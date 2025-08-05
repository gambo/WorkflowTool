<script lang="ts">
	import ItemForm from '$lib/item/ItemForm.svelte';
	import ItemList from '$lib/item/ItemList.svelte';
	import UserForm from '$lib/user/UserForm.svelte';
	import UserList from '$lib/user/UserList.svelte';
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
<ItemForm {id}/>
<hr class="border-b py-8" />
<UserList onedit={(id) => alert(id)} />
<UserForm />
