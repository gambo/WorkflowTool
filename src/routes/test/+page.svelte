<script module>
	export const label = 'Test';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PageServerData } from './$types';
	import Menu from '$lib/Menu.svelte';

	type Props = {
		children: Snippet;
		data: PageServerData;
	};

	let { children, data }: Props = $props();
</script>
