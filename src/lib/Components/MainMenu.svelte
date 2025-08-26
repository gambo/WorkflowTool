<script>
	import Logo from './Logo.svelte';
	import Pipe from './Pipe.svelte';
	import { list as menu } from '$routes/content/menu/funcs.remote';
	import { page } from '$app/state';
</script>

<div class="grid p-4 text-sm font-semibold">
	<a href="/" title="Home" class="flex items-center gap-1">
		<Logo />
		Workflow
	</a>
	<div class="grid pt-4">
		<svelte:boundary>
			{#snippet pending()}
				getting menu...
			{/snippet}
			{#snippet failed()}
				error loading menu
			{/snippet}
			{#each await menu() as item (item.id)}
				{@const active = [page.url.pathname === item.path && 'bg-violet-100']}
				<a href={item.path} class="px-3 py-2 hover:bg-sky-50 {active}">{item.label}</a>
			{/each}
		</svelte:boundary>
	</div>
</div>
