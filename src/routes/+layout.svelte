<script lang="ts">
	import '@fontsource-variable/inter-tight';
	import '@fontsource-variable/victor-mono';
	import '../app.css';
	import Menu from '$lib/Menu.svelte';
	import { workflow_icon } from '$lib/Icons.svelte';
	import { Toaster } from 'svelte-french-toast';

	let { data, children } = $props();
</script>

<Toaster toastOptions={{ position: 'top-right', className: 'mytoast' }} />
<div class="app">
	<div style:grid-area="header" class="flex items-center border-b p-2 px-8 text-black">
		<span>
			{@render workflow_icon()}
		</span>
		{#if data?.username}
			<span class="ml-auto">
				<a class="text-theme-700 underline" href="/user/profile">{data.username}</a>
			</span>
		{/if}
	</div>
	{#if data?.username}
		<div style:grid-area="menu">
			<svelte:boundary>
				{#snippet pending()}
					loading
				{/snippet}
				{#snippet failed()}
					failed
				{/snippet}
				<Menu></Menu>
			</svelte:boundary>
		</div>
	{/if}
	<main style:grid-area="main" class="p-2">
		{@render children()}
	</main>
</div>

<style>
	.app {
		display: grid;
		grid-template-columns: 200px 1fr;
		grid-template-areas:
			'header header header'
			'menu main main';
	}
</style>
