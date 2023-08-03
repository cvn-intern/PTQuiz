<script lang="ts">
	import { goto } from '$app/navigation';
	import Position from '$components/endGame/position.svelte';
	import Score from '$components/endGame/score.svelte';
	import ScoreBoardSocket from '$components/endGame/scoreBoardSocket.svelte';
	import { t } from '$i18n/translations';

	type Participant = {
		id: string;
		displayName: string;
		avatar: string;
		isHost: boolean;
		point: number;
		correct: number;
		isAnswered: boolean;
	};
	let isEndGame: boolean = true;
	export let participants: Participant[] = [];
	export let length: number;
</script>

<div class="w-full h-full flex flex-col">
	<div class="flex justify-end my-8">
		<button
			class="text-white text-xl font-semibold px-4 py-2 rounded-full bg-redLight"
			on:click={() => {
				goto('/dashboard/quizzes');
			}}>{$t('common.backHome')}</button
		>
	</div>
	<Position {participants} {length} />
	<div class="flex gap-4 items-center justify-center">
		<div
			class={`${
				participants.length > 3 ? 'bg-white p-4 flex flex-col gap-4 overflow-y-scroll no-scrollbar' : ''
			}`}
		>
			{#each participants.slice(3) as participant, index}
				<ScoreBoardSocket scoreUser={participant} index={index + 3} {isEndGame} />
			{/each}
		</div>
	</div>
</div>
