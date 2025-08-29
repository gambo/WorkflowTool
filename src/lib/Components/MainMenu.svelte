<script>
	import Logo from './Logo.svelte';
	import Pipe from './Pipe.svelte';
	import { list_asc_by as menu } from '$routes/content/menu/funcs.remote';
	import { page } from '$app/state';
</script>

<div class="grid p-4 text-sm font-medium">
	<a href="/" title="Home" class="flex items-center gap-1 px-4">
		<Logo />
		Workflow
	</a>
	<div class="grid gap-1 pt-8 text-slate-700">
		<svelte:boundary>
			{#snippet pending()}
				getting menu...
			{/snippet}
			{#snippet failed()}
				error loading menu
			{/snippet}
			{#each await menu('order') as item (item.id)}
				{@const active = [page.url.pathname === item.path && 'bg-violet-100']}
				<a href={item.path} class="rounded px-4 py-1.5 transition hover:bg-sky-50 {active}"
					>{item.label}</a
				>
			{/each}
		</svelte:boundary>
	</div>
</div>
