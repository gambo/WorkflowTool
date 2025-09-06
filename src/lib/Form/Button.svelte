<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLButtonAttributes, HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		variant?: 'primary' | 'secondary' | 'danger';
		class?: ClassValue;
	} & HTMLButtonAttributes;

	let { variant = 'primary', children, ...rest }: Props = $props();
	const classes = [
		variant === 'primary' && 'bg-sky-700 hover:bg-sky-600 text-white focus:ring-sky-900',
		variant === 'secondary' &&
			'bg-neutral-50 hover:bg-neutral-200  text-neutral-900 focus:ring-blue-900',
		variant === 'danger' && 'bg-red-50 hover:bg-red-200 text-red-900 focus:ring-blue-900',
		'rounded px-4 py-2',
		'flex items-center gap-2 text-sm',
		rest.class
	];
</script>

<button {...rest} class={classes}>
	{@render children()}
</button>
