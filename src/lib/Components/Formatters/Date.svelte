<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		value: any;
	};

	let { value }: Props = $props();
</script>

<div>{new Date(value).toDateString()}</div>
