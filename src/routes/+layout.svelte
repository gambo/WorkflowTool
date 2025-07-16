<script lang="ts">
	import '@fontsource-variable/inter-tight';
	import '@fontsource-variable/victor-mono';
	import '../app.css';

	let { data, children } = $props();
</script>

{#if data?.username}
	<span>Hi <a class="text-sky-700 underline" href="/user/profile">{data.username}</a></span>
{/if}
{@render children()}
