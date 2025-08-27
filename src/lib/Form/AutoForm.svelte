<script lang="ts" generics="T extends Array<Record<string, any>> = Record<string, any>[]">
	import type { RemoteForm } from '@sveltejs/kit';
	import { setContext, type Snippet } from 'svelte';
	import FormMessages from './FormMessages.svelte';
	import type { $ZodIssue } from 'zod/v4/core';
	import Button from './Button.svelte';
	import type z from 'zod';
	import Field from './Field.svelte';

	type AddType = RemoteForm<
		{ status: 'success'; message: string } | { status: 'fail'; error: $ZodIssue[] | string }
	>;
	type Props = {
		schema: ReturnType<typeof z.toJSONSchema>['schemas']['string'];
		data?: Record<string, any>;
		add: AddType;
	};

	let { schema, add, data }: Props = $props();
	setContext('formData', data ?? {});
</script>

<FormMessages form={add} />
<form
	{...add.enhance(async ({ form, submit }) => {
		try {
			await submit();
			if (add.result?.status === 'success') {
				form.reset();
			}
		} catch {}
	})}
>
	{#if schema.properties}
		{@const requireds = schema.required ?? []}
		{#each Object.entries(schema.properties) as [name, data]}
			<Field {name} {data} required={requireds.includes(name)} />
		{/each}
	{/if}

	<Button class="mt-8">save</Button>
</form>
<details class="mt-2">
	<summary>debug</summary>
	<pre>{JSON.stringify(schema, null, 2)}</pre>
</details>
