<script lang="ts">
	import { goto } from '$app/navigation';
	import Position from '$components/endGame/position.svelte';
	import ScoreBoardSocket from '$components/endGame/scoreBoardSocket.svelte';
	import { t } from '$i18n/translations';
	import ScoreboardModal from './scoreboardModal.svelte';

	type Participant = {
		id: string;
		displayName: string;
		avatar: string;
		isHost: boolean;
		point: number;
		correct: number;
		isAnswered: boolean;
	};
	export let isEndGame: boolean;
	export let participants: Participant[] = [];
	export let length: number;
	export let isBattle: boolean;
	let showScoreBoard: boolean = false;

	$: clientParticipants = participants.filter((participant) => participant.isHost === false);
</script>

<div class="w-full h-full flex flex-col">
	<div class="flex justify-between m-8">
		<button
			class="text-white text-xl font-semibold px-4 py-2 rounded-full bg-secondary"
			on:click={() => {
				showScoreBoard = true;
			}}>{$t('common.viewScoreboard')}</button
		>
		<button
			class="text-white text-xl font-semibold px-4 py-2 rounded-full bg-redLight"
			on:click={() => {
				goto('/dashboard/quizzes');
			}}>{$t('common.backHome')}</button
		>
	</div>
	{#if isBattle}
		<Position participants={participants} {length} />
		<div class="flex gap-4 items-center justify-center">
			<div
				class={`${
					participants.length > 3
						? 'bg-white p-4 flex flex-col gap-4 overflow-y-scroll no-scrollbar'
						: ''
				}`}
			>
				{#each participants.slice(3) as participant, index}
					<ScoreBoardSocket
						scoreUser={participant}
						isScoreboard={false}
						index={index + 3}
						bind:isEndGame
						questionLength={length}
					/>
				{/each}
			</div>
		</div>
	{:else}
		<Position participants={clientParticipants} {length} />
		<div class="flex gap-4 items-center justify-center">
			<div
				class={`${
					clientParticipants.length > 3
						? 'bg-white p-4 flex flex-col gap-4 overflow-y-scroll no-scrollbar'
						: ''
				}`}
			>
				{#each clientParticipants.slice(3) as participant, index}
					<ScoreBoardSocket
						scoreUser={participant}
						isScoreboard={false}
						index={index + 3}
						bind:isEndGame
						questionLength={length}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>

{#if showScoreBoard}
	<ScoreboardModal {participants} bind:showScoreBoard questionLength={length} {isBattle} />
{/if}
