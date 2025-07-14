<script lang="ts">
	import '@fontsource-variable/inter-tight';
	import '../app.css';

	let { data, children } = $props();
</script>

<span>Hi {data.username}</span>
{@render children()}
