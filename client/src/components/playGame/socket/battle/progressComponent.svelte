<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	export let progress: number;
	export let color:
		| 'gray'
		| 'red'
		| 'yellow'
		| 'green'
		| 'indigo'
		| 'purple'
		| 'blue'
		| 'primary'
		| undefined;
</script>

{#if progress > 0}
	<Progressbar
		progress={progress.toString()}
		labelInside
		labelInsideClass="text-blue-100 h-6 md:h-10 text-lg md:text-2xl font-medium text-center p-2 leading-none rounded-full flex items-center"
		{color}
		class="bg-gray-400 h-6 md:h-10 flex items-center"
	/>
{:else}
	<Progressbar progress={progress.toString()} {color} class="bg-gray-400 h-6  md:h-10 " />
{/if}
