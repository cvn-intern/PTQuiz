<script>
	import Icon from '@iconify/svelte';
	const elementsResult = [
		{
			name: 'Completion',
			value: '100%',
			color: 'black'
		},
		{
			name: 'Total Question',
			value: '20',
			color: 'purple'
		},
		{
			name: 'Correct',
			value: '13',
			color: 'green'
		},
		{
			name: 'Wrong',
			value: '07',
			color: 'red'
		}
	];
</script>

<div class="flex items-center justify-center">
	<div class="grid grid-cols-2 bg-white shadow-lg w-96 p-6 rounded-xl gap-6">
		{#each elementsResult as { name, value, color }}
			<div class="flex gap-2">
				<Icon icon={'icon-park-outline:dot'} {color} class={'text-2xl'} />
				<div class="flex flex-col items-start text-lg">
					<p class="text-{color} font-semibold">{value}</p>
					<p>{name}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
