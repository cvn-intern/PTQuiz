<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	export let participant: any;
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

<div class="flex w-full items-center">
	<div class="flex flex-col justify-center items-center relative">
		<img
			src={participant.avatar}
			alt={participant.displayName}
			class="h-6 w-6 md:h-20 md:w-auto rounded-md"
		/>
		<p class="bg-white/50 rounded-md font-semibold text-sky-700 text-xs absolute top-20">
			{participant.displayName}
		</p>
	</div>
	{#if progress > 0}
		<Progressbar
			progress={progress.toFixed(2).toString()}
			labelInside
			labelInsideClass="text-blue-100 h-6 md:h-10  text-lg md:text-2xl font-medium text-center p-2 leading-none rounded-full flex items-center"
			{color}
			class="bg-gray-400 h-6 md:h-10 flex items-center"
		/>
	{:else}
		<Progressbar
			progress={progress.toFixed(2).toString()}
			{color}
			class="bg-gray-400 h-6  md:h-10 "
		/>
	{/if}
</div>
