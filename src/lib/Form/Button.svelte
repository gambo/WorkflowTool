<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
	} & HTMLButtonAttributes;

	let { children, ...rest }: Props = $props();
	const classes = [
		'rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none',
		rest.class || ''
	];
</script>

<button class={classes} {...rest}>
	{@render children()}
</button>
