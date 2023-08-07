<script lang="ts">
	import { goto } from '$app/navigation';
	import Position from '$components/endGame/position.svelte';
	import ScoreBoardSocket from '$components/endGame/scoreBoardSocket.svelte';
	import { t } from '$i18n/translations';
	import Icon from '@iconify/svelte';
	import ScoreboardModal from './scoreboardModal.svelte';
	import EndGameBattle from '$components/endGame/endGameBattle.svelte';
	import type { Socket } from 'socket.io-client';

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
	export let socket: Socket;
	let showScoreBoard: boolean = false;

	$: clientParticipants = participants.filter((participant) => participant.isHost === false);
</script>

<div class="w-full h-full flex flex-col">
	<div class="flex justify-between items-center m-8">
		<button
			class=""
			on:click={() => {
				goto('/');
			}}
		>
			<Icon icon="tabler:home" class="w-12 h-12 text-darkGreen" />
		</button>
		<button
			class="text-white text-xl font-semibold px-4 py-2 rounded-full bg-yellowLogo"
			on:click={() => {
				showScoreBoard = true;
			}}>{$t('common.viewScoreboard')}</button
		>
	</div>
	{#if isBattle}
		<EndGameBattle {participants} {length} {socket} />
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
						{isEndGame}
						questionLength={length}
					/>
				{/each}
			</div>
		</div>
	{:else}
		<Position participants={clientParticipants} {length} />
		<div class="flex overflow-y-scroll no-scrollbar items-center justify-center">
			<div class={`${clientParticipants.length > 3 ? 'p-4 flex flex-col gap-4 ' : ''}`}>
				{#each clientParticipants.slice(3) as participant, index}
					<ScoreBoardSocket
						scoreUser={participant}
						isScoreboard={false}
						index={index + 3}
						{isEndGame}
						questionLength={length}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>

{#if showScoreBoard}
	<ScoreboardModal
		{participants}
		bind:showScoreBoard
		questionLength={length}
		{isBattle}
		{isEndGame}
	/>
{/if}
