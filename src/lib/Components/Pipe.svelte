<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class: ClassValue;
		children: Snippet;
	};

	let { class: classes, children }: Props = $props();
</script>

<div class="flex items-center gap-2 {classes}">
	{@render children()}
</div>
