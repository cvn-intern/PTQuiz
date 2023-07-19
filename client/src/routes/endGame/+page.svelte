<script lang="ts">
	import HistoryAttempt from '../../components/endGame/historyAttempt.svelte';
	import Result from '../../components/endGame/result.svelte';
	import Score from '../../components/endGame/score.svelte';
</script>

<div class="bg-greenLight w-full">
	<div class="flex flex-col gap-10 items-center py-6">
		<Score />
		<Result />
		<HistoryAttempt />
	</div>
</div>
