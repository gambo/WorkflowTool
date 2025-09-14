<script lang="ts">
	import type { Snippet } from 'svelte';
	import Table from './Table.svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
	let onedit = (d: number) => alert(`editing ${d}`);
	let ondelete = (d: number) => alert(`deleteing ${d}`);
</script>

<Table {onedit} {ondelete} />
