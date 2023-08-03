<script lang="ts">
	import ScoreBoardSocket from '$components/endGame/scoreBoardSocket.svelte';
	import { Modal } from 'flowbite-svelte';
	export let showScoreBoard: boolean;
	export let participants: any[];
</script>

<Modal bind:open={showScoreBoard} autoclose placement="top-center">
	<div class="flex flex-col justify-center items-center gap-4">
		{#each participants as participant, index}
			<div class="flex gap-4 items-center">
				<ScoreBoardSocket scoreUser={participant} {index} />
			</div>
		{/each}
	</div>
</Modal>
