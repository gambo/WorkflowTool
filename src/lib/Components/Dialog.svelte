<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		button: Snippet;
		children: Snippet;
	};

	let { button, children }: Props = $props();
	let dialog = $state();
	const showModal = (e: Event) => {
		if (dialog instanceof HTMLDialogElement) {
			dialog.showModal();
		}
	};
</script>

<button onclick={showModal} class="rounded bg-sky-700 px-2 py-1 text-white/90"
	>{@render button()}</button
>
<dialog
	bind:this={dialog}
	class="rounded p-16 opacity-0 transition-all transition-discrete duration-500 outline-none open:opacity-100 open:backdrop:bg-black/50 starting:open:opacity-0"
>
	{@render children()}
</dialog>

<style>
	dialog {
		position: absolute;
		width: 50%;
		height: 80%;
		margin: auto;
		background: white;
	}
</style>
