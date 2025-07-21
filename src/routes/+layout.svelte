<script lang="ts">
	import '@fontsource-variable/inter-tight';
	import '@fontsource-variable/victor-mono';
	import '../app.css';
	import Menu from '$lib/Menu.svelte';

	let { data, children } = $props();
</script>

<div class="app">
	<div style:grid-area="header">
		{#if data?.username}
			<span>Hi <a class="text-theme-700 underline" href="/user/profile">{data.username}</a></span>
		{/if}
	</div>
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
