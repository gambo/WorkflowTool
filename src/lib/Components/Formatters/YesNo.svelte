<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		value: any;
	};

	let { value }: Props = $props();
</script>

<div class="size-6 rounded-full text-right">{value === true ? 'Yes' : 'No'}</div>
