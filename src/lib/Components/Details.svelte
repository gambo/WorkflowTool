<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLDetailsAttributes } from 'svelte/elements';

	type Props = {
		summary: string;
		children: Snippet;
	} & HTMLDetailsAttributes;
	let { summary, children, ...rest }: Props = $props();
</script>

<div>
	<details {...rest}>
		<summary class="flex list-none items-center gap-1 text-[13px] text-slate-500">
			<span>{summary}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="12"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="transition-all"><path d="m6 9 6 6 6-6" /></svg
			>
		</summary>
		{@render children()}
	</details>
</div>

<style>
	::details-content {
		--ease: cubic-bezier(0.715, -0.185, 0.165, 1.215);
		transition:
			height 0.25s var(--ease),
			content-visibility 0.25s var(--ease) allow-discrete;
		height: 0;
		overflow: clip;
	}

	:root {
		interpolate-size: allow-keywords;
	}
	summary {
		cursor: pointer;
	}
	summary svg {
		rotate: -90deg;
	}
	details[open] {
		&::details-content {
			height: auto;
		}
		summary svg {
			rotate: 0deg;
		}
	}
</style>
