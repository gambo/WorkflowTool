<script module>
	export { workflow_icon, trash_icon, spinner_icon, edit_icon, add_icon, priority_up };
</script>

{#snippet priority_up()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-arrow-up-icon lucide-arrow-up"
		><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg
	>
{/snippet}

{#snippet add_icon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg
	>
{/snippet}

{#snippet workflow_icon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-workflow-icon lucide-workflow"
		><rect width="8" height="8" x="3" y="3" rx="2" /><path d="M7 11v4a2 2 0 0 0 2 2h4" /><rect
			width="8"
			height="8"
			x="13"
			y="13"
			rx="2"
		/></svg
	>
{/snippet}

{#snippet trash_icon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="12"
		height="12"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-trash2-icon lucide-trash-2"
		><path d="M10 11v6" /><path d="M14 11v6" /><path
			d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
		/><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg
	>
{/snippet}

{#snippet spinner_icon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-loader-circle-icon lucide-loader-circle"
		><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg
	>
{/snippet}

{#snippet edit_icon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-file-pen-line-icon lucide-file-pen-line"
		><path
			d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"
		/><path
			d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
		/><path d="M8 18h1" /></svg
	>
{/snippet}
