<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import HistoryAttempt from '../../../../components/endGame/historyAttempt.svelte';
	import Result from '../../../../components/endGame/result.svelte';
	import Score from '../../../../components/endGame/score.svelte';
	import { navbarStore } from '../../../../libs/store/navbarStore';
	import type { ResultGameInterface } from './resultGame.type';
	export let data;

	const STATUS = {
		PASS: 'Pass',
		FAIL: 'Fail'
	};
	let { result } = data;
	let currentResult: ResultGameInterface = result[result.length - 1];
	const attemptList = result.map((item: ResultGameInterface, index: number) => {
		return {
			attempt: index + 1,
			points: item.point,
			status: item.passed ? STATUS.PASS : STATUS.FAIL
		};
	});
	const isFullScreen = true;
	const handleIsFullScreen = (isFullScreen: boolean) => {
		navbarStore.update((value) => {
			return {
				...value,
				isFullScreen: isFullScreen
			};
		});
	};
	onMount(() => {
		handleIsFullScreen(isFullScreen);
	});
	onDestroy(() => {
		handleIsFullScreen(!isFullScreen);
	});
</script>

<div class="bg-greenLight w-full">
	<div class="flex flex-col gap-6 items-center py-6 px-4">
		<div class="flex w-11/12 justify-end">
			<button
				class="text-white text-xl font-semibold px-4 py-2 rounded-full bg-redLight"
				on:click={() => {
					goto('/');
				}}>Leave game</button
			>
		</div>
		<div class="w-full flex flex-col gap-6 items-center">
			<Score score={currentResult.point} />
			<Result amountCorrect={currentResult.correct} totalQuestion={currentResult.questions} />
			<HistoryAttempt {attemptList} />
		</div>
	</div>
</div>
