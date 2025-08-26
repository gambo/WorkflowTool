<script lang="ts">
	import '@fontsource-variable/inter-tight';
	import '@fontsource-variable/victor-mono';
	import '../app.css';
	import MainMenu from '$lib/Components/MainMenu.svelte';
	import App from '$lib/Components/App.svelte';
	import { titlecase } from '$lib';

	let { data, children } = $props();
</script>

<App>
	<MainMenu />
	<div class="grid grid-cols-[min-content_1fr]">
		<ul class="text-sm text-slate-700">
			{#each data.menu as item}
				<li class="grid">
					<a class="px-3 py-2 hover:bg-sky-50" href="/content/{item}">{titlecase(item)}</a>
				</li>
			{/each}
		</ul>
		<div>
			{@render children()}
		</div>
	</div>
</App>
