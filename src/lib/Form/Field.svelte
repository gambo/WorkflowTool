<script lang="ts">
	import type { Snippet } from 'svelte';
	import Field from './Field.svelte';
	import Input from './Input.svelte';
	import Select from './Select.svelte';
	import { titlecase } from '$lib';

	type Props = {
		name: string;
		data: any;
		required: boolean;
	};

	let { name, data, required }: Props = $props();
</script>

{#if data.widget === 'hidden'}
	<!-- Purposefully blank -->
{:else if data.widget === 'color'}
	{@const label = data.widget?.label ?? titlecase(name)}
	<Input {label} {name} type="color" {required} />
{:else if data.type === 'string' && !data.enum}
	{@const label = data.widget?.label ?? titlecase(name)}
	<Input {label} {name} type={data.type} {required} />
{:else if data.type === 'number' || data.type === 'integer'}
	{@const label = data.widget?.label ?? titlecase(name)}
	<Input {label} {name} type={data.type} {required} />
{:else if data.type === 'boolean'}
	{@const label = data.widget?.label ?? titlecase(name)}
	<Input {label} {name} type="checkbox" {required} />
{:else if data.type === 'string' && data.format === 'color'}
	{@const label = data.widget?.label ?? titlecase(name)}
	<Input {label} {name} type="color" {required} />
{:else if data.enum}
	{@const label = data.widget?.label ?? titlecase(name)}
	<Select {label} {name} {required}>
		{#each data.enum as option}
			<option value={option}>{option}</option>
		{/each}
	</Select>
{:else if data.anyOf}
	<Field {name} data={data.anyOf[0]} {required} />
{:else}
	<pre>{JSON.stringify({ name, data, required }, null, 2)}</pre>
{/if}
