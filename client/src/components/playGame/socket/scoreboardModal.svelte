<script lang="ts">
	import ScoreBoardSocket from '$components/endGame/scoreBoardSocket.svelte';

	export let showScoreBoard: boolean;
	export let participants: any[];
	export let questionLength: number;
	export let isBattle: boolean;
	export let isEndGame: boolean;
	let clientParticipants: any[];
	let isScoreboard: boolean = true;

	$: {
		clientParticipants = participants.filter((participant) => participant.isHost === false);
	}

	function closeModal() {
		showScoreBoard = false;
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && showScoreBoard) {
			closeModal();
		}
	}
</script>

{#if showScoreBoard}
	<a
		href="#"
		class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-[0.15]"
		on:click={handleBackdropClick}
		on:keydown={handleKeyDown}
	>
		<div
			class="bg-primary p-6 rounded-xl shadow-xl max-h-[80vh] overflow-y-scroll no-scrollbar"
		>
			<div class="flex flex-col justify-center items-center gap-4">
				{#each isBattle ? participants : clientParticipants as participant, index}
					<div class="flex gap-4 items-center">
						<ScoreBoardSocket
							scoreUser={participant}
							{index}
							{questionLength}
							{isScoreboard}
							{isEndGame}
						/>
					</div>
				{/each}
			</div>
		</div>
	</a>
{/if}
