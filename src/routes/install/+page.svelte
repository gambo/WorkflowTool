<script lang="ts">
	import type { Snippet } from 'svelte';
	import { doit } from './funcs.remote';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<form {...doit}>
	<button>submit</button>
</form>
