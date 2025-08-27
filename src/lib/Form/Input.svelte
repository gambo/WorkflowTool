<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		label: string;
		name: string;
		type?: string;
	} & HTMLInputAttributes;

	const inputClass = [
		'border border-slate-300 bg-slate-50',
		'px-[1rch] py-[1rex]',
		'rounded outline-sky-500'
	];

	let { name, type = 'text', label, ...rest }: Props = $props();
	let ok: Record<string, any> = getContext('formData');
	let defaultValue = $derived(ok[name]);
</script>

{#if type === 'checkbox'}
	<div class="grid">
		<label for={name} class="flex items-center gap-2">
			<input class={inputClass} {name} id={name} {type} {...rest} defaultChecked={defaultValue} />
			{label}</label
		>
	</div>
{:else}
	<div class="grid">
		<label for={name}>{label}</label>
		<input class={inputClass} id={name} {name} {type} {...rest} {defaultValue} />
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
