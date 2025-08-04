<script lang="ts">
	import JobForm from '$lib/job/JobForm.svelte';
	import JobList from '$lib/job/JobList.svelte';
	import UserForm from '$lib/user/UserForm.svelte';
	import UserList from '$lib/user/UserList.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<JobList onedit={(e) => alert(e)} />
<JobForm />
<hr class="border-b py-8" />
<UserList onedit={(id) => alert(id)} />
<UserForm />
