<script module>
	export const label = 'Login';
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="m-8 p-8">
	<h1 class="text-2xl">Login/Register</h1>
	<form method="post" action="?/login" use:enhance>
		<div class="grid w-min gap-1">
			<label>
				Username
				<input
					name="username"
					class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</label>
			<label>
				Email
				<input
					type="email"
					name="email"
					class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</label>
			<label>
				Password
				<input
					type="password"
					name="password"
					class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</label>
			<div class="grid gap-2 pt-8">
				<button
					formaction="?/register"
					class="rounded bg-slate-100 px-3 py-2 text-left hover:bg-slate-200">Register</button
				>
				<button
					class="rounded-md bg-sky-600 px-4 py-2 text-left text-white transition hover:bg-sky-700"
					>Login</button
				>
			</div>
		</div>
	</form>
	<p style="color: red">{form?.message ?? ''}</p>
</div>
