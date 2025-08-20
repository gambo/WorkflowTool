<script lang="ts">
	import type { RemoteForm } from '@sveltejs/kit';
	import type { Snippet } from 'svelte';
	import type { $ZodIssue } from 'zod/v4/core';

	type Props = {
		form: RemoteForm<{ success: true; message: string } | { success: false; error: $ZodIssue[] }>;
	};

	let { form }: Props = $props();
</script>

{#if form.pending}
	submitting form
{/if}

{#if form.result}
	{#if form.result.success === true}
		{form.result.message}
	{:else}
		<div class="grid grid-cols-[min-content_1fr] gap-x-2">
			{#each form.result.error as error}
				<span class="font-bold first-letter:uppercase">{error.path}</span>
				<span>{error.message}</span>
			{/each}
		</div>
	{/if}
{/if}
