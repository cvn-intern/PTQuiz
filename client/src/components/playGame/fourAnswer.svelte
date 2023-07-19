<script lang="ts">
	import Icon from '@iconify/svelte';

	let buttonRounded: string =
		'bg-buttonAnswer rounded-full text-white w-8 h-8 md:w-12 md:h-12 text-2xl md:text-4xl';

	export let opt;

	const options = [
		{
			id: 'A',
			content: opt[0],
			color: 'bg-optionA'
		},
		{
			id: 'B',
			content: opt[1],
			color: 'bg-optionB'
		},
		{
			id: 'C',
			content: opt[2],
			color: 'bg-optionC'
		},
		{
			id: 'D',
			content: opt[3],
			color: 'bg-optionD'
		}
	];
</script>

<div class="grid grid-cols-2 grid-rows-2 gap-4 md:gap-8 min-h-[208px]">
	{#each options as option}
		<button class={`${option.color} rounded-2xl flex p-2 md:p-4 gap-2`}>
			<div class="rounded-full">
				<button class={buttonRounded}>{option.id}</button>
			</div>
			<p class="text-sm md:text-xl font-semibold text-left">{option.content}</p>
		</button>
	{/each}
</div>
