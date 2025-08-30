<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from './Header.svelte';
	import Button from '$lib/Form/Button.svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<Header title="Woo there" description="checkout the thing in the place">
	{#snippet actionButtons()}
		<Button>ok</Button>
	{/snippet}
</Header>
