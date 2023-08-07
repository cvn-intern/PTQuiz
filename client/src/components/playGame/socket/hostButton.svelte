<script lang="ts">
	import type { Tweened } from 'svelte/motion';
	import { t } from '$i18n/translations';

	export let questionPointer: number;
	export let questions: any[];
	export let nextQuestion: () => void;
	export let endGame: () => void;
	export let getScoreBoard: () => void;
	export let participants: any[];
	export let timer: Tweened<number>;
	export let isBattle: boolean;
	let numberOfAnswer: number;
	let isFullAnswer: boolean = false;

	let clientParticipants: any[];
	$: {
		clientParticipants = participants.filter((participant) => participant.isHost === false);
		numberOfAnswer = clientParticipants.filter((participant: any) => {
			return participant.isAnswered;
		}).length;
		if (numberOfAnswer === clientParticipants.length) {
			isFullAnswer = true;
		} else {
			if ($timer <= 0) {
				isFullAnswer = true;
			} else isFullAnswer = false;
		}
	}
</script>

<div class="flex gap-4">
	{#if questionPointer < questions.length - 1}
		<button
			disabled={!isFullAnswer}
			class={`h-fit w-fit bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl ${
				isFullAnswer ? '' : 'opacity-50 cursor-not-allowed'
			}`}
			on:click={nextQuestion}>{$t('common.next')}</button
		>
	{:else}
		<button
			disabled={!isFullAnswer}
			class={`h-fit w-fit bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl ${
				isFullAnswer ? '' : 'opacity-50 cursor-not-allowed'
			}`}
			on:click={endGame}>{$t('common.endGame')}</button
		>
	{/if}
	<button
		class="h-fit w-fit bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
		on:click={getScoreBoard}>{$t('common.viewScoreboard')}</button
	>
	<div class="h-fit w-fit bg-orangeLogo text-white font-bold py-2 px-4 rounded-md cursor-default">
		{numberOfAnswer} / {clientParticipants.length}
		{$t('common.playersAnswered')}
	</div>
</div>
