<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Modal } from 'flowbite-svelte';

	export let open: boolean;
	export let title: string;
	export let buttonText: string;
	export let onButtonClick: () => void;
</script>

{#if open}
	<div class="fixed inset-0 flex items-center justify-center z-50">
		<div class="modal-overlay fixed inset-0 bg-black opacity-50" />
		<div
			class="modal-container bg-white w-96 mx-auto rounded flex justify-center shadow-lg z-50"
		>
			<div class="modal-content px-6 py-4 flex flex-col justify-center">
				<svg
					aria-hidden="true"
					class="mx-auto mb-4 w-14 h-14 text-red-400 dark:text-red-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{title}</h3>
				<button
					class="inline-block mt-5 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
					on:click={onButtonClick}
				>
					{buttonText}
				</button>
			</div>
		</div>
	</div>
{/if}
