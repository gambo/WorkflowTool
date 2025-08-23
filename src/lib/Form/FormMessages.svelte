<script lang="ts">
	import type { RemoteForm } from '@sveltejs/kit';
	import type { Snippet } from 'svelte';
	import type { $ZodIssue } from 'zod/v4/core';

	type Props = {
		form: RemoteForm<
			{ status: 'success'; message: string } | { status: 'fail'; error: $ZodIssue[] }
		>;
	};

	let { form }: Props = $props();
</script>

<div class="py-4">
	{#if form.pending}
		<div class="rounded bg-sky-100 px-4 py-2 text-sky-700">submitting form</div>
	{/if}

	{#if form.result}
		{#if form.result.status === 'success'}
			<div class="rounded bg-green-200 px-4 py-2 text-green-900">
				{form.result.message}
			</div>
		{:else}
			<div
				class="grid grid-cols-[min-content_1fr] gap-x-2 rounded bg-amber-200 px-4 py-2 text-amber-900"
			>
				{#each form.result.error as error}
					<span class="font-bold first-letter:uppercase">{error.path}</span>
					<span>{error.message}</span>
				{/each}
			</div>
		{/if}
	{/if}
</div>
