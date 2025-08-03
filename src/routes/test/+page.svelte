<script module>
	export const label = 'Test Page';
</script>

<script lang="ts">
	import { user } from '$lib/user/user.remote';

	import UserForm from '$lib/user/UserForm.svelte';
	import UserList from '$lib/user/UserList.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
	let id: string | undefined = $state();
	const onedit = (userid: string) => {
		id = userid;
	};
</script>

<div class="grid gap-8">
	<svelte:boundary>
		{#snippet pending()}
			loading...
		{/snippet}
		{#snippet failed()}
			oh no
		{/snippet}
		<UserForm {id} />
		<UserList {onedit} />
	</svelte:boundary>
</div>
