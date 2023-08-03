<script>
	import Icon from '@iconify/svelte';
	export let amountCorrect;
	export let totalQuestion;
	import { t } from '$i18n/translations';

	const elementsResult = [
		{
			name: `${$t('common.completion')}`,
			value: '100%',
			color: 'black'
		},
		{
			name: `${$t('common.totalQuestions')}`,
			value: `${totalQuestion}`,
			color: 'purple'
		},
		{
			name: `${$t('common.correct')}`,
			value: `${amountCorrect}`,
			color: 'green'
		},
		{
			name: `${$t('common.wrong')}`,
			value: `${totalQuestion - amountCorrect}`,
			color: 'red'
		}
	];
</script>

<div class="flex items-center justify-center sm:max-w-sm md:w-1/2 ">
	<div class="grid grid-cols-2 bg-white shadow-lg max-w-md md:p-6 rounded-xl md:gap-6 gap-4 p-4">
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
