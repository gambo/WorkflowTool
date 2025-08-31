<script>
	import Logo from './Logo.svelte';
	import { list_asc_by as menu } from '$lib/db/menu/funcs.remote';
	import { list as sections } from '$lib/db/menugroup/funcs.remote';
	import { page } from '$app/state';
	import Details from './Details.svelte';
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
			{#each await sections() as section}
				<Details summary={section.label} open>
					<div class="grid">
						{#each await menu('order') as item (item.id)}
							{#if item.menugroup === section.id}
								{@const active = [page.url.pathname === item.path && 'bg-violet-100']}
								<a href={item.path} class="rounded px-4 py-1.5 transition hover:bg-sky-50 {active}"
									>{item.label}</a
								>
							{/if}
						{/each}
					</div>
				</Details>
			{/each}
		</svelte:boundary>
	</div>
</div>
