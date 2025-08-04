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
	
	let id: string | undefined = $state();
	const onedit = (jobid: string) => {
		id = jobid;
	};
</script>

<JobList {onedit} />
<JobForm {id}/>
<hr class="border-b py-8" />
<UserList onedit={(id) => alert(id)} />
<UserForm />
