<script lang="ts">
	export let questionPointer: number;
	export let questions: any[];
	export let nextQuestion: () => void;
	export let endGame: () => void;
	export let getScoreBoard: () => void;
	export let participants: any[];
	let numberOfAnswer: number;
	let isFullAnswer: boolean = false;

	$: {
		numberOfAnswer = participants.filter((participant: any) => {
			return participant.isAnswered;
		}).length;
		if (numberOfAnswer === participants.length) {
			isFullAnswer = true;
		} else {
			isFullAnswer = false;
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
			on:click={nextQuestion}>Next</button
		>
	{:else}
		<button
			disabled={!isFullAnswer}
			class={`h-fit w-fit bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl ${
				isFullAnswer ? '' : 'opacity-50 cursor-not-allowed'
			}`}
			on:click={endGame}>End game</button
		>
	{/if}
	<button
		class="h-fit w-fit bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
		on:click={getScoreBoard}>Score board</button
	>
	{numberOfAnswer} / {participants.length} players answered
</div>
