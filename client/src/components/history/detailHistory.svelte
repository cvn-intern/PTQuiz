<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	export let isOpen: boolean;
	export let cardInfor: any;
	export let detailHistory: any;
	import { t } from '$i18n/translations';
	import Icon from '@iconify/svelte';
	import logo from '../../assets/logo.png';
	import { createEventDispatcher } from 'svelte';

	function convertSecondsToMinutes(seconds: number): string {
		if (seconds === 0) return `0 ${$t('common.mins')} : 0 ${$t('common.secs')} `;
		let minutes = Math.floor(seconds / 60);
		let remainingSeconds = seconds % 60;
		return `${minutes} ${$t('common.mins')} : ${remainingSeconds} ${$t('common.secs')}`;
	}

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
	const categoryI18n = (category: string) => {
		switch (category) {
			case 'Math':
				return $t('common.math');
			case 'Science':
				return $t('common.science');
			case 'History':
				return $t('common.history');
			case 'English':
				return $t('common.english');
			case 'Geography':
				return $t('common.geography');
			case 'Other':
				return $t('common.other');
		}
	};
	const dispatch = createEventDispatcher();
</script>

<Modal bind:open={isOpen} size="xl" padding="xs" outsideclose on:hide={() => dispatch('close')}>
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
							<td class=" border-r">{categoryI18n(cardInfor?.category.name)}</td>
							<td class=" border-r border-l"
								>{levelI18n(cardInfor?.difficultyLevel)}</td
							>
							<td class=" border-r border-l"
								>{convertSecondsToMinutes(cardInfor?.durationMins)}
							</td>
							<td class=" border-l">{cardInfor.numberQuestions}</td>
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
		{#if detailHistory.length > 0}
			<div class="mt-4">
				<h3 class="font-semibold">{$t('common.questions')}</h3>
				<ul class="my-4 space-y-3">
					{#each detailHistory as detail, index}
						<li>
							<div
								class="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
							>
								<Icon icon="noto:fox" />
								{#if detail.completedAt}
									<span
										class="flex-1 ml-3 whitespace-wrap text-ellipsis max-h-10 truncate"
									>
										{$t('common.STT')}{index} ({new Date(
											detail.startedAt
										).toLocaleString('vi-VN', {
											timeZone: 'Asia/Ho_Chi_Minh'
										})} - {new Date(detail.completedAt).toLocaleString(
											'vi-VN',
											{
												timeZone: 'Asia/Ho_Chi_Minh'
											}
										)})
									</span>
								{:else}
									<span
										class="flex-1 ml-3 whitespace-wrap text-ellipsis max-h-10 truncate"
									>
										{$t('common.STT')}{index} ({new Date(
											detail.startedAt
										).toLocaleString('vi-VN', {
											timeZone: 'Asia/Ho_Chi_Minh'
										})}) - {$t('common.notCompleted')}
									</span>
								{/if}
								<div class="flex gap-4 items-center">
									<div class="flex gap-2 items-center">
										<Icon
											icon="material-symbols:sports-score"
											class="w-3 text-sky-600 text-2xl"
										/>
										<p class="w-4">
											{detail.correct}/{cardInfor.numberQuestions}
										</p>
									</div>
									<div>
										<span
											class="w-24 inline-flex items-center justify-center px-2 py-0.5 ml-3 text-2xl font-semibold text-zinc-700 bg-rose-100 rounded dark:bg-gray-700 dark:text-gray-400"
											>{detail.point}</span
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
