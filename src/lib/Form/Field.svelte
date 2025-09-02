<script lang="ts">
	import Field from './Field.svelte';
	import Input from './Input.svelte';
	import Select from './Select.svelte';
	import { titlecase } from '$lib';
	import { findAllByAltText } from 'storybook/internal/test';

	type Props = {
		name: string;
		data: any;
		required: boolean;
		defaultValue?: any;
	};

	let { name, data, required }: Props = $props();
</script>

<div class="field mb-3">
	{#if data.widget === 'hidden'}
		<!-- Purposefully blank -->
	{:else if data.format === 'date-time'}
		{@const label = data.widget?.label ?? titlecase(name)}
		<Input {label} {name} type="date" {required} />
	{:else if data.widget === 'color'}
		{@const label = data.widget?.label ?? titlecase(name)}
		<Input {label} {name} type="color" {required} />
	{:else if data.widget === 'password'}
		{@const label = data.widget?.label ?? titlecase(name)}
		<Input {label} {name} type="password" {required} />
	{:else if data.widget === 'email'}
		{@const label = data.widget?.label ?? titlecase(name)}
		<Input {label} {name} type="email" {required} />
	{:else if data.widget === 'lookup'}
		<svelte:boundary>
			{#snippet pending()}
				loading references
			{/snippet}
			{#snippet failed(e)}
				{#if e instanceof Error}{e.message}
				{:else}unknown error{/if}
			{/snippet}
			{@const title = data.widget?.label ?? titlecase(name)}
			{@const { key, label } = data}
			{@const list = await import(`../../lib/db/${data.table}/funcs.remote.ts`).then(x => x.list)}
			{@const entries = await list()}
			<Select label={title} {name} {required}>
				<option>Select an option</option>
				{#each entries as option}
					<option value={option[key]}>{option[label]}</option>
				{/each}
			</Select>
		</svelte:boundary>
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
</div>
