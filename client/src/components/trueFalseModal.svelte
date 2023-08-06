<script lang="ts">
	export let open: boolean;
	let modalOpen = false;
	export let isTrue: boolean;
	import correctSound from '$assets/correctSound.mp3';
	import wrongSound from '$assets/wrongSound.mp3';

	import trueOption from '../assets/trueOption.png';
	import falseOption from '../assets/falseOption.png';

	function closeModal() {
		modalOpen = false;
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	$: {
		modalOpen = open;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && modalOpen) {
			closeModal();
		}
	}
</script>

{#if modalOpen}
	<a
		href="#"
		class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-[0.15]"
		on:click={handleBackdropClick}
		on:keydown={handleKeyDown}
	>
		<!-- Audio when open modal -->
		<div class="flex justify-center items-center">
			{#if isTrue}
				<audio src={correctSound} autoplay />
				<img src={trueOption} class="w-32 h-32 md:w-60 md:h-60" alt="True Option" />
			{:else}
				<audio src={wrongSound} autoplay />
				<img src={falseOption} class="w-32 h-32 md:w-60 md:h-60" alt="False Option" />
			{/if}
		</div>
	</a>
{/if}
