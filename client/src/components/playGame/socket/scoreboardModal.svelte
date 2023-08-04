<script lang="ts">
	import ScoreBoardSocket from '$components/endGame/scoreBoardSocket.svelte';
	import { Modal } from 'flowbite-svelte';
	export let showScoreBoard: boolean;
	export let participants: any[];
	const clientParticipants = participants.filter((participant) => participant.isHost === false);

</script>

<Modal bind:open={showScoreBoard} autoclose placement="top-center">
	<div class="flex flex-col justify-center items-center gap-4">
		{#each clientParticipants as participant, index}
			<div class="flex gap-4 items-center">
				<ScoreBoardSocket scoreUser={participant} {index} />
			</div>
		{/each}
	</div>
</Modal>
