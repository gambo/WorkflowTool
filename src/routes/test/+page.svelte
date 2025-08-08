<script module>
	export const label = 'Test Page';
</script>

<script lang="ts">
	import { user } from '$lib/user/user.remote';

	import UserForm from '$lib/user/UserForm.svelte';
	import UserList from '$lib/user/UserList.svelte';
	import type { Snippet } from 'svelte';
	import { jobWithItems } from './job.remote';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
	let id: string | undefined = $state();
</script>

<svelte:boundary>
	{#snippet pending()}
		loading...
	{/snippet}
	{#snippet failed()}
		oh no
	{/snippet}
	{#each await jobWithItems() as job}
		<pre>{JSON.stringify(job, null, 2)}</pre>
	{/each}
</svelte:boundary>
