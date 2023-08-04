<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	export let isOpen: boolean;
	$: isOpen = isOpen;
	export let cardInfor: any;
	export let questionList: any;
	import { t } from '$i18n/translations';
	import Icon from '@iconify/svelte';
	import Loading from '$components/loading.svelte';
	import logo from '../../assets/logo.png';

	function convertSecondsToMinutes(seconds: number): string {
		if (seconds === 0) return `0 ${$t('common.mins')} : 0 ${$t('common.secs')} `;
		let minutes = Math.floor(seconds / 60);
		let remainingSeconds = seconds % 60;
		return `${minutes} ${$t('common.mins')} : ${remainingSeconds} ${$t('common.secs')}`;
	}

	const typeI18n = (type: number) => {
		switch (type) {
			case 0:
				return $t('common.multiChoice');
			case 1:
				return $t('common.singleChoice');
			case 2:
				return $t('common.guessWord');
			case 3:
				return $t('common.trueFalse');
			case 4:
				return $t('common.arrangeWord');
			case 5:
				return $t('common.inputText');
			case 6:
				return $t('common.gifSingleChoice');
			default:
				return '';
		}
	};
	const levelI18n = (level: number) => {
		switch (level) {
			case 0:
				return $t('common.easy');
			case 1:
				return $t('common.medium');
			case 2:
				return $t('common.hard');
			default:
				return $t('common.mixed');
		}
	};
</script>

<Modal bind:open={isOpen} size="xl" padding="xs" outsideclose>
	<div>
		<div class="flex md:flex-row flex-col gap-6">
			<div>
				<img src={cardInfor?.image} alt="card" class="w-40 h-40 shadow-lg rounded-lg" />
			</div>
			<div class="w-full flex flex-col gap-4">
				<h2 class="font-semibold text-xl text-orange-700">{cardInfor?.title}</h2>
				{#if cardInfor?.user?.displayName !== undefined}
					<p>
						<span class="font-semibold"> {$t('common.author')}</span>
						{cardInfor?.user?.displayName}
					</p>
				{/if}
				<div>
					<table class="border text-center p-2 w-full">
						<tr class="p-2">
							<th class=" border-r">{$t('common.category')}</th>
							<th class=" border-r border-l">{$t('common.level')}</th>
							<th class=" border-r border-l"> {$t('common.time')}</th>
							<th class=" border-l">{$t('common.questions')}</th>
						</tr>
						<tr class="p-2">
							<td class=" border-r">Math</td>
							<td class=" border-r border-l"
								>{levelI18n(cardInfor?.difficultyLevel)}</td
							>
							<td class=" border-r border-l"
								>{convertSecondsToMinutes(cardInfor?.durationMins)}
							</td>
							<td class=" border-l">{questionList.length}</td>
						</tr>
					</table>
				</div>
				{#if !cardInfor?.description}
					<div>
						<h3 class="font-semibold">{$t('common.description')}</h3>
						<p>{cardInfor?.description}</p>
					</div>
				{/if}
			</div>
		</div>
		{#if questionList.length > 0}
			<div class="mt-4">
				<h3 class="font-semibold">{$t('common.questions')}</h3>
				<ul class="my-4 space-y-3">
					{#each questionList as question}
						<li>
							<div
								class="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
							>
								<Icon icon="noto:fox" />
								<span
									class="flex-1 ml-3 whitespace-wrap text-ellipsis max-h-10 truncate"
									>{question?.title}</span
								>
								<div class="flex gap-4 items-center">
									<div class="flex gap-2 items-center">
										<Icon
											icon="game-icons:time-bomb"
											class="w-3 text-sky-600 text-2xl"
										/>
										<p class="w-4">{question?.time}</p>
									</div>
									<div>
										<span
											class="w-24 inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-semibold text-zinc-700 bg-rose-100 rounded dark:bg-gray-700 dark:text-gray-400"
											>{typeI18n(question?.type)}</span
										>
									</div>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<div class="w-full flex justify-center">
				<img src={logo} alt="" class="w-40 h-40 animate-bounce" />
			</div>
			<div class="flex mt-4 gap-4 items-center justify-center">
				<Icon icon="mdi-light:format-float-none" class="text-2xl" />
				<p>{$t('common.noQuestionsInYourQuiz')}</p>
			</div>
		{/if}
	</div>
</Modal>
