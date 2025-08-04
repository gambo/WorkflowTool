<script lang="ts">
	type Props = {};

	let {}: Props = $props();

	const replace = (x: string) => {
		return x.replace('/src/routes', '').replace('+page.svelte', '');
	};

	async function prepare_menu() {
		let files = import.meta.glob('/src/**/+page.svelte');
		let ret = [];
		for (let file in files) {
			let { label } = (await files[file]()) as { label: string };
			if (!label) continue;
			ret.push([replace(file), label]);
		}
		return ret;
	}

	const pages = $derived(await prepare_menu());
</script>

<menu class="p-4">
	<ul class="grid">
		<svelte:boundary>
			{#snippet pending()}
				loading
			{/snippet}
			{#snippet failed()}
				oops
			{/snippet}
			{#each pages as [key, label]}
				<li>
					<a href={key} class="grid px-3 py-2 hover:bg-slate-200">{label}</a>
				</li>
			{/each}
		</svelte:boundary>
	</ul>
</menu>
