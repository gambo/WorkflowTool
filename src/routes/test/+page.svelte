<script lang="ts">
	import type { Snippet } from 'svelte';
	import { list, add, del } from './ok.remote';
	import FormMessages from '$lib/Form/FormMessages.svelte';
	import AutoTable from '$lib/Components/AutoTable.svelte';
	import Input from '$lib/Form/Input.svelte';
	import Button from '$lib/Form/Button.svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
	let id: string | undefined = $state();
</script>

<div class="m-8 w-90">
	<AutoTable {list} {del} />
	<FormMessages form={add} />
	<form {...add}>
		<Input name="column" label="Name" required />
		<Input name="color" type="color" label="Color" required />
		<Input name="description" label="Description" required />
		<Input name="order" type="number" label="Order" required />
		<Input name="check" type="checkbox" label="check?" />
		<Button>save</Button>
	</form>
</div>
