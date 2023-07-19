<script lang="ts">
	import HistoryAttempt from '../../components/endGame/historyAttempt.svelte';
	import Result from '../../components/endGame/result.svelte';
	import Score from '../../components/endGame/score.svelte';
</script>

<div class="bg-greenLight w-full">
	<div class="flex flex-col gap-6 items-center py-6">
		<div class="flex w-11/12 justify-end">
			<button class="text-white text-xl font-semibold px-4 py-2 rounded-full bg-redLight"
				>Leave game</button
			>
		</div>
		<Score />
		<Result />
		<HistoryAttempt />
	</div>
</div>
