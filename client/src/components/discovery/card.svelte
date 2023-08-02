 <script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import clsx from 'clsx';
	import { t } from '$i18n/translations';
	export let image = '';
	export let nameOfQuiz = '';
	export let author = '';
	export let category = '';
	export let level = 1;
	export let id = '';
	let stringLevel = '';
	if (level === 0) {
		stringLevel = 'Easy';
	} else if (level === 1) {
		stringLevel = 'Medium';
	} else if (level === 2) {
		stringLevel = 'Hard';
	} else {
		stringLevel = 'Undefined';
	}
	export let time = '';
	export let amountOfQuestions = '';

	async function handleStart() {
		goto(`/playGame/${id}`);
	}
	const levelI18n = (level: string) => {
		switch (level) {
			case 'Easy':
				return $t('common.easy');
			case 'Medium':
				return $t('common.medium');
			case 'Hard':
				return $t('common.hard');
			default:
				return $t('common.mixed');
		}
	};
</script>

<div class="max-w-sm lg:w-80 bg-gray-50 shadow-lg rounded-xl p-6">
	<div class="flex flex-col">
		<div class="w-full mb-3">
			<img
				src={image}
				alt="Just a flower"
				class="w-full object-fill rounded-xl shadow-lg h-72"
			/>
		</div>
		<div class="flex-auto justify-evenly mt-4">
			<div class="flex flex-wrap">
				<div class="w-full text-sm flex items-center text-gray-600">
					<div class="flex items-center gap-2">
						<Icon icon="ph:question" color="red" />
						<span class="text-gray-400 whitespace-nowrap mr-3"
							>{amountOfQuestions} {$t('common.questions')}</span
						>
					</div>
					<div class="flex items-center gap-2">
						<Icon icon={'ph:clock'} color={'blue'} />
						<span class="mr-2 text-gray-400"> {$t('common.time')}: {time}</span>
					</div>
				</div>
				<div class="flex items-start w-full justify-between mt-4 gap-1">
					<h2
						class="text-lg text-gray-600 truncate font-semibold whitespace-pre-wrap min-h-titleCard max-h-titleCard w-2/3 overflow-y-hidden"
					>
						{nameOfQuiz}
					</h2>
					<div class="max-w-tagName">
						<p
							class="flex items-center bg-green-400 text-white text-xs px-2 py-1 rounded-lg mt-1 whitespace-pre-wrap max-h-titleCard overflow-y-hidden"
						>
							{category}
						</p>
					</div>
				</div>
			</div>
			<div class="text-base text-gray-600 py-2">
				<div>
					<span class="font-semibold">{$t('common.author')}: </span>
					<span class="p-1 py-0">{author}</span>
				</div>
				<div>
					<span class="font-semibold">{$t('common.level')}: </span>
					<span
						class={clsx('px-2 py-1 rounded-lg shadow-md bg-opacity-80', {
							'bg-green-100 text-green-400': stringLevel === 'Easy',
							'bg-yellow-100 text-yellow-400': stringLevel === 'Medium',
							'bg-red-100 text-red-400': stringLevel === 'Hard',
							'bg-purple-100 text-purple-400': stringLevel === 'Undefined'
						})}
					>
						{stringLevel !== 'Undefined' ? levelI18n(stringLevel) : levelI18n('Mixed')}
					</span>
				</div>
			</div>
			<div class="flex space-x-2 font-medium py-3">
				<button
					on:click={handleStart}
					class="transition ease-in duration-300 items-center justify-center font-medium mb-2 md:mb-0 bg-secondary px-4 py-2 hover:shadow-lg tracking-wider text-white rounded-xl hover:bg-darkGreen shadow-lg w-full"
				>
					<span>{$t('common.play')}</span>
				</button>
			</div>
		</div>
	</div>
</div>
