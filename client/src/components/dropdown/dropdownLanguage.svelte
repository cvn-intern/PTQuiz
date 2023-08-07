<script lang="ts">
	import Icon from '@iconify/svelte';
	import { t, locale, locales } from '$i18n/translations';
	let show = false;
	let container;
	export let handleOptionClick = (value: any) => {};

	function onWindowClick(e) {
		if (container.contains(e.target) == false) show = false;
	}
</script>

<svelte:window on:click={onWindowClick} />

<div bind:this={container}>
	<button on:click={() => (show = !show)} class="relative">
		<button class="rounded-md focus:outline-none bg-primary">
			{#if $locale === 'en'}
				<Icon icon="twemoji-flag-for-flag-united-kingdom" class="text-3xl" />
			{:else}
				<Icon icon="twemoji-flag-for-flag-vietnam" class="text-3xl" />
			{/if}
		</button>
	</button>
	{#if show}
		<div class="absolute rounded-md shadow-lg">
			{#each $locales as value}
				<button
					class="cursor-pointer p-2 hover:bg-gray-200 flex flex-col"
					on:click={() => handleOptionClick(value)}
				>
					{#if value === 'en'}
						<Icon icon="twemoji-flag-for-flag-united-kingdom" class="text-3xl" />
					{:else}
						<Icon icon="twemoji-flag-for-flag-vietnam" class="text-3xl" />
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

