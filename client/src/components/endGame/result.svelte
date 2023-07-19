<script>
	import Icon from '@iconify/svelte';
	export let amountCorrect;
	export let totalQuestion;
	const elementsResult = [
		{
			name: 'Completion',
			value: '100%',
			color: 'black'
		},
		{
			name: 'Total Question',
			value: `${totalQuestion}`,
			color: 'purple'
		},
		{
			name: 'Correct',
			value: `${amountCorrect}`,
			color: 'green'
		},
		{
			name: 'Wrong',
			value: `${totalQuestion - amountCorrect}`,
			color: 'red'
		}
	];
</script>

<div class="flex items-center justify-center">
	<div class="grid grid-cols-2 bg-white shadow-lg md:w-96 max-w-md p-6 rounded-xl md:gap-6 gap-4">
		{#each elementsResult as { name, value, color }}
			<div class="flex gap-2">
				<Icon icon={'icon-park-outline:dot'} {color} class={'text-2xl'} />
				<div class="flex flex-col items-start md:text-lg text-base">
					<p class="text-{color}-900 font-semibold">{value}</p>
					<p>{name}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
