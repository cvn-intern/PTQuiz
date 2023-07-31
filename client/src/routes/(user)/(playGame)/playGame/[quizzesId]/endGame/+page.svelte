<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ResultGameInterface } from '../../../../../../interface/endGame.interface';
	import { t } from '$i18n/translations';
	import Score from '$components/endGame/score.svelte';
	import Result from '$components/endGame/result.svelte';
	import HistoryAttempt from '$components/endGame/historyAttempt.svelte';
	import { AppRoute } from '$constants/appRoute';
	export let data;

	const STATUS = {
		PASS: $t('common.pass'),
		FAIL: $t('common.fail')
	};
	let { result } = data;
	let currentResult: ResultGameInterface = result[0];
	const attemptList = result.map((item: ResultGameInterface, index: number) => {
		return {
			attempt: result.length - index,
			points: item.point,
			status: item.passed ? STATUS.PASS : STATUS.FAIL
		};
	});
</script>

<div class="bg-greenLight w-full">
	<div class="flex flex-col gap-6 items-center py-4 px-4">
		<div class="flex w-11/12 justify-end">
			<button
				class="text-white text-xl font-semibold px-4 py-2 rounded-full bg-redLight"
				on:click={() => {
					goto('/discovery');
				}}>{$t('common.leaveGame')}</button
			>
		</div>
		<div class="w-full flex flex-col gap-6 items-center">
			<Score score={currentResult.point} />
			<Result amountCorrect={currentResult.correct} totalQuestion={currentResult.questions} />
			<HistoryAttempt {attemptList} />
		</div>
	</div>
</div>
