<script lang="ts">
	import '@fontsource-variable/inter-tight';
	import '@fontsource-variable/victor-mono';
	import '../app.css';
	import MainMenu from '$lib/Components/MainMenu.svelte';
	import App from '$lib/Components/App.svelte';

	let { data, children } = $props();
</script>

<App>
	<MainMenu />
	{@render children()}
</App>
