<!-- Modal.svelte -->
<script lang="ts">
	export let open: boolean;
	export let autoclose = false;

	let modalOpen = false;

	function closeModal() {
		modalOpen = false;
	}

	function handleBackdropClick(event) {
		if (event.target === event.currentTarget && autoclose) {
			closeModal();
		}
	}

	$: {
		modalOpen = open;
	}

	document.body.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && modalOpen) {
			closeModal();
		}
	});
</script>

{#if modalOpen}
	<div
		class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-20"
		on:click={handleBackdropClick}
	>
		<slot />
	</div>
{/if}
