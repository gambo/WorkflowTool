<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		value: any;
	};

	let { value }: Props = $props();
</script>

<pre>{JSON.stringify(value, null, 2)}</pre>
