<script lang="ts">
	import type { Snippet } from 'svelte';
	import Field from './Field.svelte';
	import Input from './Input.svelte';
	import Select from './Select.svelte';

	type Props = {
		name: string;
		data: any;
		required: boolean;
	};

	let { name, data, required }: Props = $props();
</script>

{#if data.widget === 'hidden'}
	<!-- Purposefully blank -->
{:else if data.type === 'string' && !data.enum}
	<Input label={name} {name} type={data.type} {required} />
{:else if data.type === 'number' || data.type === 'integer'}
	<Input label={name} {name} type={data.type} {required} />
{:else if data.type === 'boolean'}
	<Input label={name} {name} type="checkbox" {required} />
{:else if data.type === 'string' && data.format === 'color'}
	<Input label={name} {name} type="color" {required} />
{:else if data.enum}
	<Select label={name} {name} {required}>
		{#each data.enum as option}
			<option value={option}>{option}</option>
		{/each}
	</Select>
{:else if data.anyOf}
	<Field {name} data={data.anyOf[0]} {required} />
{:else}
	<textarea {name}>{name}</textarea>
{/if}
