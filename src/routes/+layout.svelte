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
	<div class="grid h-full grid-cols-[200px_auto] p-4 text-slate-800">
		<div>
			<MainMenu />
		</div>
		<div>
			{@render children()}
		</div>
	</div>
</App>
