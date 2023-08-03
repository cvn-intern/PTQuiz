<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	export let showScoreBoard: boolean;
	export let participants: any[];
</script>

<Modal bind:open={showScoreBoard} outsideclose>
	<div class="flex flex-col justify-center items-center">
		{#each participants as participant, index}
			<div class="flex gap-4 items-center">
				<p>No {index + 1}</p>
				<p class="truncate w-32">{participant.displayName}</p>
				<img
					src={participant.avatar}
					alt={participant.displayName}
					class="w-10 h-10 rounded-full ml-4"
				/>
				<p>{participant.correct}</p>
				<p>{participant.point}</p>
				<p>{participant.isAnswered}</p>
			</div>
		{/each}
	</div>
</Modal>
