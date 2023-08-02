<script lang="ts">
	import Icon from '@iconify/svelte';

	export let imageSrc: string;
	export let modalOpen: boolean;

	const closeModal = () => {
		modalOpen = false;
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	};
</script>

{#if modalOpen}
	<button
		class="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50"
		on:click={handleOutsideClick}
	>
		<div class="relative">
			<button
				class="absolute top-2 right-2 text-red-600"
				on:click={() => {
					closeModal();
				}}
			>
				<Icon icon="ph:x-bold" class="w-6 h-6" />
			</button>
			<img
				src={imageSrc}
				alt="quizzesImage"
				class="w-full h-full rounded-xl shadow-xl scale-[2.5]"
			/>
		</div>
	</button>
{/if}
