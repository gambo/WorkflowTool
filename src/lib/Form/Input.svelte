<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		label: string;
		name: string;
		type?: string;
	} & HTMLInputAttributes;

	let { name, type = 'text', label, ...rest }: Props = $props();
</script>

{#if type === 'checkbox'}
	<div class="grid">
		<label for={name} class="flex items-center gap-2">
			<input
				class="border border-slate-300 bg-slate-50 px-[1rch] py-[1rex] outline-sky-500"
				{name}
				id={name}
				{type}
				{...rest}
			/>
			{label}</label
		>
	</div>
{:else}
	<div class="grid">
		<label for={name}>{label}</label>
		<input
			class="border border-slate-300 bg-slate-50 px-[1rch] py-[1rex] outline-sky-500"
			id={name}
			{name}
			{type}
			{...rest}
		/>
	</div>
{/if}

<style>
	input[type='color'] {
		height: 3rem;
	}
	input[type='checkbox'] {
		height: 1rem;
		aspect-ratio: 1;
		border: 1px solid green;
		accent-color: red;
	}
</style>
