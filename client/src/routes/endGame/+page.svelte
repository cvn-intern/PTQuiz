<script lang="ts">
	import HistoryAttempt from '../../components/endGame/historyAttempt.svelte';
	import Result from '../../components/endGame/result.svelte';
	import Score from '../../components/endGame/score.svelte';
</script>

<div class="bg-greenLight w-full">
	<div class="flex flex-col gap-10 items-center py-6 relative">
		<button
			class="absolute top-10 right-20 text-white text-xl font-semibold px-4 py-2 rounded-full bg-redLight"
			>Leave game</button
		>
		<Score />
		<Result />
		<HistoryAttempt />
	</div>
</div>
