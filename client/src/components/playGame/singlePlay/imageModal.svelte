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
	<a
		class="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50"
		on:click={handleOutsideClick}
		type="button"
		href={'#'}
	>
		<div class="relative">
			<img src={imageSrc} alt="quizzesImage" class="rounded-xl shadow-xl scale-[2.5]" />
		</div>
	</a>
{/if}
